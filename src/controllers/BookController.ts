import db from "../db.config";
import { verifyJWT } from "../services/JWTService";
import { createID } from "../services/CreateIDService";

const listAllBooks = async (__:void, args: any, context: any ) => {
  try {
    const token = context.headers.authorization
    if(verifyJWT(token)){
      const {page, limit} = args
  
       
      const [books] = page && limit ? 
      await db.execute(`select * from books limit ${limit} offset ${(page - 1) * limit} `)
      :
      await db.execute("select * from books")
  
      return books
    }
    return null
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

const getBookByID = async (__: void, args: any, context: any) => {
  try {

    const token = context.headers.authorization
    if(verifyJWT(token)){
      const { id } = args;
      const [books] = await db.execute("select * from books where id = ?", [id]);
      return Array.isArray(books) ? books[0] : null;
    }
    return null
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

const getAvailableBooks = async (__:void, args:any , context: any) => {
  try {
    const token = context.headers.authorization
    if(verifyJWT(token)){
      const [availableBooks] = await db.execute(
        "SELECT * FROM library.books b where b.id not in (select bookId from library.borrowed_books)"
      );
      return availableBooks;
    }
    return null
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
};

const getBorrowedBooks = async (__:void, args: any, context: any) => {
  try{
    const token = context.headers.authorization
    if(verifyJWT(token)){
      const {page, limit} = args
       
      const [borrowedBooks] = page && limit ? 
      await db.execute(`SELECT * FROM borrowed_books bb join books b on bb.bookId = b.id limit ${limit} offset ${(page - 1) * limit} `)
      :
      await db.execute("SELECT * FROM borrowed_books bb join books b on bb.bookId = b.id")
      return borrowedBooks
    }
    return null
  } catch(e:any){
    console.log(e)
    return e.message
  }
}

const isAvailable = async (__:void, args: any, context: any) => {
  try{
    
    const token = context.headers.authorization
    if(verifyJWT(token)){
      const {id} = args
      const [borrowedBooks] = await db.execute("SELECT * FROM borrowed_books bb join books b on bb.bookId = b.id where b.id = ?", [id])
    
      console.log(borrowedBooks)
    
      if(Array.isArray(borrowedBooks) && borrowedBooks.length)
        return false
    
      return true
    }
    return null
  } catch (e: any){
    console.log(e)
    return e.message
  }
  
}
//Mutaciones
const createBook = async (__:void, args: any, context: any) =>{
  try {
    // const token = context.headers.authorization
    // if(verifyJWT(token)){
      const idBook = createID();
      console.log(idBook?.length);
      const book = {
        id: idBook,
        name: args.name,
        author: args.author,
        year: args.year
      }
      const result = await db.query("INSERT INTO library.books (id,name, author, year) VALUES (?,?,?,?)",
      [book.id, book.name, book.author, book.year]);

      console.log(result);
      return book;
    // }
  } catch (e: any) {
    console.log(e)
    return e.message;
  }
}

const lendBook = async(__:void, args:any) =>{
  try {
    const id = createID();
    const {bookId, clientId} = args;
    const borrowBook = {
      bookId,
      clientId
    }
    const result = await db.query("INSERT INTO library.borrowedBooks (borrowId,bookId,clientId) VALUES (?,?,?)",
      [id, bookId, clientId]);

      console.log(result);
    return borrowBook;
  } catch (e: any) {
    console.log(e)
    return e.message;
  }
}

const returnBook = async(__:void, args:any) =>{
  try {
    const { borrowId } = args;
    const result = await db.execute("DELETE FROM library.borrowedBooks WHERE borrowId = ?", [borrowId]);
    if (result) {
      return "Libro devuelto";
    }
    return "Error al devolver el libro";
  } catch (e: any) {
    console.log(e)
    return e.message;
  }
} 


export default {
    listAllBooks,
    getBookByID,
    getAvailableBooks,
    getBorrowedBooks,
    isAvailable,
    createBook,
    lendBook,
    returnBook
}
