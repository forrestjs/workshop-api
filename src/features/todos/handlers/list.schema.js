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
      title: {
        type: "string",
        minLength: 4,
      },
    },
  },

  // Declare and Filter the JSON Output
  response: {
    200: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              title: { type: "string" },
              status: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};
