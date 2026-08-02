/**
 * MOVE Landing Page — TABELLA IMMAGINI (unica fonte di verità)
 * ============================================================
 * Generato da images.csv con: python3 scripts/sync_images_from_csv.py
 * Puoi anche modificare IMAGE_TABLE qui sotto a mano.
 *
 * Apri catalogo-immagini.html per vedere anteprime e path in forma tabellare.
 */
(function () {
  "use strict";

  const IMAGE_TABLE = [
    { id: "hero-ipad", kind: "single",   file_it: "IMG_6003.PNG", file_en: "IMG_6003.PNG", note: "[OK] iPad/tablet: dashboard Trainer (home/gruppi/schede) a schermo pieno — hero principale" },
    { id: "hero-iphone", kind: "single",   file_it: "IMG_3682.png", file_en: "IMG_3682.png", note: "[OK] iPhone: home atleta o lista schede — overlay secondario sotto l'iPad nell'hero" },
    { id: "hero-watch", kind: "single",   file_it: "watch_workout_superset_dropset.png", file_en: "watch_workout_superset_dropset.png", note: "[OK] Apple Watch: workout in corso con super/drop set — overlay Watch nell'hero" },
    { id: "pro-ipad", kind: "single",   file_it: "IMG_5005.PNG", file_en: "IMG_5005.PNG", note: "[OK] iPad: enciclopedia/dettaglio esercizi o CRM grande — sezione Dashboard PT" },
    { id: "share-pdf", kind: "single",   file_it: "IMG_SHARE_3.PNG", file_en: "IMG_SHARE_3.PNG", note: "[OK] iPad/iPhone: anteprima PDF scheda esportata (branding visibile)" },
    { id: "share-wa", kind: "single",   file_it: "IMG_SHARE_2.PNG", file_en: "IMG_SHARE_2.PNG", note: "[OK] Schermata condivisione WhatsApp / share sheet della scheda" },
    { id: "share-menu", kind: "single",   file_it: "IMG_SHARE_1.PNG", file_en: "IMG_SHARE_1.PNG", note: "[OK] Menu esportazione MOVE (PDF / immagini / dati) — card centrale condivisione" },
    { id: "assign-bulk", kind: "single",   file_it: "IMG_5010.PNG", file_en: "IMG_5010.PNG", note: "[OK] iPhone/iPad: modal Assegna a… con multi-select atleti e schede selezionate" },
    { id: "templates-bulk", kind: "single",   file_it: "IMG_6010.PNG", file_en: "IMG_6010.PNG", note: "[OK] iPhone/iPad: Gestione schede multi-select (archivia/elimina / per atleta)" },
    { id: "brand-pdf", kind: "single",   file_it: "IMG_5001.PNG", file_en: "IMG_5001.PNG", note: "[OK] iPhone: anteprima PDF brandizzato con logo studio in intestazione" },
    { id: "ai-catalog", kind: "single",   file_it: "IMG_3750.png", file_en: "IMG_3750.png", note: "[OK] iPhone: Seleziona esercizi con filtri (muscolo/categoria/attrezzo) e multi-check" },
    { id: "ai-wizard", kind: "single",   file_it: "TODO_ai_wizard.png", file_en: "TODO_ai_wizard.png", note: "[DA_PRODURRE] iPhone: schermata AI Wizard — prompt obiettivo/livello + anteprima scheda generata (IT e EN)" },
    { id: "ai-photo-import", kind: "single",   file_it: "TODO_ai_photo_import.png", file_en: "TODO_ai_photo_import.png", note: "[DA_PRODURRE] iPhone: flusso Import da foto — camera/crop + risultato scheda da verificare" },
    { id: "circuit-iphone", kind: "single",   file_it: "IMG_4001.PNG", file_en: "IMG_4001.PNG", note: "[OK] iPhone: gestione/visualizzazione circuito o macro-blocco in editor/runner" },
    { id: "circuit-editor", kind: "single",   file_it: "TODO_circuit_macroblock.png", file_en: "TODO_circuit_macroblock.png", note: "[DA_PRODURRE] iPhone: editor Macro-Blocco/Circuito con giri, lista esercizi nel blocco e macro-recupero" },
    { id: "circuit-autoadvance", kind: "single",   file_it: "TODO_circuit_autoadvance.png", file_en: "TODO_circuit_autoadvance.png", note: "[DA_PRODURRE] iPhone: setup esercizio con toggle Auto-advance dopo recupero ben visibile" },
    { id: "circuit-watch-active", kind: "single",   file_it: "TODO_circuit_watch_active.png", file_en: "TODO_circuit_watch_active.png", note: "[DA_PRODURRE] Apple Watch: esercizio ATTIVO in circuito (reps/timer) + prossimo esercizio in basso" },
    { id: "circuit-watch-rest", kind: "single",   file_it: "TODO_circuit_watch_rest.png", file_en: "TODO_circuit_watch_rest.png", note: "[DA_PRODURRE] Apple Watch: recupero in circuito con annuncio/voce del prossimo esercizio" },
    { id: "circuit-watch-advance", kind: "single",   file_it: "TODO_circuit_watch_advance.png", file_en: "TODO_circuit_watch_advance.png", note: "[DA_PRODURRE] Apple Watch: momento auto-advance (fine lavoro → passaggio automatico al successivo)" },
    { id: "circuit-watch-flow", kind: "single",   file_it: "TODO_circuit_watch_flow.png", file_en: "TODO_circuit_watch_flow.png", note: "[DA_PRODURRE] Apple Watch: overview circuito (giro X di Y / progressione blocco) — opzionale se coperto dai 3 shot sopra" },
    { id: "methods-advanced", kind: "single",   file_it: "TODO_method_pyramid_drop.png", file_en: "TODO_method_pyramid_drop.png", note: "[DA_PRODURRE] iPhone: editor con Pyramid / Drop Set / Rest Pause / Superset evidenti sui tag" },
    { id: "watch-start", kind: "single",   file_it: "watch_workout_start.png", file_en: "watch_workout_start.png", note: "[OK] Apple Watch: schermata Pronto/INIZIA prima dell'allenamento" },
    { id: "distance-run", kind: "single",   file_it: "IMG_RUN001.png", file_en: "IMG_RUN001.png", note: "[OK] iPhone: runner con timer/distanza o esercizio outdoor (run) in corso" },
    { id: "distance-editor", kind: "single",   file_it: "TODO_distance_editor.png", file_en: "TODO_distance_editor.png", note: "[DA_PRODURRE] iPhone: editor esercizio distanza — target metri/km e distanza+rest per serie" },
    { id: "distance-free", kind: "single",   file_it: "TODO_distance_free.png", file_en: "TODO_distance_free.png", note: "[DA_PRODURRE] iPhone: runner free-distance (contatore senza target fisso)" },
    { id: "distance-watch-active", kind: "single",   file_it: "TODO_distance_watch_active.png", file_en: "TODO_distance_watch_active.png", note: "[DA_PRODURRE] Apple Watch: distanza in corso (metri/km percorsi vs target)" },
    { id: "distance-watch-cue", kind: "single",   file_it: "TODO_distance_watch_cue.png", file_en: "TODO_distance_watch_cue.png", note: "[DA_PRODURRE] Apple Watch: cue prossimità / voce vicino al target distanza" },
    { id: "distance-watch-done", kind: "single",   file_it: "TODO_distance_watch_done.png", file_en: "TODO_distance_watch_done.png", note: "[DA_PRODURRE] Apple Watch: target distanza raggiunto / passaggio a recupero o esercizio successivo" },
    { id: "distance-watch-free", kind: "single",   file_it: "TODO_distance_watch_free.png", file_en: "TODO_distance_watch_free.png", note: "[DA_PRODURRE] Apple Watch: modalità free-distance (contatore senza target fisso)" },
    { id: "calendar-phone", kind: "single",   file_it: "TODO_calendar_schedule.png", file_en: "TODO_calendar_schedule.png", note: "[DA_PRODURRE] iPhone: calendario o pianificazione sessione con data/orario impostati" },
    { id: "calendar-alert", kind: "single",   file_it: "TODO_calendar_alert.png", file_en: "TODO_calendar_alert.png", note: "[DA_PRODURRE] iPhone o Watch: notifica/alert allenamento programmato (banner o schermata alert)" },
    { id: "runner-phone", kind: "single",   file_it: "TODO_runner_iphone.png", file_en: "TODO_runner_iphone.png", note: "[DA_PRODURRE] iPhone: runner in corso — serie attiva, timer, skip, lista esercizi" },
    { id: "runner-summary", kind: "single",   file_it: "TODO_runner_summary.png", file_en: "TODO_runner_summary.png", note: "[DA_PRODURRE] iPhone: riepilogo fine sessione (volume, serie, kcal)" },
    { id: "safety-areas", kind: "single",   file_it: "TODO_safety_attention.png", file_en: "TODO_safety_attention.png", note: "[DA_PRODURRE] iPhone: profilo Aree di attenzione + esercizio segnalato come poco adatto" },
    { id: "mobility-protocol", kind: "single",   file_it: "TODO_mobility_protocol.png", file_en: "TODO_mobility_protocol.png", note: "[DA_PRODURRE] iPhone: protocollo mobilità/rehab in elenco o dettaglio scheda" },
    { id: "smart-swap", kind: "single",   file_it: "TODO_smart_swap.png", file_en: "TODO_smart_swap.png", note: "[DA_PRODURRE] iPhone: Smart Swap / affinità — impostazioni o suggerimento sostituzione esercizio" },
    { id: "groups-home", kind: "single",   file_it: "TODO_groups_home.png", file_en: "TODO_groups_home.png", note: "[DA_PRODURRE] iPhone: Home con Gruppi di schede espansi (più schede sotto un gruppo)" },
    { id: "free-workout", kind: "single",   file_it: "TODO_free_workout.png", file_en: "TODO_free_workout.png", note: "[DA_PRODURRE] iPhone: avvio Allenamento libero (entry point Nuova scheda / libero)" },
    { id: "backup-export", kind: "single",   file_it: "TODO_backup_export.png", file_en: "TODO_backup_export.png", note: "[DA_PRODURRE] iPhone: Backup/export binario o export massivo (Trainer/Studio)" },
    { id: "lang-iphone", kind: "single",   file_it: "IMG_3968.png", file_en: "IMG_3968.png", note: "[OK] iPhone: Impostazioni (audio guida/voce) — TEMP finché non c'è lang-picker" },
    { id: "lang-picker", kind: "single",   file_it: "TODO_lang_picker.png", file_en: "TODO_lang_picker.png", note: "[DA_PRODURRE] iPhone: schermata selezione lingua nativa (IT EN ES FR DE)" },
    { id: "lang-bg", kind: "single",   file_it: "IMG_4000.png", file_en: "IMG_4000.png", note: "[OK] iPhone: Trainer Tools / impostazioni branding-database (sfondo sezione lingue)" },
    { id: "analytics", kind: "single",   file_it: "IMG_3696.png", file_en: "IMG_3696.png", note: "[OK] iPhone: Analizza dati — metriche volume/kcal/distanza + grafico" },
    { id: "history", kind: "single",   file_it: "IMG_3693.png", file_en: "IMG_3693.png", note: "[OK] iPhone: Cronologia allenamenti con card sessione espansa" },
    { id: "price-ath-a", kind: "single",   file_it: "IMG_900a.png", file_en: "IMG_900a.png", note: "[OK] Card prezzo Athlete Pro — stato default (prima dell'hover)" },
    { id: "price-ath-b", kind: "single",   file_it: "IMG_900b.png", file_en: "IMG_900b.png", note: "[OK] Card prezzo Athlete Pro — stato hover/dettaglio" },
    { id: "price-pro-a", kind: "single",   file_it: "IMG_901a.png", file_en: "IMG_901a.png", note: "[OK] Card prezzo Trainer Pro — stato default" },
    { id: "price-pro-b", kind: "single",   file_it: "IMG_901b.png", file_en: "IMG_901b.png", note: "[OK] Card prezzo Trainer Pro — stato hover/dettaglio" },
    { id: "price-gym-a", kind: "single",   file_it: "IMG_902a.png", file_en: "IMG_902a.png", note: "[OK] Card prezzo Studio & Gym — stato default" },
    { id: "price-gym-b", kind: "single",   file_it: "IMG_902b.png", file_en: "IMG_902b.png", note: "[OK] Card prezzo Studio & Gym — stato hover/dettaglio" },
    { id: "carousel-editor", kind: "carousel", order: 1, file_it: "iphone_exercise_detail.png", file_en: "iphone_exercise_detail.png", alt: "[OK] iPhone: dettaglio esercizio da database (scheda esercizio con media)" },
    { id: "carousel-editor", kind: "carousel", order: 2, file_it: "IMG_3685.png", file_en: "IMG_4026.PNG", alt: "[OK] iPhone: editor scheda (IT) / equivalente EN IMG_4026 — lista esercizi in editing" },
    { id: "carousel-editor", kind: "carousel", order: 3, file_it: "IMG_3686.png", file_en: "IMG_4027.PNG", alt: "[OK] iPhone: seconda schermata editor scheda (IT) / EN IMG_4027" },
    { id: "carousel-editor", kind: "carousel", order: 4, file_it: "IMG_3687.png", file_en: "IMG_4028.PNG", alt: "[OK] iPhone: setup esercizio 1 (serie/reps/carico) IT / EN IMG_4028" },
    { id: "carousel-editor", kind: "carousel", order: 5, file_it: "IMG_3688.png", file_en: "IMG_4030.PNG", alt: "[OK] iPhone: setup esercizio 2 (note/metodi) IT / EN IMG_4030" },
    { id: "carousel-watch", kind: "carousel", order: 1, file_it: "watch_pre_start.png", file_en: "watch_pre_start.PNG", alt: "[OK] Apple Watch: pre-start / lista o anteprima prima di INIZIA (EN: .PNG)" },
    { id: "carousel-watch", kind: "carousel", order: 2, file_it: "watch_routine_intro.png", file_en: "watch_routine_intro.png", alt: "[OK] Apple Watch: intro routine / anteprima esercizi della scheda" },
    { id: "carousel-watch", kind: "carousel", order: 3, file_it: "watch_workout_player.png", file_en: "watch_workout_player.PNG", alt: "[OK] Apple Watch: player workout attivo (reps/peso/timer) — EN: .PNG" },
    { id: "carousel-watch", kind: "carousel", order: 4, file_it: "watch_workout_options.png", file_en: "watch_workout_options.PNG", alt: "[OK] Apple Watch: menu opzioni durante workout — EN: .PNG" },
    { id: "carousel-watch", kind: "carousel", order: 5, file_it: "watch_rest_timer.png", file_en: "watch_rest_timer.PNG", alt: "[OK] Apple Watch: timer recupero — EN: .PNG" },
    { id: "carousel-circuit", kind: "carousel", order: 1, file_it: "IMG_4001.PNG", file_en: "IMG_4001.PNG", alt: "[OK] iPhone: stesso shot circuit-iphone — circuito in carosello" },
    { id: "carousel-circuit", kind: "carousel", order: 2, file_it: "TODO_circuit_macroblock.png", file_en: "TODO_circuit_macroblock.png", alt: "[DA_PRODURRE] iPhone: stesso contenuto di circuit-editor (macro-blocco) — riusa lo stesso file" },
    { id: "carousel-circuit", kind: "carousel", order: 3, file_it: "TODO_circuit_autoadvance.png", file_en: "TODO_circuit_autoadvance.png", alt: "[DA_PRODURRE] iPhone: stesso contenuto di circuit-autoadvance — riusa lo stesso file" },
    { id: "carousel-circuit", kind: "carousel", order: 4, file_it: "TODO_method_pyramid_drop.png", file_en: "TODO_method_pyramid_drop.png", alt: "[DA_PRODURRE] iPhone: stesso contenuto di methods-advanced — riusa lo stesso file" },
    { id: "carousel-circuit-watch", kind: "carousel", order: 1, file_it: "TODO_circuit_watch_active.png", file_en: "TODO_circuit_watch_active.png", alt: "[DA_PRODURRE] Apple Watch: stesso di circuit-watch-active — riusa lo stesso file" },
    { id: "carousel-circuit-watch", kind: "carousel", order: 2, file_it: "TODO_circuit_watch_rest.png", file_en: "TODO_circuit_watch_rest.png", alt: "[DA_PRODURRE] Apple Watch: stesso di circuit-watch-rest — riusa lo stesso file" },
    { id: "carousel-circuit-watch", kind: "carousel", order: 3, file_it: "TODO_circuit_watch_advance.png", file_en: "TODO_circuit_watch_advance.png", alt: "[DA_PRODURRE] Apple Watch: stesso di circuit-watch-advance — riusa lo stesso file" },
    { id: "carousel-circuit-watch", kind: "carousel", order: 4, file_it: "TODO_circuit_watch_flow.png", file_en: "TODO_circuit_watch_flow.png", alt: "[DA_PRODURRE] Apple Watch: stesso di circuit-watch-flow — riusa lo stesso file" },
    { id: "carousel-circuit-watch", kind: "carousel", order: 5, file_it: "watch_workout_superset_dropset.png", file_en: "watch_workout_superset_dropset.png", alt: "[OK] Apple Watch: superset/dropset esistente — placeholder carosello fino ai nuovi shot" },
    { id: "carousel-distance", kind: "carousel", order: 1, file_it: "IMG_RUN001.png", file_en: "IMG_RUN001.png", alt: "[OK] iPhone: stesso di distance-run — runner distanza in carosello" },
    { id: "carousel-distance", kind: "carousel", order: 2, file_it: "TODO_distance_editor.png", file_en: "TODO_distance_editor.png", alt: "[DA_PRODURRE] iPhone: stesso di distance-editor — riusa lo stesso file" },
    { id: "carousel-distance", kind: "carousel", order: 3, file_it: "TODO_distance_free.png", file_en: "TODO_distance_free.png", alt: "[DA_PRODURRE] iPhone: stesso di distance-free — riusa lo stesso file" },
    { id: "carousel-distance-watch", kind: "carousel", order: 1, file_it: "TODO_distance_watch_active.png", file_en: "TODO_distance_watch_active.png", alt: "[DA_PRODURRE] Apple Watch: stesso di distance-watch-active — riusa lo stesso file" },
    { id: "carousel-distance-watch", kind: "carousel", order: 2, file_it: "TODO_distance_watch_cue.png", file_en: "TODO_distance_watch_cue.png", alt: "[DA_PRODURRE] Apple Watch: stesso di distance-watch-cue — riusa lo stesso file" },
    { id: "carousel-distance-watch", kind: "carousel", order: 3, file_it: "TODO_distance_watch_done.png", file_en: "TODO_distance_watch_done.png", alt: "[DA_PRODURRE] Apple Watch: stesso di distance-watch-done — riusa lo stesso file" },
    { id: "carousel-distance-watch", kind: "carousel", order: 4, file_it: "TODO_distance_watch_free.png", file_en: "TODO_distance_watch_free.png", alt: "[DA_PRODURRE] Apple Watch: stesso di distance-watch-free — riusa lo stesso file" },
  ];

  const CAROUSEL_CLASSES = {
    "carousel-editor": "w-64 md:w-72 iphone-mock device-shadow flex-shrink-0 snap-item border-brand-accent/30",
    "carousel-watch": "w-40 watch-mock device-shadow flex-shrink-0 snap-item transform hover:scale-105 transition",
    "carousel-circuit": "w-64 md:w-72 iphone-mock device-shadow flex-shrink-0 snap-item border-brand-indigo/40",
    "carousel-circuit-watch": "w-36 md:w-40 watch-mock device-shadow flex-shrink-0 snap-item border-brand-indigo/50 transform hover:scale-105 transition",
    "carousel-distance": "w-64 md:w-72 iphone-mock device-shadow flex-shrink-0 snap-item border-brand-teal/40",
    "carousel-distance-watch": "w-36 md:w-40 watch-mock device-shadow flex-shrink-0 snap-item border-brand-teal/50 transform hover:scale-105 transition"
  };

  function pathFor(lang, fileName) {
    if (!fileName) return "";
    return "img/" + lang + "/" + fileName;
  }

  function buildMaps(lang) {
    const singles = {};
    const carousels = {};

    IMAGE_TABLE.forEach(function (row) {
      if (row.kind === "single") {
        singles[row.id] = {
          it: pathFor("it", row.file_it),
          en: pathFor("en", row.file_en),
          note: row.note || "",
        };
        return;
      }

      if (row.kind === "carousel") {
        if (!carousels[row.id]) {
          carousels[row.id] = {
            classes: CAROUSEL_CLASSES[row.id] || "",
            images: [],
          };
        }
        carousels[row.id].images.push({
          order: row.order || 0,
          alt: row.alt || "",
          it: pathFor("it", row.file_it),
          en: pathFor("en", row.file_en),
        });
      }
    });

    Object.keys(carousels).forEach(function (cid) {
      carousels[cid].images.sort(function (a, b) {
        return a.order - b.order;
      });
    });

    return { singles: singles, carousels: carousels };
  }

  const PLACEHOLDER = "img/placeholder.svg";

  function attachFallback(imgEl) {
    imgEl.addEventListener("error", function onErr() {
      imgEl.removeEventListener("error", onErr);
      if (imgEl.getAttribute("src") === PLACEHOLDER) return;
      imgEl.src = PLACEHOLDER;
      imgEl.classList.add("img-missing");
      imgEl.title = "Screenshot da produrre — vedi images.csv";
    });
  }

  function setupCarouselControls(container) {
    const wrap = container.closest("[data-carousel-wrap]");
    if (!wrap) return;

    const prev = wrap.querySelector("[data-carousel-prev]");
    const next = wrap.querySelector("[data-carousel-next]");
    const dotsHost = wrap.querySelector("[data-carousel-dots]");
    const items = Array.prototype.slice.call(container.querySelectorAll("img"));

    function scrollByDir(dir) {
      const delta = Math.max(container.clientWidth * 0.7, 220) * dir;
      container.scrollBy({ left: delta, behavior: "smooth" });
    }

    if (prev) prev.addEventListener("click", function () { scrollByDir(-1); });
    if (next) next.addEventListener("click", function () { scrollByDir(1); });

    if (dotsHost && items.length) {
      dotsHost.innerHTML = "";
      items.forEach(function (_, index) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "carousel-dot";
        btn.setAttribute("aria-label", "Slide " + (index + 1));
        btn.addEventListener("click", function () {
          items[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        });
        dotsHost.appendChild(btn);
      });

      function syncDots() {
        const center = container.scrollLeft + container.clientWidth / 2;
        let active = 0;
        let best = Infinity;
        items.forEach(function (img, index) {
          const mid = img.offsetLeft + img.offsetWidth / 2;
          const dist = Math.abs(mid - center);
          if (dist < best) {
            best = dist;
            active = index;
          }
        });
        Array.prototype.forEach.call(dotsHost.children, function (dot, index) {
          dot.classList.toggle("is-active", index === active);
        });
      }

      container.addEventListener("scroll", syncDots, { passive: true });
      syncDots();
    }
  }

  function inject(lang) {
    const maps = buildMaps(lang);

    document.querySelectorAll("img[data-img]").forEach(function (img) {
      const key = img.getAttribute("data-img");
      const entry = maps.singles[key];
      if (entry && entry[lang]) {
        attachFallback(img);
        img.src = entry[lang];
      } else {
        console.warn("[MOVE images] chiave singola non trovata:", key);
        attachFallback(img);
        img.src = PLACEHOLDER;
      }
    });

    Object.keys(maps.carousels).forEach(function (carouselId) {
      const container = document.getElementById(carouselId);
      if (!container) return;
      const data = maps.carousels[carouselId];
      data.images.forEach(function (imgData) {
        const src = imgData[lang];
        if (!src) return;
        const imgEl = document.createElement("img");
        imgEl.alt = imgData.alt;
        imgEl.className = data.classes;
        attachFallback(imgEl);
        imgEl.src = src;
        container.appendChild(imgEl);
      });
      setupCarouselControls(container);
    });
  }

  window.MOVE_IMAGE_TABLE = IMAGE_TABLE;
  window.MOVE_CAROUSEL_CLASSES = CAROUSEL_CLASSES;
  window.MOVE_buildImageMaps = buildMaps;

  const lang = window.MOVE_LANG || "it";
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      inject(lang);
    });
  } else {
    inject(lang);
  }
})();
