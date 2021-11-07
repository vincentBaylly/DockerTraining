# Formation Docker

proposé par [doussou-formation.com](https://www.doussou-formation.com/formation/formation-docker/)

Cette formation Docker s'adresse aux differents professionnels TI qui souhaitent réaliser une structure de deploiement automatisé.
La formation ne demande pas ou peu de connaissance technique. Le formateur prendra le temps d'installer un environnement complet pour permettre la mise en place et la configuration des conteneurs Docker

Besoins technologiques pour la formation en ligne: avoir un ordinateur connecté à internet et un microphone.

# Information pour la formation

ce repository contient les differentes lignes de commandes et fichiers necessaires pour les differents exercices et pratique de la formation

## Docker Configuration

```bash
docker version
docker info
docker run
docker container run
```

## Docker First container

```bash
docker container run --publish 80:80 [--detach] nginx
```

## Docker command line

```bash
docker container ls
docker stop CONTAINER_ID
docker container ls -a
docker container logs CONTAINER_NAME
docker container top CONTAINER_NAME
docker container rm CONTAINER_ID
```

## Exercice Multi Conteneur

Voir solution dans le dossier 01-MultiContainer

## Docker Application Multi Version

Voir fichier app.js dans le dossier 02-MultiVersion

Test de l'app 1 sur 2 version de Node

```bash
docker image pull node:6[-slim]
docker container run -t --rm -v $(pwd):/usr/src/app -w /usr/src/app node:6 node app.js
docker image pull node:7
docker container run -t --rm -v $(pwd):/usr/src/app -w /usr/src/app node:7 node app.js
```

Test de l'app 2 sur 2 version de Node

```bash
docker container run -d -v $(pwd):/usr/src/app -w /usr/src/app -p 8001:8000 --name node6 node:6 node app.js
docker container run -d -v $(pwd):/usr/src/app -w /usr/src/app -p 8002:8000 --name node7 node:7 node app.js
```

## Docker Image

Voir le dossier 03-Image

```bash
docker build [-t nomDeLimage .]
docker images
docker run
```

## Docker Image JAR

### Sans Maven

Voir le dossier 04-Image-JAR/HelloWorld-v1.0.0

```bash
docker build -t helloworld .
docker run helloworld
```

### Avec Maven

Voir le dossier 04-Image-JAR

## Docker Maven

Voir le dossier 05-Image-Maven

```bash
docker build -t helloworld .
docker run -i helloworld
```

## Docker Gradle

Voir le dossier 06-Image-Gradle

```bash
docker build -t helloworld .
docker run -i helloworld
```

### Exercice

Voir le dossier 07-PasAPas-Gradle

```bash
gradle -v
```

```bash
gradle init
<hit enter to all the questions>
```

```bash
./gradlew docker
docker images
```

```bash
./gradlew dockerRun
docker ps
```

## Docker Network

```bash
docker network ls
```

### default config

```bash
docker container port webhost
docker container inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' webhost
ifconfig
docker network inspect bridge
```

```bash
docker run -itd --name=container1 alpine
docker run -itd --name=container2 alpine
docker network inspect bridge
```

### add network

```bash
docker network create --driver bridge blue
docker network inspect blue
docker run --network blue -itd --name container1 alpine
docker network inspect blue
```

### default DNS

```bash
docker network create --driver bridge blue
docker network inspect blue
docker run -it --name blue1 --network blue debian /bin/bash
docker run -it --name blue2 --network blue debian /bin/bash
docker network inspect blue
docker attach blue2
cat /etc/resolv.conf
```

## Docker MongoDB

```bash
docker run --name mongodb -d mongo
docker run --name mongodb -d -p 27017:27017 mongo
docker run --name mongodb -d -v YOUR_LOCAL_DIR:/data/db mongo
docker run --name mongodb -d --network mynetwork mongo
docker run --name mongodb -d -e MONGO_INITDB_ROOT_USERNAME=AzureDiamond -e MONGO_INITDB_ROOT_PASSWORD=hunter2 mongo
docker run -d --name MYAPP -e MONGODB_CONNSTRING=mongodb+srv://username:password@clusterURL MYAPP:1.0
```

## Docker Volume

```bash
docker volume create nginx-config
docker run -d --name devtest --mount source=nginx-config,target=/etc/nginx nginx:latest
```

## Docker Compose

```bash
docker-compose version
docker-compose up -d
```

```bash
docker pull nginx
docekr pull php:fpm
docker pull mariadb
mkdir -p /Docker/web/{conf.d,sites,www}
ls /Docker/web
conf.d  sites www
wget https://www.adminer.org/static/download/4.8.1/adminer-4.8.1.php -O /Docker/web/www/adminer.php
docker build -t php-mysql:fpm -f php.dockerfile .
```

## Docker Payara

```bash
docker run --cpus=1.5 -m=1024m -p 8080:8080 payara/server-full
```

```bash
docker build --tag=my-payara-project .
docker ps
docker exec -it CONTAINER_ID bash
cat glassfish/domains/domain1/config/domain.xml
```

```bash
docker-compose up
```

```bash
docker exec
docker ps
docker cp CONTAINER_ID:/opt/payara41/glassfish/domains/domain1/config/domain.xml .
```

```bash
docker build --tag=my-payara-project .
docker-compose up
```

## Docker Hub

```bash
docker search mysql
docker pull mysql
```

```bash
docker pull bitnami/mysql
```

```bash
docker build -t username/first-repo .
docker run username/first-repo
docker push username/first-repo
```

## Docker Registry

```bash
apt install apache2-utils -y
mkdir ~/docker-registry/auth
mkdir ~/docker-registry/auth
htpasswd -Bc registry.password username
```

```bash
htpasswd -B registry.password username
```

```bash
docker-compose -d up
docker commit CONTAINER_ID NEW_IMAGE_NAME
docker login <your-private-registry>
docker pull <your-private-registry>/<repository>/<image>:<tag>
docker push <your-private-registry>/<repository>/<image>:<tag>
```

### Docker Kubernetes

```bash
kubectl get nodes
```

```bash
docker container ls
docker info
```

```bash
kubectl apply -f pod.yaml
kubectl get pods
kubectl logs demo
kubectl delete pod demo
```

```bash
kubectl apply -f bb.yaml
kubectl get deployments
kubectl get services
kubectl delete -f bb.yaml
```

### voting app

```bash
kubectl create -f k8s-specifications/
```

## Docker Monitoring

### Base Monitoring

```bash
docker logs --follow --tail 10 7786807d8084
docker run ... ; docker logs $(docker ps -lq)
docker ps -a
docker logs CONTAINER_ID
docker logs CONTAINER_NAME
```

```bash
docker stats
```

### Docker Monitoring Solution

```bash
docker run -d -p 8083:8083 -p 8086:8086 --expose 8090 --expose 8099 --name influxsrv tutum/influxdb
```

```bash
docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8080:8080 --detach=true --link influxsrv:influxsrv --name=cadvisor google/cadvisor:latest -storage_driver_db=influxdb -storage_driver_host=influxsrv:8086
```

```bash
docker run -d -p 3000:3000 -e INFLUXDB_HOST=localhost -e INFLUXDB_PORT=8086 -e INFLUXDB_NAME=cadvisor -e INFLUXDB_USER=root -e INFLUXDB_PASS=root --link influxsrv:influxsrv --name grafana grafana/grafana
```

Copyright © 2021 - ComputHand - Doussou-Formation - All Rights Reserved
