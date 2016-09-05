const express = require('express');
      config = require('./keys')
      bodyParser = require('body-parser');
      cors = require('cors');
      massive = require('massive');
      jwt = require('jwt-simple');
      AWS = require('aws-sdk');
// import connectString from config.connectString;
// import massiveInstance from massive.connectSync({connectionString: connectString});
// app.set('db', massiveInstance);
// import salesOrders from('./controllers/salesController.js')
// import login from require('./controllers/loginController.js')
AWS.config.update({
  accessKeyId: config.AWS.ACCESS_KEY,
  secretAccessKey: config.AWS.SECRET_KEY,
  region: 'us-west-2'
});

const s3 = new AWS.S3();

const app = express();

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






app.use(bodyParser.json({limit: '50mb'})); //limits file size, default limit is 100kb
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('../../www'));
app.use('/node_modules', express.static('./node_modules'));

app.get('/test', function(req, res, next){
  res.json({'hi':'test'});
});

app.post('/api/newimage', function(req, res, next) {
  console.log('here in the server');
  const buf = new Buffer(req.body.imageBody.replace(/^dat:image\/\w+;base64,/,''), 'base64')
  console.log(req.body.imageBody);
  const bucketName = 'homebuyer-bucket/' + req.body.userEmail;
  const params = {
    Bucket: bucketName,
    Key: req.body.imageName,
    Body: buf,
    ContentType: 'image/' + req.body.imageExtension,
    ACL: 'public-read'
  };

  s3.upload(params, function(err, data) {
    if (err) res.status(500).send(err);
    res.status(200).json(data);
    console.log('upload', data);
  });
});


app.listen(3000, function() {
    console.log('listening on port: ', 3000)
})
