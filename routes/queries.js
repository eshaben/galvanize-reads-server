const express = require('express')
 const knex = require('../db/knex')
 const bodyParser = require('body-parser')


 function getAllBooks(req, res){
   return knex('book')
   .then(books => {
     res.json({
       books: books,
       message: "success"
     })
   })
 }

 function getBookById(req, res){
   let id = req.params.id
   return knex('book')
   .where('id', id)
   .then(book => {
     res.json({
       book: book,
       message: "success"
     })
   })
 }

 function postNewBook(req, res){
   return knex('book')
   .insert(req.body)
   .returning('*')
   .then(newBook => {
     res.json({
       newBook: newBook,
       message: "success"
     })
   })
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

 function postNewAuthor(req, res){
   return knex('author')
   .insert(req.body)
   .returning('*')
   .then(newAuthor => {
     res.json({
       newAuthor: newAuthor,
       message: "success"
     })
   })
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
   deleteAuthorById
 }
