# Stride — Sito di presentazione

Landing page statica per presentare l'app **Stride** (corsa, palestra e allenamento Apple Watch) su **Android**, **iPhone**, **iPad** e **Apple Watch**.

Documenti legali in `website/legal/` (Privacy / EULA v2.3 — sync su repo pubblico **`Stride_Policy`** per Pages).

Landing pubblica: repo **`Maufer58/Stride_LandingPage`** (sorgente tipicamente questa cartella `website/` dell’app **`Stride`**).

## Anteprima locale

Apri un terminale nella cartella `website` e avvia un server statico:

```powershell
cd website
python -m http.server 8080
```

Poi apri: http://localhost:8080

Oppure con Node:

```bash
npx serve .
```

## Screenshot reali

### Prospetto screenshot (uso interno)

**Guida chiara sezione → file:** [`PROSPETTO_SCREENSHOT.md`](PROSPETTO_SCREENSHOT.md)  
(Alias EN: [`SCREENSHOT_PROSPECTUS.md`](SCREENSHOT_PROSPECTUS.md) → stesso contenuto IT.)

Il catalogo **non** è pubblicato come pagina HTML. Ogni riga del prospetto indica:

- **dove** compare nella landing (Hero, `#watch`, `#ipad`, `#screens`, …)
- **nome file esatto** da salvare in `assets/screenshots/`

| Priorità | Dove | File |
|----------|------|------|
| 1 | Hero (3 telefoni) | `01-home-a/b/c.png` |
| 2 | Gallery `#screens` | `01-home.png` … `10-trainer.png` |
| 3 | Promo `#watch` | `08-watch-list/start/active/done.png` |
| 4 | Promo `#ipad` | 5× `*-ipad.png` |
| 5 | **Studio & Gym** `#trainer-studio` | solo testo (nessuno screenshot dedicato) |
| 6 | `#ai-import` | `13-ai-import.png` |

Dettaglio cattura e formati: nel prospetto e in [`assets/screenshots/README.md`](assets/screenshots/README.md).

### Cattura automatica (consigliata)

**Windows — Android emulator (adb, consigliato):**

```powershell
cd C:\Users\maufe\Documents\Stride
powershell -ExecutionPolicy Bypass -File website\scripts\capture_screenshots.ps1
```

**macOS — iOS Simulator / Android:**

```bash
chmod +x website/scripts/capture_screenshots.sh
./website/scripts/capture_screenshots.sh
```

**Windows/Mac — test Flutter (navigazione precisa, se funziona sul device):**

```bash
flutter test integration_test/screenshot_capture_test.dart -d <device_id>
# PNG in build/integration_test_screenshots/<device>/
```

Gli script scrivono i file **numerati** e gli alias legacy (`home.png`, …).

Su Mac, con simulatore Watch accoppiato, cattura le 4 viste:
`08-watch-list.png`, `08-watch-start.png`, `08-watch-active.png`, `08-watch-done.png`
(fallback legacy: `08-watch.png`).

### Manuale

Salva le catture in `website/assets/screenshots/` con i nomi del prospetto.  
Formato consigliato: **PNG**, rapporto ~9:19.5 per iPhone.

Se il file esiste, il sito lo mostra automaticamente (fallback legacy se manca il numerato).

## Pubblicazione su GitHub Pages

**Consigliato (Mac):** dalla root del progetto Stride:

```bash
./tool/sync_public_sites.sh                 # Policy + landing
./tool/sync_public_sites.sh --landing-only
```

1. In alternativa, sincronizzare questa cartella `website/` sul repo **`Maufer58/Stride_LandingPage`** (o pubblicare da lì).
2. Nel repository landing: **Settings → Pages**
3. Source: **GitHub Actions** (o branch `main` / root, a seconda della config)
4. Documenti legali pubblici: deploy da `website/legal/` / `docs/legal/` → repo **`Stride_Policy`** (`./tool/sync_public_sites.sh --policy-only`); l’app punta a `lib/constants/legal_urls.dart`

In alternativa puoi pubblicare la cartella `website` su Netlify, Vercel o qualsiasi hosting statico.

## Personalizzazione

| File | Contenuto |
|------|-----------|
| `index.html` | Struttura e sezioni |
| `css/style.css` | Stile dark theme Stride |
| `js/i18n.js` | Traduzioni IT / EN |
| `js/main.js` | Tab schermate, menu mobile, animazioni |

### Link store

Quando l'app sarà online, aggiorna in `index.html` la sezione `#download`:

- Rimuovi la classe `disabled` dai pulsanti store
- Imposta gli `href` reali di Google Play e App Store

Checklist pubblicazione iOS: [`../docs/APP_STORE_CHECKLIST.md`](../docs/APP_STORE_CHECKLIST.md) (publisher: Mauro Ferrari)

### Email contatto

Contatto: `maufer1@gmail.com` (allineato a Privacy/EULA).

## Struttura

- Hero con anteprima telefono (3 viste Home)
- Piattaforme supportate
- Funzionalità principali (6 righe + link Studio)
- Promo **Apple Watch** (`#watch`)
- Promo **iPad Trainer** (`#ipad`)
- **Studio & Gym** (`#trainer-studio`) — back-office palestra: batch schede, WhatsApp/PDF/JSON, database, patologie, backup, clienti (15 card + workflow 3 step)
- Import AI (`#ai-import`)
- Highlights aggiuntivi (`#highlights`) — enciclopedia PDF, batch clienti
- Showcase interattivo a tab (Home → Trainer) con file numerati
- Piani allineati al **paywall in-app** (toggle annuale/mensile, card Athlete / Piano Pro / Studio — bullet f9–f12 Pro, f9–f11 Studio)
- Prospetto screenshot interno: `PROSPETTO_SCREENSHOT.md` (non pubblicato in pagina)
- Prezzi annuali in evidenza (−17%, pagamento unico) + opzione mensile in paywall in-app
- Call-to-action download
