const listTodos = require("./handlers/list");

const todosFeature = () => [
  {
    target: "$FASTIFY_ROUTE",
    handler: {
      method: "GET",
      url: "/todos",
      handler: listTodos,
    },
  },
];

module.exports = todosFeature;
