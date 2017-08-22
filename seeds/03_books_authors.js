
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "book_author"; ALTER SEQUENCE book_author_id_seq RESTART WITH 9;')
  .then(function () {
    var bookAuthors = [{
      id: 1,
      bookID: 1,
      authorID: 1
    }, {
      id: 2,
      bookID: 1,
      authorID: 2
    }, {
      id: 3,
      bookID: 1,
      authorID: 3
    }, {
      id: 4,
      bookID: 2,
      authorID: 4
    }, {
      id: 5,
      bookID: 3,
      authorID: 5
    }, {
      id: 6,
      bookID: 4,
      authorID: 6
    }, {
      id: 7,
      bookID: 5,
      authorID: 6
    }, {
      id: 8,
      bookID: 6,
      authorID: 6
    }];
    return knex('book_author').insert(bookAuthors);
  });
};
