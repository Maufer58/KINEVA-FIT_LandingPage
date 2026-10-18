# Prospetto screenshot — dove va ogni immagine

> Documento **interno** (non linkato nella landing pubblica).  
> Cartella file: `website/assets/screenshots/`  
> Anteprima: `cd website && python -m http.server 8080` → http://localhost:8080

---

## Come leggere questo foglio

1. **Sezione landing** = blocco della pagina (es. “Prima schermata / Hero”).
2. **Anchor** = indirizzo nella pagina (es. `#watch`). Aprendo `index.html#watch` vai diretto lì.
3. **File da salvare** = nome **esatto** del PNG da mettere in `assets/screenshots/`.
4. Se un file manca, la pagina usa un **fallback** (altra immagine o mock CSS).

```
website/
  index.html          ← pagina
  assets/screenshots/ ← QUI metti tutti i PNG
  PROSPETTO_SCREENSHOT.md  ← questo file
```

---

## Mappa rapida: sezione → file

| # | Sezione nella landing | Anchor | File da inserire |
|---|----------------------|--------|------------------|
| A | **Prima schermata (Hero)** — iPhone + Watch + iPad | inizio pagina (`.hero`) | `01-home.png` · `08-watch-hero.png` · `10-ipad-hero.png` |
| B | Funzioni (clic sulle righe) | `#features` | usa gli stessi di `#screens` (01, 02, 06, 08, 09, 10) · riga **12 Checklist e promemoria** → target `12-prep-checklist.png` (oggi fallback `data-shot="02"`) |
| C | **Promo Apple Watch** — **sequenza 4 passi** | `#watch` | `08-watch-list.png` · `08-watch-start.png` · `08-watch-active.png` · `08-watch-done.png` |
| D | **Promo iPad Trainer** — **1** snapshot (+ testi step) | `#ipad` | `10-trainer-ipad.png` |
| **G** | **Studio & Gym (back-office)** | `#trainer-studio` | carosello 5: `11-studio-ipad` · `10-send-ipad` · `10-share-ipad` · `10-anagrafica-ipad` · `10-bio-ipad` |
| E | Import AI da foto | `#ai-import` | `13-ai-import.png` · `20-ai-result.png` |
| M | **Mobilità & Pilates** — due telefoni | `#mobility-pilates` | `21-mobility.png` · `21-pilates.png` (fallback: `24-mobility` / `25-pilates`; `21-pilates2` resta in `#plans` add-on) |
| Bkp | **Backup ≠ Export/Import** — flussi chi→chi (solo testo) | `#backup-export` | nessuna immagine dedicata |
| F | **Gallery “Dentro l’app”** — tab 01…10, **1** device per tab (Watch = sequenza 4) | `#screens` | `01-home.png` … `10-trainer.png` (+ Watch a/b/c/d solo sul tab 08) |
| — | Highlight / piani / download | `#highlights` `#plans` `#download` | **nessuna** cattura app |
| — | **Studio & Gym (testo + carosello)** | `#trainer-studio` | vedi riga **G** |

> **Semplificazione (ott 2026):** restano intatte **hero (trio)** e **sequenza Watch**. Nelle altre sezioni: una sola snapshot (niente thumb iPad; niente tablet duplicato in `#screens`).

---

## A · Prima schermata (Hero) — 3 immagini (intestazione)

**Dove la vedi:** subito in alto, a destra del titolo “KINEVA FIT”.  
**Cosa catturare:** tre **viste diverse della Home** (lista schede), non disclaimer / Run / altre schermate.

| Posizione sul sito | File | Cosa deve mostrare |
|--------------------|------|--------------------|
| **iPhone** (centro) | `01-home.png` | Home schede |
| **Apple Watch** (sinistra) | `08-watch-hero.png` | Lista schede o sessione al polso *(fallback: `08-watch-list.png`)* |
| **iPad** (destra) | `10-ipad-hero.png` | Studio trainer / clienti *(fallback: `10-trainer-ipad.png`)* |

**Formato:** iPhone **1080×2400** (9:20) · Watch **quadrato** (~390×390) · iPad **landscape 4:3**.

**Fallback:** telefono → `home.png` · Watch → `08-watch.png` · iPad → `10-trainer.png`.

```
[ Watch ~108px ]  —gap—  [ iPhone ~220px ]  —gap—  [ iPad ~440px ]
     sinistra                  centro                  destra
```

Layout **flex orizzontale**, testo sopra e dispositivi sotto (full width). Nessuna sovrapposizione.
Proporzioni: iPhone il più alto, iPad il più largo, Watch il più piccolo.

---

## C · Sezione Apple Watch (`#watch`)

**Dove la vedi:** blocco “Apple Watch” con 4 cornici in fila / sequenza.

| Passo in pagina | File | Contenuto da catturare |
|-----------------|------|------------------------|
| 1 · Lista | `08-watch-list.png` | Lista schede ricevute da iPhone |
| 2 · Avvio | `08-watch-start.png` | Schermata di avvio workout |
| 3 · Sessione | `08-watch-active.png` | Serie / reps / recupero in corso |
| 4 · Fine | `08-watch-done.png` | Fine sessione + sync verso iPhone |

**Formato:** PNG **quadrato** (es. 390×390 o 450×450).  
**Fallback:** `08-watch.png` oppure `watch.png`.

> Le **stesse 4** immagini compaiono anche nel tab **08 · Watch** della gallery `#screens`.

---

## D · Sezione iPad Trainer (`#ipad`)

**Dove la vedi:** blocco iPad con **una** immagine grande; i 5 step restano solo testo (nessuna thumb gallery).

| Uso in pagina | File | Contenuto da catturare |
|---------------|------|------------------------|
| Carosello 3 (`#ipad` · tavolo di lavoro) | `10-anagrafica-ipad.png` · `10-anagrafica-detail-ipad.png` · `10-bio-ipad.png` | **Quadratoni** → **dettaglio anagrafica** → **biometria** (autoplay + freccia/dot) |

**Formato:** PNG landscape ~**4:3** (es. 2048×1536 o 1600×1200).  
**Fallback:** `10-trainer-ipad.png` → `10-trainer.png` · `ipad-editor.png`.

| File `#ipad` | Cosa catturare su iPad |
|--------------|------------------------|
| `10-anagrafica-ipad.png` | Griglia clienti (tile grandi + **Apri**), area protetta PIN |
| `10-anagrafica-detail-ipad.png` | **Dettaglio anagrafica** del cliente aperto (note, limitazioni, sport, contatti) |
| `10-bio-ipad.png` | Pannello dati biometrici del cliente (peso/altezza/composizione) |

---

## G · Sezione Studio & Gym (`#trainer-studio`)

**Dove la vedi:** blocco tra iPad e Import AI — workflow 3 step + **carosello 5 snapshot iPad** (ampio) + b-roll + griglia card.

| Contenuto | Screenshot |
|-----------|------------|
| Carosello 5 snapshot iPad | `11-studio-ipad.png` · `10-send-ipad.png` · `10-share-ipad.png` · `10-anagrafica-ipad.png` · `10-bio-ipad.png` |
| Testo marketing IT/EN | griglia card + video b-roll |

**UI:** una sola cornice grande (max ~1280px, 4:3, clic per zoom).

---

## E · Import AI (`#ai-import`)

| File | Contenuto |
|------|-----------|
| `13-ai-import.png` | Flusso import scheda da foto / AI |

**Fallback:** `06-editor.png` → `01-home.png` → `home.png`.

---

## F · Gallery “Dentro l’app” (`#screens`)

**Dove la vedi:** tab numerati **01 · Home** … **10 · Trainer**.  
Un clic sul tab cambia l’immagine grande a destra.

| Tab | File principale | Cosa catturare | Note |
|-----|-----------------|----------------|------|
| 01 · Home | `01-home.png` | Home schede | Anche fallback dell’hero |
| 02 · Runner | `02-runner.png` | Sessione Run in corso | |
| 03 · Calendario | `03-calendar.png` | Calendario sessioni | |
| 04 · Progressi | `04-progress.png` (features) · **`04-analytics-ipad.png`** (`#analytics`) | Analizza dati iPad — volume, aderenza, cronologia | |
| 05 · Storico | `05-history.png` | Cronologia sessioni | |
| 06 · Editor | `06-editor.png` | Editor scheda (telefono) | |
| 07 · Impostazioni | `07-settings.png` | Settings | |
| 08 · Watch | vedi sezione **C** (4 file) | Flusso Watch | Non un solo file |
| 09 · GPS | `09-gps-map.png` | Corsa / mappa GPS | |
| 10 · Trainer | `10-trainer.png` + `10-trainer-ipad.png` | Accordion «Cosa puoi fare» #10: iPhone clienti + iPad gestione clienti | iPad: sostituire mock Stride con cattura reale |

**Formato telefono:** PNG **1080×2400** (9:20).

**Alias legacy** (opzionali, stessi contenuti):  
`home.png`, `runner.png`, `calendar.png`, `progress.png`, `history.png`, `settings.png`, `watch.png`.

---

## B · Sezione Funzioni (`#features`)

Non ha file propri. Ogni riga cliccabile apre lo **stesso shot** della gallery:

| Riga funzione | Shot usato |
|---------------|------------|
| Schede / home | `01` → `01-home.png` |
| Editor | `06` → `06-editor.png` |
| Runner | `02` → `02-runner.png` |
| GPS | `09` → `09-gps-map.png` |
| Watch | `08` → flusso Watch |
| Trainer | `10` → `10-trainer.png` / iPad |

---

## Checklist in ordine (cosa fare tu)

### Obbligatori per una landing “completa”

1. **Hero** — `01-home.png`, `08-watch-hero.png`, `10-ipad-hero.png`
2. **Gallery telefono** — `01-home.png` … `07-settings.png` + `09-gps-map.png`
3. **Watch** — 4 file `08-watch-*.png`
4. **iPad** — 5 file `10-*-ipad.png` / `06-editor-ipad.png` / `11-studio-ipad.png`
5. **AI** — `13-ai-import.png`

### Opzionale

- `10-trainer.png` (telefono) se preferisci mostrare Trainer anche in gallery senza iPad

### Dopo aver salvato i PNG

1. Mettili **solo** in `website/assets/screenshots/` con i nomi della tabella.  
2. Ricarica la pagina (hard refresh).  
3. Controlla in ordine: Hero → `#watch` → `#ipad` → `#ai-import` → `#screens`.

---

## Formati (riepilogo)

| Device | Dimensione | Esempi file |
|--------|------------|-------------|
| iPhone | ≥1125×2436 (ideale 1290×2796), PNG | `01-home*.png`, `02-runner.png`, … |
| Apple Watch | quadrato nativo (≈390×390+) | `08-watch-*.png` |
| iPad | landscape ≥2048×1536 (ideale 2732×2048) | `*-ipad.png` |

**Qualità:** preferisci Simulator a 100% o screenshot di sistema → AirDrop/USB in PNG. Non passare da WhatsApp/JPEG. Dettaglio in [`assets/screenshots/README.md`](assets/screenshots/README.md).

---

## Schema visivo della pagina

```
┌─────────────────────────────────────────┐
│  HERO (.hero)                           │
│  01-home · 08-watch-hero · 10-ipad-hero │  ← A
├─────────────────────────────────────────┤
│  #story  (solo testo)                   │
│  #features  (punta agli shot 01/02/…)   │  ← B
├─────────────────────────────────────────┤
│  #watch                                 │
│  list → start → active → done           │  ← C
├─────────────────────────────────────────┤
│  #ipad                                  │
│  clienti → editor → invio → share → gym │  ← D
├─────────────────────────────────────────┤
│  #trainer-studio  (testo, 22 card)      │  ← G
├─────────────────────────────────────────┤
│  #ai-import   → 13-ai-import.png        │  ← E
│  #highlights  (testo)                   │
├─────────────────────────────────────────┤
│  #screens   tab 01…10                   │  ← F
│  (stessi file delle tabelle sopra)      │
├─────────────────────────────────────────┤
│  #plans / #download  (niente screenshot)│
└─────────────────────────────────────────┘
```

Lingua UI per le catture: **IT** per il mercato IT; per EN usa le schede template `*_en` in app.
