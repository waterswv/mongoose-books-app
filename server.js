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

// let books = [
//   {
//     _id: 15,
//     title: "The Four Hour Workweek",
//     author: "Tim Ferriss",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
//     release_date: "April 1, 2007"
//   },
//   {
//     _id: 16,
//     title: "Of Mice and Men",
//     author: "John Steinbeck",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
//     release_date: "Unknown 1937"
//   },
//   {
//     _id: 17,
//     title: "Romeo and Juliet",
//     author: "William Shakespeare",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
//     release_date: "Unknown 1597"
//   }
// ];


// let newBookUUID = 18;







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
  // console.log('books create', req.body);
  // var newBook = req.body;
  // newBook._id = newBookUUID++;
  // books.push(newBook);
  // res.json(newBook);
  // create new todo with form data (`req.body`)
   var newBook = new db.Book(req.body);

   // save new todo in db
   newBook.save(function(err, savedBook) {
       res.json(savedBook);
   });

});

// update book
app.put('/api/books/:id', function(req, res) {
  // get book id from url params (`req.params`)
  // console.log('books update', req.params);
  // var bookId = req.params.id;
  // // find the index of the book we want to remove
  // var updateBookIndex = books.findIndex(function(element, index) {
  //   return (element._id === parseInt(req.params.id)); //params are strings
  // });
  // console.log('updating book with index', deleteBookIndex);
  // var bookToUpdate = books[deleteBookIndex];
  // books.splice(updateBookIndex, 1, req.params);
  // res.json(req.params);
  var bookId = req.params.id;

    // find todo in db by id
    db.Book.findOne({ _id: bookId }, function(err, foundBook) {
        // update the todos's attributes
        foundBook.title = req.body.title;
        foundBook.author = req.body.author;

        // save updated todo in db
        foundBook.save(function(err, savedBook) {
            res.json(savedBook);
        });
    });
});

// delete book
app.delete('/api/books/:id', function(req, res) {
  // // get book id from url params (`req.params`)
  // console.log('books delete', req.params);
  // var bookId = req.params.id;
  // // find the index of the book we want to remove
  // var deleteBookIndex = books.findIndex(function(element, index) {
  //   return (element._id === parseInt(req.params.id)); //params are strings
  // });
  // console.log('deleting book with index', deleteBookIndex);
  // var bookToDelete = books[deleteBookIndex];
  // books.splice(deleteBookIndex, 1);
  // res.json(bookToDelete);

  // get todo id from url params (`req.params`)
  var BookId = req.params.id;

  // find todo in db by id and remove
  db.Book.findOneAndRemove({ _id: BookId }, function(err, deletedBook) {
      res.json(deletedBook);
  });
});





app.listen(process.env.PORT || 3000, function() {
  console.log('Book app listening at http://localhost:3000/');
});
