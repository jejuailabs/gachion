(()=>{
 const root=document.documentElement,hero=document.querySelector('.motion-hero'),scene=document.querySelector('.ayush-gallery'),video=document.querySelector('#ayush-film');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;
 function state(){const active=root.dataset.mode==='ayush';scene.classList.toggle('ayush-entering',active);if(active)hero.setAttribute('aria-labelledby','ayush-title');
  if(active&&visible&&!document.hidden&&!reduced.matches&&!document.body.classList.contains('motion-paused')){if(!video.getAttribute('src'))video.src='assets/ayush-film.mp4';video.play().catch(()=>{});}else video.pause();}
 video.addEventListener('playing',()=>scene.classList.add('ayush-video-ready'));video.addEventListener('error',()=>scene.classList.remove('ayush-video-ready'));
 new IntersectionObserver(e=>{visible=e[0].isIntersecting;state();}).observe(hero);new MutationObserver(state).observe(document.body,{attributes:true,attributeFilter:['class']});document.addEventListener('design-mode-change',state);document.addEventListener('visibilitychange',state);reduced.addEventListener('change',state);state();
})();
