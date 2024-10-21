# SearchMas - Prueba Técnica: Node.js, Express, Docker

**Autor: Agustín Avila Humerez**

[Agustín en LinkedIn](https://www.linkedin.com/in/agustin-avila-humerez/)

## Acerca del proyecto

Este proyecto es una aplicación desarrollada con **Express.js**, como parte de una prueba técnica para la postulación a la posición _Backend Developer (Node.js)_. Consiste en un servidor que expone una API REST, el cual proporciona una serie de endpoints que a su vez permiten interactuar una base de datos **(MongoDB)** y una [API externa](https://rickandmortyapi.com/documentation), gestionando las rutas y middlewares correspondientes.

Para la realización de este proyecto se siguieron las pautas indicadas en la consigna brindada, la cual puede ser consultada en el siguiente enlace: [Consigna](https://drive.google.com/file/d/1QYfwRw-0Q53voZsdCba33hVPSuFT3MxF/view?usp=drive_link)

Además, se decidió utilizar **TypeScript** junto con **ESLint** y **Prettier** para mejorar tanto la experiencia de desarrollo como la escalabilidad y la calidad del código final.

Por último, se implementaron algunos tests básicos a modo de ejemplo, utilizando **jest** y **supertest**.

## Dependencias

Las principales dependencias utilizadas en el proyecto son las siguientes:

### Dependencias productivas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/) - [Typegoose](https://typegoose.github.io/typegoose/)
- [Axios](https://axios-http.com/)
- [json-2-csv](https://www.npmjs.com/package/json-2-csv)
- [class-validator](https://www.npmjs.com/package/class-validator) - [class-transformer](https://www.npmjs.com/package/class-transformer)
- [@hapi/boom](https://hapi.dev/module/boom/)
- [compression](https://www.npmjs.com/package/compression)
- [cors](https://www.npmjs.com/package/cors)
- [helmet](https://www.npmjs.com/package/helmet)
- [winston](https://www.npmjs.com/package/winston)

### Dependencias adicionales para desarrollo

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Jest](https://jestjs.io/) - [ts-jest](https://kulshekhar.github.io/ts-jest/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)

_NOTA: Para ver el listado completo de dependencias, consultar el archivo `package.json`._

## Instalación

### Pre-requisitos

Se requiere tener instalado:

- [GIT](https://git-scm.com/downloads)
- [NodeJS v18 o superior](https://nodejs.org/en/download/package-manager)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Clonar el repositorio

```bash
git clone https://github.com/aa-avila/searchmas-api-node-express-docker.git
cd searchmas-api-node-express-docker
```

### Descarga e instalación de dependencias

```bash
yarn install
```

### Configuración

Para la configuración inicial es necesario crear un archivo `.env` y copiar las variables de entorno especificadas en `.env.example`.
Es posible hacerlo manualmente, o utilizando el siguiente comando en la consola:

```bash
cp .env.example .env
```

A fines prácticos para esta prueba técnica, los valores provistos a modo de ejemplo son funcionales para su uso en desarrollo. Por lo que la URI de MongoDB provista apunta a una base de datos alojada en la nube mediante **MongoDB Atlas**.
De todas formas es posible editar el archivo `.env` a gusto para proporcionar otros valores que se ajusten al caso particular del usuario.

## Ejecutar el servidor en local

### Ejecución en modo desarrollo (sin Docker)

Compilar la aplicación por primera vez:

```bash
yarn build
```

Para iniciar el servidor en modo desarrollo, utilizar el siguiente comando:

```bash
yarn dev
```

Este comando permite reinicializar la aplicación cada vez que se realizan cambios en el código, lo que permite acelerar la iteración en desarrollo.

### Ejecución en modo producción (sin Docker)

Para iniciar el servidor en modo producción:

```bash
yarn start
```

Este comando realiza una compilación limpia del código y posteriormente levanta el servidor, asignando el valor `'production'` a la variable de entorno `NODE_ENV`.

### Ejecución en modo producción (con Docker)

1. Construir la imagen de Docker:

   ```bash
   docker build -t api-searchmas
   ```

   Como resultado, se creará una imagen denominada `api-searchmas`.

2. Iniciar el contenedor:

   ```bash
   docker run -p 3000:3000 --env-file=.env api-searchmas
   ```

Esto ejecutará el servidor dentro de un contenedor Docker y estará disponible en `http://localhost:3000`.

_NOTA: Para crear la imagen y ejecutar el proyecto usando Docker, es necesario tener previamente instalado [Docker](https://www.docker.com/)_

_NOTA: Los puertos pueden modificarse según necesidad del entorno._

## Tests

Ejecutar tests mediante el siguiente comando:

```bash
yarn test
```

## API Endpoints

### POST /api/external-data

- Recibe una solicitud para consultar una API externa y guarda en la base de datos: los datos del solicitante junto con parte de los datos obtenidos.
- Dicha consulta, consiste en obtener la información de un personaje al azar, perteneciente a la serie televisiva _"Rick and Morty"_. Para lo cual se consume la siguiente API: [Rick And Morty API](https://rickandmortyapi.com/documentation)

**Payload Schema**

| Property         | Type     | Description                       |
| ---------------- | -------- | --------------------------------- |
| `requester*`     | `string` | Nombre del solicitante            |
| `requestReason?` | `string` | Motivo de la solicitud (opcional) |

**Body Example:**

```json
{
  "requester": "Jon Snow",
  "requestReason": "The more you give a king, the more he wants."
}
```

**OK (201) Response Example:**

```json
{
  "data": {
    "_id": "67168be38ba437276aeed68b"
  }
}
```

### GET /api/data

- Retorna los registros almacenados en la base de datos, junto con estadísticas adicionales.

**OK (200) Response Example:**

```json
{
  "data": {
    "docs": [
      {
        "_id": "67168be38ba437276aeed68b",
        "requester": "Jon Snow",
        "requestReason": "The more you give a king, the more he wants.",
        "externalId": 106,
        "name": "Dr. Schmidt",
        "species": "Human",
        "gender": "Male",
        "image": "https://rickandmortyapi.com/api/character/avatar/106.jpeg",
        "episodes": ["https://rickandmortyapi.com/api/episode/13"],
        "url": "https://rickandmortyapi.com/api/character/106",
        "createdAt": "2024-10-21T17:14:11.478Z",
        "updatedAt": "2024-10-21T17:14:11.478Z"
      }
    ],
    "stats": {
      "totalDocs": 1,
      "requesters": 1,
      "characters": 1,
      "maleGender": 1,
      "femaleGender": 0,
      "genderless": 0,
      "unknownGender": 0,
      "species": 1,
      "episodes": 1
    }
  }
}
```

### GET /api/export-csv

- Genera un archivo CSV descargable con los datos almacenados en la base de datos.

### GET /health

- Endpoint adicional como utilidad "health check" para verificación de correcto despliegue y estado activo del servidor.

**OK (200) Response Example:**

```json
{
  "data": "OK"
}
```
