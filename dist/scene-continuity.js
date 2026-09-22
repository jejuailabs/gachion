/* Keep the live stage intact; carry its materials through the editorial page. */
(()=>{
 const hero=document.querySelector('.motion-hero');
 const runway=document.createElement('div');runway.className='scene-runway';
 hero.before(runway);runway.append(hero);
 const dissolve=document.createElement('div');dissolve.className='scene-dissolve';dissolve.setAttribute('aria-hidden','true');runway.append(dissolve);
 const atmosphere=document.createElement('div');atmosphere.className='scene-atmosphere';atmosphere.setAttribute('aria-hidden','true');document.body.prepend(atmosphere);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
 function paint(){
  frame=0;const paused=reduced.matches||document.body.classList.contains('motion-paused');
  const height=hero.offsetHeight; const extra=paused?100:(innerWidth<=800?160:Math.max(180,Math.min(380,innerHeight*.32))); runway.style.height=`${height+extra}px`; const box=runway.getBoundingClientRect();
  runway.style.setProperty('--stage-top',`${Math.min(128,innerHeight-height)}px`);
  const progress=Math.max(0,Math.min(1,-box.top/Math.max(height,1)));
  atmosphere.style.opacity=(.15+.85*progress).toFixed(3);
  atmosphere.style.setProperty('--drift',paused?'0px':`${Math.sin(scrollY/1500)*32}px`);
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 document.addEventListener('design-mode-change',schedule);reduced.addEventListener('change',schedule);
 new ResizeObserver(schedule).observe(hero);
 new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['class']});
 paint();
})();
