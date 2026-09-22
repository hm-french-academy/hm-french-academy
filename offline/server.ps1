param(
    [string]$Root = (Join-Path $PSScriptRoot ".."),
    [int]$Port = 8765
)

$ErrorActionPreference = "Stop"
$Root = [System.IO.Path]::GetFullPath($Root)
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()

Write-Host ""
Write-Host "HM Academy Offline is running." -ForegroundColor Green
Write-Host "Root: $Root"
Write-Host "Open: http://127.0.0.1:$Port/"
Write-Host "Close this window to stop the local server."
Write-Host ""

$mime = @{
    ".html"="text/html; charset=utf-8"; ".htm"="text/html; charset=utf-8"
    ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8"
    ".json"="application/json; charset=utf-8"; ".svg"="image/svg+xml"
    ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"
    ".gif"="image/gif"; ".webp"="image/webp"; ".ico"="image/x-icon"
    ".mp3"="audio/mpeg"; ".wav"="audio/wav"; ".ogg"="audio/ogg"
    ".mp4"="video/mp4"; ".webm"="video/webm"; ".pdf"="application/pdf"
    ".txt"="text/plain; charset=utf-8"; ".xml"="application/xml"
}

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        try {
            $relative = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
            if ([string]::IsNullOrWhiteSpace($relative)) { $relative = "index.html" }

            $full = [System.IO.Path]::GetFullPath((Join-Path $Root $relative))
            if (-not $full.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
                $ctx.Response.StatusCode = 403
                $ctx.Response.Close()
                continue
            }

            if (Test-Path $full -PathType Container) {
                $full = Join-Path $full "index.html"
            }

            if (-not (Test-Path $full -PathType Leaf)) {
                $ctx.Response.StatusCode = 404
                $bytes = [Text.Encoding]::UTF8.GetBytes("404 - File not found")
                $ctx.Response.OutputStream.Write($bytes,0,$bytes.Length)
                $ctx.Response.Close()
                continue
            }

            $bytes = [IO.File]::ReadAllBytes($full)
            $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
            $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
            $ctx.Response.ContentLength64 = $bytes.Length
            $ctx.Response.Headers["Cache-Control"] = "no-cache"
            $ctx.Response.OutputStream.Write($bytes,0,$bytes.Length)
            $ctx.Response.Close()
        } catch {
            try { $ctx.Response.StatusCode = 500; $ctx.Response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
