var express = require('express');
var router = express.Router();

const queries = require('./queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/books', queries.getAllBooks)
router.get('/books/:id', queries.getBookById)
router.post('/books', queries.postNewBook)
router.put('/books/:id', queries.editBookById)
router.delete('/books/:id', queries.deleteBookById)
router.get('/authors', queries.getAllAuthors)
router.get('/authors/:id', queries.getAuthorById)
router.post('/authors', queries.postNewAuthor)
router.put('/authors/:id', queries.editAuthorById)
router.delete('/authors/:id', queries.deleteAuthorById)

module.exports = router;
