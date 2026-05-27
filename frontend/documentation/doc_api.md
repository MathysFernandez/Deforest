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

---

# 📁 Variables d’environnement (.env)

Les informations sensibles sont stockées dans un fichier `.env` situé dans le dossier backend.

Exemple :

```env
GFW_API_KEY=NOTRE_CLE_API (On ne le met pas pour une question de sécurité)
GFW_BEARER_TOKEN=NOTRE_TOKEN
PORT=3000
```

---

## ⚠️ Important pour tous les membres du projet

Le fichier `.env` n’est jamais envoyé sur GitLab pour des raisons de sécurité.

Chaque utilisateur qui clone le projet doit :
1. récupérer le fichier `.env`,
2. le placer dans le dossier `backend/`,
3. utiliser ses propres clés API si nécessaire.

Sans le fichier `.env`, le backend ne peut pas démarrer correctement et les requêtes API échouent.

---

# 🚫 Protection Git

Le fichier `.env` est ignoré grâce au `.gitignore`.

```gitignore
backend/.env
node_modules/
```

Cela évite de publier les clés sensibles sur GitLab.

---

# ⚙️ Installation du backend

Le backend utilise **Node.js** et **Express.js**.

Chaque utilisateur doit installer les dépendances du projet après avoir cloné le dépôt Git.

---

# 📦 Installer Node.js

Node.js est nécessaire pour lancer le serveur backend.

Téléchargement officiel :

https://nodejs.org/

Vérifier l’installation :

```bash
node -v
npm -v
```

---

# 📥 Installation des dépendances

## 1. Aller dans le dossier backend

```bash
cd backend
```

---

## 2. Installer les dépendances du projet

```bash
npm install
```

Cette commande :
- télécharge automatiquement toutes les bibliothèques nécessaires,
- crée le dossier `node_modules/`,
- installe Express, dotenv et les autres dépendances.

---

# 📁 Pourquoi node_modules n’est pas envoyé sur GitLab ?

Le dossier `node_modules/` peut être recréé automatiquement grâce à :

```bash
npm install
```

Il est donc ignoré dans le `.gitignore`.

Cela permet :
- d’éviter des fichiers trop lourds sur GitLab,
- de garder un projet propre,
- d’assurer que chaque utilisateur installe les bonnes versions.