# Centribal Prueba Tecnica

Aplicación de gestión de artículos y pedidos.

## Prerrequisitos

- Git
- Docker

## Instalación (GitHub)

1. Clonar el repositorio de Git

2. Abrir la terminal y ubicarse en la carpeta raíz del proyecto

3. Construir la imagen de Docker con el siguiente comando:

### `docker build -t centribal .`

4. Ejecutar la imagen de Docker con el siguiente comando:

### `docker run -p 3000:3000 -p 3001:3001 centribal`

5. En un navegador web, acceder a la aplicación en http://localhost:3000

## Instalación (DockerHub)

1. Descargar la imagen de Docker desde DockerHub con el siguiente comando:

### `docker push jdpedroza/centribal:latest`

2. Ejecutar la imagen de Docker con el siguiente comando:

### `docker run -p 3000:3000 -p 3001:3001 centribal`
