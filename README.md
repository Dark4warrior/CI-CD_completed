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
