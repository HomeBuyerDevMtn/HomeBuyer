import app from '../index.js';
const db = app.get('db');
module.exports = {
    addImage: (req, res, next) => {
        db.add_image([req.body.home_id, req.body.url], (error, response) => {
              if(error){
                res.json({
                    status: 500,
                    message: error,
                    method: 'addImage'
                })
            }
            else if(response) {
                res.json({
                    status: 200,
                    message: "Image added successfully",
                    method: 'addImage'
                })
            }
        })
    }
}