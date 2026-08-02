#!/usr/bin/env python3
"""Rigenera js/images.js dalla tabella images.csv (Excel/Numbers-friendly).

Uso:
  python3 scripts/sync_images_from_csv.py
"""
from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "images.csv"
JS_PATH = ROOT / "js" / "images.js"

CAROUSEL_CLASSES = {
    "carousel-editor": "w-64 md:w-72 iphone-mock device-shadow flex-shrink-0 snap-item border-brand-accent/30",
    "carousel-watch": "w-40 watch-mock device-shadow flex-shrink-0 snap-item transform hover:scale-105 transition",
    "carousel-circuit": "w-64 md:w-72 iphone-mock device-shadow flex-shrink-0 snap-item border-brand-indigo/40",
    "carousel-circuit-watch": "w-36 md:w-40 watch-mock device-shadow flex-shrink-0 snap-item border-brand-indigo/50 transform hover:scale-105 transition",
    "carousel-distance": "w-64 md:w-72 iphone-mock device-shadow flex-shrink-0 snap-item border-brand-teal/40",
    "carousel-distance-watch": "w-36 md:w-40 watch-mock device-shadow flex-shrink-0 snap-item border-brand-teal/50 transform hover:scale-105 transition",
}


def js_str(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def main() -> None:
    rows = list(csv.DictReader(CSV_PATH.open(encoding="utf-8")))
    lines = []
    for r in rows:
        kind = (r.get("kind") or "").strip()
        rid = (r.get("id") or "").strip()
        file_it = (r.get("file_it") or "").strip()
        file_en = (r.get("file_en") or "").strip()
        note = (r.get("cosa_scattare") or r.get("alt_or_note") or "").strip()
        order = (r.get("order") or "").strip()
        status = (r.get("status") or "").strip()
        if status:
            note = f"[{status}] {note}" if note else f"[{status}]"

        if kind == "single":
            lines.append(
                "    { id: %s, kind: \"single\",   file_it: %s, file_en: %s, note: %s },"
                % (js_str(rid), js_str(file_it), js_str(file_en), js_str(note))
            )
        elif kind == "carousel":
            lines.append(
                "    { id: %s, kind: \"carousel\", order: %s, file_it: %s, file_en: %s, alt: %s },"
                % (js_str(rid), order or "0", js_str(file_it), js_str(file_en), js_str(note))
            )
        else:
            raise SystemExit(f"kind non valido per id={rid!r}: {kind!r}")

    table_body = "\n".join(lines)
    classes_js = ",\n".join(
        f'    {js_str(k)}: {js_str(v)}' for k, v in CAROUSEL_CLASSES.items()
    )

    out = f'''/**
 * MOVE Landing Page — TABELLA IMMAGINI (unica fonte di verità)
 * ============================================================
 * Generato da images.csv con: python3 scripts/sync_images_from_csv.py
 * Puoi anche modificare IMAGE_TABLE qui sotto a mano.
 *
 * Apri catalogo-immagini.html per vedere anteprime e path in forma tabellare.
 */
(function () {{
  "use strict";

  const IMAGE_TABLE = [
{table_body}
  ];

  const CAROUSEL_CLASSES = {{
{classes_js}
  }};

  function pathFor(lang, fileName) {{
    if (!fileName) return "";
    return "img/" + lang + "/" + fileName;
  }}

  function buildMaps(lang) {{
    const singles = {{}};
    const carousels = {{}};

    IMAGE_TABLE.forEach(function (row) {{
      if (row.kind === "single") {{
        singles[row.id] = {{
          it: pathFor("it", row.file_it),
          en: pathFor("en", row.file_en),
          note: row.note || "",
        }};
        return;
      }}

      if (row.kind === "carousel") {{
        if (!carousels[row.id]) {{
          carousels[row.id] = {{
            classes: CAROUSEL_CLASSES[row.id] || "",
            images: [],
          }};
        }}
        carousels[row.id].images.push({{
          order: row.order || 0,
          alt: row.alt || "",
          it: pathFor("it", row.file_it),
          en: pathFor("en", row.file_en),
        }});
      }}
    }});

    Object.keys(carousels).forEach(function (cid) {{
      carousels[cid].images.sort(function (a, b) {{
        return a.order - b.order;
      }});
    }});

    return {{ singles: singles, carousels: carousels }};
  }}

  const PLACEHOLDER = "img/placeholder.svg";

  function attachFallback(imgEl) {{
    imgEl.addEventListener("error", function onErr() {{
      imgEl.removeEventListener("error", onErr);
      if (imgEl.getAttribute("src") === PLACEHOLDER) return;
      imgEl.src = PLACEHOLDER;
      imgEl.classList.add("img-missing");
      imgEl.title = "Screenshot da produrre — vedi images.csv";
    }});
  }}

  function setupCarouselControls(container) {{
    const wrap = container.closest("[data-carousel-wrap]");
    if (!wrap) return;

    const prev = wrap.querySelector("[data-carousel-prev]");
    const next = wrap.querySelector("[data-carousel-next]");
    const dotsHost = wrap.querySelector("[data-carousel-dots]");
    const items = Array.prototype.slice.call(container.querySelectorAll("img"));

    function scrollByDir(dir) {{
      const delta = Math.max(container.clientWidth * 0.7, 220) * dir;
      container.scrollBy({{ left: delta, behavior: "smooth" }});
    }}

    if (prev) prev.addEventListener("click", function () {{ scrollByDir(-1); }});
    if (next) next.addEventListener("click", function () {{ scrollByDir(1); }});

    if (dotsHost && items.length) {{
      dotsHost.innerHTML = "";
      items.forEach(function (_, index) {{
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "carousel-dot";
        btn.setAttribute("aria-label", "Slide " + (index + 1));
        btn.addEventListener("click", function () {{
          items[index].scrollIntoView({{ behavior: "smooth", inline: "center", block: "nearest" }});
        }});
        dotsHost.appendChild(btn);
      }});

      function syncDots() {{
        const center = container.scrollLeft + container.clientWidth / 2;
        let active = 0;
        let best = Infinity;
        items.forEach(function (img, index) {{
          const mid = img.offsetLeft + img.offsetWidth / 2;
          const dist = Math.abs(mid - center);
          if (dist < best) {{
            best = dist;
            active = index;
          }}
        }});
        Array.prototype.forEach.call(dotsHost.children, function (dot, index) {{
          dot.classList.toggle("is-active", index === active);
        }});
      }}

      container.addEventListener("scroll", syncDots, {{ passive: true }});
      syncDots();
    }}
  }}

  function inject(lang) {{
    const maps = buildMaps(lang);

    document.querySelectorAll("img[data-img]").forEach(function (img) {{
      const key = img.getAttribute("data-img");
      const entry = maps.singles[key];
      if (entry && entry[lang]) {{
        attachFallback(img);
        img.src = entry[lang];
      }} else {{
        console.warn("[MOVE images] chiave singola non trovata:", key);
        attachFallback(img);
        img.src = PLACEHOLDER;
      }}
    }});

    Object.keys(maps.carousels).forEach(function (carouselId) {{
      const container = document.getElementById(carouselId);
      if (!container) return;
      const data = maps.carousels[carouselId];
      data.images.forEach(function (imgData) {{
        const src = imgData[lang];
        if (!src) return;
        const imgEl = document.createElement("img");
        imgEl.alt = imgData.alt;
        imgEl.className = data.classes;
        attachFallback(imgEl);
        imgEl.src = src;
        container.appendChild(imgEl);
      }});
      setupCarouselControls(container);
    }});
  }}

  window.MOVE_IMAGE_TABLE = IMAGE_TABLE;
  window.MOVE_CAROUSEL_CLASSES = CAROUSEL_CLASSES;
  window.MOVE_buildImageMaps = buildMaps;

  const lang = window.MOVE_LANG || "it";
  if (document.readyState === "loading") {{
    document.addEventListener("DOMContentLoaded", function () {{
      inject(lang);
    }});
  }} else {{
    inject(lang);
  }}
}})();
'''
    JS_PATH.write_text(out, encoding="utf-8")
    print(f"OK: {len(rows)} righe → {JS_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
