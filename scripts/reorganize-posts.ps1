# Reorganize Hugo posts into subfolders and preserve URLs via front matter
param()

$ErrorActionPreference = 'Stop'

# Base paths
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
$contentPosts = Join-Path $repoRoot 'content' | Join-Path -ChildPath 'posts'
$unityDir = Join-Path $contentPosts 'unity'
$jsDir = Join-Path $contentPosts 'javascript-co-ban'

# Ensure target directories exist
New-Item -ItemType Directory -Force -Path $unityDir | Out-Null
New-Item -ItemType Directory -Force -Path $jsDir | Out-Null

function Add-SlugAndUrlIfMissing {
    param(
        [string]$FilePath,
        [string]$Slug,
        [string]$Url
    )
    $text = Get-Content -LiteralPath $FilePath -Raw -Encoding UTF8

    # Match front matter --- ... --- at the beginning
    $fmRegex = "\A---\r?\n([\s\S]*?)\r?\n---"
    $m = [regex]::Match($text, $fmRegex)
    if (-not $m.Success) {
        Write-Warning "No front matter found in $FilePath; skipping."
        return
    }
    $fm = $m.Groups[1].Value

    $hasSlug = $fm -match "(?m)^slug:\s*"
    $hasUrl  = $fm -match "(?m)^url:\s*"

    if ($hasSlug -and $hasUrl) {
        return # Nothing to do
    }

    # Build insert lines
    $insertLines = @()
    if (-not $hasSlug) { $insertLines += "slug: $Slug" }
    if (-not $hasUrl)  { $insertLines += "url: $Url" }

    # Insert after the opening --- line (right after start of match)
    $newFm = ("`n" + ($insertLines -join "`n") + "`n" + $fm).TrimEnd()

    # Reconstruct file content: replace the first front matter block
    $prefix = $text.Substring(0, $m.Index)
    $suffixStart = $m.Index + $m.Length
    $suffix = $text.Substring($suffixStart)

    $newText = "---" + $newFm + "`n---" + $suffix

    # Write back with UTF8 (without BOM)
    [System.IO.File]::WriteAllText($FilePath, $newText, (New-Object System.Text.UTF8Encoding $false))
}

# Process files
Get-ChildItem -LiteralPath $contentPosts -File -Filter 'unity-*.md' | ForEach-Object {
    $basename = $_.BaseName
    $slug = $basename
    $url  = "/posts/$basename/"

    Add-SlugAndUrlIfMissing -FilePath $_.FullName -Slug $slug -Url $url

    $target = Join-Path $unityDir ($_.Name)
    if ($_.FullName -ne $target) {
        Move-Item -LiteralPath $_.FullName -Destination $target -Force
        Write-Host "Moved: $($_.Name) -> unity/"
    }
}

Get-ChildItem -LiteralPath $contentPosts -File -Filter 'javascript-co-ban-*.md' | ForEach-Object {
    $basename = $_.BaseName
    $slug = $basename
    $url  = "/posts/$basename/"

    Add-SlugAndUrlIfMissing -FilePath $_.FullName -Slug $slug -Url $url

    $target = Join-Path $jsDir ($_.Name)
    if ($_.FullName -ne $target) {
        Move-Item -LiteralPath $_.FullName -Destination $target -Force
        Write-Host "Moved: $($_.Name) -> javascript-co-ban/"
    }
}

Write-Host "Reorganization complete."