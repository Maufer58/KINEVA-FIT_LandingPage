#!/usr/bin/env bash
# Captures Stride screenshots on macOS (iOS simulator / Android emulator).
# Apple Watch: run after pairing watch simulator (see README).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT_DIR="$ROOT/website/assets/screenshots"
EMULATOR_ID="${EMULATOR_ID:-}"
DEVICE_ID="${DEVICE_ID:-}"

cd "$ROOT"
mkdir -p "$OUT_DIR"

echo "==> Stride screenshot capture"
echo "    Project: $ROOT"

wait_for_device() {
  local timeout="${1:-180}"
  local elapsed=0
  while [ "$elapsed" -lt "$timeout" ]; do
    if adb devices 2>/dev/null | grep -q 'device$'; then
      adb devices | awk '/device$/{print $1; exit}'
      return 0
    fi
    sleep 3
    elapsed=$((elapsed + 3))
  done
  return 1
}

if [ -n "$DEVICE_ID" ]; then
  TARGET="$DEVICE_ID"
elif xcrun simctl list devices booted 2>/dev/null | grep -q Booted; then
  TARGET="$(flutter devices 2>/dev/null | awk '/ios/{print $1; exit}')"
  [ -n "$TARGET" ] || TARGET="ios"
elif adb devices | grep -q 'device$'; then
  TARGET="$(wait_for_device 5)"
else
  if [ -n "$EMULATOR_ID" ]; then
    flutter emulators --launch "$EMULATOR_ID"
  else
    flutter emulators --launch Pixel_6a 2>/dev/null || open -a Simulator
  fi
  if adb devices | grep -q 'device$'; then
    TARGET="$(wait_for_device 180)"
  else
    TARGET="$(flutter devices | awk '/ios|iPhone/{print $1; exit}')"
  fi
fi

echo "==> Using device: $TARGET"

LOCALE="${SCREENSHOT_LOCALE:-it}"

flutter pub get

capture_for_locale() {
  local locale="$1"
  echo ""
  echo "==> Capturing locale: $locale"
  flutter test integration_test/screenshot_capture_test.dart \
    -d "$TARGET" \
    --reporter expanded \
    --dart-define=SCREENSHOT_LOCALE="$locale"
}

if [ "${SCREENSHOT_BOTH_LOCALES:-0}" = "1" ]; then
  capture_for_locale it
  capture_for_locale en
else
  capture_for_locale "$LOCALE"
fi

SHOT_ROOT="$ROOT/build/integration_test_screenshots"
DEVICE_FOLDER="$(find "$SHOT_ROOT" -mindepth 1 -maxdepth 1 -type d | head -1)"
[ -n "$DEVICE_FOLDER" ] || { echo "No screenshots folder"; exit 1; }

copy_if() {
  local dest_name="$1"
  shift
  local src=""
  for name in "$@"; do
    src="$(find "$DEVICE_FOLDER" -maxdepth 1 -name "${name}*.png" | head -1)"
    [ -n "$src" ] && break
  done
  if [ -n "$src" ]; then
    cp "$src" "$OUT_DIR/$dest_name"
    echo "    OK $dest_name <- $(basename "$src")"
  else
    echo "    SKIP $dest_name"
  fi
}

copy_locale_set() {
  local prefix="$1"
  local locale="$2"
  echo "==> Copying $locale from $DEVICE_FOLDER"
  copy_if "${prefix}01-home.png" "${locale}_home" home
  copy_if "${prefix}02-runner.png" "${locale}_runner" runner
  copy_if "${prefix}03-calendar.png" "${locale}_calendar" calendar
  copy_if "${prefix}04-progress.png" "${locale}_progress" progress
  copy_if "${prefix}05-history.png" "${locale}_history" history
  copy_if "${prefix}06-editor.png" "${locale}_editor" editor
  copy_if "${prefix}07-settings.png" "${locale}_settings" settings
}

if [ "${SCREENSHOT_BOTH_LOCALES:-0}" = "1" ]; then
  copy_locale_set "" it
  copy_locale_set "en-" en
else
  echo "==> Copying from $DEVICE_FOLDER"
  copy_if 01-home.png "${LOCALE}_home" home
  copy_if 02-runner.png "${LOCALE}_runner" runner
  copy_if 03-calendar.png "${LOCALE}_calendar" calendar
  copy_if 04-progress.png "${LOCALE}_progress" progress
  copy_if 05-history.png "${LOCALE}_history" history
  copy_if 06-editor.png "${LOCALE}_editor" editor
  copy_if 07-settings.png "${LOCALE}_settings" settings

  # Legacy aliases (compat with older docs / CDN cache) — Italian default
  if [ "$LOCALE" = "it" ]; then
    copy_if home.png home it_home
    copy_if runner.png runner it_runner
    copy_if calendar.png calendar it_calendar
    copy_if progress.png progress it_progress
    copy_if history.png history it_history
    copy_if ipad-editor.png editor it_editor
    copy_if settings.png settings it_settings
  fi
fi

# Optional: Apple Watch companion screenshot (macOS + paired watch sim)
if xcrun simctl list devices booted 2>/dev/null | grep -iq watch; then
  WATCH_ID="$(xcrun simctl list devices booted | awk -F'[()]' '/Watch/{print $2; exit}')"
  if [ -n "$WATCH_ID" ]; then
    xcrun simctl io "$WATCH_ID" screenshot "$OUT_DIR/08-watch.png" 2>/dev/null && {
      cp -f "$OUT_DIR/08-watch.png" "$OUT_DIR/watch.png" 2>/dev/null || true
      echo "    OK 08-watch.png (simctl)"
    } || true
  fi
fi

echo ""
echo "Done -> $OUT_DIR"
echo "Fill manually if missing: 09-gps-map.png, 10-trainer.png (see assets/screenshots/README.md)"
