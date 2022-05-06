module.exports = async ({ query }) => {
  await query(`
    BEGIN;

    INSERT INTO "public"."todos"
      ("title")
    VALUES
      ('buy milk'),
      ('clean windows')
    ON CONFLICT ON CONSTRAINT "todos_pkey"
    DO UPDATE SET
      "status" = false;

    COMMIT;
  `);
};
