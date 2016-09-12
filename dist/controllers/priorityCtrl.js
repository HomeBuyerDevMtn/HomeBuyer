'use strict';

var app = require('../index.js');
var db = app.get('db');
module.exports = {

    createPriorities: function createPriorities(req, res, next) {
        for (var i = 0; i < req.body.priorities.length; i++) {
            db.create_priorities([req.body.list_id, req.body.user_id, req.body.priorities[i].priority_description, req.body.priorities[i].priority_value], function (error, response) {
                if (error) {
                    res.json({
                        status: 500,
                        message: error,
                        method: 'createPriorities, create_priorities'
                    });
                }
            });
        }
        res.json({
            message: "Priorities added successfully",
            status: 200,
            method: 'createPriorities, create_priorities'
        });
    },
    readPriorities: function readPriorities(req, res, next) {
        db.read_priorities([Number(req.query.list_id), Number(req.query.user_id)], function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'readPriorities, read_priorities'
                });
            } else if (response) {
                res.json(response);
            }
        });
    },
    editPriorities: function editPriorities(req, res, next) {
        console.log(req.body);
        for (var i = 0; i < req.body.priorities.length; i++) {
            db.update_priorities([req.body.priorities[i].priority_description, req.body.priorities[i].priority_value, req.body.priorities[i].id], function (error, response) {
                if (error) {
                    res.json({
                        status: 500,
                        message: error,
                        method: 'editPriorities, update_priorities'
                    });
                }
            });
        }
        res.json({
            message: "Priorities updated successfully",
            status: 200,
            method: 'editPriorities, update_priorities'
        });
    },
    deletePriority: function deletePriority(req, res, next) {
        db.delete_priority(req.params.id, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'deletePriority, delete_priority'
                });
            } else if (response) {
                res.json({
                    message: "Priorities updated successfully",
                    status: 200,
                    method: 'deletePriority, delete_priority'
                });
            }
        });
    }
};