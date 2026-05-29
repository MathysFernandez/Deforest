// ============================================================================
// Constantes Globales et Utilitaires (Partagés)
// ============================================================================
const KM2_PAR_ALERTE = 0.5; // estimation de surface par point d'alerte

// Estimation moyenne de carbone pour une forêt tropicale dense (tonnes/km²)
const CO2_PAR_KM2 = 25000; 

// Un terrain de foot ≈ 5400m² = 0.0054 km²
const SURFACE_TERRAIN_KM2 = 0.0054;

// Animation fluide du compteur partagée[cite: 2, 3]
function animerCompteur(element, debut, fin, duree) {
    const intervalle = 30; // ms
    const etapes = duree / intervalle;
    let etapeActuelle = 0;
    
    if (debut === fin) {
        element.textContent = fin.toLocaleString('fr-FR');
        return;
    }
    
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
// Contrôleur des Widgets : Mise à jour globale
// ============================================================================
function mettreAJourWidgets(nbAlertes) {
    // 1. Calcul central de la surface
    const surfaceKm2 = nbAlertes * KM2_PAR_ALERTE;
    
    // 2. Dérivation des indicateurs
    const tonnesCO2 = Math.round(surfaceKm2 * CO2_PAR_KM2);
    const terrains = Math.round(surfaceKm2 / SURFACE_TERRAIN_KM2);
    
    // 3. Récupération des éléments du DOM
    const compteurCarbone = document.getElementById('compteur-carbone');
    const compteurImpact = document.getElementById('compteur-impact');
    
    // 4. Lancement des animations 
    if (compteurCarbone) {
        animerCompteur(compteurCarbone, 0, tonnesCO2, 500);
    }
    
    if (compteurImpact) {
        animerCompteur(compteurImpact, 0, terrains, 500);
    }
    
    console.log(`📊 Surface : ${surfaceKm2.toFixed(3)} km² | ☁️ CO2 : ${tonnesCO2}t | ⚽ Terrains : ${terrains}`);
}

// ============================================================================
// Contrôleur des Widgets : Réinitialisation
// ============================================================================
function reinitialiserWidgets() {
    const compteurCarbone = document.getElementById('compteur-carbone');
    const compteurImpact = document.getElementById('compteur-impact');
    
    if (compteurCarbone) compteurCarbone.textContent = '0';
    if (compteurImpact) compteurImpact.textContent = '0';
}