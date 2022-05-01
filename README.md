# ForrestJS API Workshop

Step by step video tutorial to using ForrestJS and build a REST and GraphQL API

## The Program

- [Intro to the Workshop](#intro-to-the-workshop)
- [Where to find help and resources](#where-to-find-help-and-resources)
- [Run Postgres and Adminer using Docker](#run-postgres-and-adminer-using-docker)
  - [Project's API](#projects-api)
  - [Connect to Adminer](#connect-to-adminer)
  - [Connect to PSQL](#connect-to-psql)
- Folder structure, Features, and Services
- Validating the NodeJS Environment
- Add `service-pg` and connect to Postgres
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

[[ TO BE COMPLETED ]]

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

### Videos

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

[dk]: https://www.docker.com/get-started
[dkc]: https://docs.docker.com/compose/
[pg]: https://www.postgresql.org/
[psql]: https://www.postgresguide.com/utilities/psql/
[adm]: https://www.adminer.org/
[nd]: https://nodejs.org/en/
[mkf]: https://opensource.com/article/18/8/what-how-makefile