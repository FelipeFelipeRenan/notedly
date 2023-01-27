const express = require('express')

const helmet = require('helmet');

const cors = require('cors');

const { ApolloServer } = require('apollo-server-express')

const depthLimit = require('graphql-depth-limit')

const { createComplexityLimitRule } = require('graphql-validation-complexity')


require('dotenv').config()

const jwt = require('jsonwebtoken')

const db = require('./db')

const models = require('./models')

// Construir um schema, usando a linguagem de schema do GraphQL
const typeDefs = require('./schema')

// Funçoes resolver para os campos do schema criado anteriormente
const resolvers = require('./resolvers')

const DB_HOST = process.env.DB_HOST;

const port = process.env.PORT || 4000

const app = express()

app.use(helmet())

app.use(cors())
    //Conectando ao banco de dados
db.connect(DB_HOST)

// Pegando a informação do usuario de um JWT
const getUser = token => {
    if (token) {
        try {
            // Retornando a informação de um token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error('Session invalid');
        }
    }
}

// Setup do Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        // Pegando o token do usuario do header
        const token = req.headers.authorization;
        // tentando pegar um usuario com o token
        const user = getUser(token);

        console.log(user)
            // adicionando os modelos e do bd e o usuario ao contexto
        return { models, user }
    }
})

// Aplicando a Middleware do Apollo GraphQL e pondo o caminho para /api
server.applyMiddleware({ app, path: '/api' })


app.listen({ port }, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))