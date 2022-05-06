const buildSchema = require("./build");
const seedSchema = require("./seed");
const resetSchema = require("./reset");

const schemaFeature = () => [
  {
    target: "$PG_SCHEMA_BUILD",
    handler: buildSchema,
  },
  {
    target: "$PG_SCHEMA_SEED",
    handler: seedSchema,
  },
  {
    target: "$PG_SCHEMA_RESET",
    handler: resetSchema,
  },
];

module.exports = schemaFeature;
