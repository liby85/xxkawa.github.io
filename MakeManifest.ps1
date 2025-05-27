$manifestFile = "cache.manifest"
$excludedPatterns = @(".ps1", ".json",".exe", ".txt", ".py", ".git", ".mp4", "COPYING", "LICENSE", "media")
$basePath = Get-Location

$version = Read-Host "Please Input New Version Number:"
$today = Get-Date -Format "yyyy-MM-dd"
$versionLine = "# $version - $today"

$files = Get-ChildItem -Recurse -File | Where-Object {
    $relativePath = $_.FullName.Substring($basePath.Path.Length + 1)
    foreach ($pattern in $excludedPatterns) {
        if ($relativePath -like "*$pattern*") {
            return $false
        }
    }
    return $true
}

Set-Content -Path $manifestFile -Value "CACHE MANIFEST" -Encoding UTF8
Add-Content -Path $manifestFile -Value $versionLine
Add-Content -Path $manifestFile -Value ""
Add-Content -Path $manifestFile -Value "CACHE:"

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($basePath.Path.Length + 1).Replace("\", "/")
    Add-Content -Path $manifestFile -Value $relativePath
}

Add-Content -Path $manifestFile -Value ""
Add-Content -Path $manifestFile -Value "NETWORK:"
Add-Content -Path $manifestFile -Value "*"

Write-Host "Manifest file '$manifestFile' created!"
