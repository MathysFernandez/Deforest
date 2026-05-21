async function fetchDeforestationData() {

    try {

        // appel vers notre backend sécurisé
        const response = await fetch(
            'http://localhost:3000/api/alerts'
        );

        if (!response.ok) {

            throw new Error(
                `Erreur backend : ${response.status}`
            );
        }

        const jsonResponse = await response.json();

        return jsonResponse.data || [];

    } catch (error) {

        console.error(
            "Erreur récupération backend :",
            error
        );

        return [];
    }
}