
exports.up = function(knex) {
  return knex.schema.createTable('instructors', table =>{
      table.increments()

      table.string('name', 255).notNullable()
      table.string('topic', 255)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('instructors')
};
