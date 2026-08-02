# MOVE Landing Page

Landing statica IT/EN per MOVE Fitness PRO.

## File principali

| File | Ruolo |
|------|--------|
| `index_it.html` | Landing italiana |
| `index_en.html` | Landing inglese |
| `images.csv` | **Tabella unica** delle immagini (Excel/Numbers) |
| `js/images.js` | Tabella + motore `data-img` / caroselli / dots |
| `js/ui.js` | Menu mobile + FAQ accordion |
| `catalogo-immagini.html` | Anteprima tabellare con check IT/EN |
| `img/it`, `img/en` | Screenshot localizzati |

## Come cambiare un’immagine

1. Copia il file in `img/it/` e/o `img/en/` (nome **esatto**, case-sensitive).
2. Aggiorna `images.csv`: colonne `file_it` / `file_en`, `status` (`OK` | `DA_PRODURRE`), `cosa_scattare`.
3. Rigenera:

```bash
python3 scripts/sync_images_from_csv.py
```

4. Controlla `catalogo-immagini.html`.

La colonna **cosa_scattare** descrive cosa deve mostrare lo screenshot (anche per i file già presenti).

## Anteprima locale

```bash
cd /Users/mauroferrari/Documents/MOVELandingPage
python3 -m http.server 8765
```

- http://127.0.0.1:8765/index_it.html
- http://127.0.0.1:8765/index_en.html
- http://127.0.0.1:8765/catalogo-immagini.html

## Store links

Finché l’app non è online, i pulsanti restano “presto”. Quando hai gli URL, sostituisci gli span `.store-disabled` in `#download` con `<a href="...">` reali.

## Screenshot da produrre

Le righe con `TODO_*.png` in `images.csv` sono slot già collegati alla landing.
Finché il file non esiste, compare `img/placeholder.svg`.

Workflow:
1. Scatta IT (e EN se diverso) con il nome esatto della colonna `file_it` / `file_en`
2. Salva in `img/it/` e `img/en/`
3. Ricarica `catalogo-immagini.html` → deve diventare ✓
4. (Opzionale) aggiorna la nota in CSV togliendo il prefisso `TODO PRODUCI`
