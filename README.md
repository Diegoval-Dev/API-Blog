# Blog de Fitness

Este proyecto es un blog dedicado al mundo del fitness, que ofrece a los usuarios la posibilidad de leer, escribir y compartir sus experiencias y conocimientos sobre ejercicios, nutrición y bienestar general. Construido con tecnologías modernas, este blog está diseñado para ser fácil de usar, tanto para administradores como para lectores.

## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Antes de comenzar, asegúrate de tener Docker instalado en tu sistema. Si aún no lo tienes, puedes descargarlo e instalarlo desde [Docker](https://www.docker.com/products/docker-desktop).

### Instalación

Para instalar y ejecutar el blog de fitness en tu entorno local, sigue estos pasos:

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/blog-fitness.git
cd blog-fitness 
```
2. Cambia el nombre del archivo docker-compose-copy.yml a docker-compose.yml:
```bash
mv docker-compose-copy.yml docker-compose.yml
```
3. Crea y monta los contenedores Docker:
```bash
docker-compose up --build
```
Una vez completado, el blog debería estar corriendo y accesible en http://localhost:3000 (ajusta el puerto según tu configuración si es necesario).

## Uso
Para empezar a usar el blog, simplemente navega a http://localhost:3000 en tu navegador. Desde allí, podrás explorar los posts existentes, así como crear nuevos posts si estás autenticado como un usuario administrador.

## Construido con

- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript
- [Express](https://expressjs.com/) - Framework de aplicación web
- [Docker](https://www.docker.com/) - Plataforma de contenedores

## Autores

- **Diego Valenzuela** - *Trabajo Inicial* - [Diegoval-Dev](https://github.com/Diegoval-Dev)

