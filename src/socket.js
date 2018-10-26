import io from 'socket.io-client'

const client = io.connect('http://localhost:1337');

client.on('data', (msg) => console.info('hey', msg));
