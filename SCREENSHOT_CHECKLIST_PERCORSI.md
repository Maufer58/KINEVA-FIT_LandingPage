# Screenshot landing — checklist unica + percorsi menu

> Documento **interno** (non linkato nella landing pubblica).
> Cartella file: `website/assets/screenshots/` · Anteprima: `cd website && python -m http.server 8080` → http://localhost:8080
> Riferimenti: dove va ogni file → [`PROSPETTO_SCREENSHOT.md`](PROSPETTO_SCREENSHOT.md) · percorsi completi → [`../docs/guida_operativa_percorsi.md`](../docs/guida_operativa_percorsi.md)

Questo file mette **in un colpo solo**: cosa è già presente, cosa manca, e il **percorso da fare nell'app** (iPhone / iPad / Apple Watch) per catturare ogni immagine.

**Stato:** ✅ presente · ❌ da fare · ⚪ opzionale
**Aggiornato:** 20 settembre 2026 (verificato sul contenuto di `website/assets/screenshots/`).

---

## Riepilogo: cosa manca (in ordine di priorità)

| Priorità | File | Device | Perché |
|---|---|---|---|
| 🔴 Obbligatorio | `09-gps-map.png` | iPhone | Nessun fallback: la gallery `#screens` tab 09 mostra un mock finché non c'è |
| 🟠 Consigliato | `13-ai-import.png` | iPhone | Sezione `#ai-import` (ora usa fallback `06-editor.png`) |
| 🟠 Consigliato | `08-watch-hero.png` | Apple Watch | Hero, device sinistro (ora usa fallback `08-watch-list.png`) |
| 🟠 Consigliato | `10-ipad-hero.png` | iPad | Hero, device destro (ora usa fallback `10-trainer-ipad.png`) |
| ⚪ Opzionale | `10-trainer.png` | iPhone | Trainer su telefono; serve solo se non vuoi mostrare solo l'iPad |

Tutto il resto è già presente. I file `01`–`07` si possono rigenerare in automatico su simulatore iOS con `website/scripts/capture_screenshots.sh`; GPS, AI, Watch e iPad vanno fatti a mano seguendo i percorsi qui sotto.

---

## iPhone (formato consigliato: 1080×2400 · 9:20)

| File | Landing (anchor) | Stato | Cosa mostrare | Percorso menu nell'app |
|---|---|---|---|---|
| `01-home.png` | Hero + `#screens` 01 + `#features` | ✅ | Home con lista schede | `Home` (tab in basso) |
| `02-runner.png` | `#screens` 02 + `#features` | ✅ | Sessione Runner in corso | `Home → ▶ sulla scheda` → Runner |
| `03-calendar.png` | `#screens` 03 | ✅ | Calendario sessioni | `Calendario` (tab) → giorno con PROGRAMMA |
| `04-progress.png` | Hero-blocco + `#screens` 04 | ✅ | Grafici / analytics | `Dati` (tab) → **Allenamento** |
| `05-history.png` | `#screens` 05 | ✅ | Cronologia sessioni | `Storico` (tab) → Filtri → lista |
| `06-editor.png` | `#screens` 06 + `#features` | ✅ | Editor scheda (telefono) | `Home → ⋯ sulla scheda → Modifica` (o `Home → Nuova Routine → Crea Scheda Manuale`) |
| `07-settings.png` | `#screens` 07 | ✅ | Impostazioni | `Altro` (tab) → **Base** |
| `09-gps-map.png` | `#screens` 09 + `#features` GPS | ❌ | Corsa con mappa GPS | `Storico → tap card sessione con GPS → mappa percorso` *(serve Athlete Pro+ e Runner con **GPS ON**)* |
| `13-ai-import.png` | `#ai-import` | ❌ | Import scheda da foto / AI | `Home → Nuova Routine → Importa Scheda da Foto` (o `Genera con AI`) |
| `10-trainer.png` | `#screens` 10 | ⚪ | Area Trainer su telefono | `Home → ☰ → Anagrafica clienti` (o `Altro → Trainer Pro → Strumenti studio`) |

---

## Apple Watch (formato consigliato: quadrato ~390×390)

**Prerequisito:** piano **Athlete Pro+** e scheda inviata al polso con `Home → ⋯ → Invia ad Apple Watch` (o `Home → Gestione → seleziona → ⌚`). Poi tutto si cattura **sul Watch** aprendo l'app **Fit+**.

| File | Landing (anchor) | Stato | Cosa mostrare | Percorso sul Watch |
|---|---|---|---|---|
| `08-watch-list.png` | `#watch` 1 + `#screens` 08 | ✅ | Lista schede ricevute | Apri **Fit+** → lista schede |
| `08-watch-start.png` | `#watch` 2 + `#screens` 08 | ✅ | Schermata di avvio | Fit+ → tap scheda → **APRI** → schermata **INIZIA** |
| `08-watch-active.png` | `#watch` 3 + `#screens` 08 | ✅ | Serie/reps/recupero in corso | **INIZIA** → **AVANTI** (sessione attiva) |
| `08-watch-done.png` | `#watch` 4 + `#screens` 08 | ✅ | Fine sessione + sync a iPhone | Completa gli esercizi → schermata riepilogo/fine |
| `08-watch-hero.png` | Hero (sinistra) | ❌ | Lista schede o sessione al polso | Come `08-watch-list` / `08-watch-active` |

---

## iPad (formato consigliato: landscape ~4:3 · es. 2048×1536)

**Prerequisito:** **Piano Pro** o **Studio & Gym** (per Studio/branding serve Studio & Gym).

| File | Landing (anchor) | Stato | Cosa mostrare | Percorso menu su iPad |
|---|---|---|---|---|
| `10-trainer-ipad.png` | Hero (destra) + `#ipad` 1 | ✅ | Lista/profili clienti, area PIN | `Home → ☰ Drawer → Anagrafica clienti` |
| `06-editor-ipad.png` | `#ipad` 2 | ✅ | Editor scheda / tecniche | `Home → ⋯ sulla scheda → Modifica` → Editor |
| `10-send-ipad.png` | `#ipad` 3 | ✅ | Assegnazione/invio scheda al cliente | `Altro → Trainer Pro → Strumenti studio → Assegna Schede Master` |
| `10-share-ipad.png` | `#ipad` 4 | ✅ | Export HD / PDF / WhatsApp | `Home → ⋯ sulla scheda → Condividi / Esporta → Esporta Programma` (Immagine HD / PDF) |
| `11-studio-ipad.png` | `#ipad` 5 + `#trainer-studio` | ✅ | Studio: clienti, branding, mobilità | `Altro → Trainer Pro → Strumenti studio → Admin` (Branding / Database / Prot. Mobilità) |
| `10-ipad-hero.png` | Hero (destra) | ❌ | Studio trainer / clienti | Come `10-trainer-ipad` / `11-studio-ipad` |

---

## Note operative

- **Nomi esatti:** salva i PNG **solo** in `website/assets/screenshots/` con i nomi della prima colonna.
- **Fallback (già in `index.html`):** se non carichi gli hero/AI dedicati la pagina resta piena usando le immagini esistenti — hero Watch → `08-watch-list.png`, hero iPad → `10-trainer-ipad.png`, AI → `06-editor.png`. **Solo `09-gps-map.png` non ha ripiego.**
- **Lingua UI:** IT per il mercato IT; per EN usa le schede template `*_en` in app (o `SCREENSHOT_LOCALE=en` nello script di cattura).
- **Cattura automatica (01–07):** `SCREENSHOT_LOCALE=it ./website/scripts/capture_screenshots.sh` (simulatore iOS, macOS).
- **Dopo aver salvato i PNG:** hard refresh e controlla in ordine Hero → `#watch` → `#ipad` → `#ai-import` → `#screens`.
- **Legenda gesti** (`☰` drawer, `⋯` menu contestuale, `▶` avvia Runner): vedi [`../docs/guida_operativa_percorsi.md`](../docs/guida_operativa_percorsi.md) (Reference guide).
