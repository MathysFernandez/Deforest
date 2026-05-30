<div align="center">
    <h1>Connexion et Gestion du Serveur</h1>
</div>

Ce document explique comment configurer l'accès au serveur du projet, gérer les fichiers, et déployer les mises à jour du code.

# A. Se connecter au serveur (via le Terminal)

### 1. Ajouter la route réseau :

`sudo ip route add 192.168.110.0/24 via 10.192.12.11`

### 2. Lancer la connexion SSH :

`ssh omer@192.168.110.132`

mot de passe : simpsons

# Gérer les fichiers (via FileZilla)

### 1. Remplissez la barre de connexion rapide en haut avec ces informations :

- Hôte : sftp://192.168.110.132
- Identifiant : omer
- Mot de passe : simpsons
- Port : 22

### 2. Cliquez sur "Connexion rapide". Maintenant glisser-déposer vos fichiers.

# 3. Coder directement sur le serveur (via VS Code)

1. Dans VS Code, installez l'extension Remote - SSH.

2. Cliquez sur l'icône verte >< située tout en bas à gauche de la fenêtre.

3. Dans le menu qui s'ouvre en haut, choisissez Connect to Host... puis Add New Host....

4. Tapez la commande de connexion :

 `ssh omer@192.168.110.132`

5. Choisissez le premier fichier de configuration proposé dans la liste pour sauvegarder le raccourci.

6. Recliquez sur l'icône >< en bas à gauche, faites "Connect to Host..." et sélectionnez 192.168.110.132.

7. Une fois connecté, allez dans l'explorateur de fichiers de VS Code et faites "Open Folder" pour ouvrir le dossier du projet.



# 4. Déployer les mises à jour (Frontend & Backend)
Le projet est divisé en deux parties qui doivent toutes les deux tourner sur le serveur.

### 4.1 Mettre à jour le site public (Serveur Apache - Frontend)
Dans le terminal connecté au serveur, lancez cette commande pour déployer les modifications :

`sudo cp -r ~/deforest/frontend/* /var/www/html/`


### 4.2 Lancer l'API (Serveur Node.js - Backend)
Le serveur Apache ne gère pas l'API Global Forest Watch. Il faut allumer notre propre backend.
```bash
    cd ~/deforest/backend   
    npm install   
    node server.js   
```

> [!warning] Assurez-vous d'avoir bien transféré le fichier `.env` dans ce dossier via FileZilla au préalable.   


# 5. Afficher le site 

http://192.168.110.132




