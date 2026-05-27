# 🌳 Deforest

Deforest est une application permettant de suivre et visualiser la déforestation mondiale grâce aux données fournies par l’API de Global Forest Watch (GFW).

Le projet a pour objectif de :
- récupérer des données environnementales en temps réel,
- analyser l’évolution de la déforestation,
- afficher des statistiques et visualisations interactives,
- sensibiliser aux enjeux environnementaux.

---

# 📌 Fonctionnalités

- 🔍 Récupération des données depuis l’API Global Forest Watch
- 📊 Visualisation des zones touchées par la déforestation
- 🗺️ Affichage cartographique interactif
- 📈 Statistiques et graphiques
- ⚡ Mise à jour dynamique des données

---

# 🛠️ Technologies utilisées

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- JavaScript

## API
- Global Forest Watch API

## Gestion de projet
- GitLab


---

# 👥 Équipe

| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://secure.gravatar.com/avatar/008c586d810a1f01fdaeed886b2c74ec16fbfa3019ffb91c8bfa6d9c16101572?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Abbes Yris <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/yabbes) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|


| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://secure.gravatar.com/avatar/2b24fb9d58a9c8913b0ed4cb0e434e44fdae33e07babbd772275ca3c8b7b1f24?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Ratsimbazafy Harinavalona <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/hratsimb) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|


| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://gitlab.univ-lr.fr/uploads/-/system/user/avatar/2486/avatar.png?width=800" width="64" height="64"> </a> | **Nom :** Soilihi Timeo <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/tsoilihi) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|


| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://gitlab.univ-lr.fr/uploads/-/system/user/avatar/2469/avatar.png?width=800" width="64" height="64"> </a> | **Nom :** Fernandez Mathys <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/mferna08) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|




| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://secure.gravatar.com/avatar/388f07dab044217385f6f65e849931ffe3da2077c473d96363cd3563f9ee869f?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Aballo Zaef <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/zaballo) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|



| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://gitlab.univ-lr.fr/uploads/-/system/user/avatar/2480/avatar.png?width=800" width="64" height="64"> </a> | **Nom :** Zambrano Junior <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/jzambran) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|


---

# 🌐 API utilisée

Le projet utilise l’API officielle de Global Forest Watch.

## Documentation officielle
https://data-api.globalforestwatch.org/



---

# 📂 Structure du projet

```bash
deforest/
│
├── frontend/              # Interface utilisateur
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/               # Serveur backend
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── config/
│
├── api/                   # Gestion des appels API GFW
│   ├── gfwService.js
│   └── utils.js
│
├── docs/                  # Documentation du projet
│
├── .env                   # Variables d’environnement
├── .gitignore
├── package.json
└── README.md
```

---

# 🚀 Installation

## 1. Cloner le projet

```bash
git clone git@gitlab.univ-lr.fr:pingouins/deforest.git
```

## 2. Accéder au dossier

```bash
cd deforest/backend
```

## 3. Sous Linux:


## 3.1 Installation des dépendances

```bash
npm install
```

## 3.2 Si Node.js et npm ne sont pas installés 

```bash
sudo apt update
sudo apt install nodejs npm
npm --version
```

## 3.2 Configuration de l'environnement (.env)

```bash
node server.js
```

## 4. Sous Windows:

## 4.1 Installation des dépendances

```bash
npm install
```

## 4.2 Si Node.js et npm ne sont pas installés 

> Ligne de commande: 
```bash
winget install OpenJS.NodeJS.LTS
```



## 5 Configuration de l'environnement (.env)
Créez un fichier nommé .env à la racine du dossier backend.
Vous devez générer une clé pour l'API Global Forest Watch (GFW) depuis le terminal et l'insérer dans ce fichier de la manière suivante :

```bash
GFW_API_KEY= <votre cle>
GFW_BEARER_TOKEN= <votre token>
PORT=3000
```







---

# 🖥️ Utilisation du Serveur (Déploiement Rapide)

Le frontend du projet est accessible en interne via un serveur web Apache (IP : ```192.168.110.132```).

## 1. Se connecter au serveur

Ajoutez la route réseau (si vous êtes sur un PC personnel à l'université) puis connectez-vous en SSH :

```bash
sudo ip route add 192.168.110.0/24 via 10.192.12.11
ssh omer@192.168.110.132
```
(Mot de passe : simpsons)

## 2. Publier une mise à jour

Après avoir codé et sauvegardé vos modifications (idéalement via VS Code avec l'extension Remote - SSH), déployez-les en direct sur le serveur Apache avec cette commande :

```bash
sudo cp -r ~/deforest/frontend/* /var/www/html/
```

Le site est ensuite visible par tous sur le réseau à l'adresse :

http://192.168.110.132


---

# 🔄 Workflow Git

## Convention des branches

```bash
feature/nom-feature
fix/nom-fix
docs/readme
```

## Exemple

```bash
feature/api-gfw
feature/frontend-map
feature/backend-server
```

---

# 📅 Organisation du projet

Le projet est géré avec :
- GitLab Issues
- Merge Requests
- Milestones
- Branches Git

---

# 📖 Documentation

Toute la documentation technique sera ajoutée dans le dossier :

```bash
/docs
```

---

# 🌍 Objectif environnemental

Ce projet vise à mieux comprendre et visualiser l’impact de la déforestation mondiale grâce aux données ouvertes et à la technologie.

---

# 📜 Licence

Projet universitaire — Licence MIT

---

# ✨ Améliorations futures

- Carte interactive en temps réel
- Graphiques avancés
- Export des données
- Alertes sur les zones critiques
- Tableau de bord analytique