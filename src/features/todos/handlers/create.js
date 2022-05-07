module.exports = (request, reply) => {
  console.log(request.body);
  reply.send(request.body);
};
