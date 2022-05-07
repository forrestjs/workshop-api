// Import Core, Services, and Features
const forrestjs = require("@forrestjs/core");
const servicePg = require("@forrestjs/service-pg");
const servicePgSchema = require("@forrestjs/service-pg-schema");
const fastifyService = require("@forrestjs/service-fastify");
const fastifyHealthzService = require("@forrestjs/service-fastify-healthz");
const serviceFastifyStatic = require("@forrestjs/service-fastify-static");
const envalid = require("envalid");
const path = require("path");

// Import Application Features
const schemaFeature = require("./features/schema");
const todosFeature = require("./features/todos");

// Validate the Environment
const env = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({
    desc: "How is node running?",
    choices: ["development", "production"],
    default: "development",
  }),
  PGSTRING: envalid.url({
    desc: "PostgreSQL Connection String",
    default: "postgres://postgres:postgres@localhost:5432/postgres",
  }),
  TODO_PAGE_SIZE: envalid.num({
    desc: "Todos list max response size",
    default: 2,
  }),
});

// Kick off a ForrestJS App
const app = forrestjs.run({
  services: [
    servicePg,
    servicePgSchema,
    fastifyService,
    fastifyHealthzService,
    serviceFastifyStatic,
  ],
  features: [schemaFeature, todosFeature],
  settings: {
    pg: {
      connectionString: env.PGSTRING,
    },
    fastify: {
      static: {
        root: path.join(__dirname, "html"),
      },
    },
    todos: {
      page: {
        size: env.TODO_PAGE_SIZE,
      },
    },
  },
});

// Handle the Boot of the App
app.then(() => console.log("The app started"));
app.catch(console.error);
