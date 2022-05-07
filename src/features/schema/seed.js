module.exports = async ({ query }) => {
  await query(`
    BEGIN;

    INSERT INTO "public"."todos"
      ("id", "title", "status")
    VALUES
      (1, 'Buy milk', false),
      (2, 'Learn ForrestJS', true),
      (3, 'Learn PostgreSQL', false),
      (4, 'Change tiers to the car', true),
      (5, 'Feed the cat', false),
      (6, 'Water the plants', true),
      (7, 'Get the kid from school', false),
      (8, 'Change socks', true),
      (9, 'Play guitar', false),
      (10, 'Meditate', true)
    ON CONFLICT ON CONSTRAINT "todos_pkey"
    DO UPDATE SET
      "title" = EXCLUDED."title",
      "status" = EXCLUDED."status";

    COMMIT;
  `);
};
