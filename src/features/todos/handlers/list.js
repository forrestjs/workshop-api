module.exports = (request, reply) => {
  reply.send({
    items: [
      { id: 1, title: "Buy milk" },
      { id: 2, title: "Learn ForrestJS" },
    ],
  });
};
