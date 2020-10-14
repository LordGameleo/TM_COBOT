const mainController = require('../controllers/mainController');
const routes = [{
        method: 'GET',
        url: '/api/read',
        handler: mainController.read
    },
    {
        method: 'GET',
        url: '/api/readCoil',
        handler: mainController.readCoil
    },
    {
        method: 'POST',
        url: '/api/write-specific-register',
        handler: mainController.writeSpecificRegister
    },
    {
        method: 'POST',
        url: '/api/reset-registers',
        handler: mainController.resetRegister
    },
    {
        method: 'POST',
        url: '/api/start-robot',
        handler: mainController.startRobot
    }
]
module.exports = routes