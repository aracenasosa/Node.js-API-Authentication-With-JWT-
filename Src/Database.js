const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Carlos:carlos20014@cluster0-wtmxo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => console.log('Db is Connected!'))
.catch(err => console.log(err));

module.exports = mongoose;