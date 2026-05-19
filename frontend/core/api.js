console.log("API en fonctionnement");


// Identifiants
const GFW_API_KEY = "40354426-5571-47fa-8667-4b7dfa801d82";
const GFW_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjllZWY1N2YyNmJlZmFmMTY0ZDM1NyIsInJvbGUiOiJVU0VSIiwicHJvdmlkZXIiOiJsb2NhbCIsImVtYWlsIjoibWF0aHlzLmZlcm5hbmRlejU1NzJAZ21haWwuY29tIiwiZXh0cmFVc2VyRGF0YSI6eyJhcHBzIjpbImdmdyJdfSwiY3JlYXRlZEF0IjoxNzc3OTg5NTYwNjY3LCJpYXQiOjE3Nzc5ODk1NjB9.hiATU2sjA_2HEDfmNvKRdP7flHx9ZwsMMEfYZtfDnD8";

/* Récupère les données de déforestation depuis l'API GFW.*/
async function fetchDeforestationData() {
    // Exemple
    // à adapter
    const datasetUrl = "https://data-api.globalforestwatch.org/dataset/gfw_integrated_alerts/latest/query";
    
    // Exemple de requete SQL pour limiter le nombre de points et éviter de surcharger la carte;
    const sqlQuery = "?sql=SELECT latitude, longitude, confidence FROM data LIMIT 500";
    console.log("test1");
    try {
        const response = await fetch(datasetUrl + sqlQuery, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${GFW_BEARER_TOKEN}`,
                'x-api-key': GFW_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log("test2");
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }
        console.log("données récupérées");
        const jsonResponse = await response.json();
        // L'api encapsule les résultats dans un tableau 'data';
        
        return jsonResponse.data || [];

    } catch (error) {
        console.error("Échec de la récupération des données GFW :", error);
        return [];
    }
}