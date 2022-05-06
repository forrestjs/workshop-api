const buildSchema = require("./build");
const seedSchema = require("./seed");

const schemaFeature = () => [
  {
    target: "$PG_SCHEMA_BUILD",
    handler: buildSchema,
  },
  {
    target: "$PG_SCHEMA_SEED",
    handler: seedSchema,
  },
];

module.exports = schemaFeature;
