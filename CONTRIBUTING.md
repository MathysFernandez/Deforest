# 🤝 Contribuer au projet Deforest

Bienvenue dans le guide de contribution du projet **Deforest** ! 
> [!tip] Ce document définit les règles et les bonnes pratiques que notre équipe de développement s'engage à suivre pour garantir un code propre, stable et un travail collaboratif efficace sur GitLab.




---
## 📌 1. Gestion des Tâches (Issues)

> Avant d'écrire la moindre ligne de code, assurez-vous de travailler sur une tâche définie:      

- Ne démarrez pas un développement sans qu'une **Issue** ne vous soit assignée.    

- Si vous repérez un bug ou souhaitez ajouter une fonctionnalité, créez d'abord une nouvelle Issue en la décrivant clairement.    

- Liez toujours votre travail à la **Milestone** correspondante (ex: *Sprint 1 - Front-end*).

- Attribuez vous un `reviewer` (sauf si c'est juste pour ajouter de la documentation)



---
## 🌿 2. Règles de Nommage des Branches

Nous utilisons une approche basée sur des branches isolées pour ne jamais casser la branche principale. 

Créez une nouvelle branche pour chaque Issue en utilisant `Create merge request` sur votre issue.

> GitLab générera automatiquement le nom de la branche à partir du numéro et du titre de l'Issue.   



---
## 💾 3. Convention des Commits

Vos messages de commit doivent être clairs, concis et expliquer *pourquoi* la modification a été faite. 

**Format attendu :**
`Description courte du changement`

**Exemple :**
- `Intégration de la librairie Leaflet pour la carte`



---
## 🔀 4. Processus de Merge Request

Une fois votre développement terminé sur votre branche, vous ne devez **jamais** fusionner (merge) vous-même votre code sur la branche principale sans la comfirmation du reviewer (précèdement assigné).

1. **Informer votre reviewer** pour une validation.
2. S'il y a des **conflits de merge**, c'est à l'auteur de la MR de les résoudre avant de demander la validation finale.
3. Une fois validée par un pair, la MR est fusionnée et la branche temporaire sera supprimée automatiquement.

---

## ⚙️ 5. Environnement et Clés API

- **Ne pushez jamais vos clés API sur GitLab.** - Le fichier `.env` est ignoré par notre `.gitignore`. 