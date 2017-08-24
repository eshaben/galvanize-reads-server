const express = require('express')
 const knex = require('../db/knex')
 const bodyParser = require('body-parser')


 function getAllBooks(req, res){
   return knex('book').select('*')
   .then((books) => {
     return Promise.all(books.map(book => {
       let id = book.id
       return knex('book')
       .where('id', id)
       .then(book => {
         book = book[0]
         return knex('book').select('author.*')
          .join('book_author', 'book.id', 'book_author.bookID')
          .join('author', 'author.id', 'book_author.authorID')
          .where('book.id', id)
          .then(authors => {
            book.authors = authors
            return book
       })
     })
   }))
   .then(books => {
     res.json(books)
   })
   .catch(error => res.json({error}))
  })
}

 function getBookById(req, res){
   let id = req.params.id
   return knex('book')
   .where('id', id)
   .then(book => {
     book = book[0]
     return knex('book').select('author.*')
      .join('book_author', 'book.id', 'book_author.bookID')
      .join('author', 'author.id', 'book_author.authorID')
      .where('book.id', id)
        .then(authors => {
          book.authors = authors
          res.json(book)
        })
   })
 }

 function validBook(post){
   let validTitle = typeof post.title == 'string' && post.title.trim() != '';
   return validTitle
 }

 function postNewBook(req, res){
   let data = req.body
   let book = {
     title: data.title,
     genre: data.genre,
     description: data.description,
     "cover_url": data.cover_url,
   }
   return knex('book').insert(book).returning('id')
   .then(id => {
     book.id = Number(id);
     let author = {
       first_name: data.first_name,
       last_name: data.last_name,
       biography: data.biography,
       "portrait_url": data.portrait_url
     }
     return knex('author').insert(author).returning('id')
     .then(authorID => {
       let tableData ={
         bookID: book.id,
         authorID: Number(authorID)
       }
       console.log(tableData);
       return knex('book_author').insert(tableData)
     })
     .then(() => {
       res.json({message: 'success'})
     })
  })
  //  if(validBook(data) && validAuthor(data)){
  //
  //  }

  //  if(validBook(post)){
  //    return knex('book')
  //    .insert(req.body)
  //    .returning('*')
  //    .then(newBook => {
  //      res.json({
  //        newBook: newBook,
  //        message: "success"
  //      })
  //    })
  //  } else {
  //    res.json({message: "Invalid title input"})
  //  }
 }

 function editBookById(req, res){
   let id = req.params.id;
   return knex('book').where('id', id)
   .update(req.body)
   .returning('*')
   .then(editedBook => {
     res.json({
       editedBook: editedBook,
       message: "success"
     })
   })
 }

 function deleteBookById(req, res){
   let id = req.params.id;
   console.log(id);
   return knex('book')
   .where('id', id).del()
   .then(deletedBook => {
     res.json({
       message: "success"
     })
   })
 }

 function getAllAuthors(req, res){
   return knex('author')
   .then(authors => {
     res.json({
       authors: authors,
       message: "success"
     })
   })
 }

 function getAuthorById(req, res){
   let id = req.params.id
   return knex('author')
   .where('id', id)
   .then(author => {
     res.json({
       author: author,
       message: "success"
     })
   })
 }

function validAuthor(post){
  let validFirstName = typeof post.first_name == 'string' && post.first_name.trim() != '';
  let validLastName = typeof post.last_name == 'string' && post.last_name.trim() != '';

  return validFirstName && validLastName
}

function postNewAuthor(req, res){
   let post = req.body

   if(validAuthor(post)){
     return knex('author')
     .insert(req.body)
     .returning('*')
     .then(newAuthor => {
       res.json({
         newAuthor: newAuthor,
         message: "success"
       })
     })
   } else {
     res.json({message: 'Invalid author name input'})
   }
 }

 function editAuthorById(req, res){
   let id = req.params.id;
   return knex('author')
   .where('id', id)
   .update(req.body)
   .returning('*')
   .then(editedAuthor => {
     res.json({
       editedAuthor: editedAuthor,
       message: "success"
     })
   })
 }

 function deleteAuthorById(req, res){
   let id = req.params.id;
   return knex('author')
   .where('id', id).del()
   .then(deletedAuthor => {
     res.json({
       deletedBook: deletedAuthor,
       message: "success"
     })
   })
 }


 module.exports = {
   getAllBooks,
   getBookById,
   postNewBook,
   editBookById,
   deleteBookById,
   getAllAuthors,
   getAuthorById,
   postNewAuthor,
   editAuthorById,
   deleteAuthorById,
 }
