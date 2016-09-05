'use strict';

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _index2.default.get('db');
module.exports = {
    createRating: function createRating(req, res, next) {
        db.create_ratings([req.body.home_id, req.body.user_id, req.body.neighborhood, req.body.commute, req.body.safety, req.body.schools, req.body.yard, req.body.kitchen], function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'createRating'
                });
            } else if (response) {
                res.json({
                    status: 200,
                    message: "Ratings added successfully",
                    method: 'createRating'
                });
            }
        });
    }
};