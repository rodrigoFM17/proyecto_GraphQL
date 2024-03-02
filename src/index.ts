import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone'
import 'dotenv/config'
import { BookQueryResolver } from "./resolvers/BookResolver"; "./resolvers/BookResolver";
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
    }

`

const resolvers = {

    Query: {

        ...BookQueryResolver,
        ...ClientQueryResolver
    },

    Mutation: {

        ...ClientMutationResolver
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