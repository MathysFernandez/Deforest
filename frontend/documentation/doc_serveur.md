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

Hôte : sftp://192.168.110.132

Identifiant : omer

Mot de passe : simpsons

Port : 22

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

# 4. Mettre à jour le site public (Serveur Apache)

Le site est hébergé en permanence par un serveur web Apache. Lorsque vous faites des modifications dans le code via VS Code, elles ne s'affichent pas automatiquement sur le site public. Il faut les copier dans le dossier d'Apache.

Dans le terminal connecté au serveur, lancez cette commande pour déployer les modifications :


`sudo cp -r ~/deforest/frontend/* /var/www/html/`




