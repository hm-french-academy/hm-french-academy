# HM Academy — USB Offline Edition

This folder adds a Windows launcher for running the existing HM Academy repository locally without internet access.

## How to use it

1. Copy the complete HM Academy repository folder to a USB flash drive.
2. Keep the `offline` folder inside the repository root.
3. On a Windows computer, double-click:
   `offline/START-HM-ACADEMY-OFFLINE.bat`
4. The launcher starts a local HTTP server and opens HM Academy in the default browser.
5. Internet access is not required for local HTML/CSS/JavaScript/assets that are already present in the repository.
6. Close the PowerShell server window when finished.

## Important

This launcher does not modify the Online HM Academy pages or GitHub Pages behavior.

External resources (for example YouTube videos, remote APIs, remote fonts, or other absolute HTTPS resources) still require internet access unless a local copy is added. The offline package therefore needs a resource audit before it can honestly be called 100% self-contained.

The local server is used instead of opening HTML files directly with `file://`, so JavaScript modules and other browser features that expect an HTTP origin have a proper local origin.
