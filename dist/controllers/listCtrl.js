'use strict';

var app = require('../index.js');
var db = app.get('db');
module.exports = {

    createList: function createList(req, res, next) {
        console.log('hello there');
        db.create_list([req.body.user_id, req.body.list_name], function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'createList'
                });
            } else {
                res.json({
                    status: 200,
                    message: "List added successfully",
                    method: 'createList'
                });
            }
        });
    },
    deactivateList: function deactivateList(req, res, next) {
        db.deactivate_list(req.params.id, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'deactivateList, deactivate_list'
                });
            } else if (response) {
                res.json({
                    status: 200,
                    message: "List deactivated successfully",
                    method: 'deactivateList, deactivate_list'
                });
            }
        });
    },

    readListByUserId: function readListByUserId(req, res, next) {
        console.log('you are in readListByUserId', req.params);
        db.read_list_by_user_id(req.params.user_id, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'readListByUserId'
                });
            } else {
                console.log('This is the response from readHomesByUserId', response);
                res.json(response);
            }
        });
    },
    readHomesByListId: function readHomesByListId(req, res, next) {
        // console.log('Your in readHomesByListId', req.params)
        db.read_homes_by_list_id(Number(req.params.list_id), function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'readHomesByListId'
                });
            } else if (response) {
                // console.log('This is the response: ', response)
                res.json(response);
            }
        });
    }
};