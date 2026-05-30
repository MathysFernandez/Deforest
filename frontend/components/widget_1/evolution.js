// ==========================================================================
//   Graphique d'évolution — lit les données déjà affichées sur la carte
//   Axe X : dates des alertes | Axe Y : nombre d'alertes
// ==========================================================================

const ctx = document.getElementById('monGraphiqueEvolution');

const monGraphique = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: "Alertes affichées sur la carte",
            data: [],
            backgroundColor: 'rgba(231, 76, 60, 0.6)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: true,
                    maxTicksLimit: 20
                }
            },
            y: {
                beginAtZero: true,
                ticks: { precision: 0 }
            }
        }
    }
});

// ==========================================================================
//   Met à jour le graphique à partir des marqueurs déjà sur la carte
//   Appelée depuis carte.js après chaque afficherDonneesSurCarte()
// ==========================================================================

function mettreAJourGraphique(donnees) {
    console.log("📊 Données brutes reçues :", donnees);
    
    // Option 1 : Grouper par date si elles existent
    const parDate = {};
    
    donnees.forEach(point => {
        const date = point.gfw_integrated_alerts__date || 'Inconnue';
        parDate[date] = (parDate[date] || 0) + 1;
    });
    
    const nbDatesUniques = Object.keys(parDate).length;
    console.log(`Dates uniques trouvées : ${nbDatesUniques}`, parDate);
    
    // Si moins de 2 dates, grouper par niveau de confiance
    let labels, donnees_graphe;
    
    if (nbDatesUniques <= 1) {
        console.log("⚠️ Peu de dates, groupage par confiance...");
        
        const parConfiance = {};
        donnees.forEach(point => {
            const conf = point.gfw_integrated_alerts__confidence || 0;
            const categorie = conf < 33 ? 'Faible' : conf < 67 ? 'Moyen' : 'Élevé';
            parConfiance[categorie] = (parConfiance[categorie] || 0) + 1;
        });
        
        labels = Object.keys(parConfiance);
        donnees_graphe = Object.values(parConfiance);
    } else {
        // Sinon grouper par date
        const datesTri = Object.keys(parDate).sort();
        labels = datesTri;
        donnees_graphe = datesTri.map(d => parDate[d]);
    }
    
    monGraphique.data.labels                = labels;
    monGraphique.data.datasets[0].data      = donnees_graphe;
    monGraphique.data.datasets[0].label     = `Alertes (Total : ${donnees.length})`;
    monGraphique.update();
    
    console.log("✅ Graphique mis à jour :", labels, donnees_graphe);
}

// Réinitialise le graphique quand on vide la carte (bouton poubelle)
function reinitialiserGraphique() {
    monGraphique.data.labels                = [];
    monGraphique.data.datasets[0].data      = [];
    monGraphique.data.datasets[0].label     = "Alertes affichées sur la carte";
    monGraphique.update();
}
