/* Six editorial perspectives share verified facts and working service links. */
(()=>{
 'use strict';
 const configs={
 light:{topic:'활동 한눈에',order:['proof','perspective','project','works','about','history','learning','belief','next','join'],nav:['첫 실험','만든 것들','함께한 사람들','다음 활동'],hero:['제주에서 같이 배우고,','일상에 쓸모를 만듭니다.'],heroLead:'당근의 작은 모임에서, 11명의 바이브코딩 실험으로.<br>사람의 질문을 작동하는 해결책으로 바꾸는 가치onAI.',project:['우리의 첫 실험은,','내 주변의 문제에서 시작됐습니다.','함께 배우던 이웃 11명이 4주 동안<br>문제를 찾고, 설명하고, AI와 만들고,<br>직접 시연하는 데까지 도전했습니다.'],works:['작은 필요에서 시작한,','커뮤니티의 결과물.','마을의 소식, 행정 업무, 가족의 기록, 동네의 발견.<br>각 서비스에서 쓰임을 만나보세요.'],about:['서로 다른 삶이 모여,','함께 만들 힘이 됩니다.'],aboutText:'트럭기사부터 전업주부, 공학박사까지.<br>직업도 경험도 다른 이웃들이<br>자기 삶의 질문을 가져옵니다.',next:'지금 이어지는 활동과,<br>앞으로 열어 갈 실험.',join:'당신의 동네에는<br>어떤 문제가 있나요?',nextCards:[0,1,2]},
 ayush:{topic:'결과와 기록',order:['works','perspective','project','about','proof','next','join'],nav:['실험의 규모','결과 아카이브','만드는 사람들','이어질 기록'],project:['첫 번째 실험을','세 개의 숫자로 남깁니다.','11명의 이웃이 4주 동안 3팀으로 도전했습니다.<br>작동하는 결과를 직접 설명하고 보여주는 경험.<br>이 기록의 출발점입니다.'],works:['상상하던 쓰임이,','하나의 화면이 되었습니다.','마을에서 가족의 일상까지.<br>서로 다른 필요를 담은 네 가지 프로젝트.',],about:['완성된 화면 뒤에는,','함께 만든 사람이 있습니다.'],aboutText:'문제를 꺼낸 사람, 질문을 정리한 사람,<br>화면을 만들고 다시 확인한 사람.<br>함께했기에 남길 수 있었던 기록입니다.',next:'결과를 남기고,<br>다음 사람이 시작할 수 있도록.',join:'이 기록을<br>함께 이어 갈까요?',nextCards:[2]},
 cloud:{topic:'만드는 과정',order:['project','perspective','works','about','next','proof','join'],nav:['4주의 과정','작동하는 결과','함께하는 규칙','다음 제작 실험'],project:['작은 질문 하나가,','해결책이 되기까지.','처음부터 앱을 만들지는 않았습니다.<br>1주차 퍼실리테이션에서 경험을 꺼내고,<br>무엇을 해결할지 함께 정하는 일부터 시작했습니다.'],works:['설명했던 생각이,','실제로 쓰는 도구가 되면.','제작 과정의 끝에서는 직접 써 봅니다.<br>커뮤니티의 서비스를 열어 확인해 보세요.'],about:['혼자 정답을 찾기보다,','함께 확인하며 만듭니다.'],aboutText:'생활의 경험을 꺼내고,<br>서로 다른 생각을 한 문서로 맞추고,<br>팀원 모두가 결과를 설명합니다.',next:'다음 4주에는,<br>당신의 질문을 만들어볼까요?',join:'만들어 보고 싶은<br>작은 문제가 있나요?',nextCards:[]},
 axle:{topic:'마을의 쓰임',order:['perspective','works','history','project','about','next','proof','join'],nav:['시민의 첫 실험','마을의 도구','현장과 사람','다음 연결'],project:['마을의 도구도,','사람의 질문에서 출발합니다.','생활의 문제를 직접 찾아 제작하고 시연한<br>11명의 바이브코딩 경험.<br>현장의 일을 함께 풀어 볼 출발점이 되었습니다.'],works:['마을의 소식과 일에,','연결할 수 있는 도구들.','제주마을과 마을AI사무장을 중심으로,<br>생활의 쓰임을 넓혀 가는 프로젝트를 살펴보세요.'],about:['도구를 만들 때,','현장을 아는 사람이 필요합니다.'],aboutText:'무엇이 자주 반복되는지,<br>어느 순간에 도움이 필요한지.<br>현장의 경험이 도구의 방향을 정합니다.',next:'교육과 도구가,<br>현장에서 이어지도록.',join:'우리 마을의 일부터<br>같이 살펴볼까요?',nextCards:[0,1]},
 mindora:{topic:'사람과 배움',order:['perspective','about','learning','project','works','proof','next','join'],nav:['11명의 첫 성취','이웃이 만든 것','서로 다른 경험','다음 만남'],project:['처음의 막막함을,','함께 만든 성취로.','11명이 서로의 경험을 듣고, 4주 동안<br>3팀으로 문제를 풀었습니다.<br>AI를 내 삶에 적용해 볼 수 있다는 자신감이 남았습니다.'],works:['우리 이웃들의 관심이,','이런 도구로 이어졌습니다.','돌보고, 일하고, 동네를 알아가는 생활.<br>익숙한 경험에서 발견한 질문들입니다.'],about:['삶의 경험은 달라도,','처음 배우는 자리는 같습니다.'],aboutText:'트럭기사, 전업주부, 공학박사,<br>건축사 대표와 대리운전기사까지.<br>모임을 거쳐 간 다양한 삶의 전문가들입니다.',next:'잘 몰라도 괜찮은,<br>다음 만남을 기다립니다.',join:'다음 테이블에<br>함께 앉을까요?',nextCards:[0]},
 frontier:{topic:'다음 실험',order:['project','perspective','works','about','proof','next','join'],nav:['이미 해 본 실험','출발점이 된 도구','함께할 사람들','준비하는 일'],hero:['제주에서 시작한 가능성,','더 많은 일상으로.'],heroLead:'11명의 첫 실험을 넘어, 마을과 시민의 다음 도전으로.<br>배움이 제작과 현장으로 이어지는 장을 구상합니다.',project:['다음 가능성의 출발점은,','이미 함께 해 본 경험입니다.','구상에 앞서, 11명의 시민이 4주 동안<br>3팀으로 직접 만들어 본 실험이 있습니다.<br>이 첫 경험을 더 많은 이웃에게 넓히려 합니다.'],works:['다음 실험의 출발점,','이미 만들어 본 도구들.','마을 소식과 행정, 가족의 일상과 지역 연결.<br>이 경험을 현장의 다음 질문과 만나게 하려 합니다.'],about:['더 넓게 시도하려면,','더 다양한 경험이 필요합니다.'],aboutText:'문제를 아는 현장과, 배움을 여는 사람,<br>제작을 돕고 결과를 검토하는 사람.<br>각자의 역할로 다음 실험을 연결합니다.',next:'계속 시도할 수 있는 장을<br>준비하고 있습니다.',join:'다음 가능성에<br>함께 힘을 보태 주세요.',nextCards:[1]}
 };
 const root=document.documentElement,main=document.querySelector('main'),hero=document.querySelector('.motion-hero');
 const nodes={hero:hero.closest(".scene-runway")||hero,strip:document.querySelector('.kinetic-strip'),proof:document.querySelector('.proof-bar'),perspective:document.querySelector('#perspective'),project:document.querySelector('#project'),works:document.querySelector('#works'),about:document.querySelector('#about'),history:document.querySelector('#history'),learning:document.querySelector('#learning'),belief:document.querySelector('.belief'),next:document.querySelector('#next'),join:document.querySelector('#join')};
 const $=s=>document.querySelector(s),put=(s,t)=>{const e=$(s);if(e&&t!==undefined)e.innerHTML=t;};
 let previous='';
 function apply(){
  const mode=root.dataset.mode,c=configs[mode]||configs.light;
  if(previous!==mode){
   Object.entries(nodes).forEach(([key,node])=>{if(!['hero','strip'].includes(key))node.hidden=!c.order.includes(key);});
   [nodes.hero,nodes.strip,...c.order.map(key=>nodes[key])].forEach(node=>main.append(node));
   nodes.strip.hidden=mode!=='light';
   document.querySelectorAll('[data-perspective]').forEach(e=>e.hidden=e.dataset.perspective!==mode);
   previous=mode;
  }
  document.querySelectorAll('#navigation a').forEach((a,i)=>a.textContent=c.nav[i]);
  put('#project-title',`${c.project[0]}<br><em>${c.project[1]}</em>`);put('.project-heading>p',c.project[2]);
  put('#works h2',`${c.works[0]}<br><span class="teal">${c.works[1]}</span>`);put('#works .heading-row>p',c.works[2]);
  put('#about h2',`${c.about[0]}<br><span class="teal">${c.about[1]}</span>`);put('#about .large-copy',c.aboutText);
  put('#next>.section-heading h2',c.next);put('#join h2',c.join);
  const title=$('#hero-title');title.dataset.editorial='true';const lines=c.hero||configs.light.hero;title.innerHTML=`<span class="headline-row"><span>${lines[0]}</span></span><br><span class="headline-row"><span class="light-title">${lines[1]}</span></span>`;
  put('.hero-copy .hero-description',c.heroLead||configs.light.heroLead);
  document.querySelectorAll('#next-grid>.next-card').forEach((e,i)=>e.hidden=!c.nextCards.includes(i));
  $('#next-grid').hidden=!c.nextCards.length;
  document.querySelectorAll('[data-mode-choice]:not([hidden])').forEach(b=>{const item=configs[b.dataset.modeChoice];b.querySelector('span').dataset.topic=item.topic;b.setAttribute('aria-label',`${b.querySelector('span').textContent} · ${item.topic}`);});
  if(mode==='light'||mode==='frontier')hero.setAttribute('aria-labelledby','hero-title');
 }
 document.addEventListener('design-mode-change',apply);document.addEventListener('content-ready',apply);document.addEventListener('DOMContentLoaded',apply);apply();
})();
