'use strict';

var app = require('../index.js');
var db = app.get('db');
module.exports = {

    createList: function createList(req, res, next) {
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
    readListByUserId: function readListByUserId(req, res, next) {
        db.read_list_by_user_id(req.params.user_id, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'readListByUserId'
                });
            } else {
                res.json(response);
            }
        });
    },
    readHomesByListId: function readHomesByListId(req, res, next) {
        db.read_homes_by_list_id(req.params.list_id, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'readHomesByListId'
                });
            } else if (response) {
                res.json(response);
            }
        });
    }
};