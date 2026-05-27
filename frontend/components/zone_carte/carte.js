// ==========================================================================
//   la carte avec Leaflet <- Bibliothèque
// ==========================================================================

// le tableau c'est pour donner la position initiale et le 2 pour le zoom
const map = L.map('maCarte', {
    attributionControl: false,
    zoomControl: false
}).setView([20, 0], 2);

// ==========================================================================
//   ajout des tuiles (CartoDB Dark Matter <- fournisseur)
// ==========================================================================

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {

    // les attributions sont cachées pour conserver l'ergonomie du site
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',

    subdomains: 'abcd',

    maxZoom: 18, // zoom maximum
    minZoom: 2   // éviter de dézoomer à l'infini

}).addTo(map);

// ==========================================================================
//   position des boutons de zoom
// ==========================================================================

L.control.zoom({
    position: 'bottomleft',
}).addTo(map);





// ==========================================================================
//   couche de clustering des points
// ==========================================================================

// cette couche va contenir tous les marqueurs de déforestation
const deforestationLayer = L.markerClusterGroup();

map.addLayer(deforestationLayer);

console.log("Carte initialisée !");

// ==========================================================================
//   Icône personnalisée des points
// ==========================================================================

const deforestationIcon = L.icon({

    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',

    iconSize: [18, 18], // taille de l'icône
    iconAnchor: [9, 18], // point d'ancrage
    popupAnchor: [0, -18]

});

// ==========================================================================
//   fonction pour ajouter un point de déforestation
// ==========================================================================

function addDeforestationPoint(lat, lng, data = {}) {

    // création du marqueur
    const marker = L.marker([lat, lng], {
    icon: deforestationIcon
});

    // contenu du popup
    const popupContent = `
        <div style="font-family: Quicksand, sans-serif;">

            <h3 style="margin-bottom: 8px;">
                🌳 Zone de déforestation
            </h3>

            <p>
                <strong>Région :</strong>
                ${data.region || "Inconnue"}
            </p>

            <p>
                <strong>Perte :</strong>
                ${data.loss || "Non renseignée"}
            </p>

        </div>
    `;

    // popup au clic
    marker.bindPopup(popupContent);

    // ajout du marqueur dans le cluster
    marker.addTo(deforestationLayer);
}

// ==========================================================================
//   TEST CLUSTERING AMAZONIE
// ==========================================================================


addDeforestationPoint(-3.4753, -62.2259, {
    region: "Amazonie Sud",
    loss: "900 hectares"
});

addDeforestationPoint(-3.4553, -62.2059, {
    region: "Amazonie Est",
    loss: "1500 hectares"
});

addDeforestationPoint(-3.4600, -62.2100, {
    region: "Amazonie Ouest",
    loss: "700 hectares"
});

addDeforestationPoint(-3.4700, -62.2200, {
    region: "Amazonie Centrale",
    loss: "2000 hectares"
});



// ==========================================================================
//   Fonction pour parcourir les données SQL et créer les marqueurs
// ==========================================================================

function afficherDonneesSurCarte(donnees) {
    deforestationLayer.clearLayers(); // On vide les anciens points

    donnees.forEach(point => {
        if (point.latitude && point.longitude) {
            // On réutilise la superbe fonction que vous avez déjà créée !
            addDeforestationPoint(point.latitude, point.longitude, {
                region: "Alerte Détectée",
                loss: point.gfw_integrated_alerts__confidence === 'confirmed' ? "Confirmée" : "Suspectée"
            });
        }
    });
}

// ==========================================================================
//   Le Chargeur Dynamique (Amortisseur de requêtes)
// ==========================================================================

let minuteurRequete = null;

async function actualiserCarteDynamique() {
    if (map.getZoom() < 5) {
        console.log("trop dézoomé");
        return; // Sécurité anti-crash si on est trop dézoomé
    }
    // Calcul des frontières de l'écran
    const limites = map.getBounds();
    const sud = Math.max(limites.getSouth(), -90);
    const nord = Math.min(limites.getNorth(), 90);
    const ouest = limites.getWest() % 360;
    const est = limites.getEast() % 360;

    // Appel à votre api.js
    const alertes = await fetchDeforestationData(sud, ouest, nord, est);
    if (alertes.length === 0) {
        console.log("donnée vide");
        return;
    }
    console.log(alertes.length);
    afficherDonneesSurCarte(alertes);

    // Mise à jour du header
    const badgeAlertes = document.getElementById('alerts-count');
    if (badgeAlertes) badgeAlertes.textContent = alertes.length;
}

// On écoute les mouvements de la carte
map.on('moveend', () => {
    clearTimeout(minuteurRequete);
    minuteurRequete = setTimeout(actualiserCarteDynamique, 1000); // Attend 1s avant d'appeler l'API
});