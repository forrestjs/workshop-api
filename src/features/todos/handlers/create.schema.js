module.exports = {
  body: {
    type: "object",
    additionalProperties: false,
    required: ["title"],
    properties: {
      title: { $ref: "/todos/field/title/v1" },
    },
  },

  // Declare and Filter the JSON Output
  response: {
    200: { $ref: "/todos/response/list/v1" },
  },
};
