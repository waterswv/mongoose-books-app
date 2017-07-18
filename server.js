// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
let express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./models');

// generate a new express app and call it 'app'
let app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({
  extended: true
}));



////////////////////
//  Seed DATA
///////////////////

// let newBookUUID = 18; <-- WHAT DOES THIS DO????

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get('/', function(req, res) {
  res.sendFile('views/index.html', {
    root: __dirname
  });
});

// get all books
app.get('/api/books', function(req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function(req, res) {
  // find one book by its id
  //console.log('books show', req.params.id);
  let myBookId = req.params.id;
  console.log("User submitted Book ID is "+myBookId);

  db.Book.findOne({_id: myBookId}, function(err, theBook) {
    if(err){
      console.log("error!", err);
    }
    res.json(theBook);
  });


});

// app.get('/api/books/search', function(req,res){
//   let searchTitleQuery = req.query.title || "";
//   let searchAutherQuery = req.query.author || "";
//   //sample url: /api/books/search?title="Mice"&author="Steinbeck"
//
//
// })

// create new book
app.post('/api/books', function(req, res) {

  // create new book with form data (`req.body`)
   var newBook = new db.Book(req.body);

   // save new book in db
   newBook.save(function(err, savedBook) {
       res.json(savedBook);
   });

});

// update book
app.put('/api/books/:id', function(req, res) {
  // get book id from url params (`req.params`)

  var bookId = req.params.id;

    // find book in db by id
    db.Book.findOne({ _id: bookId }, function(err, foundBook) {
        // update the books's attributes
        foundBook.title = req.body.title;
        foundBook.author = req.body.author;

        // save updated book in db
        foundBook.save(function(err, savedBook) {
            res.json(savedBook);
        });
    });
});

// delete book
app.delete('/api/books/:id', function(req, res) {


  // get Book id from url params (`req.params`)
  var BookId = req.params.id;

  // find book in db by id and remove
  db.Book.findOneAndRemove({ _id: BookId }, function(err, deletedBook) {
      res.json(deletedBook);
  });
});



app.listen(process.env.PORT || 3000, function() {
  console.log('Book app listening at http://localhost:3000/');
});
