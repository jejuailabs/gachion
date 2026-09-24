(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.motion-hero');
  const scene = document.querySelector('.axle-experience');
  const viewport = document.querySelector('.axle-viewport');
  const canvas = document.querySelector('#axle-traffic');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  // Only sky and wet paving move: architecture, rails, and independently drawn trams stay stable.
  const ambientCanvas = document.querySelector('#axle-ambient');
  const gl = ambientCanvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
  let ambientProgram, ambientTexture, ambientReady = false;
  const city = document.querySelector('.axle-city-image');
  function initAmbient() {
    if (!gl || !city.complete || !city.naturalWidth || ambientReady) return;
    try {
      const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Ambient shader'); return shader; };
      const vertex = compile(gl.VERTEX_SHADER, 'attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}');
      const fragment = compile(gl.FRAGMENT_SHADER, `precision mediump float;
        varying vec2 uv; uniform sampler2D image; uniform vec2 size; uniform float time;
        void main(){
          vec2 source=vec2(1536.,1024.); float cover=max(size.x/source.x,size.y/source.y);
          vec2 q=(vec2(uv.x,1.-uv.y)*size-(size-source*cover)*.5)/(source*cover);
          float cloud=(1.-smoothstep(.12,.30,q.y))*smoothstep(.10,.27,q.x)*(1.-smoothstep(.72,.90,q.x));
          vec2 shift=vec2(sin(time*.23+q.y*5.)*.024,cos(time*.19+q.x*5.)*.0035)*cloud;
          float water=smoothstep(.505,.555,q.y);
          float rail=1.-.97*max(1.-smoothstep(.001,.011,abs(q.y-.675)),1.-smoothstep(.001,.011,abs(q.y-.757)));
          shift.x+=sin(q.y*270.+time*1.25+sin(q.x*13.))*0.0026*water*rail;
          shift.y+=sin(q.x*33.+time*.85+q.y*85.)*.00075*water*rail;
          vec3 c=texture2D(image,clamp(q+shift,0.,1.)).rgb;
          float warm=smoothstep(.025,.16,c.r-c.b)*water;
          c+=warm*.055*sin(q.y*150.-time*1.05+q.x*9.);
          gl_FragColor=vec4(c,1.);
        }`);
      ambientProgram=gl.createProgram(); gl.attachShader(ambientProgram,vertex); gl.attachShader(ambientProgram,fragment); gl.linkProgram(ambientProgram);
      if(!gl.getProgramParameter(ambientProgram,gl.LINK_STATUS))throw new Error('Ambient program');
      gl.useProgram(ambientProgram);
      const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(ambientProgram,'p');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      ambientTexture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,ambientTexture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,city);
      ambientReady=true;
      ambientCanvas.dataset.renderer='ready';
    } catch { ambientCanvas.style.display='none'; ambientCanvas.dataset.renderer='failed'; }
  }
  function drawAmbient(){
    if(!ambientReady)return;
    gl.useProgram(ambientProgram);gl.viewport(0,0,ambientCanvas.width,ambientCanvas.height);
    gl.uniform2f(gl.getUniformLocation(ambientProgram,'size'),width,height);gl.uniform1f(gl.getUniformLocation(ambientProgram,'time'),elapsed);gl.drawArrays(gl.TRIANGLES,0,6);
    ambientCanvas.dataset.time=elapsed.toFixed(2);
  }
  city.addEventListener('load',()=>{initAmbient();drawAmbient();});
  const tram = new Image();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const buttons = [...document.querySelectorAll('[data-axle-stop]')];
  const chapters = [
    ['마을의 일을 먼저 듣습니다.', '이장·사무장의 반복 사무와 마을별 홍보 부담에서 출발했습니다.'],
    ['필요를 두 가지로 좁혔습니다.', '업무 자료를 정리하는 AI와 소식·체험을 한곳에 모으는 연결입니다.'],
    ['현장에 맞는 흐름을 그렸습니다.', '사진·음성·문서를 올리고, 담당자가 확인한 뒤 업무와 홍보에 씁니다.'],
    ['교육에서 도구를 보여주었습니다.', '영수증 표 정리와 회의록 초안 등 Ma2Sa의 쓰임을 시연했습니다.'],
    ['이제 반복 사용을 확인합니다.', '교육 후 실제 사용 문의가 있었고, 업무 경감 효과는 마을 실증으로 검증할 계획입니다.']
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
    drawAmbient();
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
    ambientCanvas.width=canvas.width;ambientCanvas.height=canvas.height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  }
  function select() {
    active = root.dataset.mode === 'axle';
    hero.setAttribute('aria-labelledby', active ? 'axle-title' : 'hero-title');
    if (active) {
      if (!tram.src) tram.src = 'assets/axle-tram.png';
      initAmbient();
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

