module.exports = async ({ query }) => {
  await query(`
    BEGIN;

    INSERT INTO "public"."todos"
      ("id", "title")
    VALUES
      (1, 'Buy milk'),
      (2, 'Learn ForrestJS'),
      (3, 'Learn PostgreSQL'),
      (4, 'Change tiers to the car'),
      (5, 'Feed the cat'),
      (6, 'Water the plants'),
      (7, 'Get the kid from school'),
      (8, 'Change socks'),
      (9, 'Play guitar'),
      (10, 'Meditate')
    ON CONFLICT ON CONSTRAINT "todos_pkey"
    DO UPDATE SET
      "title" = EXCLUDED."title",
      "status" = false;

    COMMIT;
  `);
};
