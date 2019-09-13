const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv').config();

// Initiazalitions
const app = express();
const { mongoose } = require('./Database');

// Settings
app.set('port', process.env.Port || 3000);
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'Public')));

// Routes
app.use('/api/user', require('./Routes/Routes'));
app.use('/api/posts', require('./Routes/Post'));

// Listen the port
app.listen(app.get('port'), () => {
    console.log(`Server on port ${chalk.green(app.get('port'))}`);
});