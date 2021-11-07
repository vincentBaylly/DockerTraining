# build de l image avec la commande docker build -t php-mysql:fpm -f php.dockerfile
FROM php:fpm
RUN docker-php-ext-install mysqli
CMD ["php-fpm"]