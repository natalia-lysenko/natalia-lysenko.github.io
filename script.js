
document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu'),links=document.querySelector('.navlinks'); if(menu)menu.onclick=()=>links.classList.toggle('open');
  const bar=document.querySelector('.progress'); const update=()=>{if(bar){const h=document.documentElement;bar.style.width=((h.scrollTop)/(h.scrollHeight-h.clientHeight)*100||0)+'%'}};addEventListener('scroll',update,{passive:true});update();
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
  document.querySelectorAll('[data-event]').forEach(el=>el.addEventListener('click',()=>console.log('analytics-event:',el.dataset.event)));
  document.querySelectorAll('.useful').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('active');btn.textContent=btn.classList.contains('active')?'Отмечено ✓':'Было полезно';const t=btn.parentElement.querySelector('.thanks');if(t)t.textContent=btn.classList.contains('active')?'Спасибо — это действие можно использовать как цель аналитики.':'';console.log('analytics-event: article_useful')}));
});
