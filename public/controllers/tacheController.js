const db= require('../models/index')

module.exports = {

    async displayTask(req,res) {

        const tasks = await db.User.findAll({
            include: {
              model: db.Tache,
              required: true
            }
          });

        return res.status(200).json({tasks,message:'all tasks with users associated'});
    },

    async addTask(req,res) {

        var tache = {
           name : req.body.name,
           description : req.body.description,
           userId : req.body.userId
        }

        created=db.Tache.create(tache);

        if(created){

            return res.status(200).json({message:'task has created successfully'});
        }
        else
        {
            return res.status(200).json({message:'this task does not created'});
        }
    }
}