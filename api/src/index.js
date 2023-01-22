const express = require('express')

const { ApolloServer } = require('apollo-server-express')

require('dotenv').config()

const db = require('./db')

const models = require('./models')

const port = process.env.PORT || 4000

const DB_HOST = process.env.DB_HOST;

// Construir um schema, usando a linguagem de schema do GraphQL
const typeDefs = require('./schema')

// Funçoes resolver para os campos do schema criado anteriormente
const resolvers = {
    Query: {
        hello: () => 'Hello world',
        notes: async() => {
            return await models.Note.find();
        },
        note: async(parent, args) => {
            return await models.Note.findById(args.id);
        }

    },

    Mutation: {
        newNote: async(parent, args) => {
            return await models.Note.create({
                content: args.content,
                author: 'Adam Scott'
            })
        }

    }
}

const app = express()

//Conectando ao banco de dados
db.connect(DB_HOST)

// Setup do Apollo Server
const server = new ApolloServer({ typeDefs, resolvers })

// Aplicando a Middleware do Apollo GraphQL e pondo o caminho para /api
server.applyMiddleware({ app, path: '/api' })


app.listen({ port }, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))