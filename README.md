# 🌳 Deforest

## 🚀 Installation

1. Clone the project
```bash
git clone https://github.com/MathysFernandez/Deforest.git
```


---
## 📌 Features

- 🔍 Data retrieval from the Global Forest Watch API
- 📊 Visualization of areas affected by deforestation
- 🗺️ Interactive map display
- 📈 Statistics and charts
- ⚡ Dynamic data updates




---
## 🛠️ Technologies Used

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- JavaScript

## API
> The project uses the official Global Forest Watch API.

### Official Documentation
https://data-api.globalforestwatch.org/

### Project Management
- GitLab



---

## 👥 Team

| <a href="https://github.com/MathysFernandez"> <img src="https://avatars.githubusercontent.com/u/90396790?s=96&v=4?width=800" width="64" height="64"> </a> | **Nom :** Fernandez Mathys <br> **Rôle :** Chef de projet \| Gestionnaire API <br> **GitLab :** [mon profil](https://github.com/MathysFernandez) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://gitlab.univ-lr.fr/tsoilihi"> <img src="https://gitlab.univ-lr.fr/uploads/-/system/user/avatar/2486/avatar.png?width=800" width="64" height="64"> </a> | **Nom :** Soilihi Timeo <br> **Rôle :** Lead Developer \| Gestionnaire serveur <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/tsoilihi) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://github.com/nav-ratsimba"> <img src="https://secure.gravatar.com/avatar/2b24fb9d58a9c8913b0ed4cb0e434e44fdae33e07babbd772275ca3c8b7b1f24?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Ratsimbazafy Harinavalona <br> **Rôle :** Data Visualisation \| Designer UI/UX <br> **GitLab :** [mon profil](https://github.com/nav-ratsimba) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://gitlab.univ-lr.fr/jzambran"> <img src="https://gitlab.univ-lr.fr/uploads/-/system/user/avatar/2480/avatar.png?width=800" width="64" height="64"> </a> | **Nom :** Zambrano Junior <br> **Rôle :** Designer UI/UX \| Spécialiste Cartographie <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/jzambran) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|


| <a href="https://gitlab.univ-lr.fr/yabbes"> <img src="https://secure.gravatar.com/avatar/008c586d810a1f01fdaeed886b2c74ec16fbfa3019ffb91c8bfa6d9c16101572?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Abbes Yris <br> **Rôle :** Gestionnaire serveur \| Designer UI/UX <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/yabbes) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|

| <a href="https://gitlab.univ-lr.fr/zaballo"> <img src="https://secure.gravatar.com/avatar/388f07dab044217385f6f65e849931ffe3da2077c473d96363cd3563f9ee869f?s=1600&d=identicon" width="64" height="64"> </a> | **Nom :** Aballo Zaef <br> **Rôle :** Scrum Master \| Gestionnaire API \| Responsable Qualité/Tests <br> **GitLab :** [mon profil](https://gitlab.univ-lr.fr/zaballo) |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|




---

## 📂 Structure du projet

```bash
deforest/
│
├── frontend/             # UI
│   ├── components/
│   ├── core/
│   ├── assets/
│   ├── documentation/
│   └── index.html
│
├── backend/               # Backend erveur 
│   ├── node_modules/
│   ├── .env           # Environment variables 
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

## 🚀 Installation

### 1. Clone the projet

```bash
git clone git@gitlab.univ-lr.fr:pingouins/deforest.git
```

### 2. Access the directory

```bash
cd deforest/backend
```

### 3. On Linux:


#### 3.1 Install dependencies

```bash
npm install
```

#### 3.2 If Node.js and npm are not installed

```bash
sudo apt update
sudo apt install nodejs npm
npm --version
```

### 3.3 Environment Configuration (.env)

```bash
node server.js
```

### 4. On Windows:

#### 4.1 Install dependencies

```bash
npm install
```

#### 4.2 If Node.js and npm are not installed

```bash
winget install OpenJS.NodeJS.LTS
```



### 5 Environment Configuration (.env)
Create a file named .env in the root of the backend directory.    
You must generate a key for the Global Forest Watch (GFW) API from the terminal and insert it into this file as follows:   

```bash
GFW_API_KEY= <votre cle>
GFW_BEARER_TOKEN= <votre token>
PORT=3000
```

### 6 Run the project


```bash
node server.js
```


---

## 📅 Project Organization

The project is managed with:
- GitLab Issues
- Merge Requests
- Milestones
- Git Branches

---

---

## 🤝 Contribution and History

To understand how to participate in the project and track its progress, refer to these documents:

- 📜 [**CONTRIBUTING.md**](./CONTRIBUTING.md) :
  Contains all naming conventions (branches, commits) and the Merge Request process to properly contribute to the project.

- ⏱️ [**CHANGELOG.md**](./CHANGELOG.md) :
  Detailed history of modifications, additions, and bug fixes across different versions.



  
---

## 📖 Documentation

All technical documentation will be added to the directory :

```bash
/documentations
```

---

## 🌍 Environmental Goal

This project aims to better understand and visualize the impact of global deforestation through open data and technology.

---

## 📜 Licence

University Project — MIT License

---

## ✨ Future Improvements
- Real-time interactive map
- Advanced charts
- Data export
- Alerts on critical areas
- Analytical dashboard
