// ============================================================================
// Constantes Globales et Utilitaires (Partagés)
// ============================================================================
const KM2_PAR_ALERTE = 0.5; // estimation de surface par point d'alerte

// Estimation moyenne de carbone pour une forêt tropicale dense (tonnes/km²)
const CO2_PAR_KM2 = 25000; 

// Un terrain de foot ≈ 5400m² = 0.0054 km²
const SURFACE_TERRAIN_KM2 = 0.0054;

const BUDGET_CARBONE_CRITIQUE = 50000; // Limite théorique pour la jauge

let graphiqueJauge = null;

function initialiserJaugeCarbone() {
    const ctx = document.getElementById('jaugeCarbone');
    if (!ctx) return;

    graphiqueJauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Émis', 'Marge'],
            datasets: [{
                data: [0, BUDGET_CARBONE_CRITIQUE],
                backgroundColor: ['#E07A5F', '#3A4F41'], // Rouge terre cuite et Vert boisé
                borderWidth: 0,
                borderRadius: 5 // Bords arrondis pour la jauge
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '85%', // Rend l'anneau très fin (le chiffre ira au centre)
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false } // Désactive les popups au survol
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Animation fluide du compteur partagée[cite: 2, 3]
function animerCompteur(element, debut, fin, duree) {
    // Sécurité pour éviter un calcul inutile si la valeur est déjà bonne
    if (debut === fin) {
        element.textContent = fin.toLocaleString('fr-FR');
        return;
    }

    let dateDebut = null;

    // Fonction mathématique d'amortissement (easeOutQuart)
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const etapeAnimation = (timestampActuel) => {
        // Initialisation du temps de départ à la première frame
        if (!dateDebut) dateDebut = timestampActuel;
        
        // Calcul du temps écoulé, normalisé entre 0 et 1
        const progressionTemps = Math.min((timestampActuel - dateDebut) / duree, 1);
        
        // Application de la courbure mathématique
        const progressionValeur = easeOutQuart(progressionTemps);
        
        // Calcul de la valeur à afficher à l'instant T
        const valeurCourante = Math.floor(debut + (fin - debut) * progressionValeur);
        
        element.textContent = valeurCourante.toLocaleString('fr-FR');

        // Si t n'a pas encore atteint 1, on relance la boucle pour la frame suivante
        if (progressionTemps < 1) {
            requestAnimationFrame(etapeAnimation);
        } else {
            // Sécurité finale pour être certain d'afficher le chiffre exact à la fin
            element.textContent = fin.toLocaleString('fr-FR');
        }
    };

    // Lancement de l'algorithme
    requestAnimationFrame(etapeAnimation);
}

// ============================================================================
// Contrôleur des Widgets : Mise à jour globale
// ============================================================================
function mettreAJourWidgets(nbAlertes) {
    const surfaceKm2 = nbAlertes * KM2_PAR_ALERTE;
    const tonnesCO2 = Math.round(surfaceKm2 * CO2_PAR_KM2);
    const terrains = Math.round(surfaceKm2 / SURFACE_TERRAIN_KM2);
    
    // 1. Mise à jour des compteurs (avec ta fonction animerCompteur)
    const compteurCarbone = document.getElementById('compteur-carbone');
    const compteurImpact = document.getElementById('compteur-impact');
    
    if (compteurCarbone) animerCompteur(compteurCarbone, 0, tonnesCO2, 500);
    if (compteurImpact) animerCompteur(compteurImpact, 0, terrains, 500);
    
    // 2. Mise à jour de la jauge Chart.js
    if (graphiqueJauge) {
        // Le dataset contient [Partie Remplie, Partie Vide]
        graphiqueJauge.data.datasets[0].data = [
            tonnesCO2, 
            Math.max(0, BUDGET_CARBONE_CRITIQUE - tonnesCO2) // Évite un total négatif
        ];
        graphiqueJauge.update();
    }

    // 3. Génération de la grille d'impact visuel
    const impactGrid = document.getElementById('impact-grid');
    if (impactGrid) {
        // Limite visuelle à 60 icônes max pour ne pas faire saturer l'écran
        const nbIcones = Math.min(terrains, 60); 
        impactGrid.textContent = '⚽'.repeat(nbIcones);
        
        // Ajout de points de suspension si on dépasse la limite d'affichage
        if (terrains > 60) {
            impactGrid.textContent += ' ...';
        }
    }
}

// Initialise le graphique dès que le fichier est chargé par le navigateur
document.addEventListener('DOMContentLoaded', initialiserJaugeCarbone);

// ============================================================================
// Contrôleur des Widgets : Réinitialisation
// ============================================================================
function reinitialiserWidgets() {
    const compteurCarbone = document.getElementById('compteur-carbone');
    const compteurImpact = document.getElementById('compteur-impact');
    
    if (compteurCarbone) compteurCarbone.textContent = '0';
    if (compteurImpact) compteurImpact.textContent = '0';
}