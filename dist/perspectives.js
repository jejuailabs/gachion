/* Six existing visual worlds, each with one editorial subject. */
(() => {
  'use strict';
  const root = document.documentElement;
  const main = document.querySelector('main');
  const $ = selector => document.querySelector(selector);
  const nodes = {
    hero: $('.motion-hero').closest('.scene-runway') || $('.motion-hero'),
    strip: $('.kinetic-strip'),
    proof: $('.proof-bar'),
    perspective: $('#perspective'),
    project: $('#project'),
    works: $('#works'),
    about: $('#about'),
    history: $('#history'),
    learning: $('#learning'),
    belief: $('.belief'),
    next: $('#next'),
    join: $('#join')
  };
  const configs = {
    ayush: {
      topic: '포트폴리오', order: ['works'],
      nav: [['지역과 생활','#category-local'],['배움과 콘텐츠','#category-content'],['전문 업무와 소통','#category-work']],
      hero: ['우리가 만든 것들을,','한곳에서 만나보세요.'],
      lead: '지역과 생활, 배움과 콘텐츠, 전문 업무와 소통. 9개 솔루션이 어떤 문제를 푸는지 살펴보세요.'
    },
    mindora: {
      topic: '시작과 역사', order: ['proof','history','learning'],
      nav: [['당근 모임의 기록','#proof'],['걸어온 길','#history'],['함께 배운 것','#learning'],['모임 후기','#voices-grid']],
      hero: ['당근의 작은 모임에서,','우리의 이야기가 시작됐습니다.'],
      lead: '혼자 배우던 AI를 이웃과 나누던 시간. 그 만남이 직접 만들고 마을에서 써 보는 활동으로 이어졌습니다.'
    },
    axle: {
      topic: '마을 관련 사업', order: ['perspective'],
      nav: [['마을의 필요','#village-need'],['AI 도구 5종','#ma2sa-tools'],['현장 확인','#village-evidence'],['실증 계획','#village-plan']],
      hero: ['마을의 필요에서 시작해,','AI의 쓰임을 현장에서 시험합니다.'],
      lead: '가치onAI는 마을의 흩어진 홍보와 반복 사무를 듣고, 제주마을과 Ma2Sa로 해결 가능성을 시연했습니다. 이제 실제 사용과 업무 경감 효과를 확인하려 합니다.'
    },
    cloud: {
      topic: '바이브코딩', order: ['project','perspective'],
      nav: [['1기 대시보드','#project'],['만드는 과정','#project-method'],['시연의 순간','#demo-moment'],['MD 문서 예시','#perspective']],
      hero: ['내 주변의 문제를,','내 손으로 해결합니다.'],
      lead: '제주 이웃 11명이 4주 동안 3팀으로 문제를 정의하고, AI와 만들고, 직접 시연했습니다.'
    },
    frontier: {
      topic: '앞으로의 방향', order: ['perspective','next'], nextCards: [1,2],
      nav: [['다음 실험','#perspective'],['네 가지 방향','#future-tracks'],['필요한 협력','#future-support'],['준비하는 일','#next']],
      hero: ['한 번의 실험을,','다음 가능성으로 이어갑니다.'],
      lead: '배움에서 제작으로, 제작에서 현장으로. 계속 시도할 수 있는 자리와 협력을 구상합니다.'
    },
    light: {
      topic: '우리는 누구인가', order: ['perspective','about'],
      nav: [['우리 모임','#perspective'],['함께하는 방식','#about'],['함께한 사람들','#people-title']],
      hero: ['AI가 막막할 때,','서로 만나 길을 찾습니다.'],
      lead: '서로 다른 경험을 가진 사람들이 만나 AI의 막막함을 함께 풉니다. 작은 시도가 새로운 연결의 시작이 됩니다.'
    }
  };
  const anchors = {
    proof: nodes.proof, 'village-evidence': $('.field-proof'), 'village-education': $('.field-dispatch'),
    'project-method': $('.project-method'), 'demo-moment': $('.demo-moment'),
    'future-tracks': $('.frontier-tracks'), 'future-support': $('.frontier-support')
  };
  Object.entries(anchors).forEach(([id, element]) => { if (element) element.id = id; });
  const put = (selector, html) => { const element = $(selector); if (element) element.innerHTML = html; };
  const setLink = (selector, href, label) => {
    const element = $(selector);
    if (element) { element.href = href; if (label) element.innerHTML = label; }
  };
  function updatePortfolioAnchors() {
    document.querySelectorAll('#works-grid .work-card').forEach((card, index) => { if (!card.id) card.id = `work-${index + 1}`; });
  }
  function updateHistory() {
    const records = [
      ['시작','내가 필요해서 시작한 AI','현제주닷컴을 새롭게 만드는 과정에서 만난 AI를 혼자 배우고, 동네 사람들과 나누기 시작했습니다.'],
      ['당근 모임','같은 테이블에서 배우다','AI 기초에서 발표 자료, 이미지·영상, 게임 실습까지. 모르면 묻고 다음에 다시 만나는 시간이 쌓였습니다.'],
      ['제작으로 확장','배움에서 직접 만들기로','함께 배우던 이웃들이 자기 삶의 문제를 꺼내 작은 해결책을 만드는 실험으로 나아갔습니다.'],
      ['마을의 현장','배움을 일상과 마을로','모임에서 익힌 도구를 주민의 일상과 마을의 일에 적용해 보는 현장으로 이어졌습니다.']
    ];
    const items = document.querySelectorAll('#timeline .timeline-item');
    items.forEach((item,index) => {
      if (!records[index]) return;
      item.querySelector('span').textContent = records[index][0];
      item.querySelector('h3').textContent = records[index][1];
      item.querySelector('p').textContent = records[index][2];
    });
    const feature = $('.gallery-feature>.photo-button');
    if (feature) {
      feature.dataset.photo = 'assets/community.webp';
      feature.dataset.caption = '당근 AI 모임 · 같은 테이블에서 함께 배우던 시간';
      feature.setAttribute('aria-label','당근 AI 모임 사진 크게 보기');
      const photo = feature.querySelector('img');
      photo.src = 'assets/community.webp';
      photo.alt = '카페의 긴 테이블에 모여 이야기를 나누는 커뮤니티 참여자들';
      put('.gallery-feature .photo-caption','<span>작은 모임에서 시작한 이야기.</span><span>당근 AI 모임</span>');
    }
  }
  function apply() {
    const mode = root.dataset.mode in configs ? root.dataset.mode : 'light';
    const config = configs[mode];
    Object.entries(nodes).forEach(([key, node]) => {
      if (node && !['hero','strip'].includes(key)) node.hidden = !config.order.includes(key);
    });
    nodes.strip.hidden = mode !== 'light';
    [nodes.hero, nodes.strip, ...config.order.map(key => nodes[key])].forEach(node => { if (node) main.append(node); });
    document.querySelectorAll('[data-perspective]').forEach(element => { element.hidden = element.dataset.perspective !== mode; });
    document.querySelectorAll('#navigation a').forEach((element, index) => {
      const item = config.nav[index];
      element.hidden = !item;
      if (item) { element.textContent = item[0]; element.href = item[1]; }
    });
    document.querySelectorAll('[data-mode-choice]:not([hidden])').forEach(button => {
      const item = configs[button.dataset.modeChoice];
      if (!item) return;
      button.querySelector('span').dataset.topic = item.topic;
      button.title = item.topic;
      button.setAttribute('aria-label', `${button.querySelector('span').textContent} · ${item.topic}`);
    });
    put('#hero-title', `<span class="headline-row"><span>${config.hero[0]}</span></span><br><span class="headline-row"><span class="light-title">${config.hero[1]}</span></span>`);
    put('.hero-copy .hero-description', config.lead);
    $('#hero-title').dataset.editorial = 'true';
    put('#world-caption', config.topic);
    document.title = `${config.topic} | 가치onAI`;
    const description = $('meta[name="description"]');
    if (description) description.content = config.lead;
    setLink('.nav-actions .button', config.nav[0][1], `${config.topic} 보기 <span aria-hidden="true">↗</span>`);
    if (mode === 'light' || mode === 'frontier') nodes.hero.setAttribute('aria-labelledby','hero-title');
    if (mode === 'light' || mode === 'frontier') {
      setLink('.hero-buttons .button', '#perspective', `${config.topic} 살펴보기 <span aria-hidden="true">↗</span>`);
      setLink('.hero-buttons .text-link', mode === 'light' ? '#about' : '#next', mode === 'light' ? '함께하는 사람들 ↓' : '준비하는 일 ↓');
      setLink('.scroll-cue','#perspective');
    }
    updatePortfolioAnchors();
    if (mode === 'ayush') {
      put('#ayush-title','결과물을 모아,<br>직접 살펴보는<br><em>포트폴리오.</em>');
      put('.ayush-description','지역과 생활, 배움과 콘텐츠, 전문 업무까지.<br>9개 솔루션의 화면과 쓰임을 살펴보세요.');
      setLink('.ayush-enter','#works','프로젝트 모음 보기 <span aria-hidden="true">↗</span>');
      put('#works h2','만든 결과물을,<br><span class="teal">한곳에서 만나보세요.</span>');
      put('#works .heading-row>p','마을·생활·전시·게임·공간 정보·통역까지.<br>화면과 핵심 기능을 보고 각 사이트를 직접 열어보세요.');
    }
    if (mode === 'mindora') {
      updateHistory();
      put('#mindora-title','당근에서 만나,<br><em>함께 걸어온 시간.</em>');
      put('.mindora-lead','작은 AI 모임에서 시작한 만남.<br>배우고 나누던 시간이 직접 만드는 실험과<br>마을의 현장으로 이어졌습니다.');
      setLink('.mindora-button','#history','우리의 시작 읽기 <span aria-hidden="true">↗</span>');
      setLink('.mindora-secondary','#learning','당근에서 함께 배운 것들');
    }
    if (mode === 'axle') {
      put('#axle-title','마을의 필요에서 시작해,<br><em>AI의 쓰임을 현장에서 시험합니다.</em>');
      setLink('.axle-cta','#village-need','마을의 필요와 해법 보기 <b aria-hidden="true">↗</b>');
      put('.axle-intro-bottom>span','이장·사무장의 업무를 듣고,<br>교육과 시연으로 가능성을 확인했습니다.');
    }
    if (mode === 'cloud') {
      put('#cloud-title','내 주변의 문제를,<br><em>직접 만드는 해결책으로.</em>');
      put('.cloud-intro>p:last-child','제주 이웃 11명 · 4주 · 3팀.<br>문제를 찾고 AI와 만들고 직접 시연한 첫 실험.');
      setLink('.cloud-actions .cloud-secondary','#perspective','문서화 방법 보기 <span aria-hidden="true">↓</span>');
    }
    if (mode === 'frontier') {
      document.querySelectorAll('#next-grid>.next-card').forEach((element,index) => { element.hidden = !config.nextCards.includes(index); });
      put('#next>.section-heading h2','진행하는 일과,<br>구상하는 일을 구분합니다.');
    }
    $('#next-grid').hidden = mode !== 'frontier';
  }
  document.addEventListener('design-mode-change', apply);
  document.addEventListener('content-ready', apply);
  document.addEventListener('DOMContentLoaded', apply);
  apply();
})();
