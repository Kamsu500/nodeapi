require('dotenv').config()
const db = require('../models');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const nodemailer = require("nodemailer");
const user = require('../models/user');

module.exports ={

    async register(req,res) {

    const emailExists = await db.User.findOne({ where: { email: req.body.email } });
    if (emailExists) {
        res.status(412).json({message:"Email already registered"})
    }    
    var transporter=nodemailer.createTransport({
       service:'gmail' ,
       auth:{
           user:'kamsudylane@gmail.com',
           pass:process.env.PASSWORD
       },
       tls:{
           rejectUnauthorized:false
       }
    })
    const salt = await bcrypt.genSalt(12);
    var user = {
       firstName : req.body.firstName,
       lastName : req.body.lastName,
       email : req.body.email,
       password : await bcrypt.hash(req.body.password, salt)
       };
              
       created_user = db.User.create(user);

       const token=jwt.sign(user,process.env.JWT_SECRET_KEY,{ algorithm:"HS256",expiresIn:'30m'})
       const data = {
       from: 'verify your email <kamsudylane@gmail.com>',
       to: user.email,
       subject: 'Account Activation Link',
       html:`<h2>Hello ${user.lastName}!</h2>Please click on the link below to activate your account</h2><br>
       <a href="${process.env.URL}/authentication/activate/${token}">${process.env.URL}/authentication/activate/${token}</a>`
        };
       transporter.sendMail(data,function(saveErr,info) {
           if(saveErr) {
            return res.status(412).send({
                success: false,
                message: saveErr
            })
           }
           else{
            return res.status(200).json({
                success: true,
                message: "Your account has been successfully saved and email has been sent on your account"
            });
           }
       })
    },
    
    async getUsers(req,res){
       
        try {
            
            const users= await db.User.findAll()
            return res.status(200).json(users);
            
        } catch (error) {
            return res.status(500).json({error:'une erreur s\'est produite'})
        }
    },

    async getUserById(req,res) {

        const id=req.params.id

        try {
            
            const user= await db.User.findOne({ where:{ id }})

            if(user){

                return res.status(200).json(user);
            }
                return res.status(412).json({message:'This user does not exist'})
            
        } catch (error) {
            return res.status(500).json({error:'une erreur s\'est produite'})
        }
    },

    async verifyEmail(req,res) {
         
        const token= req.params.token
        
            jwt.verify(token,process.env.JWT_SECRET_KEY,async function(err,verifiedJwt) {

            if(err){
                console.log(err);
                res.status(500).json({messge:'expired link'})
            }
            else{
              const user=await db.User.findOne({where:{confirmed:false}})

                 if(user){
                     user.confirmed=true;
                     user.save();
                     res.status(200).json({messge:'Your email has been verified successfully'});
                 }
                 else{
                     res.status(404).json({messge:'Your email has been already verified'})
                 }
              }
        })
    }
}