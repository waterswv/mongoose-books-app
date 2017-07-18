// book.js
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
     title: String,
     author: String,
     image: String,
     releaseDate: Date
 });

 let Book = mongoose.model('Book', BookSchema);

 module.exports = Book;
