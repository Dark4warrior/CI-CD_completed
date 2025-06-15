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

![image](https://github.com/user-attachments/assets/0c3bfce1-ecb8-429e-96dc-5f656b72cc62)


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

![Rollback via Terraform](https://github.com/user-attachments/assets/4460c33e-bb68-47ce-8d17-73a48366209d)

Capture de l'exécution de la commande `terraform apply` sur le fichier `rollback.tf`, déclenchant la restauration complète de la VM depuis un snapshot précédent. L'adresse IP publique générée est bien affichée, indiquant une VM restaurée et fonctionnelle.
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

![Exécution d'Ansible](https://github.com/user-attachments/assets/20f41b3b-8f08-4951-b993-f49cf5d76d75)

Playbook exécuté avec succès depuis WSL Ubuntu. Toutes les étapes de configuration serveur sont automatisées.
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

![Exécution GitHub Actions (workflow complet)](https://github.com/user-attachments/assets/326cc4ec-2c2b-487e-80ee-5509477910b7)
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
![Onglet "Releases" avec un tag](https://github.com/user-attachments/assets/61b7cae3-5b72-4b85-99a2-89a76bf97e8a)

---

## 🔐 Secrets & Environnements

* Staging : `develop`
* Production : `main`
* Secrets stockés dans GitHub (onglet Secrets)

📸 Capture à insérer : GitHub Settings > Secrets
![ GitHub Settings > Secrets](https://github.com/user-attachments/assets/d0397c72-a83e-4ebc-ab8d-5b5c7ca5501d)

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

![Rollback réussi](https://github.com/user-attachments/assets/559a1be4-927a-4672-ac3f-ddc41bd4983a)

![Rollback via Terraform](https://github.com/user-attachments/assets/4460c33e-bb68-47ce-8d17-73a48366209d)

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

![état avant rollback](https://github.com/user-attachments/assets/df7bdfc4-1413-4879-9154-f3901264d407)

![état après rollback](https://github.com/user-attachments/assets/26d227d1-fe06-4023-ab98-dedea3e0f14f)

