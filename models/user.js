var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var userSchema = new Schema({
        name: {type: String},
        username: {type: String, required: true},
        email: {type: String},
        password: {type: String, required: true},
        created: {type: Date, default: Date.now}
    });

    mongoose.model('User', userSchema, 'users');
};

