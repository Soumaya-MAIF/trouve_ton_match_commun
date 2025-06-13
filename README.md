# Application Trouve Ton Match

# Sommaire
* [Présentation](#présentation)
* [Structure du projet](#structure-du-projet)
* [Configuration minimale](#configuration-minimale)
* [Prérequis](#prérequis)
* [Frontend](#frontend)
* [Backend](#backend-java--maven)
* [Déploiement](#déploiement)
* [Contributeurs](#contributeurs)

# Présentation

L'application Trouve Ton Match a pour but de favoriser les mises en relation et les échanges entre un porteur de projet (création d'entreprise par exemple) et un parrain (qui peut lui apporter son expertise, l'aider) dans ses démarches.

Lien vers l'application : [https://ttm-dreamteam.nocturlab.fr/](https://ttm-dreamteam.nocturlab.fr/) 

# Structure du projet

* `src/main/js` → Frontend : Application **React** (interface utilisateur)
* `src/main/java` → Backend : Application **Spring Boot** (API, logique métier)
* `/compose.yml` → Déploiement multi-conteneurs avec Docker
* `/.env` → Variables d’environnement pour les bases de données
* `/build.sh` → Script de construction des images Docker
* `README.md` → Documentation du projet

# Configuration minimale
- React : 19.0.0
- Java: 21.0.2
- Maven: 3.9.8
- Node: v18.20.8

# Prérequis

Avant de lancer l'application, assurez-vous que les bases de données nécessaires sont installées et configurées localement ou accessibles à distance.

## Bases de données requises

### 1. PostgreSQL (relationnelle)
Utilisée pour la gestion des données structurées (utilisateurs, etc.).

#### a. Installation de PostgreSQL
Sous Windows

- Télécharge l’installeur depuis le site officiel : https://www.postgresql.org/download/windows/

- Lance l’installation avec les options par défaut ou définis le mot de passe PostgreSQL que tu utiliseras dans .env.

- pgAdmin est inclus dans l’installation pour l’administration graphique.

#### b. Configuration de la base de données PostgreSQL via variables d’environnement

L'application utilise des variables d’environnement pour configurer l’accès à la base de données PostgreSQL. Ces variables sont définies dans un fichier `.env`.

#### c. Création de la base de  données.
Il est possible de créer la base de données via le terminal et la commande:

`createdb -U postgres ttm_commun`

ou bien en utilisant un outil graphique comme __pgAdmin__.


#### d. Variables attendues

| Variable                   | Description                                 | Exemple                                      |
|---------------------------|---------------------------------------------|----------------------------------------------|
| `SPRING_DATASOURCE_URL`   | URL de connexion JDBC                       | `jdbc:postgresql://localhost:5432/ttm_commun` |
| `SPRING_DATASOURCE_USERNAME` | Nom d'utilisateur PostgreSQL              | `postgres`                                   |
| `SPRING_DATASOURCE_PASSWORD` | Mot de passe PostgreSQL                   | `postgres`                                   |

#### e. Exemple de fichier `.env`

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ttm_commun
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
```

> Vous pouvez modifier ces paramètres dans le fichier `application.yml` ou via des variables d’environnement.

### 2. MongoDB (NoSQL)
Utilisée pour stocker des données de la messagerie.

#### a. Installation de MongoDB
Sous Windows

- Télécharger l’installateur depuis : https://www.mongodb.com/try/download/community

- Suivre les étapes d’installation.

- Assurez-vous de cocher l’option pour installer MongoDB Compass (interface graphique).

- Une fois installé, vous pouvez démarrer MongoDB depuis le Service Manager de Windows ou utiliser mongosh.

#### b. Configuration de la base de données MongoDB via variables d’environnement
L'application utilise des variables d’environnement pour configurer l’accès à la base de données MongoDB. Ces variables sont définies dans un fichier .env.

#### c. Création de la base de données
MongoDB crée automatiquement la base de données et les collections lors de la première insertion de données.
Cependant, vous pouvez la créer manuellement à l’aide du shell MongoDB (mongosh) :

`mongosh`

Puis dans le shell :

`use ttm
db.messages.insertOne({ message: "Bienvenue dans Trouve Ton Match !" })`


#### d. Variables attendues

| Variable                      | Description                            | Exemple              |
|------------------------------|----------------------------------------|----------------------|
| `SPRING_DATA_MONGODB_HOST`   | Adresse du serveur MongoDB             | `localhost`          |
| `SPRING_DATA_MONGODB_PORT`   | Port d'écoute de MongoDB               | `27017`              |
| `SPRING_DATA_MONGODB_DATABASE` | Nom de la base de données MongoDB    | `ttm`                |

#### e. Exemple de fichier `.env`

```env
SPRING_DATA_MONGODB_HOST=localhost
SPRING_DATA_MONGODB_PORT=27017
SPRING_DATA_MONGODB_DATABASE=ttm
```


> Assurez-vous que le service MongoDB est bien démarré avant de lancer l'application backend.

---

### Outils recommandés pour le développement

- **pgAdmin** (ou DBeaver) pour gérer PostgreSQL
- **MongoDB Compass** pour visualiser les collections MongoDB


      

# Frontend

### 1. Installer les dépendances
`npm install`

### 2. Démarrer
`npm start`

Exécute l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour l'afficher dans votre navigateur.

La page se rechargera lorsque vous apporterez des modifications.


# Backend (Java + Maven)

### 1. Installation
Pour nettoyer et compiler le backend :

`mvn clean install`

### 2. Démarrer
`mvn spring-boot:run`

# Déploiement

### Docker
Un fichier `docker-compose.yml` est disponible pour lancer l'application avec PostgreSQL et MongoDB.

### Etapes de déploiement

1. **Construire les images Docker**
    `./build.sh`

2. **Pousser les images vers le registre distant**
    - push du dokerFile du frontend: 
    `registry.nocturlab.fr/dreamteam/trouve-ton-match-frontend`
    - push du dokerFile du backend: 
    `registry.nocturlab.fr/dreamteam/trouve-ton-match-backend`

3. **Récupérer les images sur le serveur distant**

    `docker compose pull`

4. **Lancer les conteneurs**
    
    `docker compose up -d`


# Contributeurs
- Soumaya Belhachemi
- Charlotte Charrier
- Jérôme Bouhet





