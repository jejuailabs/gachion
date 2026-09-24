'use strict';

const menu = document.querySelector('#navigation');
const menuButton = document.querySelector('.menu-toggle');
function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const dialog = document.querySelector('#photo-dialog');
const dialogPhoto = document.querySelector('#dialog-photo');
document.addEventListener('click', event => {
  const button = event.target.closest('[data-photo]');
  if (!button) return;
  dialogPhoto.src = button.dataset.photo;
  dialogPhoto.alt = button.querySelector('img').alt;
  document.querySelector('#photo-title').textContent = button.dataset.caption;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('naggu1999@gmail.com');
    status.textContent = '이메일 주소를 복사했습니다.';
  } catch {
    status.textContent = '복사할 수 없습니다. 위의 이메일 주소를 길게 눌러 복사해 주세요.';
  }
});

const sections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...menu.querySelectorAll('a')];
function updateActiveSection() {
  const target = [...sections].filter(section => !section.hidden && section.getBoundingClientRect().top <= 160).sort((a,b) => b.getBoundingClientRect().top-a.getBoundingClientRect().top)[0];
  for (const link of navLinks) {
    const active = !!target && link.hash === '#' + target.id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scrollPending = false;
addEventListener('scroll', () => {
  if (!scrollPending) requestAnimationFrame(() => { updateActiveSection(); scrollPending = false; });
  scrollPending = true;
}, { passive: true });
updateActiveSection();

// Treat editable content as text. Only the explicit <br> in preview headings is allowed.
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const safeLink = value => { const url = new URL(value); if (url.protocol !== 'https:') throw new Error('Only HTTPS service links are supported'); return escapeHTML(url.href); };
const safeImage = value => { if (!/^assets\/[a-z0-9-]+\.(?:webp|png)$/.test(value)) throw new Error('Invalid local image'); return value; };

async function loadContent() {
  const response = await fetch('data.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Could not load site content');
  const data = await response.json();
  document.querySelector('#timeline').innerHTML = data.timeline.map(item => `<article class="timeline-item"><span>${escapeHTML(item.period)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></article>`).join('');
  document.querySelector('#gallery').innerHTML = data.gallery.map(item => `<figure><button class="photo-button" data-photo="${safeImage(item.image)}" data-caption="${escapeHTML(item.caption)}" aria-label="${escapeHTML(item.caption)} 사진 크게 보기"><img src="${safeImage(item.image)}" alt="${escapeHTML(item.alt)}" loading="lazy" width="1600" height="900"></button><figcaption>${escapeHTML(item.caption)}</figcaption></figure>`).join('');
  const workCards = data.works.map((item, index) => `<article id="work-${index + 1}" class="work-card ${item.image ? '' : 'compact'}">${item.image ? (item.previewType === 'desktop' ? `<div class="work-preview desktop"><button type="button" class="browser-shot" data-photo="${safeImage(item.image)}" data-caption="${escapeHTML(item.name)} 화면" aria-label="${escapeHTML(item.name)} 화면 크게 보기"><div class="browser-bar"><i></i><i></i><i></i><span>${escapeHTML(new URL(item.url).hostname)}</span></div><img src="${safeImage(item.image)}" alt="${escapeHTML(item.name)} 웹사이트 주요 화면 캡처" loading="lazy" width="1280" height="720"></button><span class="shot-caption">${escapeHTML(item.tag)}</span></div>` : `<div class="work-preview ${item.theme === 'office' ? 'office' : 'village'}"><div class="preview-label"><p class="eyebrow">${escapeHTML(item.previewLabel)}</p><strong>${escapeHTML(item.previewTitle).replace(/&lt;br&gt;/g,'<br>')}</strong><span>${escapeHTML(item.tag)}</span></div><div class="screen-frame"><img src="${safeImage(item.image)}" alt="${escapeHTML(item.name)} 제공 자료의 모바일 화면" loading="lazy" width="709" height="1536"></div></div>`) : ''}<div class="work-body"><span class="work-category">${escapeHTML(item.category)}</span><h3>${escapeHTML(item.name)}${item.alias ? `<small>${escapeHTML(item.alias)}</small>` : ''}</h3><p>${escapeHTML(item.description)}</p><a class="work-link" href="${safeLink(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(item.name)} 직접 열어보기, 새 창">직접 열어보기 <span aria-hidden="true">↗</span></a></div></article>`);
  const workGroups = [
    { id: 'local', title: '지역과 생활', description: '마을의 소식과 일, 가까운 가게와 가족의 기록' },
    { id: 'content', title: '배움과 콘텐츠', description: '학교 전시와 게임, 영상 속 지식을 새롭게 경험하는 방법' },
    { id: 'work', title: '전문 업무와 소통', description: '공간을 판단하고, 언어를 넘어 협업하는 도구' }
  ];
  document.querySelector('#works-grid').innerHTML = workGroups.map(group => `<section id="category-${group.id}" class="work-group" aria-labelledby="category-${group.id}-title"><div class="work-group-heading"><div><span class="eyebrow">SOLUTION CATEGORY</span><h3 id="category-${group.id}-title">${escapeHTML(group.title)}</h3></div><p>${escapeHTML(group.description)}</p></div><div class="work-group-grid">${data.works.map((item,index) => item.group === group.id ? workCards[index] : '').join('')}</div></section>`).join('');
  document.querySelector('#activities-grid').innerHTML = data.activities.map(item => `<article class="activity-card"><div class="activity-top"><span>${escapeHTML(item.number)}</span><span>${escapeHTML(item.label)}</span></div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p><a class="text-link" href="${safeLink(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(item.label)} 당근 후기 보기, 새 창">당근 후기 보기 ↗</a></article>`).join('');
  document.querySelector('#voices-grid').innerHTML = data.voices.map(item => `<figure class="voice-card"><span class="voice-label">${escapeHTML(item.label)}</span><blockquote>“${escapeHTML(item.quote)}”</blockquote><figcaption><span>${escapeHTML(item.author)} 님</span><a href="${safeLink(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(item.author)} 님 후기 원문, 새 창">후기 원문 ↗</a></figcaption></figure>`).join('');
  document.querySelector('#next-grid').innerHTML = data.next.map(item => `<article class="next-card"><span class="badge">${escapeHTML(item.status)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p><small>${escapeHTML(item.detail)}</small></article>`).join('');
}
loadContent().then(() => document.dispatchEvent(new Event('content-ready'))).catch(() => {
  for (const id of ['timeline', 'gallery', 'works-grid', 'next-grid', 'activities-grid', 'voices-grid']) {
    const element = document.getElementById(id);
    if (!element.hasChildNodes()) element.innerHTML = '<p class="load-error">내용을 불러오지 못했습니다. 페이지를 새로고침해 주세요.</p>';
  }
});
