import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone'
import 'dotenv/config'
import { BookQueryResolver, BookMutationResolver } from "./resolvers/BookResolver";
import { ClientQueryResolver, ClientMutationResolver } from "./resolvers/ClientResolver";



const typeDefs= `

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
        password: String
    } 

    type BorrowBook {
        borrowId: ID
        bookId: ID
        clientId: ID
    }
    

    type Query {
        books(page: Int, limit: Int): [Book]
        borrowedBooks(page: Int, limit: Int): [Book]
        isAvailable(id: ID): Boolean
        book(id: ID): Book
        availableBooks: [Book]
        clients: [Client]
        client(id: ID): Client
    }

    type Mutation {
        login(tel: String, password: String): String
        createBook(name: String, author: String, year: Int): Book
        register(name: String, tel: String, password: String): Client
        updateCellphone(id: ID, tel: String): Client
        lendBook(bookId: ID, clientId: ID): BorrowBook
        returnBook(borrowId: ID): String
    }

`

const resolvers = {

    Query: {

        ...BookQueryResolver,
        ...ClientQueryResolver
    },

    Mutation: {

        ...ClientMutationResolver,
        ...BookMutationResolver
    }

    
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
});
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

(async () => {
    const {url} = await startStandaloneServer(server, {
        context: async ({req}) => {
            const {headers } = req
            return { headers }
        },
        listen: {port: PORT}
    }) 

    console.log('servidor corriendo en '+ url)
})();