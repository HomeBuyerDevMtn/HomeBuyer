import express from 'express';
// import config from require('./config.js')
import bodyParser from 'body-parser';
import cors from 'cors';
import massive from 'massive';
import jwt from 'jwt-simple';
// import connectString from config.connectString;
const app = express();
// import massiveInstance from massive.connectSync({connectionString: connectString});
// app.set('db', massiveInstance);
// import salesOrders from('./controllers/salesController.js')
// import login from require('./controllers/loginController.js')


app.use(bodyParser.json());
app.use(cors());

app.get('test', (req, res, next) => {
    res.json('suh dude')
}) 

let dan = name => {'kitty kat'} 
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
app.listen(3000, function() {
    console.log('listening on port: ', 3000)
})
