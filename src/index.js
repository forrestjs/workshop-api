// Import Core, Services, and Features
const forrestjs = require("@forrestjs/core");

// Kick off a ForrestJS App
const app = forrestjs.run();

// Handle the Boot of the App
app.then(() => console.log("The app started"));
app.catch(console.error);
