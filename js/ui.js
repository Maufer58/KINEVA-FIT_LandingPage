/**
 * UI landing: menu mobile + FAQ accordion.
 */
(function () {
  "use strict";

  function initNav() {
    const toggle = document.getElementById("navToggle");
    const panel = document.getElementById("navMobile");
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(panel.hidden);
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  function initFaq() {
    document.querySelectorAll("[data-faq-item]").forEach(function (item) {
      const btn = item.querySelector("[data-faq-btn]");
      const panel = item.querySelector("[data-faq-panel]");
      if (!btn || !panel) return;

      btn.addEventListener("click", function () {
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        panel.hidden = !open;
      });
    });
  }

  function init() {
    initNav();
    initFaq();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
