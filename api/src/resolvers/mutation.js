const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');
const passport = require('passport');
const { models } = require('mongoose');


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

    signUp: async(parent, { username, email, password }, { models }) => {
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
                // Criar e retornar um token JWT
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        } catch (err) {
            console.log(err)
            throw new Error('Error creating account');
        }


    },

    signIn: async(parent, { username, email, password }, { models }) => {
        if (email) {
            // Normalizando email
            email = email.trim().toLowerCase()
        }
        const user = await models.User.findOne({
            $or: [{ email, username }]
        });

        if (!user) {
            throw new AuthenticationError('Error signing in');
        }
        // Erro se as senhas forem diferentes
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Error signing in');
        }

        return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    }

}