var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var contactSchema = new Schema({
        name: {type: String, required: true},
        surname: {type: String},
        company: {type: String},
        email: {type: String},
        telephone: {type: String},
        address: {type: String},
        group: {type: String, required: true},
        created: {type: Date, default: Date.now},
        owner: {type: Schema.Types.ObjectId, ref: 'User'}
    });

    mongoose.model('Contact', contactSchema, 'contacts');
};

