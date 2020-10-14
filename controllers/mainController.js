const boom = require('boom')
const Modbus = require('./modbusController');
const client = require('../server');

exports.read = async(req, reply) => {
    try {
        let readData = await Modbus.readModbusData(client.Client);
        console.log("HERE+++++++")
        reply.status(200).send(readData);
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.readCoil = async(req, reply) => {
    try {
        let readData = await Modbus.readModbusCoilData(client.Client);
        console.log("HERE+++++++")
        reply.status(200).send(readData);
    } catch (err) {
        throw boom.boomify(err)
    }
}


exports.writeSpecificRegister = async(req, reply) => {
    try {
        let writeData = await Modbus.writeModbusData(client.Client, req.body.add, req.body.val);
        reply.status(200).send(writeData);
    } catch (err) {
        throw boom.boomify(err)
    }
}
exports.startRobot = async(req, reply) => {
    try {
        let writeData = await Modbus.writeModbusCoilData(client.Client);
        reply.status(200).send(writeData);
    } catch (err) {
        throw boom.boomify(err)
    }
}
exports.resetRegister = async(req, reply) => {
    try {
        var vals = [];
        for (var i = 0; i < 24; i++) {
            vals.push(0);
        }
        let writeData = await Modbus.writeAll(client.Client, 0, vals);
        writeData['status'] = 200;
        reply.status(200).send(writeData);
    } catch (err) {
        throw boom.boomify(err)
    }
}