(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.motion-hero');
  const scene = document.querySelector('.axle-experience');
  const viewport = document.querySelector('.axle-viewport');
  const canvas = document.querySelector('#axle-traffic');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const tram = new Image();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const buttons = [...document.querySelectorAll('[data-axle-stop]')];
  const chapters = [
    ['모든 변화는 질문에서.', '각자의 일상에서 발견한 불편을 함께 꺼내고 듣습니다.'],
    ['막연함을 분명한 문제로.', '누구의, 어떤 순간을 바꿀 것인지. 문제의 범위를 함께 정의합니다.'],
    ['AI가 이해할 설계로.', '문제를 구조화하고, 만들고 싶은 모습을 MD 개발 안내서로 정리합니다.'],
    ['만들고, 써 보고, 다시.', 'AI와 함께 개발하고 직접 사용하며, 내 생활에 맞는 작은 해결책을 다듬습니다.'],
    ['내가 만든 변화를 보여주다.', '첫 결과물을 시연하는 순간. AI에 대한 막막함이 내 삶을 바꾸는 성취감으로 돌아옵니다.']
  ];
  let active = false, visible = true, raf = 0, last = 0, elapsed = 0, chapterTime = 0, chapter = 0, width = 1, height = 1;
  function setChapter(index) {
    chapter = index; chapterTime = 0;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    document.querySelector('#axle-chapter-index').textContent = String(index + 1).padStart(2, '0');
    document.querySelector('#axle-chapter-title').textContent = chapters[index][0];
    document.querySelector('#axle-chapter-copy').textContent = chapters[index][1];
    scene.classList.remove('axle-changing');
    void scene.offsetWidth;
    scene.classList.add('axle-changing');
    scene.style.setProperty('--axle-phase', '0');
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => setChapter(index)));
  function vehicle(sourceX, baseline, sourceWidth, direction) {
    const scale = Math.max(width / 1536, height / 1024);
    const ox = (width - 1536 * scale) / 2, oy = (height - 1024 * scale) / 2;
    const x = ox + sourceX * scale, y = oy + baseline * scale;
    const w = sourceWidth * scale, h = w * 427 / 2114;
    ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = 'rgba(12,19,24,.25)'; ctx.filter = 'blur(3px)';
    ctx.beginPath(); ctx.ellipse(0, 1, w * .48, 3 * scale, 0, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.scale(direction, -.37); ctx.globalAlpha = .18; ctx.filter = 'blur(2px)';
    ctx.drawImage(tram, 29, 115, 2114, 427, -w / 2, -h, w, h); ctx.restore();
    ctx.filter = 'none'; ctx.scale(direction, 1);
    ctx.drawImage(tram, 29, 115, 2114, 427, -w / 2, -h, w, h);
    ctx.restore();
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    if (tram.complete && tram.naturalWidth) {
      vehicle(2136 - ((elapsed * 86 + 850) % 2736), 692, 355, -1);
      vehicle(((elapsed * 119 + 1070) % 2736) - 600, 776, 490, 1);
    }
    canvas.dataset.frame = String(Math.round(elapsed * 30));
    scene.style.setProperty('--axle-phase', String(chapterTime / 9));
  }
  function canRun() { return active && visible && !document.hidden && !reduced.matches && !document.body.classList.contains('motion-paused'); }
  function tick(now) {
    raf = 0;
    if (!canRun()) { last = 0; return; }
    const dt = last ? Math.min((now - last) / 1000, .1) : 0;
    last = now; elapsed += dt; chapterTime += dt;
    if (chapterTime >= 9) setChapter((chapter + 1) % chapters.length);
    draw(); raf = requestAnimationFrame(tick);
  }
  function reconcile() {
    if (canRun() && !raf) raf = requestAnimationFrame(tick);
    else if (!canRun()) { cancelAnimationFrame(raf); raf = 0; last = 0; draw(); }
  }
  function resize() {
    const bounds = viewport.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    width = bounds.width; height = bounds.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  }
  function select() {
    active = root.dataset.mode === 'axle';
    hero.setAttribute('aria-labelledby', active ? 'axle-title' : 'hero-title');
    if (active) {
      if (!tram.src) tram.src = 'assets/axle-tram.png';
      scene.classList.add('axle-arrive'); resize();
    } else scene.classList.remove('axle-arrive');
    reconcile();
  }
  tram.onload = draw;
  new ResizeObserver(resize).observe(viewport);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; reconcile(); }).observe(hero);
  new MutationObserver(reconcile).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  document.addEventListener('visibilitychange', reconcile);
  reduced.addEventListener('change', reconcile);
  document.addEventListener('design-mode-change', select);
  select();
})();

