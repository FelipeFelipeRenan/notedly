const express = require('express')

const { ApolloServer, gql } = require('apollo-server-express')

require('dotenv').config()

const db = require('./db')

const port = process.env.PORT || 4000

const DB_HOST = process.env.DB_HOST;


let notes = [
    { id: '1', content: 'This is a note', author: "Adam Scott" },
    { id: '2', content: 'This is another note', author: "Harlow Everly" },
    { id: '3', content: 'Oh hey look, another note', author: "Riley Harrison" }
]

// Construir um schema, usando a linguagem de schema do GraphQL
const typeDefs = gql `
    type Note {
        id: ID!
        content: String!
        author: String!
        
    }
    
    
    type Query {
        hello: String
        notes: [Note!]!
        note(id:ID!): Note!
    }
    
    type Mutation{
        newNote(content: String!): Note!
    }
`;

// Funçoes resolver para os campos do schema criado anteriormente
const resolvers = {
    Query: {
        hello: () => 'Hello world',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id)
        }

    },

    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: 'Adam Scott'
            };
            notes.push(noteValue)
            return noteValue
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