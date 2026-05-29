// ============================================================================
// Constantes Globales et Utilitaires (Partagés)
// ============================================================================
const KM2_PAR_ALERTE = 0.5; // estimation de surface par point d'alerte

// Animation fluide du compteur partagée[cite: 2, 3]
function animerCompteur(element, debut, fin, duree) {
    const intervalle = 30; // ms[cite: 2, 3]
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

// ============================================================================
// Widget 2 : Compteur Carbone[cite: 2]
// ============================================================================
const CO2_PAR_KM2 = 200; // tonnes CO2 équivalent par km²[cite: 2]

function mettreAJourCarbone(nbAlertes) {
    const surfaceKm2 = nbAlertes * KM2_PAR_ALERTE;
    const tonnesCO2 = Math.round(surfaceKm2 * CO2_PAR_KM2);
    
    const compteur = document.getElementById('compteur-carbone');
    if (compteur) {
        animerCompteur(compteur, 0, tonnesCO2, 500);
    }
    console.log(`☁️ CO2 estimé: ${tonnesCO2} tonnes (Surface: ${surfaceKm2.toFixed(1)} km²)`);
}

function reinitialiserCarbone() {
    const compteur = document.getElementById('compteur-carbone');
    if (compteur) compteur.textContent = '0';
}
// ============================================================================
// Widget 3 : Compteur Impact (Terrains de Football)[cite: 3]
// ============================================================================
const SURFACE_TERRAIN_KM2 = 0.0054; // Un terrain de foot ≈ 5400m²[cite: 3]

function mettreAJourImpact(nbAlertes) {
    const surfaceKm2 = nbAlertes * KM2_PAR_ALERTE;
    const terrains = Math.round(surfaceKm2 / SURFACE_TERRAIN_KM2);
    
    const compteur = document.getElementById('compteur-impact');
    if (compteur) {
        animerCompteur(compteur, 0, terrains, 500);
    }
    console.log(`⚽ Impact: ${terrains} terrains de foot (Surface: ${surfaceKm2.toFixed(1)} km²)`);
}

function reinitialiserImpact() {
    const compteur = document.getElementById('compteur-impact');
    if (compteur) {
        compteur.textContent = '0';
    }
}