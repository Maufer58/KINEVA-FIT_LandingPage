# B-roll dimostrativi (landing)

Clip mute H.264 (`1280` wide, `+faststart`) per le sezioni marketing.
Registrazioni da app Linux desktop (UI italiana); **non** sostituiscono gli
screenshot iPhone/Watch/iPad in `assets/screenshots/`.

| File | Sezione landing / tab `#screens` |
|------|----------------------------------|
| `broll-home.mp4` | `#screens` → Home |
| `broll-runner.mp4` | `#screens` → Runner |
| `broll-calendar.mp4` | `#screens` → Calendario |
| `broll-analytics.mp4` | `#analytics` + `#screens` → Progressi |
| `broll-settings.mp4` | `#screens` → Impostazioni |
| `broll-trainer.mp4` | `#trainer-studio` + `#screens` → Trainer |

Watch, GPS, AI e layout iPad restano sugli screenshot nativi (non ripresi qui).

Rigenerare (Cloud Agent / Mac con ffmpeg):

```bash
# da raw 1920×1200 → web
ffmpeg -y -ss 1 -t 14 -i raw.mp4 \
  -vf "scale=1280:-2:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset medium -crf 26 -an -movflags +faststart \
  website/assets/videos/broll-….mp4
```
