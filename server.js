const express = require('express');
const path = require('path'); //this be part ofnode itself ;)
const http = require('http'); //as well
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/database');
const admin = require('./routes/admin')

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to db ' + config.database);
})

mongoose.connection.on('errors', (err) => {
    console.log('Database error: ' + err);
})


const app = express();


//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/admin', admin); //Make the path for all "/users" urls sent to this javascript file.

//Set Static folder
app.use(express.static(path.join(__dirname, 'dist'))); // where all the messup building should take place

//Index route ! :D
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));