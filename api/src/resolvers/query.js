module.exports = {
    notes: async(parent, args, { models }) => {
        return await models.Note.find();
    },
    note: async(parent, args, { models }) => {
        return await models.Note.findById(args.id);
    },
    user: async(parent, { username }, { models }) => {
        // Encontrar um usuario dado um nome
        return await models.User.findOne({ username });
    },
    users: async(parent, args, { models }) => {
        // Encontrar todos os usuarios
        return await models.User.find({});
    },
    me: async(parent, args, { models, user }) => {
        // Encontrar um usuario dado o contexto do usuario atual
        return await models.User.findById(user.id);
    },

    noteFeed: async(parent, { cursor }, { models }) => {
        // Limite de retorno hardcoded
        const limit = 10
            // setando um valor default para o hasNextPage
        let hasNextPage = false
            // se nao for passado cursor, a query default será vazia
            // isso ira trazer as notas mais novas do bd
        let cursorQuery = {}

        // se tiver passado o cursor
        // a query ira trazer as notas com o ObjectId menor que o cursor
        if (cursor) {
            cursorQuery = { _id: { $lt: cursor } }
        }
        // encontrar o limite + 1 de notas no bd, da mais velha pra mais nova
        let notes = await models.Note.find(cursorQuery)
            .sort({ _id: -1 })
            .limit(limit + 1)

        // se o numero de notas exceder o limite
        // sete hasNextPage como true e corte as notas ate o limite
        if (notes.length > limit) {
            hasNextPage = true
            notes = notes.slice(0, -1)
        }

        // o novo cursor será o ID do objeto do mongo do ultimo item do array
        const newCursor = notes[notes.length - 1]._id

        return {
            notes,
            cursor: newCursor,
            hasNextPage
        }


    }


}