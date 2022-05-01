// Import Core, Services, and Features
const forrestjs = require("@forrestjs/core");
const envalid = require("envalid");

// Validate the Environment
const env = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({
    choices: ["development", "production"],
    default: "development",
  }),
  PGSTRING: envalid.url({
    desc: "PostgreSQL connection string",
    default: "postgres://postgres:postgres@postgres:5432/postgres",
  }),
});

// Just temporary code...
console.log(env);

// Kick off a ForrestJS App
const app = forrestjs.run();

// Handle the Boot of the App
app.then(() => console.log("The app started"));
app.catch(console.error);
