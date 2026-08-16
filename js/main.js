document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const langToggle = document.getElementById('langToggle');
  langToggle?.addEventListener('click', () => window.siteI18n.toggle());

  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  navToggle?.addEventListener('click', () => {
    const open = navMobile.hidden;
    navMobile.hidden = !open;
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMobile?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const tabs = document.querySelectorAll('.screens-tabs .tab');
  const panels = document.querySelectorAll('.tab-panel');
  const screens = document.querySelectorAll('.tab-screen');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.tab;
      tabs.forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === id));
      screens.forEach((s) => {
        const show = s.dataset.screen === id;
        s.hidden = !show;
      });
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }
});
