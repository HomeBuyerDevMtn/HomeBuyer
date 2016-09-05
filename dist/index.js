'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _massive = require('massive');

var _massive2 = _interopRequireDefault(_massive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import jwt from 'jwt-simple';
var connectString = _config2.default.connectString;
var app = module.exports = (0, _express2.default)();

var massiveInstance = _massive2.default.connectSync({ connectionString: connectString });
app.set('db', massiveInstance);
var users = require('./controllers/userCtrl.js');
var lists = require('./controllers/listCtrl.js');
var homes = require('./controllers/homeCtrl.js');
var priorities = require('./controllers/priorityCtrl.js');
var ratings = require('./controllers/ratingCtrl.js');
var images = require('./controllers/imageCtrl.js');

app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.get('/test', function (req, res, next) {
    res.json('suh dude');
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

app.listen(_config2.default.port, function () {
    console.log('listening on port: ', _config2.default.port);
});