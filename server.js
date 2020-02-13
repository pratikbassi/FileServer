
//const {handBook, net, fs} = require('./index')
const net = require('net');
const fs = require('fs');
const handBook = require("./handBook");

const initServer = () => {
  let sockets = [];
  

  //--------------------------------------------------------
  const server = net.createServer(() => { //CREATES SERVER
    console.log('leech has connected');
  })
  //--------------------------------------------------------
  //--------------------------------------------------------
  server.listen(8004, () => { //SERVER BEGINS TO LISTEN
    console.log('8005 (BOOK) server bound :)')
  })
  //--------------------------------------------------------
  //--------------------------------------------------------
  server.on('error', (err) => { //THROWS SERVER ERRORS
    throw err;
  })
  //--------------------------------------------------------
  //--------------------------------------------------------
  server.on('connection', (socket) => { //ACCEPTS SOCKET CONNECTIONS
    console.log(`CONNECTED WITH ${socket.remoteAddress}:${socket.remotePort}`);
    sockets.push(socket); //PUSHES NEW SOCKET INTO SOCKET LIST
    //--------------------------------------------------------
    socket.on('data', (data) => { //PRINTS THE DATA IN THE SERVER
      console.log('Leech sent DATA:' + socket.remoteAddress + ': '+ data);
      socket.write('Thank you for this yummy data little leech')
    })
    //--------------------------------------------------------
    socket.on('close', () => { //TELLS THE LEECH GOODBYE AND REMOVES IT FROM THE SOCKETS LIST
      sockets.splice(sockets.findIndex((closer) => {
        return closer.remoteAddress === socket.remoteAddress && closer.remotePort === socket.remotePort
      }), 1)
      console.log(`Goodbye Leech: ${socket.remoteAddress}:${socket.remotePort}`);
    })
  })
  //--------------------------------------------------------


}



initServer();

module.exports = {initServer};






