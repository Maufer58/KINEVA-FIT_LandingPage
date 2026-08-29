# Captures Stride screenshots on Windows via Android emulator + adb.
# Mac/iOS: use capture_screenshots.sh (integration test or xcrun simctl).

param(
    [string]$DeviceId = "",
    [int]$BootTimeoutSec = 180,
    [int]$LaunchWaitSec = 18
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$OutDir = Join-Path $Root "website\assets\screenshots"
$Package = "com.mauroferrari.stride"
$Activity = "$Package/.MainActivity"

Set-Location $Root
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

function Get-AdbDeviceId {
    $line = (& adb devices) | Where-Object { $_ -match "`tdevice$" } | Select-Object -First 1
    if (-not $line) { return $null }
    return ($line -split "`t")[0].Trim()
}

function Wait-ForDevice {
    param([int]$TimeoutSec)
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $deadline) {
        $id = Get-AdbDeviceId
        if ($id) { return $id }
        Start-Sleep -Seconds 3
    }
    throw "No Android device/emulator detected within ${TimeoutSec}s"
}

function Get-ScreenSize {
    param([string]$Serial)
    $raw = adb -s $Serial shell wm size 2>$null
    if ($raw -match "Physical size:\s*(\d+)x(\d+)") {
        return @{ W = [int]$Matches[1]; H = [int]$Matches[2] }
    }
    return @{ W = 1080; H = 2400 }
}

function Capture-Screen {
    param([string]$Serial, [string]$Dest)
    cmd /c "adb -s $Serial exec-out screencap -p > `"$Dest`""
    if (-not (Test-Path $Dest) -or (Get-Item $Dest).Length -lt 1000) {
        throw "Screenshot failed or too small: $Dest"
    }
}

function Tap-NavTab {
    param([string]$Serial, [hashtable]$Size, [int]$Index)
    # Material NavigationBar: 5 tabs evenly spaced along bottom.
    $x = [int](($Size.W / 10) * (1 + 2 * $Index))
    $y = [int]($Size.H * 0.92)
    adb -s $Serial shell input tap $x $y | Out-Null
}

Write-Host "==> Stride screenshot capture (adb / Android)" -ForegroundColor Cyan
Write-Host "    Project: $Root"

$DeviceId = if ($DeviceId) { $DeviceId } else { Get-AdbDeviceId }
if (-not $DeviceId) {
    Write-Host "==> Launching emulator Pixel_6a" -ForegroundColor Yellow
    flutter emulators --launch Pixel_6a | Out-Null
    $DeviceId = Wait-ForDevice -TimeoutSec $BootTimeoutSec
}
Write-Host "==> Device: $DeviceId" -ForegroundColor Green

Write-Host "==> Building & installing debug APK..."
flutter build apk --debug
if ($LASTEXITCODE -ne 0) { throw "flutter build apk --debug failed" }
$install = adb -s $DeviceId install -r "build\app\outputs\flutter-apk\app-debug.apk" 2>&1
if ($LASTEXITCODE -ne 0) { throw "adb install failed: $install" }

Write-Host "==> Launching app..."
adb -s $DeviceId shell am force-stop $Package | Out-Null
adb -s $DeviceId shell am start -n "$Package/.MainActivity" | Out-Null
Start-Sleep -Seconds $LaunchWaitSec

$size = Get-ScreenSize -Serial $DeviceId
Write-Host "    Screen: $($size.W)x$($size.H)"

# Numbered catalog (#01–#07 from nav / best-effort). See assets/screenshots/README.md
# 0 home, 1 calendar, 2 progress, 3 history, 4 settings
$shots = @(
    @{ File = "01-home.png"; Legacy = "home.png"; Tab = 0 },
    @{ File = "03-calendar.png"; Legacy = "calendar.png"; Tab = 1 },
    @{ File = "04-progress.png"; Legacy = "progress.png"; Tab = 2 },
    @{ File = "05-history.png"; Legacy = "history.png"; Tab = 3 },
    @{ File = "07-settings.png"; Legacy = "settings.png"; Tab = 4 }
)

foreach ($shot in $shots) {
    if ($shot.Tab -gt 0) {
        Tap-NavTab -Serial $DeviceId -Size $size -Index $shot.Tab
        Start-Sleep -Seconds 2
    }
    $dest = Join-Path $OutDir $shot.File
    Capture-Screen -Serial $DeviceId -Dest $dest
    Copy-Item -Force $dest (Join-Path $OutDir $shot.Legacy)
    Write-Host "    OK $($shot.File) (+ $($shot.Legacy))" -ForegroundColor Green
}

# Editor: from home, tap first routine card area if visible; fallback = home duplicate crop.
Tap-NavTab -Serial $DeviceId -Size $size -Index 0
Start-Sleep -Seconds 2
adb -s $DeviceId shell input tap ([int]($size.W * 0.5)) ([int]($size.H * 0.35)) | Out-Null
Start-Sleep -Seconds 2
$editorDest = Join-Path $OutDir "06-editor.png"
Capture-Screen -Serial $DeviceId -Dest $editorDest
Copy-Item -Force $editorDest (Join-Path $OutDir "ipad-editor.png")
Write-Host "    OK 06-editor.png (+ ipad-editor.png)" -ForegroundColor Green

# Runner: open first routine then start workout if FAB visible.
adb -s $DeviceId shell input tap ([int]($size.W * 0.5)) ([int]($size.H * 0.35)) | Out-Null
Start-Sleep -Seconds 2
adb -s $DeviceId shell input tap ([int]($size.W * 0.85)) ([int]($size.H * 0.88)) | Out-Null
Start-Sleep -Seconds 2
$runnerDest = Join-Path $OutDir "02-runner.png"
Capture-Screen -Serial $DeviceId -Dest $runnerDest
Copy-Item -Force $runnerDest (Join-Path $OutDir "runner.png")
Write-Host "    OK 02-runner.png (+ runner.png, best effort)" -ForegroundColor Green

Write-Host ""
Write-Host "Done -> $OutDir" -ForegroundColor Cyan
Write-Host "Manual if missing: 08-watch.png, 09-gps-map.png, 10-trainer.png"
