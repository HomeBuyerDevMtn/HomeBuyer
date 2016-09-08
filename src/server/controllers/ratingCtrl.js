const app = require('../index.js');
const db = app.get('db');
module.exports = {
    createRating: (req, res, next) => {
        db.create_ratings([req.body.home_id, req.body.user_id, req.body.neighborhood, req.body.commute, req.body.safety, req.body.schools, req.body.yard, req.body.kitchen], (error, response) => {
            if(error){
                res.json({
                    status: 500,
                    message: error,
                    method: 'createRating'
                })
            }
            else if(response) {
                res.json({
                    status: 200,
                    message: "Ratings added successfully",
                    method: 'createRating'
                })
            }
        })
    }
}
