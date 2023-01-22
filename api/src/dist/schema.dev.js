"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    type Note {\n        id: ID!\n        content: String!\n        author: String!\n        \n    }\n\n\n    type Query {\n        hello: String\n        notes: [Note!]!\n        note(id:ID!): Note!\n    }\n\n    type Mutation{\n        newNote(content: String!): Note!\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server-express'),
    gql = _require.gql;

module.exports = gql(_templateObject());