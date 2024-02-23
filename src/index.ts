import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone'
import db from './db.config'
import 'dotenv/config'


const typeDefs = `

    type Book {
        id: ID
        name: String
        author: String
        year: Int
    }

    type Client {
        id: ID
        name: String
        tel: String

    }

    type Query {
        books: [Book]
        book(id: ID): Book
        availableBooks: [Book]
        clients: [Client]
        client(id: ID): Client
    }

`

const resolvers = {

    Query: {

        books: async () => {

            try{

                const [books] = await db.execute('select * from books')
                return books

            } catch (e: any){

                console.log(e)
                return e.message
            }
        },

        book: async (__:void, args: any) => {

            try {
                const {id} = args
                const [books] = await db.execute('select * from books where id = ?', [id])
                return Array.isArray(books) ? books[0] : 'error' 

            }catch (e: any){
                console.log(e)
                return e.message
            }
        },

        availableBooks: async () => {

            try{

                const [availableBooks] = await db.execute('SELECT * FROM library.books b where b.id not in (select bookId from library.borrowed_books)')    
                return availableBooks
            } catch(e: any){
                console.log(e)
                return e.message

            }
        },

        clients: async () => {

            try{

                const [clients] = await db.execute('select * from clients')
                return clients

            } catch (e: any){
                console.log(e)
                return e.message
            }
        },
        
        client: async (__:void, args: any) => {

            try{
                const {id} = args
                const [clients] = await db.execute('select * from clients where id = ?', [id]) 
                return Array.isArray(clients) ? clients[0] : 'error'

            } catch (e: any){
                console.log(e)
                return e.message
            }
        } 



    },

    
}

const server = new ApolloServer({typeDefs, resolvers});
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

(async () => {
    const {url} = await startStandaloneServer(server, {
        listen: {port: PORT}
    }) 

    console.log('servidor corriendo en '+ url)
})();