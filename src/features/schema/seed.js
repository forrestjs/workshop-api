module.exports = async ({ query }) => {
  await query(`
    INSERT INTO "public"."todos"
    ("id", "title")
    VALUES
    (1, 'buy milk'),
    (2, 'clean windows')
    ON CONFLICT ON CONSTRAINT "todos_pkey"
    DO UPDATE SET
    "status" = false
  `);
};
