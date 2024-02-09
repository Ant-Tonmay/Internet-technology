const net = require('net');
let myMap = null
const server = net.createServer(conn => {
    console.log("Client Connected...");
    const clientAddress = conn.address().address;
    console.log("client Ip:",clientAddress)

    conn.on('data', data => {
        // Handle incoming data
        let dataString = data.toString().trim().split(' ');
        console.log(dataString);
        let i = 0;
        let flag=0
        while (i < dataString.length) {
            let key, value;
            if (dataString[i] === "put") {
                flag =1
                key = dataString[i + 1];
                value = dataString[i + 2];
                if(myMap === null) {
                    myMap = {};
                    myMap[clientAddress] = {};
                }
                myMap[clientAddress][key]=value;
                i += 3;
                conn.write("Data saved successfully\n");
                
            }
            if (dataString[i] === "get") {
                if(myMap === null) {
                    conn.write("No data avaiable");
                    return;
                }
                if(!myMap[clientAddress]) {
                    conn.write("No data avaiable");
                    return;
                }
                
                key = dataString[i + 1];
                console.log(myMap[clientAddress][key]);
                value = myMap[clientAddress][key];
                i += 2;
                conn.write(`Fecthed Data:${value}  `)
                //conn.write(value);
                
            }
        }
    });

    conn.on('end', () => {
        console.log('Client Left');
    });
});


const ipAddress = "192.168.0.185"; //use your own ip here 
const port = 9000;

server.listen(port, ipAddress, () => {
    console.log(`Server listening on ${ipAddress}:${port}`);
});
