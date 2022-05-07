const listTodos = require("./handlers/list");
const listTodosSchema = require("./handlers/list.schema");

const todosFeature = () => [
  {
    target: "$FASTIFY_ROUTE",
    handler: {
      method: "GET",
      url: "/todos",
      schema: listTodosSchema,
      handler: listTodos,
    },
  },
];

module.exports = todosFeature;
