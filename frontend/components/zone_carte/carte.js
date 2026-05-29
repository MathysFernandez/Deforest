// ==========================================================================
//   la carte avec Leaflet <- Bibliothèque
// ==========================================================================

// le tableau c'est pour donner la position initiale et le 3 pour le zoom
const map = L.map('maCarte', {
    attributionControl: false,
    zoomControl: false,
    maxBounds: [[-90, -180], [90, 180]], // pour limiter la map
    maxBoundsViscosity: 1.0,             // bloque fermement la caméra aux limites
    minZoom: 3        
}).setView([20, 0], 3);

// ==========================================================================
//   ajout des tuiles (CartoDB Dark Matter <- fournisseur)
// ==========================================================================

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    // les attributions sont cachées pour conserver l'ergonomie du site
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 18, // zoom maximum
    minZoom: 3,
    noWrap: true //pas de map infini
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
        edit: false,
        remove: false
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

// Ton travail : on garde la mémoire à l'extérieur pour ne pas perdre l'historique !
const pointsVus = new Set();
const historiqueAlertes = [];

function afficherDonneesSurCarte(donnees) {
    // On ne met PAS de clearLayers() ici pour conserver les anciens points

    donnees.forEach(point => {
        if (point.latitude && point.longitude) {
            
            const latArrondie = point.latitude.toFixed(3);
            const lngArrondie = point.longitude.toFixed(3);
            const coordKey = `${latArrondie},${lngArrondie}`;

            // Si le point n'a JAMAIS été vu, on l'affiche
            if (!pointsVus.has(coordKey)) {
                
                pointsVus.add(coordKey);
                historiqueAlertes.push(point);

                addDeforestationPoint(point.latitude, point.longitude, {
                    region: "Alerte Détectée",
                    loss: point.gfw_integrated_alerts__confidence === 'confirmed' ? "Confirmée" : "Suspectée"
                });
            }
        }
    });

    // On renvoie la taille totale de l'historique
    return pointsVus.size; 
}

// ==========================================================================
//   Gestion de l'interface utilisateur (Statut de l'API)
// ==========================================================================
// Le travail de ton collègue : les notifications sur la carte
function setStatus(message, type) {
    const statusDiv = document.getElementById('map-status');
    if (!statusDiv) return;

    if (!message) {
        statusDiv.className = 'map-status hidden';
        return;
    }

    statusDiv.textContent = message;
    statusDiv.className = `map-status ${type}`;
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

    // Notification de la recherche
    console.log("Nouvelle recherche dans la zone :", { sud, ouest, nord, est });
    
    // Changement d'état sur l'UI
    setStatus("⏳ API en recherche...", "loading");
    document.getElementById('alerts-count').textContent = "..."; 

    try {
        // Appel api.js avec les nouvelles coordo
        const reponseAPI = await fetchDeforestationData(sud, ouest, nord, est);
        
        // On extrait le vrai tableau 
        const alertes = reponseAPI.data || reponseAPI || [];

        if (!alertes || alertes.length === 0) {
            // Ton travail : on ne supprime PAS les anciens points si la zone est vide
            
            // On remet le compteur à sa vraie valeur (le total de l'historique)
            document.getElementById('alerts-count').textContent = deforestationLayer.getLayers().length;

            console.log("Aucun résultat");
            setStatus("ℹ️ Aucun résultat trouvé dans cette zone.", "info");

            // Masque le message au bout de 3s
            setTimeout(() => setStatus("", ""), 3000);
            return;
        }

        // On affiche les points
        afficherDonneesSurCarte(alertes);
        mettreAJourGraphique(historiqueAlertes);
        
        // Ton travail : on compte TOUS les points actuellement affichés pour l'historique
        const nbTotalPoints = deforestationLayer.getLayers().length;
        
        // Mise à jour des compteurs (carbone et impact)
        mettreAJourWidgets(nbTotalPoints);

        // On met à jour la bulle de statut avec le succès
        setStatus(`✅ Nouveaux résultats ajoutés !`, "success");
        setTimeout(() => setStatus("", ""), 3000);

        // Mise à jour du badge avec le total de l'historique
        const badgeAlertes = document.getElementById('alerts-count');
        if (badgeAlertes) {
            badgeAlertes.textContent = nbTotalPoints;
        }
    }
    catch(error) {
        console.error("Erreur lors de la récupération des données :", error);
        setStatus("❌ Erreur retournée par l'API.", "error");
        document.getElementById('alerts-count').textContent = "Erreur";
    }
});

// ==========================================================================
//   Bouton "Poubelle" personnalisé (Un seul clic pour tout vider)
// ==========================================================================

const customTrashControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function() {
        // recup icone via lextension leaflet.draw
        const container = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', 'leaflet-draw-edit-remove', container);
        
        button.href = '#';
        button.title = 'Tout effacer d\'un clic';

        // L'action suite au clic (le code reste exactement le même)
        L.DomEvent.on(button, 'click', function(e) {
            L.DomEvent.stop(e); 
            
            // 1. Efface le rectangle
            drawnItems.clearLayers();
            
            // 2. Efface les points rouges
            deforestationLayer.clearLayers();
            
            // 3. Vide la mémoire
            pointsVus.clear();
            historiqueAlertes.length = 0;
            reinitialiserGraphique();
            reinitialiserWidgets();
            
            // 4. Compteur à zéro
            const badgeAlertes = document.getElementById('alerts-count');
            if (badgeAlertes) badgeAlertes.textContent = 0;

            // 5. Notification
            setStatus("🧹 Carte réinitialisée", "info");
            setTimeout(() => setStatus("", ""), 3000);
        });

        return container;
    }
});

// ajoute notre nouvelle poubelle à la carte
map.addControl(new customTrashControl());