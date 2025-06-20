const { PeerServer } = require('peer');
const peerServer = PeerServer({ port: 9000, path: '/' });
console.log('PeerServer running on http://localhost:9000');
