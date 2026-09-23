/** Screenshot catalog (#01–#10) — keep in sync with assets/screenshots/README.md */
const SHOT_CATALOG = {
  '01': {
    file: '01-home.png',
    legacy: ['home.png'],
    label: '#01 · 01-home.png',
    tab: 'home',
  },
  '02': {
    file: '02-runner.png',
    legacy: ['runner.png'],
    label: '#02 · 02-runner.png',
    tab: 'runner',
  },
  '03': {
    file: '03-calendar.png',
    legacy: ['calendar.png'],
    label: '#03 · 03-calendar.png',
    tab: 'calendar',
  },
  '04': {
    file: '04-progress.png',
    legacy: ['progress.png'],
    label: '#04 · 04-progress.png',
    tab: 'progress',
  },
  '05': {
    file: '05-history.png',
    legacy: ['history.png'],
    label: '#05 · 05-history.png',
    tab: 'history',
  },
  '06': {
    file: '06-editor.png',
    legacy: ['ipad-editor.png', 'editor.png'],
    label: '#06 · 06-editor.png',
    tab: 'editor',
  },
  '07': {
    file: '07-settings.png',
    legacy: ['settings.png'],
    label: '#07 · 07-settings.png',
    tab: 'settings',
  },
  '08': {
    file: '08-watch-list.png',
    legacy: ['08-watch.png', 'watch.png'],
    label: '#08 · 08-watch-list.png',
    tab: 'watch',
  },
  '08a': {
    file: '08-watch-list.png',
    legacy: ['08-watch.png', 'watch.png'],
    label: '#08a · lista schede',
    tab: 'watch',
    step: 'list',
  },
  '08b': {
    file: '08-watch-start.png',
    legacy: ['08-watch.png', 'watch.png'],
    label: '#08b · avvio',
    tab: 'watch',
    step: 'start',
  },
  '08c': {
    file: '08-watch-active.png',
    legacy: ['08-watch.png', 'watch.png'],
    label: '#08c · sessione',
    tab: 'watch',
    step: 'active',
  },
  '08d': {
    file: '08-watch-done.png',
    legacy: ['08-watch.png', 'watch.png'],
    label: '#08d · fine',
    tab: 'watch',
    step: 'done',
  },
  '09': {
    file: '09-gps-map.png',
    legacy: [],
    label: '#09 · 09-gps-map.png',
    tab: 'gps',
  },
  '10': {
    file: '10-trainer.png',
    legacy: ['10-trainer-ipad.png'],
    label: '#10 · 10-trainer.png',
    tab: 'trainer',
  },
  '11': {
    file: '11-studio-ipad.png',
    legacy: ['11-studio.png'],
    label: '#11 · 11-studio-ipad.png',
    tab: 'studio',
  },
};

const SHOT_BASE = 'assets/screenshots/';

window.strideShotFallback = function strideShotFallback(img) {
  const tried = (img.dataset.tried || '').split(',').filter(Boolean);
  const chain = [];
  const primary = (img.getAttribute('src') || '').split('/').pop();
  if (primary) chain.push(primary);
  const fb = (img.dataset.fallbacks || '').split(',').map((s) => s.trim()).filter(Boolean);
  chain.push(...fb);

  for (const name of chain) {
    if (tried.includes(name)) continue;
    tried.push(name);
    img.dataset.tried = tried.join(',');
    img.src = SHOT_BASE + name;
    img.hidden = false;
    return;
  }
  img.hidden = true;
  const mock = img.nextElementSibling;
  if (mock && mock.classList.contains('screen')) mock.hidden = false;
};

/** Watch shots: after file fallbacks, reveal the CSS mock face. */
window.strideWatchShotFallback = function strideWatchShotFallback(img) {
  window.strideShotFallback(img);
  if (img.hidden) {
    const mock = img.parentElement?.querySelector('.watch-mock');
    if (mock) mock.hidden = false;
  }
};

const WATCH_STEPS = {
  list: { file: '08-watch-list.png', label: '#08a · 08-watch-list.png' },
  start: { file: '08-watch-start.png', label: '#08b · 08-watch-start.png' },
  active: { file: '08-watch-active.png', label: '#08c · 08-watch-active.png' },
  done: { file: '08-watch-done.png', label: '#08d · 08-watch-done.png' },
};

function setWatchStep(step) {
  const key = WATCH_STEPS[step] ? step : 'list';
  document.querySelectorAll('.watch-flow-item').forEach((el) => {
    el.classList.toggle('is-active', el.dataset.watchStep === key);
  });
  document.querySelectorAll('.watch-step-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.watchStep === key);
  });
  const label = document.getElementById('showcaseWatchLabel');
  if (label) label.textContent = WATCH_STEPS[key].label;
}

function setShowcaseMode(mode) {
  const devices = document.querySelector('.showcase-devices');
  const watchFlow = document.getElementById('showcaseWatchFlow');
  const phone = document.getElementById('showcasePhone');
  const tablet = document.getElementById('showcaseTablet');
  const isWatch = mode === 'watch';
  devices?.classList.toggle('is-watch-mode', isWatch);
  if (watchFlow) watchFlow.hidden = !isWatch;
  if (phone) phone.hidden = isWatch;
  if (tablet && isWatch) {
    tablet.classList.remove('is-active');
  }
}

/** iPad shots: keep landscape frame; show mock UI if files are missing. */
window.strideIpadShotFallback = function strideIpadShotFallback(img) {
  window.strideShotFallback(img);
  if (!img.hidden) return;
  const screen = img.closest('.ipad-pro-screen');
  const mock = screen?.querySelector('.ipad-pro-mock');
  if (mock) mock.hidden = false;
  // Keep thumb frames landscape even without image.
  const frame = img.closest('.ipad-thumb-frame');
  if (frame) frame.classList.add('is-empty');
};

function shotCandidates(id) {
  const entry = SHOT_CATALOG[id];
  if (!entry) return [];
  return [entry.file, ...(entry.legacy || [])];
}

function setShowcaseShot(id) {
  const entry = SHOT_CATALOG[id];
  const img = document.getElementById('showcaseShot');
  const label = document.getElementById('showcaseShotLabel');
  const tablet = document.getElementById('showcaseTablet');
  if (!entry || !img) return;

  const isWatch = entry.tab === 'watch' || id === '08' || id.startsWith('08');
  setShowcaseMode(isWatch ? 'watch' : 'phone');
  if (isWatch) {
    setWatchStep(entry.step || 'list');
    return;
  }

  img.dataset.tried = '';
  img.dataset.shot = id;
  img.dataset.fallbacks = (entry.legacy || []).join(',');
  img.alt = `KINEVA FIT screenshot ${id}`;
  img.hidden = false;
  img.src = SHOT_BASE + entry.file;
  if (label) label.textContent = entry.label;

  if (tablet) {
    const useIpad = id === '06' || id === '10' || id === '11';
    tablet.classList.toggle('is-active', useIpad);
    tablet.classList.toggle('is-landscape', useIpad);
    tablet.style.opacity = '';
    const tabletImg = tablet.querySelector('img.screen-shot');
    if (tabletImg && useIpad) {
      const ipadMap = {
        '06': ['06-editor-ipad.png', 'ipad-editor.png', '06-editor.png'],
        '10': ['10-trainer-ipad.png', '10-trainer.png'],
        '11': ['11-studio-ipad.png', '11-studio.png'],
      };
      const chain = ipadMap[id] || [];
      tabletImg.dataset.tried = '';
      tabletImg.dataset.fallbacks = chain.slice(1).join(',');
      tabletImg.hidden = false;
      tabletImg.src = SHOT_BASE + chain[0];
    }
  }
}

function probeShotStatus() {
  document.querySelectorAll('.shot-status[data-check]').forEach((el) => {
    const names = el.dataset.check.split(',').map((s) => s.trim()).filter(Boolean);
    let i = 0;
    const tryNext = () => {
      if (i >= names.length) {
        el.textContent = 'todo';
        el.className = 'shot-status missing';
        return;
      }
      const name = names[i++];
      const probe = new Image();
      probe.onload = () => {
        el.textContent = 'ok';
        el.className = 'shot-status ready';
        el.title = name;
      };
      probe.onerror = tryNext;
      probe.src = SHOT_BASE + name + '?v=' + Date.now();
    };
    tryNext();
  });
}

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

  const activateTab = (tab) => {
    const id = tab.dataset.tab;
    const shot = tab.dataset.shot || '01';
    tabs.forEach((t) => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });
    panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === id));
    setShowcaseShot(shot);
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  document.querySelectorAll('.watch-step-btn, .watch-flow-item').forEach((el) => {
    el.addEventListener('click', () => {
      const step = el.dataset.watchStep;
      if (!step) return;
      const watchTab = document.querySelector('.screens-tabs .tab[data-tab="watch"]');
      if (watchTab && !watchTab.classList.contains('active')) activateTab(watchTab);
      setShowcaseMode('watch');
      setWatchStep(step);
    });
  });

  const setWatchPromoStep = (step) => {
    const key = step || 'list';
    document.querySelectorAll('.watch-seq-item').forEach((el) => {
      const on = el.dataset.watchPromo === key;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-pressed', String(on));
    });
    document.querySelectorAll('.watch-promo-step').forEach((btn) => {
      const on = btn.dataset.watchPromo === key;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', String(on));
    });
  };

  document.querySelectorAll('[data-watch-promo]').forEach((el) => {
    el.addEventListener('click', () => setWatchPromoStep(el.dataset.watchPromo));
  });

  // Auto-advance watch sequence while section is in view
  const watchSection = document.getElementById('watch');
  const watchOrder = ['list', 'start', 'active', 'done'];
  let watchIdx = 0;
  let watchTimer = null;
  const advanceWatch = () => {
    watchIdx = (watchIdx + 1) % watchOrder.length;
    setWatchPromoStep(watchOrder[watchIdx]);
  };
  const startWatchAuto = () => {
    if (watchTimer) return;
    watchTimer = window.setInterval(advanceWatch, 2800);
  };
  const stopWatchAuto = () => {
    if (watchTimer) {
      window.clearInterval(watchTimer);
      watchTimer = null;
    }
  };
  if (watchSection && 'IntersectionObserver' in window) {
    const wio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startWatchAuto();
          else stopWatchAuto();
        });
      },
      { threshold: 0.35 },
    );
    wio.observe(watchSection);
  }
  watchSection?.addEventListener('pointerdown', () => {
    stopWatchAuto();
  }, { once: true });

  const setIpadStep = (step) => {
    const key = step || 'clients';
    const thumb = document.querySelector(`.ipad-thumb[data-ipad-step="${key}"]`);
    document.querySelectorAll('.ipad-step-btn').forEach((btn) => {
      const on = btn.dataset.ipadStep === key;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', String(on));
    });
    document.querySelectorAll('.ipad-thumb').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.ipadStep === key);
    });

    const hero = document.getElementById('ipadHeroShot');
    const mock = document.getElementById('ipadHeroMock');
    const caption = document.getElementById('ipadHeroCaption');
    if (hero && thumb) {
      hero.dataset.tried = '';
      hero.hidden = false;
      if (mock) mock.hidden = true;
      hero.dataset.fallbacks = thumb.dataset.fallbacks || '';
      hero.src = thumb.dataset.src || thumb.querySelector('img')?.getAttribute('src') || hero.src;
      hero.alt = `iPad Pro · ${thumb.getAttribute('aria-label') || key}`;
    }
    if (caption && thumb) {
      const lang = window.siteI18n?.lang || 'it';
      const dict = window.siteI18n?.translations?.[lang] || {};
      const capKey = thumb.dataset.capKey;
      caption.textContent = (capKey && dict[capKey]) || thumb.dataset.cap || caption.textContent;
      if (capKey) caption.setAttribute('data-i18n', capKey);
    }
  };

  document.querySelectorAll('.ipad-step-btn, .ipad-thumb').forEach((el) => {
    el.addEventListener('click', () => setIpadStep(el.dataset.ipadStep));
  });

  document.querySelectorAll('.feature-row[data-shot]').forEach((row) => {
    row.addEventListener('click', () => {
      const shot = row.dataset.shot;
      if (shot === '08') {
        document.getElementById('watch')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (shot === '10') {
        document.getElementById('ipad')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const tab = document.querySelector(`.screens-tabs .tab[data-shot="${shot}"]`);
      if (tab) {
        activateTab(tab);
        document.getElementById('screens')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  setShowcaseShot('01');
  initBillingToggle();
  initLandingShotZoom();

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

function initBillingToggle() {
  const annualBtn = document.getElementById('billingAnnual');
  const monthlyBtn = document.getElementById('billingMonthly');
  const hint = document.getElementById('billingHint');
  if (!annualBtn || !monthlyBtn) return;

  const apply = (mode) => {
    const annual = mode === 'annual';
    annualBtn.classList.toggle('active', annual);
    monthlyBtn.classList.toggle('active', !annual);
    const lang = window.siteI18n?.lang || 'it';
    const dict = window.siteI18n?.translations?.[lang] || {};

    document.querySelectorAll('.paywall-amount').forEach((el) => {
      el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
    });
    document.querySelectorAll('.paywall-period').forEach((el) => {
      el.textContent = annual
        ? (dict['plans.perYear'] || '/ anno')
        : (dict['plans.perMonth'] || '/ mese');
    });
    document.querySelectorAll('.paywall-equiv').forEach((el) => {
      if (annual) {
        el.textContent =
          el.getAttribute(lang === 'en' ? 'data-annual-hint-en' : 'data-annual-hint-it') || '';
      } else {
        el.textContent = '';
      }
    });

    if (hint) {
      hint.textContent = annual
        ? (dict['plans.annualHint'] || hint.textContent)
        : (dict['plans.monthlyHint'] || hint.textContent);
      hint.classList.toggle('is-monthly', !annual);
    }
  };

  annualBtn.addEventListener('click', () => apply('annual'));
  monthlyBtn.addEventListener('click', () => apply('monthly'));

  const originalToggle = window.siteI18n?.toggle?.bind(window.siteI18n);
  if (originalToggle && window.siteI18n) {
    window.siteI18n.toggle = () => {
      originalToggle();
      apply(annualBtn.classList.contains('active') ? 'annual' : 'monthly');
    };
  }

  apply('annual');
}

/** Hover zoom on landing device mockups (CSS animations override :hover transform). */
function initLandingShotZoom() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const zoomSelector = [
    '.hero-trio__phone',
    '.hero-trio__watch',
    '.hero-trio__ipad',
    '.promo-phone',
    '.showcase-phone',
    '.showcase-devices .device-tablet',
    '.ipad-thumb',
    '.watch-seq-item',
    '.watch-flow-item',
  ].join(',');

  document.querySelectorAll(zoomSelector).forEach((el) => {
    el.addEventListener('mouseenter', () => el.classList.add('is-shot-zoomed'));
    el.addEventListener('mouseleave', () => el.classList.remove('is-shot-zoomed'));
    el.addEventListener('blur', () => el.classList.remove('is-shot-zoomed'), true);
  });

  document.querySelectorAll('.ipad-hero').forEach((hero) => {
    const frame = hero.querySelector('.ipad-pro-frame');
    if (!frame) return;
    hero.addEventListener('mouseenter', () => frame.classList.add('is-shot-zoomed'));
    hero.addEventListener('mouseleave', () => frame.classList.remove('is-shot-zoomed'));
  });
}

window.SHOT_CATALOG = SHOT_CATALOG;
window.shotCandidates = shotCandidates;
