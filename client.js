const Net = require('net')
const readline = require('readline')

const client = new Net.Socket();
client.setEncoding('utf8')

let myConn = client.connect({port: 8004, host: 'localhost'});

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (line) => {
  myConn.write(line, 'utf8');
})

 myConn.on('data', (data) => {
   console.log(data);
 })




