'use strict';
(() => {
  const root=document.documentElement;
  const worlds={light:{name:'빛의 연결',caption:'경험이 만나, 가능성을 켜다',color:'#080f13'},aurora:{name:'제주의 오로라',caption:'제주의 밤, 새로운 빛이 번지다',color:'#11102e'},cosmos:{name:'아이디어 우주',caption:'작은 질문 하나, 새로운 궤도의 시작',color:'#090817'},lab:{name:'살아있는 실험실',caption:'QUESTION → BUILD → CHANGE',color:'#111811'},cinema:{name:'우리의 첫 영화',caption:'평범한 이웃들이 만든, 특별한 첫 장면',color:'#191310'}};
  Object.assign(worlds,{cloud:{name:'Cloud Atelier',caption:'작은 질문이 자라는, 구름 위의 작업실',color:'#f6f2ff'},ayush:{name:'Ayush',caption:'상상한 것을, 눈앞의 현실로',color:'#dce5ff'},axle:{name:'Axle Journey',caption:'우리 동네에서 출발하는 변화의 여정',color:'#d4d9dc'},mindora:{name:'Mindora',caption:'작은 질문이 머물고, 가능성이 자라는 곳',color:'#f4f8f6'},frontier:{name:'Frontier',caption:'서로 다른 가능성이 함께 피어나다',color:'#050505'}});
  const buttons=[...document.querySelectorAll('[data-mode-choice]:not([hidden])')];
  const available=new Set(buttons.map(b=>b.dataset.modeChoice));
  let transitionTimer;
  function apply(mode,announce=false){const resetScroll=()=>window.scrollTo({top:0,left:0,behavior:'instant'});if(!available.has(mode))mode='ayush';root.dataset.mode=mode;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.modeChoice===mode)));document.querySelector('meta[name="theme-color"]').content=worlds[mode].color;document.querySelector('#world-number').textContent=`${String(buttons.findIndex(b=>b.dataset.modeChoice===mode)+1).padStart(2,'0')} / ${buttons.length.toString().padStart(2,'0')}`;document.querySelector('#world-caption').textContent=worlds[mode].caption;if(announce){document.querySelector('#mode-status').textContent=worlds[mode].name+' 모드로 변경했습니다.';clearTimeout(transitionTimer);root.classList.remove('world-switch');requestAnimationFrame(()=>{root.classList.add('world-switch');transitionTimer=setTimeout(()=>root.classList.remove('world-switch'),650);});}document.dispatchEvent(new Event('design-mode-change'));if(announce){if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);resetScroll();requestAnimationFrame(resetScroll);}}
  buttons.forEach((b,i)=>{b.addEventListener('click',()=>{apply(b.dataset.modeChoice,true);});b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%buttons.length;if(e.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;if(e.key==='Home')next=0;if(e.key==='End')next=buttons.length-1;if(next!==undefined){e.preventDefault();buttons[next].focus();buttons[next].click();}});});apply(root.dataset.mode);
  const TAU=Math.PI*2;
  function starfield(c,w,h,t,color,count){for(let i=0;i<count;i++){const x=((i*137.508)%997)/997*w,y=((i*79.33)%991)/991*h;const alpha=.2+.45*(Math.sin(i+t*.5)+1)/2;c.globalAlpha=alpha;c.fillStyle=color;c.beginPath();c.arc(x,y,i%7===0?1.7:.65,0,TAU);c.fill();}c.globalAlpha=1;}
  window.GachiWorlds={draw(c,w,h,t,mode){c.save();c.globalCompositeOperation='source-over';
    if(mode==='aurora'){
      c.globalCompositeOperation='lighter';const colors=['111,243,205','153,117,252','253,138,173'];
      for(let band=0;band<3;band++){for(let line=0;line<32;line++){c.beginPath();for(let j=0;j<=65;j++){const x=j/65*w,y=h*(.54+band*.1)+Math.sin(j/65*5+t*.22+band)*h*.15+Math.cos(j/65*9-t*.16)*h*.04+line*2; j?c.lineTo(x,y):c.moveTo(x,y);}c.strokeStyle=`rgba(${colors[band]},${.08+line/600})`;c.lineWidth=5;c.stroke();}}
      starfield(c,w,h,t,'#d9f9f5',45);
    }else if(mode==='cosmos'){
      starfield(c,w,h,t,'#d5ceff',130);const cx=w*.5,cy=h*.67,r=Math.min(w*.35,h*.35);
      const glow=c.createRadialGradient(cx,cy,0,cx,cy,r*1.7);glow.addColorStop(0,'#8863e925');glow.addColorStop(1,'#8863e900');c.fillStyle=glow;c.fillRect(0,0,w,h);
      for(let ring=0;ring<4;ring++){c.save();c.translate(cx,cy);c.rotate(-.32+ring*.16);c.strokeStyle=ring%2?'#7493e899':'#c5a5fa99';c.lineWidth=1;c.beginPath();c.ellipse(0,0,r*(1+ring*.2),r*(.32+ring*.07),0,0,TAU);c.stroke();const angle=t*(.09+ring*.025)+ring*1.7,x=Math.cos(angle)*r*(1+ring*.2),y=Math.sin(angle)*r*(.32+ring*.07);c.fillStyle=ring%2?'#8bcffd':'#dabaff';c.shadowColor=c.fillStyle;c.shadowBlur=22;c.beginPath();c.arc(x,y,ring===0?7:4,0,TAU);c.fill();c.restore();}
      for(let n=0;n<8;n++){const angle=n/8*TAU+t*.015,x=cx+Math.cos(angle)*r*1.45,y=cy+Math.sin(angle)*r*.55;c.strokeStyle='#b39ee922';c.beginPath();c.moveTo(cx,cy);c.lineTo(x,y);c.stroke();}
    }else if(mode==='lab'){
      const gap=60,offset=(t*12)%gap;c.strokeStyle='#bcff3822';c.lineWidth=1;for(let x=-gap;x<w+gap;x+=gap){c.beginPath();c.moveTo(x+offset,0);c.lineTo(x+offset,h);c.stroke();}for(let y=0;y<h;y+=gap){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
      const cy=h*.69;c.save();c.translate(w*.5,cy);c.rotate(t*.035);c.strokeStyle='#c0ff47';c.lineWidth=2;for(let i=0;i<3;i++){const r=Math.min(w*.3,h*.25)+i*25;c.strokeRect(-r,-r*.55,r*2,r*1.1);}c.restore();for(let n=0;n<12;n++){const x=((n*151+t*22)%(w+60))-30,y=h*(.58+(n%4)*.09);c.fillStyle=n%3===0?'#c5ff4d':'#c5ff4d66';c.fillRect(x,y,n%3===0?9:4,n%3===0?9:4);}
    }else if(mode==='cinema'){
      const g=c.createRadialGradient(w*.8,h*.3,0,w*.8,h*.3,w*.8);g.addColorStop(0,'#ffbb6638');g.addColorStop(1,'#ffbb6600');c.fillStyle=g;c.fillRect(0,0,w,h);
      for(let i=0;i<40;i++){const x=((i*97.31+t*(3+i%3))%(w+20))-10,y=((i*73.9-t*2+h*10)%h);c.globalAlpha=.15+(Math.sin(t*.4+i)+1)*.1;c.fillStyle='#ffe0ab';c.beginPath();c.arc(x,y,i%4===0?2:1,0,TAU);c.fill();}c.globalAlpha=1;
      c.fillStyle='#080605bb';c.fillRect(0,0,w,18);c.fillRect(0,h-18,w,18);
    }c.restore();}};
})();
