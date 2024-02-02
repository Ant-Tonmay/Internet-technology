const net = require('net');
let myMap = {}
const server = net.createServer(conn => {
    console.log("Client Connected...");
    const clientAddress = conn.address().address;
    console.log("client Ip:",remoteAddress)

    conn.on('data', data => {
        // Handle incoming data
        let dataString = data.toString().split(' ');

        let i = 0;
        while (i < dataString.length) {
            let key, value;
            if (dataString[i] == "put") {
                key = dataString[i + 1];
                value = dataString[i + 2];
                myMap[clientAddress][key]=value;
                i += 3;
                continue;
            }
            if (dataString[i] == "get") {
                key = dataString[i + 1];
                value = myMap[clientAddress][key];
                i += 2;
                conn.write(value);
            }
        }
    });

    conn.on('end', () => {
        console.log('Client Left');
    });
});


const ipAddress = "192.168.0.185"; 
const port = 9000;

server.listen(port, ipAddress, () => {
    console.log(`Server listening on ${ipAddress}:${port}`);
});

