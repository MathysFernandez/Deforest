/* Navigation entre les sections */
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

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
