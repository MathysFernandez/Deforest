document.addEventListener("DOMContentLoaded", async () => {
    console.log("Initialisation de l'application...");

    // Recuperer les données;
    const alertesDeforestation = await fetchDeforestationData();

    // Si des données, les afficher sur la carte
    if (alertesDeforestation.length > 0) {
        console.log("On a des données");
        afficherDonneesSurCarte(alertesDeforestation);

        // Mettre à jour compteur d'alertes dans le header HTML
        const badgeAlertes = document.getElementById('alerts-count');
        if (badgeAlertes) {
            console.log("modification compteur d'alertes");
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