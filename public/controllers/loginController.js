require('dotenv').config()
const db = require('../models');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');

module.exports = {

    async auth(req, res) {

        const { email, password } = req.body;
        const user = await db.User.findOne({where:{email: req.body.email}});
    
        if(!user) return res.status(404).json({message:'user does not exist'});
        const dbPassword=user.password;
        bcrypt.compare(password, dbPassword).then((matches) => {
        if(!matches){
            return res.status(404).json({message:'password does not match'});
        }
        else
        {
        const access_token = jwt.sign(email,process.env.JWT_SECRET_KEY,{ algorithm:"HS256"});
        const refresh_token = jwt.sign(email,process.env.JWT_SECRET_KEY,{ algorithm:"HS256"})
        
        res.cookie('access_token',access_token,
                {
                    maxAge:60*60*24*30*1000,
                    httOnly:true
                });
        res.cookie('refresh_token',refresh_token,{
                    maxAge:60*60*24*30*1000,
                    httOnly:true
                });

        return res.status(200).json({message:'you are authenticated'});
        } 
     })
    }
}
