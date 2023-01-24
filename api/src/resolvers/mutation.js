const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');
const passport = require('passport');


module.exports = {
    newNote: async(parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Adam Scott'
        });
    },
    deleteNote: async(parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id });
            return true;
        } catch (err) {
            return false
        }
    },

    updateNote: async(parent, { content, id }, { models }) => {
        return await models.Note.findOneAndUpdate({
            _id: id,
        }, {
            $set: {
                content
            }
        }, {
            new: true
        })
    },

    singUp: async(parent, { username, email, password }, { models }) => {
        // Normalizando eemail
        email = email.trim().toLowerCase();
        // passando a hash na senha
        const hashed = await bcrypt.hash(password, 10);
        // Criando a URL para o Gravatar
        const avatar = gravatar(email);

        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
        } catch (err) {

        }


    }

}