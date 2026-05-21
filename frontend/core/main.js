/* Navigation entre les sections */
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

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

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const viewName = button.getAttribute('data-view');
            
            // Masquer toutes les sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Désactiver tous les boutons
            navButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Afficher la section sélectionnée
            const selectedSection = document.getElementById(`view-${viewName}`);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }

            // Activer le bouton sélectionné
            button.classList.add('active');
        });
    });
});
