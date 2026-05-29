// ============================================================================
// Widget 3 : Compteur Impact (Terrains de Football)
// ============================================================================
// Visualise l'impact concret : combien de terrains de foot sont détruits

const SURFACE_TERRAIN_KM2 = 0.0054; // Un terrain de foot ≈ 5400m² ≈ 0.0054 km²
const KM2_PAR_ALERTE = 0.5; // même estimation que Carbone

function mettreAJourImpact(nbAlertes) {
    // Estime la surface en km²
    const surfaceKm2 = nbAlertes * KM2_PAR_ALERTE;
    
    // Calcule le nombre de terrains
    const terrains = Math.round(surfaceKm2 / SURFACE_TERRAIN_KM2);
    
    // Met à jour l'affichage avec animation
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
