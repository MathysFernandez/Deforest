// ============================================================================
// Constantes Globales et Utilitaires (Partagés)
// ============================================================================
const KM2_PAR_ALERTE = 0.0009; // estimation de surface par point d'alerte

// Estimation moyenne de carbone pour une forêt tropicale dense (tonnes/km²)
const CO2_PAR_KM2 = 25000; 

const BUDGET_CARBONE_CRITIQUE = 5000; // Limite théorique pour la jauge
let memoireCarbone = 0;

const TONNES_CO2_PAR_FRANCAIS = 9; 
const TONNES_CO2_PAR_VOL_NY = 1; 
const COUT_SOCIAL_EURO_PAR_TONNE = 250; 
const TONNES_CO2_ABSORBE_PAR_ARBRE = 0.025; // 25kg par arbre

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
function mettreAJourWidgets(nbAlertes, historique=[]) {
    const surfaceKm2 = nbAlertes * KM2_PAR_ALERTE;
    
    // 1. On sauvegarde les valeurs calculées en mémoire
    memoireCarbone = Math.round(surfaceKm2 * CO2_PAR_KM2);
    
    // 2. Mise à jour de la jauge Chart.js
    if (graphiqueJauge) {
        graphiqueJauge.data.datasets[0].data = [
            memoireCarbone, 
            Math.max(0, BUDGET_CARBONE_CRITIQUE - memoireCarbone)
        ];
        graphiqueJauge.update();
    }

    // Équivalences & Coûts
    const eqCitoyens = Math.round(memoireCarbone / TONNES_CO2_PAR_FRANCAIS);
    const eqVols = Math.round(memoireCarbone / TONNES_CO2_PAR_VOL_NY);
    const eqCout = memoireCarbone * COUT_SOCIAL_EURO_PAR_TONNE;
    const eqArbres = Math.round(memoireCarbone / TONNES_CO2_ABSORBE_PAR_ARBRE);

    // Injection dans le HTML
    const divCitizen = document.getElementById('eq-citizen');
    const divFlights = document.getElementById('eq-flights');
    const divCost = document.getElementById('eq-cost');
    const divTrees = document.getElementById('eq-trees');

    if (divCitizen) divCitizen.textContent = eqCitoyens.toLocaleString('fr-FR');
    if (divFlights) divFlights.textContent = eqVols.toLocaleString('fr-FR');
    if (divCost) divCost.textContent = eqCout.toLocaleString('fr-FR');
    if (divTrees) divTrees.textContent = eqArbres.toLocaleString('fr-FR');

    // Calcul de la fiabilité (Analyse de l'historique)

    if (historique.length > 0) {
    console.log("🔍 Valeur brute de confiance :", historique[0].gfw_integrated_alerts__confidence);
    }
    let alertesConfirmees = 0;
    historique.forEach(point => {
        // GFW renvoie souvent 'confirmed' ou 'high' pour les alertes certaines
        if (point.gfw_integrated_alerts__confidence === 'confirmed' || 
            point.gfw_integrated_alerts__confidence === 'high') {
            alertesConfirmees++;
        }
    });

    const pourcentageConfirme = nbAlertes > 0 ? Math.round((alertesConfirmees / nbAlertes) * 100) : 0;
    const pourcentageSuspect = 100 - pourcentageConfirme;

    const barConfirmed = document.getElementById('bar-confirmed');
    const barSuspected = document.getElementById('bar-suspected');
    const textReliability = document.getElementById('text-reliability');

    if (barConfirmed && barSuspected && textReliability) {
        barConfirmed.style.width = `${pourcentageConfirme}%`;
        barSuspected.style.width = `${pourcentageSuspect}%`;
        textReliability.textContent = `${pourcentageConfirme}% confirmées par satellite`;
    }
}

// ============================================================================
// Fonction pour jouer l'animation à la demande
// ============================================================================
function relancerAnimations() {
    const compteurCarbone = document.getElementById('compteur-carbone');
    
    if (compteurCarbone) animerCompteur(compteurCarbone, 0, memoireCarbone, 800);
}

// Initialise le graphique dès que le fichier est chargé par le navigateur
document.addEventListener('DOMContentLoaded', initialiserJaugeCarbone);

// ============================================================================
// Contrôleur des Widgets : Réinitialisation
// ============================================================================
function reinitialiserWidgets() {
    // On remet la mémoire à zéro
    memoireCarbone = 0;
    TONNES_CO2_PAR_FRANCAIS = 9; 
    TONNES_CO2_PAR_VOL_NY = 1; 
    COUT_SOCIAL_EURO_PAR_TONNE = 250; 
    TONNES_CO2_ABSORBE_PAR_ARBRE = 0.025; // 25kg par arbre

    
    const compteurCarbone = document.getElementById('compteur-carbone');
    
    if (compteurCarbone) compteurCarbone.textContent = '0';
    
    if (graphiqueJauge) {
        graphiqueJauge.data.datasets[0].data = [0, BUDGET_CARBONE_CRITIQUE];
        graphiqueJauge.update();
    }

}
