module.exports = {
  body: {
    type: "object",
    additionalProperties: false,
    required: ["title"],
    properties: {
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
