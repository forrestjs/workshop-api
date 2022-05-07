const CREATE_TODO = `
  INSERT INTO "public"."todos"
    ( "title" )
  VALUES
    ( $1 )
  RETURNING *
`;

module.exports = async (request, reply) => {
  const res = await request.pg.query(CREATE_TODO, [request.body.title]);
  reply.send({ items: res.rows });
};
