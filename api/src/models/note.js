const mongoose = require('mongoose');

// Definindo o schema do banco de dados de notas
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    favoriteCount: {
        type: Number,
        default: 0
    },
    favoritedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {
    timestamps: true
});

// Definindo o modelo de Nota com o Schema
const Note = mongoose.model('Note', noteSchema);

// Exportando o modulo
module.exports = Note;