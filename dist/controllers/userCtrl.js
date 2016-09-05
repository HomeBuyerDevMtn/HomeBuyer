'use strict';

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _index2.default.get('db'); // import app from '../index.js';

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
    }

};