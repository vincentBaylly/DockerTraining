docker container run -d -p 3306:3306 --name db -e MYSQL_RANDOM_ROOT_PASSWORD=true mysql
docker logs db | grep GENERATED
--Copier le mot de passe
docker container run -d -p 8080:80 --name webserver httpd
docker container run -d -p 80:80 --name proxy nginx
docker container ls
curl localhost
docker container stop db_ID webserver_ID proxy_ID
docker container ls -a
docker container rm db_ID webserver_ID proxy_ID
docker image ls