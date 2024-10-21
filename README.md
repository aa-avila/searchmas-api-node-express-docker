# SearchMas - Technical Test: Node.js, Express, Docker

**Author: Agustín Avila Humerez**

[Agustín on LinkedIn](https://www.linkedin.com/in/agustin-avila-humerez/)

## About this project

This project is an application developed with **Express.js**, as part of a technical test for the application for the position of _Backend Developer (Node.js)_. It consists of a server that exposes a REST API, which provides a series of endpoints that allow interaction between a database **(MongoDB)** and an [external API](https://rickandmortyapi.com/documentation), managing the corresponding routes and middlewares.

To carry out this project, the guidelines indicated in the instructions provided were followed, which can be consulted at the following link:[Instructions](https://drive.google.com/file/d/1QYfwRw-0Q53voZsdCba33hVPSuFT3MxF/view?usp=drive_link)

Additionally, it was decided to use **TypeScript** together with **ESLint** and **Prettier** to improve both the development experience and the scalability and quality of the final code.

Finally, some basic tests were implemented as an example, using **jest** and **supertest**.

## Dependencies

The main dependencies used in the project are the following:

### Dependencies for production

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

### Additional dependencies for development

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Jest](https://jestjs.io/) - [ts-jest](https://kulshekhar.github.io/ts-jest/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)

_NOTE: For a complete list of dependencies, see the `package.json` file._

## Installation

### Prerequisites

It is required to have installed:

- [GIT](https://git-scm.com/downloads)
- [NodeJS v18 o superior](https://nodejs.org/en/download/package-manager)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Clone the repository

```bash
git clone https://github.com/aa-avila/searchmas-api-node-express-docker.git
cd searchmas-api-node-express-docker
```

### Downloading and installing dependencies

```bash
yarn install
```

### Configuration

For initial setup it is necessary to create a `.env` file and copy the specified environment variables into `.env.example`.
This can be done manually, or by using the following command in the console:

```bash
cp .env.example .env
```

For the purposes of this technical test, the values ​​provided as examples are functional for development use. So the MongoDB URI provided points to a database hosted in the cloud using **MongoDB Atlas**.
However, it is possible to edit the `.env` file as desired to provide other values ​​that fit the user's particular case.

## Run the server locally

### Running in development mode (without Docker)

Build the app for the first time:

```bash
yarn build
```

To start the server in development mode, use the following command:

```bash
yarn dev
```

This command allows you to reinitialize your application whenever changes are made to the code, which helps speed up development iteration.

### Running in production mode (without Docker)

To start the server in production mode:

```bash
yarn start
```

This command performs a clean compilation of the code and then starts the server, assigning the value `'production'` to the `NODE_ENV` environment variable.

### Running in production mode (with Docker)

1. Build the Docker image:

   ```bash
   docker build -t api-searchmas .
   ```

   As a result, an image named `api-searchmas` will be created.

2. Start the container:

   ```bash
   docker run -p 3000:3000 --env-file=.env api-searchmas
   ```

This will run the server inside a Docker container and will be available at `http://localhost:3000`.

_NOTE: To create the image and run the project using Docker, you must have previously installed [Docker](https://www.docker.com/)_

_NOTE: Ports can be modified according to the needs of the environment._

## Tests

Run tests using the following command:

```bash
yarn test
```

## API Endpoints

### POST /api/external-data

- Receives a request to query an external API and saves in the database: the requester's data along with part of the data obtained.
- This query consists of obtaining information about a random character, belonging to the television series _"Rick and Morty"_. For this, the following API is used: [Rick And Morty API](https://rickandmortyapi.com/documentation)

**Payload Schema**

| Property         | Type     | Description                      |
| ---------------- | -------- | -------------------------------- |
| `requester*`     | `string` | Requester's name                 |
| `requestReason?` | `string` | Reason of the request (optional) |

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

- Returns the records stored in the database, along with additional statistics.

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

- Generates a downloadable CSV file with the data stored in the database.

### GET /health

- Additional endpoint as a "health check" utility to verify correct deployment and active status of the server.

**OK (200) Response Example:**

```json
{
  "data": "OK"
}
```
