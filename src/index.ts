import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from '@apollo/server/standalone'


const typeDefs = `

    type Book {
        id: ID
        name: String
        auhor: String
    }

    type Client {
        id: ID
        name: String
        tel: String

    }

`

const resolvers = {

    Query: {


    },

    Mutation: {

    }
}

const server = new ApolloServer({typeDefs, resolvers});

(async () => {
    const {url} = await startStandaloneServer(server, {
        listen: {port:3000}
    }) 

    console.log('servidor corriendo en '+ url)
})();