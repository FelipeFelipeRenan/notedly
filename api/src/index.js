const { ApolloServer, gql } = require('apollo-server-express')

const express = require('express')

const app = express()

const port = process.env.PORT || 4000

// Construir um schema, usando a linguagem de schema do GraphQL
const typeDefs = gql `
    type Query {
        hello: String
    }
`;
// Funçoes resolver para os campos do schema criado anteriormente
const resolvers = {
    Query: {
        hello: () => 'Hello world'
    }
}

// Setup do Apollo Server
const server = new ApolloServer({ typeDefs, resolvers })

// Aplicando a Middleware do Apollo GraphQL e pondo o caminho para /api
server.applyMiddleware({ app, path: '/api' })


//app.get('/', (req, res) => { res.send('Hello World!!!') })

app.listen({ port }, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))