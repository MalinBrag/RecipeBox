FROM php:8.2-apache

RUN apt-get update \
    && apt-get install -y unzip libzip-dev \
    && docker-php-ext-install pdo_mysql zip

    RUN a2enmod rewrite

    WORKDIR /var/www/html
    
    COPY . /var/www/html

    RUN chown -R www-data:www-data /var/www/html

    RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local

    RUN composer install

    RUN chown -R www-data:www-data /var/www/html

    EXPOSE 80

    CMD ["apache2-foreground"]



