module.exports = async ({ query }) => {
  await query(`
    BEGIN;

    CREATE TABLE IF NOT EXISTS "public"."todos" (
      "id" SERIAL PRIMARY KEY,
      "title" VARCHAR(80) NOT NULL,
      "status" BOOLEAN DEFAULT false
    );

    -- Add new table

    COMMIT;
  `);
};
