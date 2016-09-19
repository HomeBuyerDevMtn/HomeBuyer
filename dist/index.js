'use strict';

var express = require('express');

var config = require('./config');
// const keys = require('./keys');
// const secretkeys = require('./secretkeys');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var jwt = require('jwt-simple');
// const AWS = require('aws-sdk');

// AWS.config.update({
//   function() {console.log("this is the secret", secretkeys.aws.ACCESS_KEY);},
//   accessKeyId: secretkeys.aws.ACCESS_KEY,
//   secretAccessKey: secretkeys.aws.ACCESS_SECRET,
//   region: 'us-west-2'
// });

var app = module.exports = express();

// app.use(bodyParser.json({limit: '50mb'})); //limits file size, default limit is 100kb
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// const s3 = new AWS.S3();


var connectString = config.connectString;

var massiveInstance = massive.connectSync({ connectionString: connectString });
app.set('db', massiveInstance);
var db = app.get('db');
var users = require('./controllers/userCtrl.js');
var lists = require('./controllers/listCtrl.js');
var homes = require('./controllers/homeCtrl.js');
var priorities = require('./controllers/priorityCtrl.js');
var ratings = require('./controllers/ratingCtrl.js');
var images = require('./controllers/imageCtrl.js');

app.use(bodyParser.json());
app.use(cors());

// app.use(express.static('../../www'));
// app.use('/node_modules', express.static('./node_modules'));


// hitting Amazon's endpoint to store an image in homebuyer's bucket
// app.post('/api/newimage', function(req, res, next) {
//   console.log('here in the server');
//   const buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/,''), 'base64')
//   console.log(req.body);

//   const bucketName = 'homebuyer-bucket/' + req.body.userEmail;
//   const params = {
//     Bucket: bucketName,
//     Key: req.body.imageName,
//     Body: buf,
//     ContentType: 'image/' + req.body.imageExtension,
//     ACL: 'public-read'
//   };

//   // console.log(req.body.imageBody);

//   s3.upload(params, function(err, data) {
//     if (err) res.status(500).send(err);
//     res.status(200).json(data);
//     console.log('upload', data);
//     console.log(err);
//   });
// });

//TEST ENDPOINTS

app.get('/test', users.authenticateRequest, function (req, res, next) {
  res.json('You got through');
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
app.post('/lists/homes/deactivate/:home_id', homes.deactivateHome);
app.put('/lists/homes', homes.editHome);

//PRIORITIES ENDPOINTS
app.post('/priorities', priorities.createPriorities);
app.get('/priorities', priorities.readPriorities);
app.put('/priorities', priorities.editPriorities);
app.delete('/priorities/:id', priorities.deletePriority);
// edit priorities


//RATINGS ENDPOINTS
app.get('/ratings', ratings.readRatings);
app.post('/ratings', ratings.createRatings);
app.put('/ratings', ratings.editRatings);

//IMAGES ENDPOINTS
app.post('/images', images.addImage);

//AUTH ENDPOINTS
app.post('/auth/google', users.googleLogin);
app.post('/auth/local/register', users.localRegister);
app.post('/auth/local/login', users.localLogin);

app.listen(config.port, function () {
  console.log('listening on port: ', config.port);
});
