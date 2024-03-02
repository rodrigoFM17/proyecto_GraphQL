import db from "../db.config";
import { verifyJWT } from "../services/JWTService";

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


export default {
    listAllBooks,
    getBookByID,
    getAvailableBooks,
    getBorrowedBooks,
    isAvailable
}
