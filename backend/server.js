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
// Route API
// ======================================================================

app.get('/api/alerts', async (req, res) => {

    const datasetUrl =
        "https://data-api.globalforestwatch.org/dataset/gfw_integrated_alerts/latest/query";

    try {

        const response = await fetch(datasetUrl, {

            method: 'POST',

            headers: {
                'Authorization': `Bearer ${process.env.GFW_BEARER_TOKEN}`,
                'x-api-key': process.env.GFW_API_KEY,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                sql: `
                    SELECT latitude, longitude,
                    gfw_integrated_alerts__confidence
                    FROM data
                    WHERE gfw_integrated_alerts__date >= '2026-01-01'
                    LIMIT 500
                `,

                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [-70.0, -10.0],
                        [-60.0, -10.0],
                        [-60.0, 0.0],
                        [-70.0, 0.0],
                        [-70.0, -10.0]
                    ]]
                }

            })

        });

        if (!response.ok) {

            throw new Error(
                `Erreur GFW : ${response.status}`
            );
        }

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.error(
            "Erreur serveur :",
            error
        );

        res.status(500).json({
            error: "Erreur serveur"
        });
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