// Import Core, Services, and Features
const forrestjs = require("@forrestjs/core");
const servicePg = require("@forrestjs/service-pg");
const envalid = require("envalid");

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

const myFeature = {
  target: "$PG_READY",
  handler: async ({ query }) => {
    const res = await query("SELECT NOW()");
    console.log(res.rows);
  },
};

// Kick off a ForrestJS App
const app = forrestjs.run({
  services: [servicePg],
  features: [myFeature],
  settings: {
    pg: {
      connectionString: env.PGSTRING,
    },
  },
});

// Handle the Boot of the App
app.then(() => console.log("The app started"));
app.catch(console.error);
