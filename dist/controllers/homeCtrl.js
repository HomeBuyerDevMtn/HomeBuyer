'use strict';

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _index2.default.get('db');
module.exports = {

    createHome: function createHome(req, res, next) {
        db.create_home([req.body.list_id, req.body.nickname, req.body.price, req.body.address_1, req.body.address_2, req.body.city, req.body.zip, req.body.province, req.body.bathrooms, req.body.bedrooms, req.body.sq_feet, req.body.year_build, req.body.description, req.body.days_listed], function (error, response) {
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
    }
};