const fastify = require('fastify'); //Bring in Fastify
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/accessRoutes");


const app = fastify({
    logger: true
})

app.register(require('fastify-cors'), {
    origin: true
})

app.register(require('fastify-websocket'), {
    handle(conn) {
        // if(conn){
        //   console.log("HERE----No Connection")
        // }
        // else
        conn.pipe(conn) // creates an echo server
    },
    options: {
        maxPayload: 1048576,
        verifyClient(info, next) {
            try {
                const token = info.req.headers['sec-websocket-protocol']
                return next(true)
            } catch (err) {
                return next(false)
            }
        }
    }
});

routes.forEach((route, index) => {
    app.route(route)
})

//==============================================================
// create a modbus client
var ModbusRTU = require("modbus-serial");
const { readModbusData } = require('./controllers/modbusController');
var client = new ModbusRTU();

var mbsStatus = "Initializing..."; // holds a status of Modbus

// Modbus TCP configuration values
var mbsId = 1;
var mbsPort = 502;
var mbsHost = "192.168.98.151";
// var mbsHost = "127.0.0.1";
var mbsTimeout = 100000;


//==============================================================
const connectClient = async(client) => {
    // close port (NOTE: important in order not to create multiple connections)


    // set requests parameters
    client.setID(mbsId);
    client.setTimeout(mbsTimeout);

    // try to connect
    client.connectTCP(mbsHost, { port: mbsPort })
        .then(function() {
            mbsStatus = "Connected, wait for reading...";
            console.log(mbsStatus);
            // console.log(client.readHoldingRegisters(2))
        })
        .catch(function(e) {
            console.log(e);
        });

};



connectClient(client);
exports.Client = client;


// Declare a route
app.get("/", async() => {
    return {
        Message: "Server is running!"
    }
})



app.route({
    method: 'GET',
    url: '/api/live',
    handler: (req, reply) => {
        reply.send({ route: 'OK' })
    }
})

async function dataConnection() {

}


//Funtion To run the server
const start = async() => {
    try {
        await app.listen(PORT)
        app.log.info(`server listening on ${app.server.address().port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start();