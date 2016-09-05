import app from '../index.js';
const db = app.get('db');
module.exports = {

createPriorities: (req, res, next)=>{
    db.create_priorities([req.body.user_id, req.body.list_id, req.body.neighborhood, req.body.commute, req.body.safety, req.body.schools, req.body.yard, req.body.kitchen], (error, response) => {
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.json({
                message: "Priorites added successfully",
                status: 200
            })
        }
    })
}


}