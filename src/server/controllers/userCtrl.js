// import app from '../index.js';
import app from '../index.js';
const db = app.get('db');
module.exports = {
    readUserById: (req, res, next) => {
        db.read_user_by_email(req.params.email, (error, response) => {
            if(error){
                res.json({
                    status: 500,
                    message: error,
                    method: 'readUserById'
                })
            }
            else if (response){
                res.json(response)
            }
        })
    }

}
