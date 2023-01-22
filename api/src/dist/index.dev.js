"use strict";

var express = require('express');

var _require = require('apollo-server-express'),
    ApolloServer = _require.ApolloServer;

require('dotenv').config();

var db = require('./db');

var models = require('./models');

var port = process.env.PORT || 4000;
var DB_HOST = process.env.DB_HOST; // Construir um schema, usando a linguagem de schema do GraphQL

var typeDefs = require('./schema'); // Funçoes resolver para os campos do schema criado anteriormente


var resolvers = {
  Query: {
    hello: function hello() {
      return 'Hello world';
    },
    notes: function notes() {
      return regeneratorRuntime.async(function notes$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(models.Note.find());

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    note: function note(parent, args) {
      return regeneratorRuntime.async(function note$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(models.Note.findById(args.id));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  Mutation: {
    newNote: function newNote(parent, args) {
      return regeneratorRuntime.async(function newNote$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(models.Note.create({
                content: args.content,
                author: 'Adam Scott'
              }));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }
};
var app = express(); //Conectando ao banco de dados

db.connect(DB_HOST); // Setup do Apollo Server

var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
}); // Aplicando a Middleware do Apollo GraphQL e pondo o caminho para /api

server.applyMiddleware({
  app: app,
  path: '/api'
});
app.listen({
  port: port
}, function () {
  return console.log("GraphQL Server running at http://localhost:".concat(port).concat(server.graphqlPath));
});