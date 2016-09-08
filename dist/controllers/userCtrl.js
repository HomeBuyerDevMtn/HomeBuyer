'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import app from '../index.js';
var app = require('../index.js');
var db = app.get('db');
var jwt = require('jwt-simple');
var config = require('../config.js');

var User = function User(user_id, name, email, token, auth_user_type_id) {
    _classCallCheck(this, User);

    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.token = token;
    this.auth_user_type_id = auth_user_type_id;
};

module.exports = {
    readUserById: function readUserById(req, res, next) {
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
    },
    googleLogin: function googleLogin(req, res, next) {
        //#1 check to see if the user is already in the database
        db.read_email_google([req.body.email], function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'googleLogin'
                });
            }
            //#1 if they are we will send back the user object with the associated token
            else if (response.length > 0) {
                    console.log(response);

                    var currentUser = new User(response[0].id, response[0].name, response[0].email, response[0].token, 2);
                    res.json(currentUser);
                }
                //#2 if not we will create the user and token and then send back the same info
                else if (response.length === 0) {
                        var newUser = { name: req.body.name, email: req.body.email };
                        var token = jwt.encode(newUser, config.secret);
                        // var currentUser = new User(req.body.name, req.body.email, token, 2);
                        db.add_user_google([req.body.name, req.body.email, req.body.third_party_id, token], function (error, response) {
                            if (error) {
                                res.json({
                                    status: 500,
                                    message: error,
                                    method: 'googleLogin'
                                });
                            } else if (response) {
                                db.read_email_google(req.body.email, function (error, response) {
                                    if (error) {
                                        res.json({
                                            status: 500,
                                            message: error,
                                            method: 'googleLogin'
                                        });
                                    } else if (response) {
                                        console.log(response);
                                        var currentUser = new User(response[0].id, response[0].name, response[0].email, response[0].token, 2);
                                        res.json(currentUser);
                                    }
                                });
                            }
                        });
                    }
        });
    },
    localLogin: function localLogin(req, res, next) {},
    localRegister: function localRegister(req, res, next) {
        //#1Check to see if email already exists in the users table
        console.log(req.body);
        db.read_user_local(req.body.email, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'localRegister'
                });
            }
            //#1 if it exists send back an error message saying the email is being used and they need to use another email    
            else if (response.length > 0) {
                    res.json({
                        status: 200,
                        message: 'User already exists in the database. Please login.',
                        method: 'localRegister'
                    });
                }
                //#2 if it doesn't exist add the email to the users table and create a token send back the new user object.
                else if (response.length === 0) {
                        console.log("user does not exist");
                        var newUser = { name: req.body.name, email: req.body.email };
                        var token = jwt.encode(newUser, config.secret);
                        var currentUser = new User(req.body.name, req.body.email, token, 1);
                        db.add_user_local([req.body.name, req.body.email, req.body.password, token], function (error, response) {
                            if (error) {
                                console.log(error);
                                res.json({
                                    status: 500,
                                    message: error,
                                    method: 'localRegister'
                                });
                            } else if (response) {
                                res.json(currentUser);
                            }
                        });
                    }
            // else{
            //     res.send('you aren\'t hitting shit')
            // }    
        });
    }

};