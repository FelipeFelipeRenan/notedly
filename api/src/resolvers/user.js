module.exports = {
    // Retorna a lista de notas de um usuario
    notes: async(user, args, { models }) => {
        return await models.Note.find({ author: user._id }).sort({ _id: 1 })
    },
    // Retorna a lista de notas favoritadas de um usuario
    favorites: async(user, args, { models }) => {
        return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 })
    }
}