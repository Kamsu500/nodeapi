require('dotenv').config()
const db = require('../models');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');

module.exports = {

    async auth(req,res) {
// login
        const { email, password } = req.body;
        const user = await db.User.findOne({where:{email: req.body.email}});
    
        if(!user) return res.status(404).json({message:'user does not exist'});
        const dbPassword=user.password;
        if(user.confirmed==false)
        {
            return res.status(412).json({message:'please verify your account before login'});
        }
        bcrypt.compare(password, dbPassword).then((matches) => {
        if(!matches){
            return res.status(404).json({message:'login failed'});
        }
        else
        {
        const access_token = jwt.sign({email:email},process.env.JWT_SECRET_KEY,{ algorithm:"HS256",expiresIn:'15m'});
        const refresh_token = jwt.sign({email:email},process.env.JWT_SECRET_KEY,{ algorithm:"HS256",expiresIn:'1h'})
        
        res.cookie('access_token',access_token,
                {
                    maxAge:60*60*24*30*1000,
                    httpOnly:true,
                    expires:new Date(Date.now() + 900000),
                    secure:true
                });
        res.cookie('refresh_token',refresh_token,{
                    maxAge:60*60*24*30*1000,
                    httpOnly:true,
                    expires:new Date(Date.now() + 900000),
                    secure:true
                });

        return res.status(200).json({message:'you are authenticated'});
        } 
     })
    },
// logout
    async logout(req,res){


    },
// forgot your password
    async forgotPassword(req,res){

    },
// reset your password
    async resetPassword(req,res){

    }
}
