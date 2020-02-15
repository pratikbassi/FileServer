
const net = require('net');

const handBook = require("./handBook");

const initServer = () => {
  let sockets = [];
  /*
  NOTE: Two lines denotes a server function
  NOTE: One line denotes a socket function
  NOTE: No lines is probably a mistake
  */

  //--------------------------------------------------------

  const server = net.createServer(() => { //CREATES SERVER
    console.log('server has been created \n \n');
  });

  //--------------------------------------------------------
  //--------------------------------------------------------

  server.listen(8004, () => { //SERVER BEGINS TO LISTEN
    console.log('8005 (BOOK) server bound :)');
  });

  //--------------------------------------------------------
  //--------------------------------------------------------

  server.on('error', (err) => { //THROWS SERVER ERRORS
    throw err;
  });

  //--------------------------------------------------------
  //--------------------------------------------------------

  server.on('connection', (socket) => { //ACCEPTS SOCKET CONNECTIONS
    console.log(`CONNECTED WITH ${socket.remoteAddress}:${socket.remotePort}`);
    sockets.push(socket); //PUSHES NEW SOCKET INTO SOCKET LIST
    socket.setEncoding('utf8');
    //socket.setRawMode('true');


    socket.write('Type in (Y/y) + RETURN if you want a random book\n', 'utf8');

    //--------------------------------------------------------

    socket.on('data', (data) => { //PRINTS THE DATA IN THE SERVER
      console.log('Leech sent DATA:' + socket.remoteAddress + ': ' + data);
      //socket.write('Thank you for this yummy data little leech:')
      if (data === 'y' || data === "Y") {
        console.log('data printing');
        socket.write(handBook(), 'utf8');
      }
    });

    //--------------------------------------------------------

    socket.on('close', () => { //TELLS THE LEECH GOODBYE AND REMOVES IT FROM THE SOCKETS LIST
      sockets.splice(sockets.findIndex((closer) => {
        return closer.remoteAddress === socket.remoteAddress && closer.remotePort === socket.remotePort;
      }), 1);
      console.log(`Goodbye Leech: ${socket.remoteAddress}:${socket.remotePort}`);
    });
  });

  //--------------------------------------------------------
  //--------------------------------------------------------


};




module.exports = initServer;






