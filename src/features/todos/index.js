const listTodos = require("./handlers/list");
const listTodosSchema = require("./handlers/list.schema");

const createTodo = require("./handlers/create");

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
  {
    target: "$FASTIFY_ROUTE",
    handler: {
      method: "POST",
      url: "/todos",
      handler: createTodo,
    },
  },
];

module.exports = todosFeature;
