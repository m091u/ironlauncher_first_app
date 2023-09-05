const express = require("express");
const router = express.Router();

/* GET home page */
const Book = require("../models/Book.model.js");

router.get("/books/create", (req, res) => res.render("books/book-create.hbs"));

router.post("/books/create", (req, res) => {
  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then((bookFromDB) => res.redirect("/books"))
    .catch((error) => next(error));
});


router.get("/books/:bookId/edit", (req, res) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then((bookToEdit) => {
      res.render("books/book-edit.hbs", { book: bookToEdit });
    })
    .catch((error) => next(error));
});

router.post("/books/:bookId/edit", (req, res) => {
  const { bookId } = req.params;
  const { title, description, author, rating } = req.body;
 
  Book.findByIdAndUpdate(bookId, { title, description, author, rating }, { new: true })
    .then(updatedBook => res.redirect(`/books/${updatedBook.id}`)) // go to the details page to see the updates
    .catch(error => next(error));
})

router.post('/books/:bookId/delete', (req, res) => {
  const { bookId } = req.params;

  Book.findByIdAndDelete(bookId)
  .then(()=> res.redirect('/books'))
  .catch(error => next(error));
})

router.get("/books", (req, res) => {
  Book.find()
    .then((allBooks) => {
      // console.log(allBooks);
      // console.log("anything");
      // console.log("Retrieved books from DB:", allBooks);
      res.render("books/books-list.hbs", { books: allBooks });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  console.log(bookId);
  Book.findById(bookId)
    .then((theBook) => {
      console.log(theBook);

      res.render("books/book-details.hbs", { book: theBook });
    })
    .catch((error) => {
      console.log("Error while retrieving book details: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;
