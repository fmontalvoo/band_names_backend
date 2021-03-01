const { io } = require('../index');

const BandModel = require('../models/band.model');
const BandsCollection = require('../models/bands.collection');

const bandsCollection = new BandsCollection();

bandsCollection.addBand(new BandModel('Heroes del silencio'));
bandsCollection.addBand(new BandModel('Megadeth'));
bandsCollection.addBand(new BandModel('AC/DC'));
bandsCollection.addBand(new BandModel('Scorpions'));

// Socket
io.on('connection', client => {
    console.log("Cliente conectado");

    client.emit('bandas', bandsCollection.getBands());

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('add-band', (payload) => {
        bandsCollection.addBand(new BandModel(payload['name']));
        io.emit('bandas', bandsCollection.getBands());
    });

    client.on('delete-band', (payload) => {
        bandsCollection.deleteBand(payload['id']);
        io.emit('bandas', bandsCollection.getBands());
    });

    client.on('vote', (payload) => {
        bandsCollection.voteBand(payload['id']);
        io.emit('bandas', bandsCollection.getBands());
    });

});