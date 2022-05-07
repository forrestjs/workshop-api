const TODOS_QUERY = `
  SELECT * FROM "public"."todos"
  WHERE "status" = ANY($3)
    AND ($4 = '' IS TRUE OR "title" ILIKE $4)
  LIMIT $1
  OFFSET $2
`;

module.exports = async (request, reply) => {
  const pageSize = request.getConfig("todos.page.size");
  const pageNum = request.query.page;
  const offset = (pageNum - 1) * pageSize;

  const filterStatus = request.query.status
    ? [request.query.status]
    : [true, false];

  const searchTitle = request.query.title || "";

  const res = await request.pg.query(TODOS_QUERY, [
    pageSize,
    offset,
    filterStatus,
    searchTitle,
  ]);

  reply.send({
    items: res.rows,
  });
};
