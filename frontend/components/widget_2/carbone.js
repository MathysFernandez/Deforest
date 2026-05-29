// ============================================================================
// Widget 2 : Compteur Carbone
// ============================================================================
// Calcule la dette carbone basée sur la surface de déforestation détectée

const CO2_PAR_KM2 = 200; // tonnes CO2 équivalent par km²
const KM2_PAR_ALERTE = 0.5; // estimation de surface par point d'alerte

function mettreAJourCarbone(nbAlertes) {
    // Estime la surface en km²
    const surfaceKm2 = nbAlertes * KM2_PAR_ALERTE;
    
    // Calcule le CO2 en tonnes
    const tonnesCO2 = Math.round(surfaceKm2 * CO2_PAR_KM2);
    
    // Met à jour l'affichage avec animation
    const compteur = document.getElementById('compteur-carbone');
    if (compteur) {
        // Animation du compteur
        animerCompteur(compteur, 0, tonnesCO2, 500);
    }
    
    console.log(`☁️ CO2 estimé: ${tonnesCO2} tonnes (Surface: ${surfaceKm2.toFixed(1)} km²)`);
}

function reinitialiserCarbone() {
    const compteur = document.getElementById('compteur-carbone');
    if (compteur) {
        compteur.textContent = '0';
    }
}

// Animation fluide du compteur
function animerCompteur(element, debut, fin, duree) {
    const intervalle = 30; // ms
    const etapes = duree / intervalle;
    let etapeActuelle = 0;
    
    const timer = setInterval(() => {
        etapeActuelle++;
        const valeur = Math.floor(debut + (fin - debut) * (etapeActuelle / etapes));
        element.textContent = valeur.toLocaleString('fr-FR');
        
        if (etapeActuelle >= etapes) {
            clearInterval(timer);
            element.textContent = fin.toLocaleString('fr-FR');
        }
    }, intervalle);
}
