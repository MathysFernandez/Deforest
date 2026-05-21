require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// ======================================================================
// Middleware
// ======================================================================

app.use(cors());
app.use(express.json());

// ======================================================================
// Route API (POST pour recevoir la zone visible de la carte)
// ======================================================================

app.post('/api/alerts', async (req, res) => {
    // On récupère les coordonnées envoyées par le frontend
    const { sud, ouest, nord, est } = req.body;
    
    const datasetUrl = "https://data-api.globalforestwatch.org/dataset/gfw_integrated_alerts/v20260520/query/json";

    try {
        const response = await fetch(datasetUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GFW_BEARER_TOKEN}`,
                'x-api-key': process.env.GFW_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // La requête SQL est bien là ! On limite à 200 pour la fluidité
                sql: "SELECT latitude, longitude, gfw_integrated_alerts__confidence FROM data WHERE gfw_integrated_alerts__date >= '2026-04-01' LIMIT 200",
                geometry: {
                    type: "Polygon",
                    // On injecte dynamiquement les coordonnées
                    coordinates: [[[ouest, sud], [est, sud], [est, nord], [ouest, nord], [ouest, sud]]]
                }
            })
        });

        if (!response.ok) throw new Error(`Erreur GFW : ${response.status}`);
        
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// ======================================================================
// Lancement du serveur
// ======================================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Serveur lancé sur le port ${PORT}`
    );

});