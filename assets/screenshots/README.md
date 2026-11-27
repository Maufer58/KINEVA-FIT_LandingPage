# Screenshot dell'app (marketing)

**Checklist aggiornata (cosa manca / da rifare + percorsi iPhone / iPad / Watch):**  
[`../SCREENSHOT_CHECKLIST_PERCORSI.xlsx`](../SCREENSHOT_CHECKLIST_PERCORSI.xlsx)

**Foglio CSV (codice · nome pagina · percorso in app):**  
[`../SNAPSHOT_LANDING.csv`](../SNAPSHOT_LANDING.csv) — aprire in Excel/Numbers (separatore `;`).  
Excel: [`../SNAPSHOT_LANDING.xlsx`](../SNAPSHOT_LANDING.xlsx)

**Mappa sezioni landing (dove va ogni PNG):**  
[`../PROSPETTO_SCREENSHOT.md`](../PROSPETTO_SCREENSHOT.md)

**B-roll video** (demo mute per sezioni landing): vedi [`../videos/README.md`](../videos/README.md).

Metti qui i PNG con i **nomi esatti** della checklist.

| Uso | File |
|-----|------|
| Hero (iPhone + Watch + iPad) | `01-home.png` · `08-watch-hero.png` · `10-ipad-hero.png` |
| Gallery telefono `#screens` | `01-home.png` … `07-settings.png`, `09-gps-map.png`, `10-trainer.png` (1 device per tab) |
| Promemoria allenamento (nuovi) | `07-settings.png` (rifare) · `12-prep-checklist.png` · `14-summary-reminder.png` · `08-watch-done.png` (rifare) |
| Watch (`#watch` + tab 08) — sequenza 4 passi | `08-watch-list/start/active/done.png` |
| iPad (`#ipad`) — 1 snapshot | `10-trainer-ipad.png` *(non toccato in aggiornamento iPhone)* |
| Checklist / riepilogo | `12-prep-checklist.png` · `14-summary-reminder.png` |
| Extra iPhone gallery | `15-history-detail.png` · `16-gps-charts.png` · `17-exercise-editor.png` |
| AI | `13-ai-import.png` · `20-ai-result.png` |
| Nuoto | `22-swim-setup.png` · `23-swim-session.png` |
| Mobilità & Pilates (`#mobility-pilates`) | `21-mobility.png` · `21-pilates.png` (fallback: `24-mobility.png` / `25-pilates.png`; `21-pilates2.png` in add-on `#plans`; sorgente → `website/SnapShot/`) |
| Analytics (`#analytics`) | `04-analytics-ipad.png` (iPad landscape; features accordion resta su `04-progress.png`) |
| Efficienza (`#trainer-efficiency`) | `26-efficiency-iphone-it.png` · `26-efficiency-iphone-en.png` · `26-efficiency-ipad-it.png` · `26-efficiency-ipad-en.png` (pacchetto demo, filtro «Da richiamare») |
| Tabella assegnazioni (`#trainer-studio`, slot 03) | `27-assignment-matrix-ipad.png` — **slot vuoto**: iPad landscape, Gestione trainer → Assegnazioni con la legenda visibile |
| Scheda da palestra (`#trainer-studio` e funzioni) | `28-scheda-menu.png` (Home → ⋯ → Stampa) · `28-scheda-a4.png` (pagina A4 orizzontale) · `28-scheda-contatti.png` (Impostazioni → Dati Studio). Slot vuoti finché non salvi i PNG |
| Portale da scrivania (`#studio-portal`) | Modulo con codice. Il codice si copia in Impostazioni → Trainer Pro, solo l’abbonamento annuale di Piano Pro o Studio & Gym, non il mensile. Nessuno screenshot del codice |

Formati: telefono **≥1125×2436** (meglio **1290×2796** / iPhone 15 Pro) · Watch **quadrato nativo** · iPad **landscape ≥2048×1536** (meglio **2732×2048** / iPad Pro).

> **Stato (15 ott 2026):** iPhone (`01`–`06`, `09`, `10`, `13`) e Watch (`08-list/start/active/hero`) ok come contenuto, ma alcune esportazioni sono ricompresse.
> Da fare per **checklist + avviso fine scheda**: modificare `07-settings` e `08-watch-done`; aggiungere `12-prep-checklist` e `14-summary-reminder` (vedi `SNAPSHOT_LANDING.xlsx`).
> Slot **iPad** ancora **mock Stride** (~1600×1200, 30–50 KB) — da sostituire con catture **landscape reali**.

---

## Qualità: come ottenere PNG nitidi

La landing ridimensiona le immagini in CSS: se il file sorgente è già morbido / JPEG / troppo piccolo, sul sito si vede ancora peggio.

### Metodo migliore (Mac) — Simulator + PNG lossless

1. Build con dati demo: `SCREENSHOT_MODE=true` (launch VS Code **KINEVA FIT (Screenshot Mode)** o `--dart-define=SCREENSHOT_MODE=true`).
2. Apri **Simulator** alla scala **100%** (Window → Physical Size / Pixel Accurate — evita “Window → Scale 50%” per le catture).
3. Cattura automatica:

```bash
./website/scripts/capture_screenshots.sh
# iPad landscape:
IPAD_PRO=1 ./website/scripts/capture_screenshots.sh
```

oppure navigazione precisa:

```bash
flutter test integration_test/screenshot_capture_test.dart -d <device_id>
# → build/integration_test_screenshots/<device>/
```

4. Copia i PNG in questa cartella con i **nomi esatti** del prospetto. **Non** riconvertire in JPEG.

### Device fisico (iPhone / iPad)

1. Pulsanti **Volume Su + Side** (screenshot di sistema) → Photo Library.
2. Trasferisci con **AirDrop**, **USB** (Finder / Image Capture) o iCloud Drive.
3. Tieni il file **PNG** (o HEIC → PNG lossless). Target: iPhone ≥1125×2436; iPad landscape ≥2048×1536.

### Da evitare (causa tipica della “bassa qualità”)

| Evitare | Perché |
|---------|--------|
| WhatsApp / Telegram / Mail “comprimi” | riducono a JPEG ~1 MP |
| Foto dello schermo con la fotocamera | riflessi, moiré, soft |
| Ridimensionare giù e poi su | perde dettaglio |
| Salvare come `.jpg` poi rinominare `.png` | resta lossy |
| Mock UI vecchi (file iPad attuali ~30 KB) | non sono KINEVA FIT reale |

### Target pixel (prima di pubblicare)

| Device | Minimo accettabile | Ideale |
|--------|--------------------|--------|
| iPhone | 1125×2436 | 1290×2796 |
| iPad landscape | 2048×1536 | 2732×2048 |
| Apple Watch | nativo sim (~390+) | non upscalare da 200px |

Inbox grezze: `website/SnapShot/` o `_inbox/` — rinomina e sposta qui solo quando la risoluzione e il contenuto sono ok.
