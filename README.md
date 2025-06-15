# CICD API Node.js avec Azure, Terraform & Ansible

Ce projet met en œuvre un pipeline CI/CD complet pour déployer automatiquement une API Node.js sur Microsoft Azure. L’infrastructure est provisionnée via Terraform, configurée par Ansible et automatisée avec GitHub Actions.

---

## 🛠️ Technologies utilisées

* Node.js / Express
* Terraform
* Ansible
* GitHub Actions
* GitFlow
* SemVer (versionnement sémantique)

---

## 🌳 GitFlow

Schéma de branches utilisé :

```
main
 ├── develop
 │    ├── feature/<nom>
 │    ├── release/<version>
 │    └── hotfix/<version>
```

### 📊 Légende :

* **main** : code stable en production
* **develop** : branche d'intégration
* **feature/** : dev des nouvelles features
* **release/** : préparation d’une version
* **hotfix/** : correction rapide en prod

📸 Capture à insérer : Vue GitHub des branches (onglet "branches")

📸 Capture à insérer : Historique des commits de `main` et `develop`

---

## 🏠 Infrastructure (Terraform)

L'infra déployée inclut :

* Groupe de ressources Azure (rg-cicd-api)
* VNet + sous-réseau
* IP publique
* Interface réseau (NIC)
* VM Ubuntu Server 20.04

### Déploiement :

```bash
cd terraform
terraform init
terraform apply
```

### Adresse IP publique :

```bash
terraform output public_ip_address
```

📸 Capture à insérer : Terminal avec terraform apply réussi

---

## 🔧 Configuration serveur avec Ansible

### Outils installés sur la VM :

* Node.js 18, npm
* Git, PM2
* Clonage du repo API
* Lancement via PM2

### Lancer le provisionnement (depuis Linux/WSL) :

```bash
ansible-playbook -i ansible/hosts ansible/playbook.yml
```

📸 Capture à insérer : Exécution Ansible dans le terminal

---

## 🚀 Pipeline CI/CD (GitHub Actions)

Branche `main` ou `develop` → déclenche le déploiement

### Etapes du workflow :

* Setup de Node & deps
* Connexion SSH
* Provisionnement via Ansible
* Déploiement automatique

### Fichier YAML : `.github/workflows/deploy.yml`

### Secrets GitHub :

* `SSH_PRIVATE_KEY` : clé privée SSH pour accès VM
* `VM_IP` : IP dynamique de la VM

📸 Capture à insérer : Exécution GitHub Actions (workflow complet)

---

## 📊 Versionnement sémantique (SemVer)

Format : `v<MAJOR>.<MINOR>.<PATCH>`

Exemples :

* `v1.0.0` : 1ère version stable
* `v1.1.0` : nouvelle feature
* `v1.1.1` : correctif mineur

### Créer un tag Git :

```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

📸 Capture à insérer : Onglet "Releases" avec un tag

---

## 🔐 Secrets & Environnements

* Staging : `develop`
* Production : `main`
* Secrets stockés dans GitHub (onglet Secrets)

📸 Capture à insérer : GitHub Settings > Secrets

---

## 💾 Snapshots & Rollback (Terraform)

### Snapshot disque :

```bash
terraform apply -target=azurerm_snapshot.vm_snapshot
```

### Rollback VM :

```bash
terraform apply -target=azurerm_virtual_machine.vm_restore
```

📂 Fichiers :

* terraform/snapshot.tf
* terraform/rollback.tf

📸 Capture à insérer : Rollback réussi (terraform apply)

---

## 📁 Structure du dépôt

```
api/                <- Code Node.js
terraform/          <- Scripts infra, snapshot, rollback
ansible/            <- Playbook et roles
.github/workflows/  <- Pipeline GitHub Actions
tags/               <- Dossier version SemVer
monitoring/         <- (logs ou captures CI/CD)
snapshots/          <- Export ou fichier tf de snapshots
rollback/           <- Procédure claire pour rollback
README.md           <- Ce fichier complet
```

---

## 📄 Procédures documentées

### Déploiement manuel

```bash
terraform apply
ansible-playbook -i ansible/hosts ansible/playbook.yml
```

### Snapshot

```bash
terraform apply -target=azurerm_snapshot.vm_snapshot
```

### Rollback

```bash
terraform apply -target=azurerm_virtual_machine.vm_restore
```

📸 Capture à insérer : état avant / après rollback
