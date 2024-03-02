import BookController from "../controllers/BookController";

    const BookResolver = {
        
            books: BookController.listAllBooks,
            book: BookController.getBookByID,
            availableBooks: BookController.getAvailableBooks,
            borrowedBooks: BookController.getBorrowedBooks,
            isAvailable: BookController.isAvailable
    }

export default BookResolver


