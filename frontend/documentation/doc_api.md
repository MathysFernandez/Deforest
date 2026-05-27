<div align="center">
    <h1>🌐 Documentation API - Deforest</h1>
</div>

Ce document explique le fonctionnement de l’API utilisée dans le projet, la sécurisation des clés d’accès ainsi que la communication entre le frontend et le backend.

---

# 📌 Présentation

Le projet utilise l’API officielle de **Global Forest Watch (GFW)** afin de récupérer des données de déforestation mondiale en temps réel.

Documentation officielle :

https://data-api.globalforestwatch.org/

---

# 🔐 Sécurisation des clés API

## Pourquoi sécuriser les clés ?

Au départ, les clés API étaient directement présentes dans le frontend JavaScript :

```js
const GFW_API_KEY = "...";
const GFW_BEARER_TOKEN = "...";
```

Cela posait un problème de sécurité car n’importe quel utilisateur pouvait voir les clés depuis le navigateur.

---

# ✅ Nouvelle architecture sécurisée

Le frontend ne contacte plus directement Global Forest Watch.

Le système fonctionne maintenant ainsi :

```txt
Frontend → Backend Express.js → API Global Forest Watch
```

Le backend :
- stocke les clés API,
- effectue les requêtes sécurisées,
- renvoie uniquement les données nécessaires au frontend.