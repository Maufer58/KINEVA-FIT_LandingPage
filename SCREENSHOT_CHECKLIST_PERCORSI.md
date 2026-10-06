# Screenshot landing — da creare / rifare

> Documento **interno** (non in landing pubblica).  
> Cartella file: `website/assets/screenshots/`  
> Anteprima: `cd website && python -m http.server 8080` → http://localhost:8080  
> Percorsi menu completi: [`../docs/guida_operativa_percorsi.md`](../docs/guida_operativa_percorsi.md)

**Aggiornato:** 6 ottobre 2026 — mappatura da `website/SnapShot/` + `_inbox/` (commit WIP + rename).

---

## Verifica: cosa c’è davvero oggi

| Situazione | File coinvolti |
|---|---|
| ✅ Screenshot **KINEVA FIT** reali (iPhone) | `01-home` … `07-settings`, `09-gps-map`, `10-trainer`, `13-ai-import` (+ alias legacy) |
| ✅ Screenshot **Apple Watch** reali | `08-watch-list/start/active/done.png`, `08-watch-hero.png` |
| Mock UI **Stride** (ancora da sostituire) | `10-trainer-ipad.png`, `06-editor-ipad.png`, `10-send-ipad.png`, `10-share-ipad.png`, `11-studio-ipad.png` |
| **File assente** | `10-ipad-hero.png` |

Nell’upload **non** c’erano catture iPad landscape: tutti i file in `SnapShot/` e `_inbox/` sono portrait (iPhone) o Watch.

---

## Come usare questa tabella

| Colonna | Significato |
|---|---|
| **ID** | Numero tab / slot in landing (`#screens` 01…10, oppure Hero / Watch / iPad / AI) |
| **File** | Nome **esatto** del PNG da salvare in `website/assets/screenshots/` |
| **Device** | Dove catturare |
| **Percorso in app** | Dove andare in KINEVA FIT (etichette IT) |
| **Stato** | ❌ da creare o rifare · ✅ ok reale |

Formati consigliati: iPhone **1080×2400** · Watch **~390×390** (quadrato) · iPad **landscape ~4:3** (es. 2048×1536).  
Lingua UI: **IT**. Brand in schermata: **KINEVA FIT**.

---

## Priorità

1. **iPad 10a / 06-ipad / 10b / 10c / 11 + hero iPad** — unico blocco ancora mock / mancante  
2. (fatto) iPhone 01–07 · 09 GPS · 10 Trainer · 13 AI · Watch 08a–08d + hero

---

## iPhone

| ID | File | Landing | Device | Cosa deve mostrare | Percorso in app | Stato |
|---|---|---|---|---|---|---|
| **01** | `01-home.png` | Hero (centro) · `#screens` tab 01 · `#features` | iPhone | Home con lista schede | Accetta disclaimer → completa onboarding → tab **Home** | ✅ |
| **02** | `02-runner.png` | `#screens` tab 02 · `#features` | iPhone | Runner in sessione | **Home** → ▶ sulla scheda → Runner in corso | ✅ |
| **03** | `03-calendar.png` | `#screens` tab 03 | iPhone | Calendario con giorno programmato | Tab **Calendario** → giorno con PROGRAMMA | ✅ |
| **04** | `04-progress.png` | Blocco highlight · `#screens` tab 04 | iPhone | Grafici / analytics | Tab **Dati** → **Allenamento** | ✅ |
| **05** | `05-history.png` | `#screens` tab 05 | iPhone | Lista sessioni storiche | Tab **Storico** | ✅ |
| **06** | `06-editor.png` | `#screens` tab 06 · `#features` | iPhone | Editor scheda | **Home** → ⋯ sulla scheda → **Modifica** | ✅ |
| **07** | `07-settings.png` | `#screens` tab 07 | iPhone | Impostazioni base | Tab **Altro** → **Base** | ✅ |
| **09** | `09-gps-map.png` | `#screens` tab 09 · `#features` GPS | iPhone | Corsa con mappa GPS | Runner con **GPS ON** → completa → **Storico** → tap sessione GPS → mappa *(Athlete Pro+)* | ✅ |
| **10** | `10-trainer.png` | `#screens` tab 10 | iPhone | Area clienti / trainer su telefono | **Home** → ☰ → **Anagrafica clienti** *(Piano Pro+)* | ✅ |
| **13** | `13-ai-import.png` | `#ai-import` | iPhone | Import scheda da foto / AI | **Home** → **Nuova Routine** → **Importa Scheda da Foto** (o Genera con AI) | ✅ |

---

## Apple Watch

**Prerequisito:** Athlete Pro+ · scheda inviata con **Home → ⋯ → Invia ad Apple Watch** · apri app **KINEVA FIT** sul Watch.

| ID | File | Landing | Device | Cosa deve mostrare | Percorso sul Watch | Stato |
|---|---|---|---|---|---|---|
| **08a** | `08-watch-list.png` | `#watch` passo 1 · `#screens` tab 08 | Apple Watch | Lista schede ricevute | KINEVA FIT → lista **Schede** | ✅ |
| **08b** | `08-watch-start.png` | `#watch` passo 2 · `#screens` 08 | Apple Watch | Schermata avvio | Tap scheda → **APRI** → **INIZIA** | ✅ |
| **08c** | `08-watch-active.png` | `#watch` passo 3 · `#screens` 08 | Apple Watch | Serie / reps / recupero | **INIZIA** → sessione attiva | ✅ |
| **08d** | `08-watch-done.png` | `#watch` passo 4 · `#screens` 08 | Apple Watch | Fine + sync | Completa sessione → riepilogo | ✅ |
| **08-hero** | `08-watch-hero.png` | Hero (sinistra) | Apple Watch | Lista o sessione al polso | Come 08a o 08c | ✅ |

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

**Come caricarli (stesso flusso di prima):**

```bash
mkdir -p website/assets/screenshots/_inbox
# copia i 6 PNG landscape iPad in _inbox con nomi parlanti, poi:
git add website/assets/screenshots/_inbox
git commit -m "wip: screenshot iPad landing da rinominare"
git push origin main
```

Nomi target dopo rename: `10-trainer-ipad.png`, `06-editor-ipad.png`, `10-send-ipad.png`, `10-share-ipad.png`, `11-studio-ipad.png`, `10-ipad-hero.png`.

---

## Conteggio rapido

| | N. |
|---|---|
| Slot marketing previsti | **22** file con nome dedicato |
| Ok come screenshot reale KINEVA FIT | **16** (iPhone + Watch) |
| Da rifare (mock iPad) | **5** |
| Mancanti | **1** (`10-ipad-hero`) |

---

## Dopo ogni nuova cattura

1. Salva il PNG **solo** in `website/assets/screenshots/` con il nome della colonna **File**.  
2. Controlla che non sia Disclaimer / Accesso negato / mock Stride.  
3. Hard refresh della landing: Hero → `#watch` → `#ipad` → `#ai-import` → `#screens` (tab 01…10).  
4. Aggiorna la colonna **Stato** in questo file (❌ → ✅).
