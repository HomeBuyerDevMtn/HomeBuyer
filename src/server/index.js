import express from 'express';
import config from './config.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import massive from 'massive';
// import jwt from 'jwt-simple';
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

app.get('/test', (req, res, next) => {
    res.json('suh dude')
}) 

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
