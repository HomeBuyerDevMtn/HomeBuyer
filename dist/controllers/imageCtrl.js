'use strict';

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _index2.default.get('db');
module.exports = {
    addImage: function addImage(req, res, next) {
        db.add_image([req.body.home_id, req.body.url], function (error, response) {
            if (error) {
                res.json({
                    status: 500,
                    message: error,
                    method: 'addImage'
                });
            } else if (response) {
                res.json({
                    status: 200,
                    message: "Image added successfully",
                    method: 'addImage'
                });
            }
        });
    }
};