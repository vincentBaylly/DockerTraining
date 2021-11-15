# Creation de mon site

## Description de la pratique:

Mettre en place un conteneur nginx et deployer votre site
internet sur le serveur.

## Etapes:

Creer votre conteneur nginx avec la commande suivante:

```bash
docker container run -d nginx
```

Changer la configuration du fichier nginx.conf
contenant dans le repertoire:
/etc/nginx/conf.d

Copier le fichier index.html dans le repertoire du conteneur:
/home/nginxuser/www
