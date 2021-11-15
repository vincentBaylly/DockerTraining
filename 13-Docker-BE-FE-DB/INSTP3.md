# Web Stack Backend - Frontend

L'infrastructure que nous allons mettre en place comprends les modules suivants:

- PostgreSQL database
- Java backend (Spring Boot)
- Angular frontend

## Backend - Java

Creer un application java pour exposer des services web

On cree un repertoire scheduler-app qui contiendra les fichiers pour l'application Java backend

On cree le docker file pour construire notre application.
cf fichier _scheduler-app/dockerfile_

Celle-ci utilisera sprintboot et maven pour sa construction.

Creer le pom.xml pour recuperer les dependances necessaires au projet
spring-boot-starter-actuator
spring-boot-starter-data-jpa
spring-boot-starter-web
liquibase-core 3.6.3
postgresql 42.2.5
lombok 1.18.8

Creer la classe SchedulerApplication pour lancer l'application avec springboot

creer un repertoire model pour declarer les classes de la base de données pour la table Task:
Task
TaskDTO
TaskStatus

Creer le fichier docker-compose.yml pour lancer les conteneurs suivants avec leur configuration:

## Frontend - React

on peut lancer la commande:

```
$ create-react-app scheduler-ui
```

pour creer l'application React front qui appelera notre backend Java

Nous ajouterons un dockerfile pour creer notre envirronement frontend
avec node pour la creation de notre package et nginx pour exposer notre frontend.

On peut executer un conteneur pour ne pas avoir a installer les elements
node sur son poste grace a la commande:
docker container run -v repertoirehote:/home/monappreact --name monappreact node:12.7-alpine

## definition des conteneurs

un conteneur appelé scheduler-postgres avec l'image de alpine 9.6 et de postgres pour la base de données
liant le port 5432 du container au port 5432 de la machine hote
et avec les variables d'environnements suivantes:
POSTGRES_DB=scheduler
POSTGRES_USER=scheduler
POSTGRES_PASSWORD=scheduler
on ajoutera un volume scheduler-data
on l'utilisera pour lier le dossier /var/lib/postgresql/data du conteneur.

un conteneur appelé scheduler-app avec l'image scheduler-app que nous avons defini dans le dockerfile avec java et maven pour construire notre application, on pourra utiliser le mot cle build pour construire l' image de docker en lancant
docker compose.
avec les variables d'environnment suivantes:
DB_SERVER=scheduler-postgres
POSTGRES_DB=scheduler
POSTGRES_USER=scheduler
POSTGRES_PASSWORD=scheduler
liant le port 8080 du container au port 8080 de la machine hote.
On ajoutera un lien sur le conteneur scheduler-postgres

un conteneur appelé scheduler-ui qui utilisera le fichier dockerfile, on pourra utiliser le mot cle build pour construire l' image de docker en lancant
liant le port 80 du container au port 4200 de la machine hote.
On ajoutera un lien sur le conteneur scheduler-app
