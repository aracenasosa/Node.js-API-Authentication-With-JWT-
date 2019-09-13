const {Schema, model} = require('mongoose');

const authSchema = new Schema({

    Username: {type: String, required: true, min: 6, max: 255},
    Email: {type: String, required: true, min: 6, max: 255},
    Password: {type: String, required: true, min: 6, max: 255},
    Date: {type: Date, default: Date.now}
});

module.exports = model('User', authSchema);