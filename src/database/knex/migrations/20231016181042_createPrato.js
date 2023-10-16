
exports.up = knex => knex.schema.createTable("pratos", table => {
  table.increments("id");
  
  table.text("img").notNullable();
  table.text("title").notNullable();
  table.text("description").notNullable();

  table.integer('user_id').references('id').inTable('users')

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("pratos");
