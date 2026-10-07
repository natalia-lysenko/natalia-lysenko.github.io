
document.addEventListener('DOMContentLoaded',()=> {
  document.querySelectorAll('[data-event]').forEach(el=>{
    el.addEventListener('click',()=>{
      const name=el.dataset.event;
      console.log('analytics-event:',name);
      // Позже сюда добавим отправку цели в нужные счетчики.
    });
  });
  document.querySelectorAll('.useful').forEach(btn=>{
    btn.addEventListener('click',()=>{
      btn.textContent='Спасибо!';
      const s=btn.parentElement.querySelector('.thanks');
      if(s) s.textContent='Реакция зафиксирована в браузере. После подключения аналитики это станет отдельным событием.';
    });
  });
});
