const listTodos = require("./handlers/list");
const listTodosSchema = require("./handlers/list.schema");

const createTodo = require("./handlers/create");
const createTodoSchema = require("./handlers/create.schema");

const responseListV1 = require("./schemas/response.list.v1.json");
const fieldTitleV1 = require("./schemas/field.title.v1.json");

const todosFeature = () => [
  {
    target: "$FASTIFY_PLUGIN",
    handler: ({ fastify }) => {
      fastify.addSchema(responseListV1);
      fastify.addSchema(fieldTitleV1);
    },
  },
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
      schema: createTodoSchema,
      handler: createTodo,
    },
  },
];

module.exports = todosFeature;
