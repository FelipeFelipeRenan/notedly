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
const mongoose = require('mongoose')


module.exports = {
    newNote: async(parent, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note')

        }

        return await models.Note.create({
            content: args.content,
            // referenciando o id do autor no mongo
            author: mongoose.Types.ObjectId(user.id)
        });
    },
    deleteNote: async(parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a note')

        }
        const note = await models.Note.findById(id)
            // Lança um forbidden error se o usuario atual for diferente do dono da nota
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError('You don\'t have permission to delete the note')
        }
        try {
            await note.remove();
            return true;
        } catch (err) {
            return false
        }
    },

    updateNote: async(parent, { content, id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a note')

        }
        const note = await models.Note.findById(id)
            // Lança um forbidden error se o usuario atual for diferente do dono da nota
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError('You don\'t have permission to delete the note')
        }

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
    },

    toggleFavorite: async(parent, { id }, { models, user }) => {

        if (!user) {
            throw AuthenticationError();
        }

        // Checar se o usuario ja favoritou a nota
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);
        // Se o usuario exisir na lista
        // retire ele da lista de favoritos e reduza o favoriteCount em 1
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id, {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                }, {
                    new: true
                }
            )
        } else {
            // Se o usuario nao existir na lista
            // adicione-o e incremente o favoriteCount em 1
            return await models.Note.findByIdAndUpdate(
                id, {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                }, {
                    new: true
                }
            )
        }
    }

}