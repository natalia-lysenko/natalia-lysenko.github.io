document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.navlinks');
  if (menu) menu.onclick = () => links.classList.toggle('open');

  const bar = document.querySelector('.progress');
  const update = () => {
    if (bar) {
      const h = document.documentElement;
      bar.style.width = ((h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100 || 0) + '%';
    }
  };
  addEventListener('scroll', update, { passive: true });
  update();

  const io = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }),
    { threshold: .08 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Отправка собственного события в SberAds / Top-100.
  // Для целей типа «Собственные события» Top-100 использует trackEvent().
  // Счетчик загружается асинхронно, поэтому при необходимости коротко ждем его инициализации.
  const sendTop100Event = (eventName, attemptsLeft = 40) => {
    try {
      if (window.top100Counter && typeof window.top100Counter.trackEvent === 'function') {
        window.top100Counter.trackEvent(eventName, {});
        return;
      }
    } catch (e) {}

    if (attemptsLeft > 0) {
      setTimeout(() => sendTop100Event(eventName, attemptsLeft - 1), 250);
    }
  };

  // Отправка той же цели в MyTracker / Top.Mail.Ru (счетчик 3800128).
  const sendMyTrackerEvent = (eventName) => {
    window._tmr = window._tmr || [];
    window._tmr.push({ id: '3800128', type: 'reachGoal', goal: eventName });
  };

  const sendAnalyticsEvent = (eventName) => {
    sendTop100Event(eventName);
    sendMyTrackerEvent(eventName);
    console.log('analytics-event:', eventName);
  };

  // Цель 1: открытие любой страницы-статьи.
  if (document.querySelector('.article-shell')) {
    sendAnalyticsEvent('article_open');
  }

  // Цель 2: пользователь отметил статью как полезную.
  document.querySelectorAll('.useful').forEach(btn => {
    btn.dataset.event = 'article_helpful';
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const isActive = btn.classList.contains('active');
      btn.textContent = isActive ? 'Отмечено ✓' : 'Было полезно';

      const thanks = btn.parentElement.querySelector('.thanks');
      if (thanks) {
        thanks.textContent = isActive
          ? 'Спасибо — это действие можно использовать как цель аналитики.'
          : '';
      }

      // Событие отправляем только при отметке, повторное снятие отметки целью не считаем.
      if (isActive) sendAnalyticsEvent('article_helpful');
    });
  });
});
