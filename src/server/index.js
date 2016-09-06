const express = require('express');

const config = require('./config');
const keys = require('./keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const jwt = require('jwt-simple');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: keys.AWS.ACCESS_KEY,
  secretAccessKey: keys.AWS.SECRET_KEY,
  region: 'us-west-2'
});

const s3 = new AWS.S3();


const connectString = config.connectString;
const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString: connectString});
app.set('db', massiveInstance);
const users = require('./controllers/userCtrl.js');
const lists = require('./controllers/listCtrl.js');
const homes = require('./controllers/homeCtrl.js');
const priorities = require('./controllers/priorityCtrl.js');
const ratings = require('./controllers/ratingCtrl.js');
const images = require('./controllers/imageCtrl.js')



app.use(bodyParser.json());
app.use(cors());




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



// USER ENDPOINTS
app.get('/users/:email', users.readUserById);

//LIST ENDPOINTS
app.get('/lists/:user_id', lists.readListByUserId);
app.get('/lists/homes/:list_id', lists.readHomesByListId);
app.get('/lists/homes/id/:home_id',homes.readHomesByHomeId);
app.post('/lists', lists.createList);


//HOME ENDPOINTS
app.post('/lists/homes', homes.createHome);

//PRIORITIES ENDPOINTS
app.post('/priorities', priorities.createPriorities);

//RATINGS ENDPOINTS
app.post('/ratings', ratings.createRating);

//IMAGES ENDPOINTS
app.post('/images', images.addImage);






app.listen(config.port, () => {
    console.log('listening on port: ', config.port)
})
