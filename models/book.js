// book.js
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
     title: String,
     author: {
       type: Schema.Types.ObjectId,
       ref: 'Author'
     },
     image: String,
     releaseDate: Date
 });

 let Book = mongoose.model('Book', BookSchema);

 module.exports = Book;
