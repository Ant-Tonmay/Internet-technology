const { log } = require('console');
const net = require('net');

const serverIP = process.argv[2] || '127.0.0.1'; 
const serverPort = parseInt(process.argv[3]) || 9000;

console.log(serverIP)
console.log(serverPort)



let reqest=""

for(let i =4 ;i<process.argv.length;i++){
  reqest=reqest+process.argv[i];
  if(i!=process.argv.length){
    reqest+=' ';
  }
}


console.log(reqest)
if (!serverIP || !serverPort) {
    console.error('Usage: node client.js <serverIP> <serverPort>');
    process.exit(1);
}

// Creating a TCP socket (client)
const client = net.createConnection({ host: serverIP, port: serverPort }, () => {
    console.log(`Connected to the server at ${serverIP}:${serverPort}`);
    console.log("Sending Request!!")
    console.log(reqest);
    // Sending Request to the server
    client.write(reqest)
});

// Handling data received from the server
client.on('data', (data) => {
    console.log('Received data from the server:', data.toString());
    
    // Closing the client connection
    client.end();
});

// Handling the connection end event
client.on('end', () => {
    console.log('Connection with the server ended.');
});

// Handling errors
client.on('error', (err) => {
    console.error('Error:', err.message);
});
//req.end();