const express = require('express')

const { ApolloServer } = require('apollo-server-express')

require('dotenv').config()

const db = require('./db')

const models = require('./models')

// Construir um schema, usando a linguagem de schema do GraphQL
const typeDefs = require('./schema')

// Funçoes resolver para os campos do schema criado anteriormente
const resolvers = require('./resolvers')

const DB_HOST = process.env.DB_HOST;

const port = process.env.PORT || 4000

const app = express()

//Conectando ao banco de dados
db.connect(DB_HOST)

// Setup do Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return { models }
    }
})

// Aplicando a Middleware do Apollo GraphQL e pondo o caminho para /api
server.applyMiddleware({ app, path: '/api' })


app.listen({ port }, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))