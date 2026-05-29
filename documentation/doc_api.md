<div align="center">
    <h1>🌐 Documentation API - Deforest</h1>
</div>

Ce document explique le fonctionnement de l’API utilisée dans le projet, la sécurisation des clés d’accès ainsi que la communication entre le frontend et le backend.

---

# 📌 Présentation

Le projet utilise l’API officielle de **Global Forest Watch (GFW)** afin de récupérer des données de déforestation mondiale en temps réel.


[Documentation officielle](https://data-api.globalforestwatch.org/)

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

Les informations sensibles sont stockées dans un fichier `.env` à placer dans le backend parcequ'il n'est pas placé par défaut.

Exemple :

```env
GFW_API_KEY=  <NOTRE_CLE_API> 
GFW_BEARER_TOKEN=  <NOTRE_TOKEN>
PORT=3000
```

---

## ⚠️ Important pour tous les membres du projet

Le fichier `.env` n’est jamais envoyé sur GitLab pour des raisons de sécurité.

Chaque utilisateur qui clone le projet doit :
1. récupérer le fichier `.env`,
2. le placer dans le dossier `backend/`,
3. utiliser ses propres clés API si nécessaire.

> [!warning] Sans le fichier `.env`, le backend ne peut pas démarrer correctement et les requêtes API échouent.    

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

---

# 🪟 Installation sous Windows

## 1. Télécharger Node.js

Télécharger l’installateur depuis :

https://nodejs.org/

Choisir la version **LTS** recommandée.

---

## 2. Installer Node.js

Lancer l’installateur `.msi` puis :
- cliquer sur *NEXT*,
- accepter les conditions,
- laisser les options par défaut,
- terminer l’installation.

---

## 3. Vérifier l’installation

Ouvrir un terminal PowerShell ou CMD :

```bash
node -v
npm -v
```

Les versions installées doivent apparaître dans le terminal.

---

# 🐧 Installation sous Linux (Ubuntu)

## 1. Installer npm et Node.js

```bash
sudo apt update
sudo apt install npm
```

---

## 2. Vérifier l’installation

```bash
npm --version
node -v
```

> Les versions installées doivent apparaître dans le terminal.    

---

# 📥 Installation des dépendances du projet

## 1. Aller dans le dossier backend

```bash
cd backend
```

---

## 2. Installer les dépendances

```bash
npm install
```

Cette commande :
- télécharge automatiquement les bibliothèques nécessaires,
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


# 🚀 Lancer le serveur

> [!tip] Une fois le fichier `.env` configuré et les dépendances installées, lancez le serveur avec :   

```bash
node server.js
```

Le terminal devrait afficher: Serveur lancé sur le port 3000. 
