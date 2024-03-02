import BookController from "../controllers/BookController";

    export const BookQueryResolver = {
        
            books: BookController.listAllBooks,
            book: BookController.getBookByID,
            availableBooks: BookController.getAvailableBooks,
            borrowedBooks: BookController.getBorrowedBooks,
            isAvailable: BookController.isAvailable
    }

    export const BookMutationResolver = {
        
    }


