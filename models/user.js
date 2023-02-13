const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    password: {
        type: String,
        required: [true, 'Pas de prénom'],
    },
 

})

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel