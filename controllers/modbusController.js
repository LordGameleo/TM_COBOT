/* eslint-disable no-console, spaced-comment, func-call-spacing, no-spaced-func */

//==============================================================
// This is an example of polling (reading) Holding Registers
// on a regular scan interval with timeouts enabled.
// For robust behaviour, the next action is not activated
// until the previous action is completed (callback served).
//==============================================================

// "use strict";

// //==============================================================
// // create an empty modbus client
// var ModbusRTU   = require ("modbus-serial");
// var client      = new ModbusRTU();
// var counter = 1;

// var mbsStatus   = "Initializing...";    // holds a status of Modbus

// // Modbus 'state' constants
// var MBS_STATE_INIT          = "State init";
// var MBS_STATE_IDLE          = "State idle";
// var MBS_STATE_NEXT          = "State next";
// var MBS_STATE_GOOD_READ     = "State good (read)";
// var MBS_STATE_FAIL_READ     = "State fail (read)";
// var MBS_STATE_GOOD_CONNECT  = "State good (port)";
// var MBS_STATE_FAIL_CONNECT  = "State fail (port)";

// // Modbus TCP configuration values
// var mbsId       = 1;
// var mbsPort     = 502;
// var mbsHost     = "127.0.0.1";
// var mbsScan     = 1000;
// var mbsTimeout  = 5000;
// var mbsState    = MBS_STATE_INIT;



//==============================================================
exports.readModbusData = async(client) => {
    // try to read data
    await client.connectTCP("192.168.98.151");

    var data1 = await client.readHoldingRegisters(260, 3)
        .then(function(data) {
            return data.data;
        })
        .catch(function(e) {
            console.log("ERROR-------------")
            console.log(e);
        });


    var data2 = await client.readHoldingRegisters(270, 5)
        .then(function(data) {
            return data.data;
        })
        .catch(function(e) {
            console.log("ERROR-------------")
            console.log(e);
        });

    // await client.connectTCP();

    var data3 = await client.readHoldingRegisters(280, 5)
        .then(function(data) {
            return data.data;
        })
        .catch(function(e) {
            console.log("ERROR-------------")
            console.log(e);
        });

    // await client.connectTCP();

    var data4 = await client.readHoldingRegisters(300, 6)
        .then(function(data) {
            return data.data;
        })
        .catch(function(e) {
            console.log("ERROR-------------")
            console.log(e);
        });

    var data5 = await client.readCoils(16, 2)
        .then(function(data) {
            return data.data;
        })
        .catch(function(e) {
            console.log("ERROR-------------")
            console.log(e);
        });

    return data1.concat(data2, data3, data4, data5);
};


//==============================================================
exports.readModbusCoilData = async(client) => {
    // try to read data
    await client.connectTCP("192.168.98.151");

    var data = await client.readCoils(16, 2)
        .then(function(data) {
            return data.data;
        })
        .catch(function(e) {
            console.log("ERROR-------------")
            console.log(e);
        });
    return data;
};


//==============================================================
exports.writeModbusData = async(client, registerAdd, val) => {
    // try to read data
    var data = client.writeRegister(registerAdd, val)
        .then(function(data) {
            return data;
        })
        .catch(function(e) {
            console.log(e);
        });
    return data;
};

//==============================================================
exports.writeModbusCoilData = async(client) => {
    // try to read data
    await client.connectTCP("192.168.98.151");
    var data = await this.readModbusData(client);
    console.log("Checking here ")
    console.log(data);

    var res = [];
    res.push(await client.writeCoil(16, !data[19])
        .then(function(data) {
            return data;
        })
        .catch(function(e) {
            console.log(e);
        }));
    res.push(await client.writeCoil(17, !data[20])
        .then(function(data) {
            return data;
        })
        .catch(function(e) {
            console.log(e);
        }));
    console.log("CHECKING--------------------------");
    console.log(res);
    return res;
};


//==============================================================
exports.writeAll = async(client, registerAdd, val) => {
    // try to read data
    var data = client.writeRegisters(registerAdd, val)
        .then(function(data) {
            return data;
        })
        .catch(function(e) {
            console.log(e);
        });
    return data;
};


// //==============================================================
// var runModbus = async (client) =>
// {
//     var nextAction;

//     switch (mbsState)
//     {
//         case MBS_STATE_INIT:
//             nextAction = connectClient;
//             break;

//         case MBS_STATE_NEXT:
//             nextAction = readModbusData;
//             break;

//         case MBS_STATE_GOOD_CONNECT:
//             nextAction = readModbusData;
//             break;

//         case MBS_STATE_FAIL_CONNECT:
//             nextAction = connectClient;
//             break;

//         case MBS_STATE_GOOD_READ:
//             nextAction = readModbusData;
//             break;

//         case MBS_STATE_FAIL_READ:
//             if (client.isOpen)  { mbsState = MBS_STATE_NEXT;  }
//             else                { nextAction = connectClient; }
//             break;

//         default:
//             // nothing to do, keep scanning until actionable case
//     }

//     console.log();
//     console.log(nextAction);

//     // execute "next action" function if defined
//     if (nextAction !== undefined)
//     {
//         nextAction();
//         mbsState = MBS_STATE_IDLE;
//     }
//     counter = counter+1;
//     setTimeout (runModbus, mbsScan);
// };

// //==============================================================
// runModbus();