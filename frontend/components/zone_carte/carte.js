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

const deforestationLayer = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,    // <-- tue la grille !
    disableClusteringAtZoom: 10, // zoom 10
    maxClusterRadius: 40         // Réduit la zone d'aspiration des bulles
});

map.addLayer(deforestationLayer);

console.log("Carte initialisée !");

// ==========================================================================
//   Outils de sélection de zone (Leaflet.draw)
// ==========================================================================

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// couleur pour la selection manuelle
const drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
        rectangle: {
            shapeOptions: {
                color: '#E07A5F', 
                weight: 2
            }
        }
    },
    edit: {
        featureGroup: drawnItems,
        remove: true
    }
});
map.addControl(drawControl);




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

    // creation du marqueur
    const marker = L.marker([lat, lng], {
    icon: deforestationIcon
});

    // contenu popup
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
//   Fonction pour parcourir les données SQL et créer les marqueurs
// ==========================================================================

function afficherDonneesSurCarte(donnees) {
    deforestationLayer.clearLayers(); 

    // On crée un "carnet" pour noter les points qu'on a déjà affichés
    const pointsVus = new Set();

    donnees.forEach(point => {
        if (point.latitude && point.longitude) {
            
            // On arrondit les coordonnées
            const latArrondie = point.latitude.toFixed(3);
            const lngArrondie = point.longitude.toFixed(3);
            
            // On crée une clé unique pour cette position
            const coordKey = `${latArrondie},${lngArrondie}`;

            // Si cette zone précise n'a pas encore de point, on l'ajoute
            if (!pointsVus.has(coordKey)) {
                
                pointsVus.add(coordKey); // On l'enregistre pour bloquer les suivants

                // On affiche le point avec ses VRAIES coordonnées (sans aléatoire)
                addDeforestationPoint(point.latitude, point.longitude, {
                    region: "Alerte Détectée",
                    loss: point.gfw_integrated_alerts__confidence === 'confirmed' ? "Confirmée" : "Suspectée"
                });
            }
        }
    });
}

// ==========================================================================
//   Recherche ciblée via la zone dessinée
// ==========================================================================

map.on(L.Draw.Event.CREATED, async function (event) {
    const layer = event.layer;

    // Nettoie la carte pour ne garder qu'une seule zone de recherche
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);

    // Extraction des coordonnées du rectangle
    const limites = layer.getBounds();
    const sud = limites.getSouth();
    const nord = limites.getNorth();
    const ouest = limites.getWest();
    const est = limites.getEast();

    console.log("Nouvelle recherche dans la zone :", { sud, ouest, nord, est });

    // Appel api.js avec les nouvelles coordonnée
    const alertes = await fetchDeforestationData(sud, ouest, nord, est);

    if (alertes.length === 0) {
        deforestationLayer.clearLayers();
        document.getElementById('alerts-count').textContent = 0;
        return;
    }

    // Affichage des points
    afficherDonneesSurCarte(alertes);

    // Mise à jours
    const badgeAlertes = document.getElementById('alerts-count');
    if (badgeAlertes) {
        badgeAlertes.textContent = alertes.length;
    }
});