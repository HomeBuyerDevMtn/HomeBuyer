'use strict';

// import app from '../index.js';
var app = require('../index.js');
var db = app.get('db');
module.exports = {
    readUserById: function readUserById(req, res, next) {
      console.log('in server');
        db.read_user_by_email(req.params.email, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'readUserById'
                });
            } else if (response) {
                res.json(response);
            }
        });
    }

};
