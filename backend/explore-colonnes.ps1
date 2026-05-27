param(
    [string]$output = "colonnes.txt"
)

# Liste des colonnes à tester
$colonnes = @(
    "latitude", "longitude", 
    "gfw_integrated_alerts__confidence",
    "gfw_integrated_alerts__date",
    "gfw_integrated_alerts__alert_type",
    "gfw_integrated_alerts__source",
    "wdpa_protected_areas__iucn_cat",
    "gfw_plantations__type",
    "gfw_forest_cover_loss__year"
)

Write-Host "🔍 Test des colonnes disponibles..."
Write-Host ""

$body = @{
    sud = -15
    ouest = -75
    nord = 5
    est = -55
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri http://localhost:3000/api/alerts `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -ErrorAction Stop

    $data = $response.Content | ConvertFrom-Json
    
    if ($data.data -and $data.data.Count -gt 0) {
        $firstRow = $data.data[0]
        $colonnes_trouvees = $firstRow.PSObject.Properties.Name
        
        Write-Host "✅ Colonnes trouvées:" -ForegroundColor Green
        Write-Host ""
        
        foreach ($col in $colonnes_trouvees) {
            Write-Host "  • $col"
        }
        
        # Exporte dans un fichier
        $colonnes_trouvees | Out-File $output
        Write-Host ""
        Write-Host "✅ Colonnes sauvegardées dans: $output"
    } else {
        Write-Host "⚠️ Aucune donnée retournée"
    }
} catch {
    Write-Host "❌ Erreur: $_"
    Write-Host ""
    Write-Host "Assurez-vous que le serveur est lancé avec: npm start"
}
