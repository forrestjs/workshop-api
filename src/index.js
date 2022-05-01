// Import Core, Services, and Features
const forrestjs = require("@forrestjs/core");
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
    default: "postgres://postgres:postgres@postgres:5432/postgres",
  }),
});
console.log(env);

// Kick off a ForrestJS App
const app = forrestjs.run();

// Handle the Boot of the App
app.then(() => console.log("The app started"));
app.catch(console.error);
