'use strict';

var express = require('express');

var config = require('./config');

// const keys = require('./keys');

// const secretkeys = require('./secretkeys.js');

var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var jwt = require('jwt-simple');

var AWS = require('aws-sdk');

// AWS.keys.update({
//   accessKeyId: keys.AWS.ACCESS_KEY,
//   secretAccessKey: keys.AWS.SECRET_KEY,
//   region: 'us-west-2'
// });
//
// const s3 = new AWS.S3();


var connectionString = config.connectString;
var massiveInstance = massive.connectSync({ connectionString: connectionString });
var app = module.exports = express();

// const AWS = require('aws-sdk');
//
// AWS.config.update({
//   accessKeyId: secretkeys.aws.ACCESS_KEY,
//   secretAccessKey: secretkeys.aws.ACCESS_SECRET,
//   region: 'us-west-2'
// });
//
//
// const app = module.exports = express();
//
//
// const s3 = new AWS.S3();

var connectString = config.connectString;

app.set('db', massiveInstance);

var users = require('./controllers/userCtrl.js');
var lists = require('./controllers/listCtrl.js');
var homes = require('./controllers/homeCtrl.js');
var priorities = require('./controllers/priorityCtrl.js');
var ratings = require('./controllers/ratingCtrl.js');
var images = require('./controllers/imageCtrl.js');

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' })); //limits file size, default limit is 100kb
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('../../www'));
app.use('/node_modules', express.static('./node_modules'));

app.post('/api/newimage', function (req, res, next) {
  console.log('here in the server');
  var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  // console.log(req.body);

  var bucketName = 'homebuyer-bucket/' + req.body.userEmail;
  var params = {
    Bucket: bucketName,
    Key: req.body.imageName,
    Body: buf,
    ContentType: 'image/' + req.body.imageExtension,
    ACL: 'public-read'
  };

  console.log(req.body.imageBody);

  s3.upload(params, function (err, data) {
    if (err) res.status(500).send(err);
    res.status(200).json(data);
    console.log('upload', data);
    console.log(err);
  });
});

// USER ENDPOINTS
app.get('/users/:email', users.readUserById);

//LIST ENDPOINTS
app.get('/lists/:user_id', lists.readListByUserId);
app.get('/lists/homes/:list_id', lists.readHomesByListId);
app.get('/lists/homes/id/:home_id', homes.readHomesByHomeId);
app.post('/lists', lists.createList);

//HOME ENDPOINTS
app.post('/lists/homes', homes.createHome);

//PRIORITIES ENDPOINTS
app.post('/priorities', priorities.createPriorities);

//RATINGS ENDPOINTS
app.post('/ratings', ratings.createRating);

//IMAGES ENDPOINTS
app.post('/images', images.addImage);

//AUTH ENDPOINTS
app.post('/auth/google', users.googleLogin);
app.post('/auth/local/register', users.localRegister);

app.listen(config.port, function () {
  console.log('listening on port: ', config.port);
});