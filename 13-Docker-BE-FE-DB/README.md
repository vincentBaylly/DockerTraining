# Mon App

Nous allons mettre en place une stack complete pour pratiquer la mise en place d'une application avec docker
et docker-compose.

L'infrastructure que nous allons mettre en place comprends les modules suivants:

- PostgreSQL database
- Java backend (Spring Boot)
- Angular frontend

Le point d'entree pour une utilisateur a notre site sera disponible à l'adresse suivante: **http://localhost:3000/**

---

### Prerequis

Pour pouvoir installer l'application, vous avez besoin de 2 outils: **Docker** & **Docker Compose**.

Voici les instructions pour intaller **Docker** sur [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Windows](https://docs.docker.com/docker-for-windows/install/), [Mac](https://docs.docker.com/docker-for-mac/install/).

**Docker Compose** est deja present dans les packages d'installation de _Windows_ et _Mac_, seul les utilisateurs d'Ubuntu doivent suivre [ces instructions](https://docs.docker.com/compose/install/).

### Comment l'executer ?

Vous pouvez retrouver toute les etapes dans le fichier
d'[Insctrution 3](https://github.com/vincentBaylly/DockerTraining/tree/master/13-Docker-BE-FE-DB/INSTP3.md?raw=true)

L'application complete peut etre executer avec la seule commande dans une terminal:

```
$ docker-compose up -d
```

Si vous souhaitez arreter l'application, vous pouvez lancer la commande suivante:

```
$ docker-compose down
```

---

#### scheduler-postgres (Database)

La base de données PostgresSQL contient seulement un schema avec une table - La table task

Apres avoir lancer l'application, on peut y acceder avec les informations de connexion suivantes:

- Host: _localhost_
- Database: _scheduler_
- User: _scheduler_
- Password: _scheduler_

Comme les autres parties de l'application, la base de donnees Postgres est conteneurisé et definit dans le conteneur Docker dans le fichier
_docker-compose.yml_ file.

```yml
scheduler-postgres:
  image: "postgres:9.6-alpine"
  container_name: scheduler-postgres
  volumes:
    - scheduler-data:/var/lib/postgresql/data
  ports:
    - 5432:5432
  environment:
    - POSTGRES_DB:scheduler
    - POSTGRES_USER:scheduler
    - POSTGRES_PASSWORD:scheduler
```

#### scheduler-app (REST API)

C'est une application base sur Spring Boot (Java) qui se connecte à la base de données
et qui expose les endpoints REST que vous pouvez appeler avec un frontend.
Elle supports de multiple methodes HTTP REST comme GET, POST, PUT et DELETE pour 2 ressources task.

Cette application est egalement dans un conteneur Docker et sa définition peut etre trouvé ici:
_scheduler-app/Dockerfile_.

#### scheduler-ui (Frontend)

C'est un veritable endpoint pour un utilisateur qui peut manipuler
ses taches. Elle appelle les endpoints de l'API REST
fourni par _scheduler-app_.

Vous pouvez acceder à l'application à l'adresse: **http://localhost:3000/**
