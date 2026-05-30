/* Navigation entre les sections et initialisation */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initialisation de l'application...");

    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    // On lance l'actualisation de la carte (qui est gérée dans carte.js)
    if (typeof actualiserCarteDynamique === "function") {
        actualiserCarteDynamique();
    }

    // Gestion de la navigation entre les onglets
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

            if (viewName === 'carbone' || viewName === 'impact') {
                if (typeof relancerAnimations === "function") {
                    relancerAnimations();
                }
            }
        });
    });
});