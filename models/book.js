// book.js
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CharacterSchema = new Schema ({
  name: String
})

let BookSchema = new Schema({
     title: String,
     author: {
       type: Schema.Types.ObjectId,
       ref: 'Author'
     },
     characters: [CharacterSchema],
     image: String,
     releaseDate: Date
 });

 let Book = mongoose.model('Book', BookSchema);
 let Character = mongoose.model('Character', CharacterSchema); // This isn't neccesary if you don't plan to use Character outside of the Book Schema

 module.exports = Book;
 module.exports = Character; // This isn't neccesary if you don't plan to use Character outside of the Book Schema
