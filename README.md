# CICD API Node.js

Ce projet consiste en la mise en œuvre d'une pipeline CI/CD complète pour une API Node.js basique utilisant GitHub Actions, Terraform et Ansible.

## 🛠️ Technologies utilisées :

* Node.js / Express
* Terraform
* Ansible
* GitFlow
* GitHub Actions

---

## 🌳 GitFlow

Ce projet utilise le modèle GitFlow pour une gestion structurée et cohérente des branches.

### 📌 Schéma des branches utilisées :

```
main
 ├── develop
 │    ├── feature/xxx
 │    ├── feature/yyy
 │    └── release/x.y.z
 │
 └── hotfix/x.y.z
```

### 📚 Explication :

* **main** : Branche stable de production.
* **develop** : Branche principale d'intégration des fonctionnalités.
* **feature/** : Développement des nouvelles fonctionnalités (fusion vers `develop`).
* **release/** : Préparation d'une release pour validation avant mise en production (fusion vers `develop` et `main`).
* **hotfix/** : Correction urgente d'erreurs directement en production (fusion vers `develop` et `main`).

---

## 🚧 Infrastructure (Terraform)

L'infrastructure de ce projet est gérée via Terraform et déployée sur Microsoft Azure.

### 🔧 Ressources créées :

* Un groupe de ressources (rg-cicd-api)
* Un réseau virtuel (vnet-cicd-api)
* Un sous-réseau (subnet-cicd-api)
* Une interface réseau (nic-cicd-api)
* Une adresse IP publique dynamique
* Une machine virtuelle Ubuntu Server 20.04 (vm-cicd-api)

### 🚀 Déploiement :

```bash
cd terraform
terraform init
terraform apply
```

### 🌐 Récupération de l'adresse IP publique :

```bash
terraform output public_ip_address
```

⚠️ Le dossier `.terraform/` est ignoré pour éviter de versionner les fichiers lourds du provider local.

---

## 🔧 Configuration du serveur avec Ansible

L'infrastructure provisionnée via Terraform est automatiquement configurée avec Ansible.

### 🧰 Outils installés via Ansible :

* Node.js 18
* npm
* Git
* PM2 (gestionnaire de processus Node.js)
* Clonage de l’API depuis GitHub
* Lancement automatique avec PM2

### 📁 Structure Ansible

* `ansible/hosts` — Inventaire (adresse IP de la VM Azure)
* `ansible/playbook.yml` — Playbook principal
* `ansible/roles/setup/tasks/main.yml` — Liste des tâches de configuration

### ▶️ Lancer le provisionnement (depuis WSL ou Linux) :

```bash
ansible-playbook -i ansible/hosts ansible/playbook.yml
```

L’API est alors automatiquement déployée et accessible à l’adresse :

http\://\<IP\_VM>:3000

---

## 🚀 Pipeline CI/CD avec GitHub Actions

Chaque push sur les branches `main` ou `develop` déclenche automatiquement :

* Installation des dépendances
* (Test désactivé pour le moment)
* Installation d’Ansible
* Connexion SSH à la VM distante
* Provisionnement via Ansible (déploiement automatique)

### 🔐 Secrets GitHub utilisés :

Le fichier `deploy.yml` utilise la clé privée SSH définie comme secret GitHub :

* Nom du secret : `SSH_PRIVATE_KEY`
* Utilisé pour établir la connexion sécurisée entre le runner GitHub et la VM Azure

### 📁 Localisation du pipeline :

* `.github/workflows/deploy.yml`

---

## 🏷️ Versionnement sémantique et tags Git

Ce projet adopte le versionnement sémantique (SemVer) au format :

```
v<MAJOR>.<MINOR>.<PATCH>
```

Exemples :

* v1.0.0 : première version stable
* v1.1.0 : ajout de nouvelles fonctionnalités
* v1.1.1 : correction de bugs mineurs

### 📌 Création d’un tag Git :

```bash
git tag -a v1.0.0 -m "Version stable 1.0.0"
git push origin v1.0.0
```

### 📦 Publication :

* Les tags peuvent être retrouvés dans l’onglet "Releases" du dépôt GitHub
* Chaque version du code est ainsi associée à un snapshot du dépôt (code archivé et identifiable)

---

✅ Prochaines étapes :

* Sauvegardes via Terraform (snapshots de VM)
* Procédures de rollback documentées

📸 Des captures d'écran avec légende seront réalisées pour valider les étapes du livrable final.
