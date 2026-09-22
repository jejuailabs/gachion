'use strict';
(() => {
  const body=document.body, toggle=document.querySelector('#motion-toggle');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches, heroVisible=true, frame=0, last=0, clock=0;
  body.classList.add('motion-enabled');
  const canvas=document.querySelector('#light-paths'),ctx=canvas.getContext('2d');
  let width=0,height=0;const pointer={x:0,y:0};
  function resize(){width=canvas.clientWidth;height=canvas.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=width*dpr;canvas.height=height*dpr;if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function point(t,band,i){const x=t*width;const spread=(i-20)*.0018;const center=.68+pointer.y*.012;const curve=Math.pow((t-.5)*2,2);return {x,y:height*(center+(band===0?-1:1)*(.63*curve)+spread+Math.sin(t*5+clock*.14+i*.11)*.008)};}
  function draw(){if(!ctx||!width)return;ctx.clearRect(0,0,width,height);if(document.documentElement.dataset.mode!=='light'&&window.GachiWorlds){window.GachiWorlds.draw(ctx,width,height,clock,document.documentElement.dataset.mode);return;}ctx.globalCompositeOperation='lighter';
    for(let band=0;band<2;band++){for(let i=0;i<40;i++){ctx.beginPath();for(let j=0;j<=70;j++){const p=point(j/70,band,i);if(j===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.strokeStyle=band===0?`rgba(248,191,113,${i%5===0?.38:.13})`:`rgba(96,219,203,${i%5===0?.36:.12})`;ctx.lineWidth=i%5===0?2.4:.8;ctx.shadowColor=band===0?"#edb56d":"#70cbbd";ctx.shadowBlur=i%5===0?12:0;ctx.stroke();ctx.shadowBlur=0;}
      for(let n=0;n<24;n++){const t=(n/24+clock*(band===0?.025:-.019)+1)%1;const p=point(t,band,(n*13)%40);ctx.fillStyle=band===0?'#f6d4a3':'#98edde';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=10;ctx.beginPath();ctx.ellipse(p.x,p.y,2.5,.9,band===0?-.4:.4,0,Math.PI*2);ctx.fill();}ctx.shadowBlur=0;
    }
    for(let n=0;n<36;n++){const x=((n*137.51)%1000)/1000*width,y=((n*89.3)%1000)/1000*height;ctx.fillStyle=`rgba(190,220,211,${.12+.16*(1+Math.sin(clock*.6+n))/2})`;ctx.fillRect(x,y,1,1);}ctx.globalCompositeOperation='source-over';
  }
  function tick(now){frame=0;if(paused||document.hidden||!heroVisible)return;if(now-last>32){clock+=Math.min((now-last)/1000,.06);last=now;draw();}frame=requestAnimationFrame(tick);}
  function schedule(){if(!frame&&!paused&&!document.hidden&&heroVisible){last=performance.now();frame=requestAnimationFrame(tick);}}
  function state(){body.classList.toggle('motion-paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'모션 ON':'모션 OFF';toggle.setAttribute('aria-label',paused?'모션 재생':'모션 일시정지');if(paused){cancelAnimationFrame(frame);frame=0;document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-visible'));draw();}else schedule();}
  toggle.addEventListener('click',()=>{paused=!paused;state();});reduced.addEventListener('change',e=>{paused=e.matches;state();});document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
  new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting;if(heroVisible)schedule();else{cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(canvas);
  new ResizeObserver(resize).observe(canvas);
  const hero=document.querySelector('.motion-hero');hero.addEventListener('pointermove',e=>{if(paused)return;const r=hero.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5;},{passive:true});
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -25px 0px'});
  function enhance(){document.querySelectorAll('.section-heading,.project-heading,.project-stats article,.work-card,.people-panel,.timeline-item,.activity-card,.voice-card,.impact-grid article,.moment-copy,.cohort-card').forEach((el,i)=>{if(el.dataset.motionReady)return;el.dataset.motionReady='true';el.classList.add('reveal');if(paused)el.classList.add('is-visible');else revealObserver.observe(el);});}
  enhance();document.addEventListener('content-ready',enhance);
  document.addEventListener('pointermove',e=>{if(paused||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;const card=e.target.closest('.project-stats article,.work-card');if(!card||!card.classList.contains('is-visible'))return;const r=card.getBoundingClientRect();card.style.transform=`perspective(1000px) rotateX(${((e.clientY-r.top)/r.height-.5)*-4}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*4}deg)`;},{passive:true});
  document.addEventListener('pointerout',e=>{const card=e.target.closest('.project-stats article,.work-card');if(card&&!card.contains(e.relatedTarget))card.style.transform='';});
  const counters=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,node=el.firstChild,final=Number(node.textContent);counters.unobserve(el);if(paused||!Number.isFinite(final))return;const start=performance.now();el.setAttribute('aria-label',el.textContent);function count(now){const t=Math.min((now-start)/1200,1);node.textContent=String(Math.round(final*(1-Math.pow(1-t,3))));if(t<1&&!paused)requestAnimationFrame(count);else node.textContent=String(final);}requestAnimationFrame(count);}),{threshold:.6});document.querySelectorAll('.project-stats article>strong').forEach(el=>counters.observe(el));
  const steps=[...document.querySelectorAll('.experiment-steps li')],bar=document.querySelector('.reading-progress');let scrollFrame=0;
  function scroll(){scrollFrame=0;const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?scrollY/max:0})`;let active=0;steps.forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight*.6)active=i;});steps.forEach((el,i)=>el.classList.toggle('is-current',i===active));}
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(scroll);},{passive:true});addEventListener('resize',scroll,{passive:true});scroll();resize();state();document.addEventListener('design-mode-change',()=>{draw();schedule();});
})();
