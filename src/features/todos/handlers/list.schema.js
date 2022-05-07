module.exports = {
  // Validate the Querystring Input
  query: {
    type: "object",
    additionalProperties: false,
    properties: {
      page: {
        type: "number",
        default: 1,
      },
      status: {
        type: "boolean",
        nullable: true,
      },
      title: { $ref: "/todos/field/title/v1" },
    },
  },

  // Declare and Filter the JSON Output
  response: {
    200: { $ref: "/todos/response/list/v1" },
  },
};
