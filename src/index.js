// Import Core, Services, and Features
const forrestjs = require("@forrestjs/core");
const servicePg = require("@forrestjs/service-pg");
const servicePgSchema = require("@forrestjs/service-pg-schema");
const fastifyService = require("@forrestjs/service-fastify");
const envalid = require("envalid");

const schemaFeature = require("./features/schema");

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
});

// Kick off a ForrestJS App
const app = forrestjs.run({
  services: [servicePg, servicePgSchema, fastifyService],
  features: [schemaFeature],
  settings: {
    pg: {
      connectionString: env.PGSTRING,
    },
  },
});

// Handle the Boot of the App
app.then(() => console.log("The app started"));
app.catch(console.error);
