async function fetchDeforestationData(sud, ouest, nord, est) {
    try {
        const response = await fetch('http://localhost:3000/api/alerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sud, ouest, nord, est })
        });

        if (!response.ok) {
            throw new Error(`Erreur backend : ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Erreur récupération backend :", error);
        throw error;
    }
}