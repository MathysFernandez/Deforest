document.addEventListener("DOMContentLoaded", async () => {
    console.log("Initialisation de l'application...");

    // Recuperer les données;
    const alertesDeforestation = await fetchDeforestationData();

    // Si des données, les afficher sur la carte
    if (alertesDeforestation.length > 0) {
        afficherDonneesSurCarte(alertesDeforestation);

        // Mettre à jour compteur d'alertes dans le header HTML
        const badgeAlertes = document.getElementById('alerts-count');
        if (badgeAlertes) {
            badgeAlertes.textContent = alertesDeforestation.length;
        }
    } else {
        console.log("Aucune donnée à afficher...");
    }

    // appeler les fonctions d'initialisation des autres wigdets:
    // - initWidgetEvolution();
    // - initWidgetCarbone();
    // - ...
});