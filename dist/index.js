'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _massive = require('massive');

var _massive2 = _interopRequireDefault(_massive);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import connectString from config.connectString;

// import config from require('./config.js')
var app = (0, _express2.default)();
// import massiveInstance from massive.connectSync({connectionString: connectString});
// app.set('db', massiveInstance);
// import salesOrders from('./controllers/salesController.js')
// import login from require('./controllers/loginController.js')


app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.get('test', function (req, res, next) {
    res.json('suh dude');
});

var dan = function dan(name) {}
// app.get('/orders',login.authorize, salesOrders.getSalesOrders);
// app.get('/orders/:id',login.authorize, salesOrders.getSalesOrderById);
// app.put('/orders/:id', login.authorize, salesOrders.updateSalesOrderById);
// app.post('/orders', login.authorize, salesOrders.createSalesOrder);
// app.put('/orders/complete/:id', login.authorize, salesOrders.completeSalesOrderById);
// app.get('/customers', salesOrders.getCustomers);
// app.post('/auth/login',login.verifyEmail, login.login);
// app.post('/auth/logout', salesOrders.logout);
// app.put('/ob', salesOrders.editSalesOrder);

;
app.listen(3000, function () {
    console.log('listening on port: ', 3000);
});