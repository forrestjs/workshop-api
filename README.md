# ForrestJS API Workshop

Step by step video tutorial to using ForrestJS and build a REST and GraphQL API

## The Program

- [Intro to the Workshop](#intro-to-the-workshop)
- [Where to find help and resources](#where-to-find-help-and-resources)
- [Run Postgres and Adminer using Docker](#run-postgres-and-adminer-using-docker)
  - [Project's API](#projects-api)
  - [Connect to Adminer](#connect-to-adminer)
  - [Connect to PSQL](#connect-to-psql)
- [Folder Structure, Features, and Services](#folder-structure-features-and-services)
  - [The Project's Root](#the-projects-root)
  - [The Project's Manifest](#the-projects-manifest)
  - [The Source Folder](#the-source-folder)
  - [The App's Manifest](#the-apps-manifest)
  - [Services & Features](#services--features)
- [Run a ForrestJS App with Nodemon](#run-a-forrestjs-app-with-nodemon)
  - [Add ForrestJS and Nodemon](#add-forrestjs-and-nodemon)
  - [Add the Start Script](#add-the-start-script)
  - [Run a ForrestJS App](#run-a-forrestjs-app)
- [Setup Prettier](#setup-prettier)
- [Validating the NodeJS Environment](#validating-the-nodejs-environment)
  - [Add Envalid & Scaffold](#add-envalid--scaffold)
  - [Validate NODE_ENV](#validate-nodeenv)
  - [Validate PGSTRING](#validate-pgstring)
- [Add `service-pg` and connect to Postgres](#add-service-pg-and-connect-to-postgres)
  - [Install `service-pg`](#install-service-pg)
  - [Add `service-pg` to Your App](#add-service-pg-to-your-app)
- Add `service-pg-schema` and scaffold the `pg-schema` _Feature_
- Use `pg-schema` to build the TodoApp tables
- Use `pg-schema` to seed data
- Add `service-fastify`
- Add `service-fastify-healthcheck`
- Add an _HTML_ welcome page with `service-fastify-static`
- Check for a Postgres connection in the App's Healthcheck
- Scaffold the `todos-rest` Feature
- List existing todos
- Add an _AJV_ schema to the listing route
- Add a new todo
- Add an _AJV_ schema to the new todo route
- Scaffold the `todos-gql` Feature
- List existing todos query
- Add new todo mutation

---

## Intro To The Workshop

[[TO BE COMPLETED]]

---

## Where to Find Help and Resources

- Infrastructure
  - [Docker][dk]
  - [Docker-Compose][dkc]
  - [NodeJS v12+][nd]
  - [PostgreSQL 9.6+][pg]
  - [Adminer][adm]
- NodeJS Frameworks
  - [ForrestJS](https://forrestjs.github.io/)
  - [Fastify](https://www.fastify.io/)
  - [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)

---

## Run Postgres and Adminer using Docker

[PostgreSQL][pg] is a famous relational and document database, [Adminer][adm] is a web-based database manager tool that let you explore your db visually.

We can run both services using [Docker-Compose][dkc] and make the commands a bit easier to write in our console by describing them in a [Makefile][mkf].

### 🍿 Videos

- [Setup Postgres With Docker (3:12)](./videos/docker-compose-postgres.mp4)
- [Login to the Adminer web interface (1:33)](./videos/docker-compose-adminer.mp4)
- [Access PSQL from your Terminal (1:09)](./videos/docker-compose-psql.mp4)

### Project's API

The Project's CLI API are:

```bash
# Pull Docker images and start the infrastructure
make start

# Stop any running container
make stop

# Remove al containers and memory
make clean
```

### Connect to Adminer

Assuming you run the project with the default ports, you can access [Adminer][adm] with your browser:

```
http://localhost:8008
```

And basically login using `postgres` everywhere:

![Adminer Login](./images/adminer-login.png)

### Connect to PSQL

[PostgreSQL][pg] ships a powerful CLI client called [PSQL][psql], and sometimes it is just easier to use a Terminal than it is to run a web interface.

Although you can install it into your machine, you can also just run it via [Docker-Compose][dkc] targeting the running database container:

```bash
# Start a PSQL session with default credentials
make psql

# Start it with a custom password
# (in case you changed it into the docker-compose.yaml)
make psql pg_password=foobar
```

Once you gain access to the PSQL client, you can issue both SQL and PSQL commands.

```bash
# SQL Command:
select now();

# PSQL Command:
quit
\q
```

![psql client](./images/psql.png)

---

## Folder Structure, Features, and Services

A ForrestJS project is based on [NodeJS][nd] and can be easily initialized using the [NPM][npm] command:

```bash
npm init
```

Once you go through, you can then structure your project this way:

```
- root
  - package.json
  - src
    - index.js
    - features/
    - services/
```

### 🍿 Videos

- [Walk Through a ForrestJS Project Structure (4:43)](./videos/folder-structure.mp4)

### The Project's Root

> The **root folder** is where you store your `package.json` file.

In the root folder of a ForrestJS/NodeJS App you find mostly configuration and documentation files:

- project's manifest
- testing environment setup
- editor setup files
- docker-compose for running infrastructural dependencies

### The Project's Manifest

The file `package.json` should contain all the information that are needed to recreate a correct running state for the project:

- dependencies
- commands

I suggest you always provide an `npm start` interface for running your project in **development mode**.

> **Remember:** your developers are the first and most affectionated users of your App!

### The Source Folder

All the JavaScript files go into `/src` for two main reasons:

1. most people do that
2. you may want to use [TypeScript][ts] so your files need transpiling

Anyway, if you ever face a bug that need fixing, it's likely inside this folder.

### The App's Manifest

The file `src/index.js` is the entry point for your App, and in a ForrestJS App take the fancy name of **App Manifest**.

That's because it holds a few **declararive** responsibilities:

- It describes the App's environment
- It describes the App's configuration
- It describes the App's composition  
  <small>of Services and Features</small>

### Services & Features

The beauty of a ForrestJS App lays in its composability and interoperability of Features and Services.

A **Feature** represents a bit of business value, something that your customer is happy to pay for.

> The capability of listing and creating Todos is a good Feature.

A **Service** represents a bit of infrastructural value, something that _YOU_ need to work out your Features, but that the customer is not really interested into.

> The capability of connecting to a PostgreSQL database is a good Service.

---

## Run a ForrestJS App with Nodemon

### 🍿 Videos

- [Install dependencies from NPM (1:13)](./videos/run-forrest-add-dependencies.mp4)
- [Create a Start Script (1:27)](./videos/run-forrest-npm-start.mp4)
- [Start your first ForrestJS App (1:46)](./videos/run-forrest-start.mp4)

### Add ForrestJS and Nodemon

Add [ForrestJS Core](https://www.npmjs.com/package/@forrestjs/core) as a project's dependency:

```bash
npm add @forrestjs/core
```

Add [Nodemon][nm] as a development dependency:

```bash
npm add -D nodemon
```

### Add the Start Script

We can use [Nodemon][nm] to start our App and automatically track changes that we make to the codebase.

Modify `package.json` as follow:

```json
{
  "scripts": {
    "start": "nodemon src/index.js"
  }
}
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/run-with-nodemon/package.json#L6)

Now you can start your App:

```bash
npm start
```

### Run a ForrestJS App

Here is a basic ForrestJS App Manifest scaffold that you can paste into your `src/index.js`:

```js
// Import Core, Services, and Features
const forrestjs = require("@forrestjs/core");

// Kick off a ForrestJS App
const app = forrestjs.run();

// Handle the Boot of the App
app.then(() => console.log("The app started"));
app.catch(console.error);
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/run-with-nodemon/src/index.js)

---

## Setup Prettier

[Prettier][prettier] is an _opinionated code formatter_ that makes it easier to produce readable and congruent source code.

You can install the extension to [VSCode][vscode] here:  
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Then you can setup your rules in the `.prettierc` file:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/prettierc/.prettierc)

And finally activate the on-save hook in your [VSCode][vscode] settings `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.eol": "\n"
}
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/prettierc/.vscode/settings.json)

### 🍿 Videos

- [Setup Prettier (2:04)](./videos/prettier.mp4)

---

## Validating the NodeJS Environment

I could not stress enough how important this step is.

> Everything that can go wrong,  
> **SHOULD GO WRONG AT BOOT TIME**

And verifying that all the cranky settings are correctly passed to your App is the first step.

### Add Envalid

[Envalid](https://www.npmjs.com/package/envalid) is a small utility that help you achieve this goal.

### 🍿 Videos

- [Why do you need to validate your environment? (1:33)](./videos/envalid-intro.mp4)
- [Install Envalid & Scaffold the Environment validation (1:58)](./videos/envalid-install.mp4)
- [Validate NODE_ENV (2:41)](./videos/envalid-node-env.mp4)
- [Validate PGSTRING (1:15)](./videos/envalid-pgstring.mp4)

### Add Envalid & Scaffold

```bash
npm add envalid
```

> There are many alternatives out there, this is just one possibility. It's a simple choice.

The basic scaffold to a validated environment is:

```js
const envalid = require("envalid");

// Create a filtered and validated environment object
const env = envalid.cleanEnv(process.env, {
  // Add validation rules
});

// Use data you can trust
console.log(env);
```

👉 [Here you find the API to `cleanEnv()`](https://www.npmjs.com/package/envalid#user-content-api)  
👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/validating-node-environment/src/index.js#L6)

### Validate NODE_ENV

```js
const env = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({
    desc: "How is node running?",
    choices: ["development", "production"],
    default: "development",
  }),
});
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/validating-node-environment/src/index.js#L7)

### Validate PGSTRING

```js
const env = envalid.cleanEnv(process.env, {
  PGSTRING: envalid.url({
    desc: "PostgreSQL Connection String",
    default: "postgres://postgres:postgres@postgres:5432/postgres",
  }),
});
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/validating-node-environment/src/index.js#L12)

---

## Add `service-pg` and Connect to Postgres

### 🍿 Videos

- [Where to find ForrestJS services (0:38)](./videos/where-to-find-services.mp4)
- [Install service-pg (0:41)](./videos/service-pg-install.mp4)
- [Apply settings to service-pg (1:26)](./videos/service-pg-settings.mp4)
- [Run the first SQL query (0:48)](./videos/service-pg-query.mp4)

### Install `service-pg`

You can find all the official ForrestJS Services in this page:  
https://github.com/forrestjs/forrestjs/tree/master/packages

The [`service-pg`](https://github.com/forrestjs/forrestjs/tree/master/packages/service-pg) is a minimalistic wrapper arount the [`pg`](https://www.npmjs.com/package/pg) library. The official PostgreSQL client for NodeJS.

```bash
npm add @forrestjs/service-pg
```

### Add `service-pg` to Your App

As with any other NPM module, you need to import it:

```js
const servicePg = require("@forrestjs/service-pg");
```

Then you need to configure your ForrestJS App so that it correctly uses it:

```js
forrestjs.run({
  services: [servicePg],
  settings: {
    pg: {
      connectionString: env.PGSTRING,
    },
  },
});
```

The `services` key let you list all the Services that you need to run in your App.

> The order doesn't really matter.

The `settings` key let you setup Services and Features.

> In a good App, you would mostly pass on validated environmental variables.

---

## Build and Maintain a DB Schema

### 🍿 Videos

- [Introduction to Service `pg-schema` (1:28)](./videos/service-pg-schema-intro.mp4)
- [Install Service `pg-schema` (0:56)](./videos/service-pg-schema-install.mp4)
- [Scaffold the Schema Feature (2:03)](./videos/service-pg-schema-scaffold.mp4)
- [Refactor the Feature's Manifest (0:57)](./videos/service-pg-schema-refactor.mp4)
- [Build an Idempotent Schema Definition (1:36)](./videos/service-pg-schema-build.mp4)
- [Idempotent Data Seeding (2:48)](./videos/service-pg-schema-seed.mp4)
- [Reset Your Schema (2:48)](./videos/service-pg-schema-reset.mp4)

### Migrations VS Idempotency

For complex Apps it is good to decouple the schema from the App itself, and apply **dedicated schema migration projects**.

If it's just a single database I would use [KnexJS' migrations](http://knexjs.org/#Migrations).

For managing multiple databases I now use [Hasura CLI's Migrations](https://hasura.io/docs/latest/graphql/core/migrations/migrations-setup/).

👉 When it comes to **micro-services** that employ highly specialized db schemas, I rather go with a much simpler approach.

> The service is responsible to declare and update its own schema at boot time.

This procedure must be:

- idempotent
- resilient to horizontal scaling

With PostgreSQL this is easy to achive thanks to transactions and statementes such as `IF (NOT) EXISTS`.

ForrestJS' [`service-pg-schema`](https://github.com/forrestjs/forrestjs/tree/master/packages/service-pg-schema) Service offers a simple interface to achieve this goal.

### Add `service-pg-schema` Service

Install the Service:

```bash
npm add @forrestjs/service-pg-schema
```

> This Service requres [`service-pg`](https://github.com/forrestjs/forrestjs/tree/master/packages/service-pg) to be installed and properly configured.

```js
const servicePg = require("@forrestjs/service-pg");
const servicePgSchema = require("@forrestjs/service-pg-schema");

forrestjs.run({
  services: [servicePg, servicePgSchema],
});
```

### Scaffold the Schema Feature

A ForrestJS Feature live in a dedicated folder under the `/src/features` area:

```bash
mkdir src/features/schema
```

And needs a Feature's Manifest file which is a simple NodeJS module:

```bash
touch src/features/schema/index.js
```

At its core, a _Feature_ is a JavaScript function that register _Actions_ to _Extension Points_:

```js
const schemaFeature = () => [
  {
    target: "$PG_SCHEMA_BUILD",
    handler: () => {
      console.log("will do something...");
    },
  },
];
```

Once you create a _Feature_, remember to add it to the App's Manifest in `src/index.js`:

```js
forrestjs.run({
  services: [servicePg, servicePgSchema],
  features: [schemaFeature],
});
```

### Build Your Schema

For this tutorial we will keep things radically simple and just use a single table:

```sql
CREATE TABLE IF NOT EXISTS "public"."todos" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(80) NOT NULL,
  "status" BOOLEAN DEFAULT false
);
```

We can easily manage small db schemas with thread safe and idempotent transactions:

```js
await query(`
  BEGIN;

  CREATE TABLE IF NOT EXISTS "public"."todos" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(80) NOT NULL,
    "status" BOOLEAN DEFAULT false
  );

  -- Create another table...
  -- Alter table, add a column...

  COMMIT;
`);
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/validating-node-environment/src/index.js#L7)

The whole point is that you never change the code you wrote. You only add new information to the schema.

> NOTE: this approach works fine for very small and well defined schemas, where evolution of the schema is an exception to its stability.

### Seed Your Schema

```js
module.exports = async ({ query }) => {
  await query(`
    BEGIN;

    INSERT INTO "public"."todos"
      ("title")
    VALUES
      ('buy milk'),
      ('clean windows')
    ON CONFLICT ON CONSTRAINT "todos_pkey"
    DO UPDATE SET
      "status" = false;

    COMMIT;
  `);
};
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/validating-node-environment/src/index.js#L7)

### Reset Your Schema

```js
module.exports = async ({ query }) => {
  await query(`
    BEGIN;

    DROP TABLE IF EXISTS "public"."todos" CASCADE;

    COMMIT;
  `);
};
```

👉 [Checkout the source code](https://github.com/forrestjs/workshop-api/blob/validating-node-environment/src/index.js#L7)

---

[dk]: https://www.docker.com/get-started
[dkc]: https://docs.docker.com/compose/
[pg]: https://www.postgresql.org/
[psql]: https://www.postgresguide.com/utilities/psql/
[adm]: https://www.adminer.org/
[nd]: https://nodejs.org/en/
[npm]: https://npmjs.com
[mkf]: https://opensource.com/article/18/8/what-how-makefile
[ts]: https://www.typescriptlang.org/
[nm]: https://nodemon.io/
[fjs]: https://forrestjs.github.io
[prettier]: https://prettier.io/
