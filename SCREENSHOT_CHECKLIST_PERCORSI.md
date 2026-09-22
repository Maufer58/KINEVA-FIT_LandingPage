# Screenshot landing — da creare / rifare

> Documento **interno** (non in landing pubblica).  
> Cartella file: `website/assets/screenshots/`  
> Anteprima: `cd website && python -m http.server 8080` → http://localhost:8080  
> Percorsi menu completi: [`../docs/guida_operativa_percorsi.md`](../docs/guida_operativa_percorsi.md)

**Aggiornato:** 22 settembre 2026 — verifica file reali (hash MD5 + ispezione visiva).

---

## Verifica: cosa c’è davvero oggi

L’affermazione «molte immagini sembrano placeholder e non corrispondono all’app» è **vera**.

| Situazione | File coinvolti |
|---|---|
| Stesso PNG ripetuto = **Disclaimer** (brand vecchio M.O.V.E., non Home/Calendario) | `01-home.png` = `03-calendar.png` (+ alias `home.png`, `calendar.png`, `01-home-a/b/c.png`) |
| Stesso PNG ripetuto = **«ACCESSO NEGATO»** (non Runner/Editor) | `02-runner.png` = `06-editor.png` (+ `runner.png`, `ipad-editor.png`) |
| Stesso PNG ripetuto = **«ACCESSO NEGATO»** (non Progressi/Storico/Impostazioni) | `04-progress.png` = `05-history.png` = `07-settings.png` (+ alias) |
| Mock UI **Stride** (orario 9:41, non cattura Fit+ live) | `08-watch-list/start/active/done.png` |
| Mock UI **Stride** (Cliente 1…6, Blocco 1…6) | `10-trainer-ipad.png`, `06-editor-ipad.png`, `10-send-ipad.png`, `10-share-ipad.png`, `11-studio-ipad.png` |
| **File assenti** (la landing usa fallback o mock CSS) | `08-watch-hero.png`, `09-gps-map.png`, `10-ipad-hero.png`, `10-trainer.png`, `13-ai-import.png` |

**Nessuno** degli slot marketing iPhone 01–07 mostra oggi la schermata prevista. Watch e iPad sono mock, non screenshot reali Fit+.

---

## Come usare questa tabella

| Colonna | Significato |
|---|---|
| **ID** | Numero tab / slot in landing (`#screens` 01…10, oppure Hero / Watch / iPad / AI) |
| **File** | Nome **esatto** del PNG da salvare in `website/assets/screenshots/` |
| **Device** | Dove catturare |
| **Percorso in app** | Dove andare in Fit+ (etichette IT) |
| **Stato** | ❌ da creare o rifare · ✅ ok reale (oggi: nessuno ✅) |

Formati consigliati: iPhone **1080×2400** · Watch **~390×390** (quadrato) · iPad **landscape ~4:3** (es. 2048×1536).  
Lingua UI: **IT**. Brand in schermata: **Fit+** (non M.O.V.E. / Stride).

---

## Priorità

1. **iPhone 01–07** (gallery `#screens` + hero telefono) — oggi tutti sbagliati  
2. **09 GPS** — obbligatorio (nessun buon fallback)  
3. **Watch 08a–08d + hero Watch**  
4. **iPad 10/06/11 + hero iPad**  
5. **13 AI** · **10 Trainer iPhone** (opzionale)

---

## iPhone

| ID | File | Landing | Device | Cosa deve mostrare | Percorso in app | Stato |
|---|---|---|---|---|---|---|
| **01** | `01-home.png` | Hero (centro) · `#screens` tab 01 · `#features` | iPhone | Home con lista schede | Accetta disclaimer → completa onboarding → tab **Home** | ❌ rifare (ora: Disclaimer) |
| **02** | `02-runner.png` | `#screens` tab 02 · `#features` | iPhone | Runner in sessione | **Home** → ▶ sulla scheda → Runner in corso | ❌ rifare (ora: Accesso negato) |
| **03** | `03-calendar.png` | `#screens` tab 03 | iPhone | Calendario con giorno programmato | Tab **Calendario** → giorno con PROGRAMMA | ❌ rifare (ora: = Disclaimer 01) |
| **04** | `04-progress.png` | Blocco highlight · `#screens` tab 04 | iPhone | Grafici / analytics | Tab **Dati** → **Allenamento** | ❌ rifare (ora: Accesso negato) |
| **05** | `05-history.png` | `#screens` tab 05 | iPhone | Lista sessioni storiche | Tab **Storico** | ❌ rifare (ora: Accesso negato) |
| **06** | `06-editor.png` | `#screens` tab 06 · `#features` | iPhone | Editor scheda | **Home** → ⋯ sulla scheda → **Modifica** | ❌ rifare (ora: Accesso negato = 02) |
| **07** | `07-settings.png` | `#screens` tab 07 | iPhone | Impostazioni base | Tab **Altro** → **Base** | ❌ rifare (ora: Accesso negato) |
| **09** | `09-gps-map.png` | `#screens` tab 09 · `#features` GPS | iPhone | Corsa con mappa GPS | Runner con **GPS ON** → completa → **Storico** → tap sessione GPS → mappa *(Athlete Pro+)* | ❌ mancante |
| **10** | `10-trainer.png` | `#screens` tab 10 | iPhone | Area clienti / trainer su telefono | **Home** → ☰ → **Anagrafica clienti** *(Piano Pro+)* | ⚪ opzionale / mancante |
| **13** | `13-ai-import.png` | `#ai-import` | iPhone | Import scheda da foto / AI | **Home** → **Nuova Routine** → **Importa Scheda da Foto** (o Genera con AI) | ❌ mancante (fallback: `06-editor.png`) |

Cattura automatica simulatore (dopo aver accettato disclaimer in sessione demo):  
`SCREENSHOT_LOCALE=it ./website/scripts/capture_screenshots.sh` — poi **controllare** che i PNG non siano più disclaimer/accesso negato.

---

## Apple Watch

**Prerequisito:** Athlete Pro+ · scheda inviata con **Home → ⋯ → Invia ad Apple Watch** · apri app **Fit+** sul Watch.

| ID | File | Landing | Device | Cosa deve mostrare | Percorso sul Watch | Stato |
|---|---|---|---|---|---|---|
| **08a** | `08-watch-list.png` | `#watch` passo 1 · `#screens` tab 08 | Apple Watch | Lista schede ricevute | Fit+ → lista **Schede** | ❌ rifare (ora: mock Stride) |
| **08b** | `08-watch-start.png` | `#watch` passo 2 · `#screens` 08 | Apple Watch | Schermata avvio | Tap scheda → **APRI** → **INIZIA** | ❌ rifare (mock) |
| **08c** | `08-watch-active.png` | `#watch` passo 3 · `#screens` 08 | Apple Watch | Serie / reps / recupero | **INIZIA** → sessione attiva | ❌ rifare (mock) |
| **08d** | `08-watch-done.png` | `#watch` passo 4 · `#screens` 08 | Apple Watch | Fine + sync | Completa sessione → riepilogo | ❌ rifare (mock) |
| **08-hero** | `08-watch-hero.png` | Hero (sinistra) | Apple Watch | Lista o sessione al polso | Come 08a o 08c | ❌ mancante (fallback: `08-watch-list.png`) |

---

## iPad

**Prerequisito:** Piano Pro / Studio & Gym · layout landscape.

| ID | File | Landing | Device | Cosa deve mostrare | Percorso su iPad | Stato |
|---|---|---|---|---|---|---|
| **10a** | `10-trainer-ipad.png` | `#ipad` passo 1 · fallback hero | iPad | Anagrafica clienti reali | **Home** → ☰ → **Anagrafica clienti** | ❌ rifare (ora: mock Cliente 1…6) |
| **06-ipad** | `06-editor-ipad.png` | `#ipad` passo 2 | iPad | Editor con esercizi reali | **Home** → ⋯ → **Modifica** | ❌ rifare (ora: mock Blocco 1…6) |
| **10b** | `10-send-ipad.png` | `#ipad` passo 3 | iPad | Assegna scheda al cliente | **Altro** → **Trainer Pro** → **Strumenti studio** → **Assegna Schede Master** | ❌ rifare (mock) |
| **10c** | `10-share-ipad.png` | `#ipad` passo 4 | iPad | Export HD / PDF / share | **Home** → ⋯ → **Condividi / Esporta** | ❌ rifare (mock) |
| **11** | `11-studio-ipad.png` | `#ipad` passo 5 · `#trainer-studio` | iPad | Studio: branding / admin | **Altro** → **Trainer Pro** → **Strumenti studio** → **Admin** | ❌ rifare (mock) |
| **10-hero** | `10-ipad-hero.png` | Hero (destra) | iPad | Studio / clienti | Come 10a o 11 | ❌ mancante (fallback: `10-trainer-ipad.png`) |

---

## Conteggio rapido

| | N. |
|---|---|
| Slot marketing previsti | **22** file con nome dedicato |
| Da rifare (file presente ma contenuto sbagliato / mock) | **16** |
| Mancanti | **5** (`08-watch-hero`, `09-gps-map`, `10-ipad-hero`, `10-trainer`, `13-ai-import`) |
| Ok come screenshot reale Fit+ | **0** |

---

## Dopo ogni nuova cattura

1. Salva il PNG **solo** in `website/assets/screenshots/` con il nome della colonna **File**.  
2. Controlla che non sia Disclaimer / Accesso negato / mock Stride.  
3. Hard refresh della landing: Hero → `#watch` → `#ipad` → `#ai-import` → `#screens` (tab 01…10).  
4. Aggiorna la colonna **Stato** in questo file (❌ → ✅).

Legenda gesti: `☰` drawer · `⋯` menu contestuale · `▶` avvia Runner — vedi guida operativa.
