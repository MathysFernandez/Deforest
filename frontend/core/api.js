const GFW_API_KEY = "40354426-5571-47fa-8667-4b7dfa801d82";
const GFW_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjllZWY1N2YyNmJlZmFmMTY0ZDM1NyIsInJvbGUiOiJVU0VSIiwicHJvdmlkZXIiOiJsb2NhbCIsImVtYWlsIjoibWF0aHlzLmZlcm5hbmRlejU1NzJAZ21haWwuY29tIiwiZXh0cmFVc2VyRGF0YSI6eyJhcHBzIjpbImdmdyJdfSwiY3JlYXRlZEF0IjoxNzc3OTg5NTYwNjY3LCJpYXQiOjE3Nzc5ODk1NjB9.hiATU2sjA_2HEDfmNvKRdP7flHx9ZwsMMEfYZtfDnD8";

async function fetchDeforestationData() {
    // Utilisation du dataset OFFICIEL des alertes intégrées GFW;
    const datasetUrl = "https://data-api.globalforestwatch.org/dataset/gfw_integrated_alerts/latest/query";
    
    try {
        const response = await fetch(datasetUrl, {
            // Méthode Poste (pas GET);
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GFW_BEARER_TOKEN}`,
                'x-api-key': GFW_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Ajout d'une limite de date pour cibler les alertes récentes
                sql: "SELECT latitude, longitude, gfw_integrated_alerts__confidence FROM data WHERE gfw_integrated_alerts__date >= '2026-01-01' LIMIT 500",
                // Ajout d'une zone géographique ("Bounding Box") obligatoire pour les requêtes de coordonnées;
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            // [Longitude, Latitude]
                            [-70.0, -10.0],
                            [-60.0, -10.0],
                            [-60.0, 0.0],
                            [-70.0, 0.0],
                            [-70.0, -10.0]
                            // Il faut absolument fermer le polygone en revenant au premier point §;
                        ]
                    ]
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur api: ${response.status} ${response.statusText}`);
        }

        const jsonResponse = await response.json();
        return jsonResponse.data || [];  

    } catch (error) {
        console.error("Echec de la récupération des données GFW :", error);
        return [];
    }
}