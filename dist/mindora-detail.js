(() => {
 const root=document.documentElement,hero=document.querySelector('.motion-hero'),scene=document.querySelector('.mindora-experience'),video=document.querySelector('#mindora-film');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;
 function state(){
  const active=root.dataset.mode==='mindora';
  scene.classList.toggle('mindora-enter',active);
  if(active)hero.setAttribute('aria-labelledby','mindora-title');
  if(active&&visible&&!document.hidden&&!reduced.matches&&!document.body.classList.contains('motion-paused')){
   if(!video.getAttribute('src'))video.src='assets/mindora-h3.mp4';
   video.play().catch(()=>{});
  }else video.pause();
 }
 video.addEventListener('playing',()=>scene.classList.add('mindora-video-ready'));
 video.addEventListener('error',()=>scene.classList.remove('mindora-video-ready'));
 new IntersectionObserver(e=>{visible=e[0].isIntersecting;state();}).observe(hero);
 new MutationObserver(state).observe(document.body,{attributes:true,attributeFilter:['class']});
 document.addEventListener('design-mode-change',state);document.addEventListener('visibilitychange',state);reduced.addEventListener('change',state);state();
})();
