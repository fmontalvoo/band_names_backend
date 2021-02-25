const { io } = require('../index');

// Socket
io.on('connection', client => {
    console.log("Cliente conectado");
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('message', (payload) => {
        console.log(`Recibiendo mensaje`, payload);
        io.emit('message', { status: 200 })
    });
});