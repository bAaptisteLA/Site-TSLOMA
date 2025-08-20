Write-Host "=== Contenu de mon-projet (niveau 1) ==="
Get-ChildItem -Force | ForEach-Object {
    if ($_.PSIsContainer) {
        Write-Host "|-- [$($_.Name)]"
    } else {
        Write-Host "|-- $($_.Name)"
    }
}

Write-Host "`n=== Contenu de public/ ==="
if (Test-Path .\public) {
    Get-ChildItem .\public | ForEach-Object {
        Write-Host "|-- $($_.Name)"
    }
}

Write-Host "`n=== Contenu de src/ ==="
if (Test-Path .\src) {
    # Fichiers directement dans src
    Get-ChildItem .\src -File | ForEach-Object {
        Write-Host "|-- $($_.Name)"
    }

    Write-Host "`n   === Contenu de src/assets/ ==="
    if (Test-Path .\src\assets) {
        Get-ChildItem .\src\assets | ForEach-Object {
            Write-Host "   |-- $($_.Name)"
        }
    }
}
