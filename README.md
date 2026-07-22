# 🌳 Deforest

## 🚀 Installation

1. Clone the project
```bash
git clone https://github.com/MathysFernandez/Deforest.git
```


---
# 📌 Features

- 🔍 Data retrieval from the Global Forest Watch API
- 📊 Visualization of areas affected by deforestation
- 🗺️ Interactive map display
- 📈 Statistics and charts
- ⚡ Dynamic data updates




---
# 🛠️ Technologies Used

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- JavaScript

## API
- Global Forest Watch API

## Project Management
- GitLab



---

# 👥 Team

| <a href="https://gitlab.univ-lr.fr/yabbes"> <img src="https://secure.gravatar.com/avatar/008c586d810a1f01fdaeed886b2c74ec16fbfa3019ffb91c8bfa6d9c16101572?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Abbes Yris <br> **Rôle :** Gestionnaire serveur \| Designer UI/UX <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/yabbes) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://github.com/nav-ratsimba"> <img src="https://secure.gravatar.com/avatar/2b24fb9d58a9c8913b0ed4cb0e434e44fdae33e07babbd772275ca3c8b7b1f24?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Ratsimbazafy Harinavalona <br> **Rôle :** Data Visualisation \| Designer UI/UX <br> **GitLab :** [mon profil](https://github.com/nav-ratsimba) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://gitlab.univ-lr.fr/tsoilihi"> <img src="https://gitlab.univ-lr.fr/uploads/-/system/user/avatar/2486/avatar.png?width=800" width="64" height="64"> </a> | **Nom :** Soilihi Timeo <br> **Rôle :** Lead Developer \| Gestionnaire serveur <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/tsoilihi) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://github.com/MathysFernandez"> <img src="https://avatars.githubusercontent.com/u/90396790?s=96&v=4?width=800" width="64" height="64"> </a> | **Nom :** Fernandez Mathys <br> **Rôle :** Chef de projet \| Gestionnaire API <br> **GitLab :** [mon profil](https://github.com/MathysFernandez) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://secure.gravatar.com/avatar/388f07dab044217385f6f65e849931ffe3da2077c473d96363cd3563f9ee869f?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Aballo Zaef <br> **Rôle :** Scrum Master \| Gestionnaire API \| Responsable Qualité/Tests <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/zaballo) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://gitlab.univ-lr.fr/mferna08"> <img src="https://gitlab.univ-lr.fr/uploads/-/system/user/avatar/2480/avatar.png?width=800" width="64" height="64"> </a> | **Nom :** Zambrano Junior <br> **Rôle :** Designer UI/UX \| Spécialiste Cartographie <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/jzambran) |
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
├── frontend/             # Interface utilisateur
│   ├── components/
│   ├── core/
│   ├── assets/
│   ├── documentation/
│   └── index.html
│
├── backend/               # Serveur backend
│   ├── node_modules/
│   ├── .env           # Variables d’environnement
│   ├── package-lock.json
│   └── package.json
│
│
│                 
├── .gitignore
├── LICENSE
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

## 6 Lancer le projet


```bash
node server.js
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

---

# 🤝 Contribution et Historique

Pour comprendre comment participer au projet et suivre ses évolutions, consulter ces documents :

- 📜 [**CONTRIBUTING.md**](./CONTRIBUTING.md) : Contient toutes les règles de nommage (branches, commits) et le processus de Merge Request pour contribuer proprement au projet.
- ⏱️ [**CHANGELOG.md**](./CHANGELOG.md) : Historique détaillé des modifications, ajouts et corrections de bugs au fil des différentes versions.

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
