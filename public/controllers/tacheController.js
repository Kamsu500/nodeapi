const db= require('../models/index')

module.exports = {
// get all tasks
    async displayTask(req,res) {

        const tasks = await db.User.findAll({
            include: {
              model: db.Tache,
              required: true
            }
          });

        return res.status(200).json({tasks,message:'all tasks with users associated'});
    },
// create one task
    async addTask(req,res) {

        var tache = {
            name : req.body.name,
            description : req.body.description,
            userId : req.body.userId
         }
      
        const user = await db.Tache.findOne({ where:{ userId:req.body.userId }});

        if(user)
        {
            return res.status(200).json({message:'this task has been already affected at one user'});
        }

        await db.Tache.create(tache);

        return res.status(200).json({message:'task has created successfully'});
    }
}