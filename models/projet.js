const mongoose = require('mongoose')

const projetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    description: {
        type: String,
        required: [true, 'Pas de description'],
    },
    lien: {
        type: String,
        required: [true, 'Pas de lien'],
    },

    liengithub: {
        type: String,
        required: [true, 'Pas de lien github'],
    },

    image: {
        type: String,
        required: [true, 'Pas d images'],
    },
 

})

const projetModel = mongoose.model('projets', projetSchema);

module.exports = projetModel