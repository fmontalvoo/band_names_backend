require('dotenv').config()

const express = require('express');
const path = require('path')

const public = path.resolve(__dirname, 'public')
const port = process.env.PORT;

const app = express();

app.use(express.static(public));

// Socket server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

server.listen(port, (error) => {
    if (error) throw new Error(error);

    console.log(`Servidor ejecutandose en el puerto ${port}`);
})