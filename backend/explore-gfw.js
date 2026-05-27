require('dotenv').config({ path: __dirname + '/.env' });

const token = process.env.GFW_BEARER_TOKEN;
const apiKey = process.env.GFW_API_KEY;

if (!token || !apiKey) {
    console.error("Variables d'environnement manquantes : GFW_BEARER_TOKEN ou GFW_API_KEY");
    process.exit(1);
}

console.log('🔍 Exploration de l\'API GFW...\n');

async function exploreGFW() {
    try {
        const datasetUrl = "https://data-api.globalforestwatch.org/dataset/gfw_integrated_alerts/v20260520/query/json";

        console.log('📡 Appel API GFW...');
        const response = await fetch(datasetUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sql: "SELECT * FROM data LIMIT 1",
                geometry: {
                    type: "Polygon",
                    coordinates: [[[-74.3, 40.7], [-73.7, 40.7], [-73.7, 40.9], [-74.3, 40.9], [-74.3, 40.7]]]
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error(`\n❌ Erreur HTTP ${response.status}:`);
            console.error('Réponse d\'erreur:');
            console.error(errorData);
            process.exit(1);
        }

        const data = await response.json();

        console.log('\n📦 Réponse API complète:');
        console.log(JSON.stringify(data, null, 2));

        if (data.data && data.data.length > 0) {
            const firstRow = data.data[0];
            const columns = Object.keys(firstRow);

            console.log('\n✅ Colonnes disponibles:\n');
            columns.forEach((col, index) => {
                console.log(`  ${index + 1}. ${col}`);
            });

            console.log('\n📊 Premier enregistrement:\n');
            console.log(JSON.stringify(firstRow, null, 2));
        } else {
            console.log('\n⚠️ Aucune donnée retournée');
        }

    } catch (error) {
        console.error('\n❌ Erreur:', error.message);
    }
}

exploreGFW();
