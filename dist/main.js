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
  const target = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 160);
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
const safeImage = value => { if (!/^assets\/[a-z0-9-]+\.webp$/.test(value)) throw new Error('Invalid local image'); return value; };

async function loadContent() {
  const response = await fetch('data.json');
  if (!response.ok) throw new Error('Could not load site content');
  const data = await response.json();
  document.querySelector('#timeline').innerHTML = data.timeline.map(item => `<article class="timeline-item"><span>${escapeHTML(item.period)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></article>`).join('');
  document.querySelector('#gallery').innerHTML = data.gallery.map(item => `<figure><button class="photo-button" data-photo="${safeImage(item.image)}" data-caption="${escapeHTML(item.caption)}" aria-label="${escapeHTML(item.caption)} 사진 크게 보기"><img src="${safeImage(item.image)}" alt="${escapeHTML(item.alt)}" loading="lazy" width="1600" height="900"></button><figcaption>${escapeHTML(item.caption)}</figcaption></figure>`).join('');
  document.querySelector('#works-grid').innerHTML = data.works.map(item => `<article class="work-card ${item.image ? '' : 'compact'}">${item.image ? `<div class="work-preview ${item.theme === 'office' ? 'office' : 'village'}"><div class="preview-label"><p class="eyebrow">${escapeHTML(item.previewLabel)}</p><strong>${escapeHTML(item.previewTitle).replace(/&lt;br&gt;/g,'<br>')}</strong><span>${escapeHTML(item.tag)}</span></div><div class="screen-frame"><img src="${safeImage(item.image)}" alt="${escapeHTML(item.name)} 제공 자료의 모바일 화면" loading="lazy" width="709" height="1536"></div></div>` : ''}<div class="work-body"><span class="work-category">${escapeHTML(item.category)}</span><h3>${escapeHTML(item.name)}${item.alias ? `<small>${escapeHTML(item.alias)}</small>` : ''}</h3><p>${escapeHTML(item.description)}</p><a class="work-link" href="${safeLink(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(item.name)} 직접 열어보기, 새 창">직접 열어보기 <span aria-hidden="true">↗</span></a></div></article>`).join('');
  document.querySelector('#next-grid').innerHTML = data.next.map(item => `<article class="next-card"><span class="badge">${escapeHTML(item.status)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p><small>${escapeHTML(item.detail)}</small></article>`).join('');
}
loadContent().catch(() => {
  for (const id of ['timeline', 'gallery', 'works-grid', 'next-grid']) {
    const element = document.getElementById(id);
    if (!element.hasChildNodes()) element.innerHTML = '<p class="load-error">내용을 불러오지 못했습니다. 페이지를 새로고침해 주세요.</p>';
  }
});
