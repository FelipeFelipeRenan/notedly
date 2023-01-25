module.exports = {
    author: async(note, args, { models }) => {
        // retorna as informaçoes do autor da nota
        return await models.User.findById(note.author)
    },
    // retorna a lista de quem favoritou a nota
    favoritedBy: async(note, args, { models }) => {
        return await models.User.find({ _id: { $in: note.favoritedBy } })
    }
}