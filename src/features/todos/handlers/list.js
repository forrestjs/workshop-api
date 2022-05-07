const TODOS_QUERY = `
  SELECT * FROM "public"."todos"
  LIMIT $1
  OFFSET $2
`;

module.exports = async (request, reply) => {
  const pageSize = request.getConfig("todos.page.size");
  const pageNum = request.query.page;
  const offset = (pageNum - 1) * pageSize;

  try {
    const res = await request.pg.query(TODOS_QUERY, [pageSize, offset]);

    reply.send({
      items: res.rows,
    });
  } catch (err) {
    console.log(err);
    reply.send(err);
  }
};
