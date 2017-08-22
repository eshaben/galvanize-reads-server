exports.up = function(knex, Promise) {
  return knex.schema.createTable('book_author', (table) =>{
  table.increments();
  table.integer('bookID').references('book.id').unsigned().onDelete('cascade');
  table.integer('authorID').references('author.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book_author')
};
 
