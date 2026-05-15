// ==========================================================================
//   la carte avec Leaflet <- Bibliothèque 
// ==========================================================================

// le tableau c'est pour donner la position inital et le 2 pour le zoom
const map = L.map('maCarte', { 
    attributionControl: false, 
    zoomControl: false 
}).setView([20, 0], 2);

//  l'ajout des tuiles (CartoDB Dark Matter <- fournisseur ) 
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    // les attributions on les a caché pour conserver l'ergonomie du site, mais ça reste important de les montrer
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', 
    subdomains: 'abcd',
    maxZoom: 18, // zoom maximum 
    minZoom: 2   // éviter de dézoomer à l'infini
}).addTo(map);

L.control.zoom({
    position : 'bottomleft',
}).addTo(map);

// en travail pour l'instant, on rajoute les points de déforestation après
const deforestationLayer = L.layerGroup().addTo(map);

console.log("Carte initialisée !");