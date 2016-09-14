'use strict';

var app = require('../index.js');
var db = app.get('db');

function Rating(rating_description, rating_value, priority_id) {
    this.rating_description = rating_description;
    this.rating_value = rating_value;
    this.priority_id = priority_id;
}

module.exports = {

    createHome: function createHome(req, res, next) {
        //create a home with db.create_home
        db.create_home([req.body.list_id, req.body.nickname, req.body.price, req.body.address_1, req.body.address_2, req.body.city, req.body.zip, req.body.province, req.body.bathrooms, req.body.bedrooms, req.body.sq_feet, req.body.year_build, req.body.description, req.body.days_listed], function (CHerror, CHresponse) {
            // console.log('CHresponse[0].id', CHresponse[0].id)
            console.log('CHerror', CHerror);
            if (CHerror) {
                res.json({
                    status: 500,
                    message: CHerror,
                    method: 'createHome'
                });
            } else if (CHresponse) {
                db.read_priorities([req.body.list_id, req.body.user_id], function (RPerror, RPresponse) {

                    console.log('RPresponse', RPresponse);
                    if (RPerror) {
                        res.json({
                            status: 500,
                            message: RPerror,
                            method: 'createHome, read_priorities'
                        });
                    } else if (RPresponse) {
                        var ratings = [];
                        for (var i = 0; i < RPresponse.length; i++) {
                            var singleRating = new Rating(RPresponse[i].priority_description, 50, RPresponse[i].id);
                            ratings.push(singleRating);
                        }
                        // console.log('ratings', ratings)
                        console.log('ratings', ratings);
                        for (var i = 0; i < ratings.length; i++) {
                            console.log(CHresponse[0].id, req.body.user_id, ratings[i].priority_id, ratings[i].rating_description, ratings[i].rating_value);

                            db.create_ratings([Number(CHresponse[0].id), Number(req.body.user_id), Number(ratings[i].priority_id), ratings[i].rating_description, Number(ratings[i].rating_value)], function (CRerror, CRresponse) {
                                console.log('CRerror', CRerror);
                                if (CRerror) {
                                    res.json({
                                        status: 500,
                                        message: CRerror,
                                        method: 'createRatings, create_ratings'
                                    });
                                }
                            });
                        }
                        res.json({
                            status: 200,
                            message: 'Home created successfully!',
                            method: 'createHome, create_ratings'
                        });
                    }
                });
            }
            //get priorities using the list_id and user_id from the
            //insert rows into ratings using the returned list of priorities
        });
    },
    readHomesByHomeId: function readHomesByHomeId(req, res, next) {
        db.read_homes_by_home_id(req.params.home_id, function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'createHome'
                });
            } else if (response) {
                res.json(response);
            }
        });
    },
    editHome: function editHome(req, res, next) {
        console.log(req.body);
        for (var i = 0; i < req.body.priorities.length; i++) {}
        db.update_home([req.body.nickname, req.body.price, req.body.address_1, req.body.address_2, req.body.city, req.body.zip, req.body.province, req.body.bathrooms, req.body.bedrooms, req.body.sq_feet, req.body.year_build, req.body.description, req.body.days_listed], function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'createHome'
                });
            } else {
                res.json({
                    status: 200,
                    message: "Home added successfully",
                    method: 'createHome'
                });
            }
        });
    }
};