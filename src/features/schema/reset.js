module.exports = async ({ query }) => {
  await query(`
    BEGIN;

    DROP TABLE IF EXISTS "public"."todos" CASCADE;

    COMMIT;
  `);
};
