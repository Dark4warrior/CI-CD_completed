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
