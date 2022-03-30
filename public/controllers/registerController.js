require('dotenv').config()
const db = require('../models');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const nodemailer = require("nodemailer");

module.exports = {
// create one user
    async register(req,res) {

        const emailExists = await db.User.findOne({ where: { email: req.body.email } });
        if (emailExists) {
            res.status(412).json({message:"Email already registered"})
        }    
        var transporter=nodemailer.createTransport({
        service:'gmail' ,
        auth:{
            user:process.env.EMAIL,
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
                
        await db.User.create(user);

        const token = jwt.sign({email:user.email},process.env.JWT_SECRET_KEY,{ algorithm:"HS256",expiresIn:'30m'})
        const data = {
        from: 'verify your email <kamsudylane@gmail.com>',
        to: user.email,
        subject: 'Account Activation Link',
        html:`<h2>Hello ${user.lastName}!</h2>Please click on the link below to activate your account</h2><br>
        <a href="${process.env.URL}/api/authentication/activate/${token}">${process.env.URL}/api/authentication/activate/${token}</a>`
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
// get all users    
    async getUsers(req,res) {
       
        try {
            
            const users = await db.User.findAll()
            return res.status(200).json(users);
            
        } catch (error) {
            return res.status(500).json({error:'une erreur s\'est produite'});
        }
    },
// get user by id 
    async getUserById(req,res) {

            const id = req.params.id

            try {
                
                const user = await db.User.findOne({ where:{ id }});

                if(user){

                    return res.status(200).json(user);
                }
                    return res.status(412).json({message:'This user does not exist'});
                
            } 
            catch (error) 
            {
                return res.status(500).json({error:'une erreur s\'est produite'});
            }
    },
// verification email by user
    async verifyEmail(req,res) {
         
            const token = req.params.token
        
            jwt.verify(token,process.env.JWT_SECRET_KEY,async function(err,payload) {

            if(err){
                console.log(err);
                res.status(500).json({messge:'expired link'});
            }
            else
            {
            const user = await db.User.findOne({where:{email:payload.email,confirmed:false}});

                if(user)
                {
                    user.confirmed = true;
                    await user.save();
                    return res.status(200).json({messge:'Your email has been verified successfully'});
                }
                else
                {
                    return res.status(404).json({messge:'Your email has been already verified'});
                }
            }
        })
    },
// delete user by id
    async deleteUser(req, res) {
      
            const id = req.params.id

            try 
            {
                const user = await db.User.findByPk(id);
            
                if(!user)
                {
                    return res.status(404).json({messge:'this user does not exist'});
                }
                await user.destroy();

                    return res.status(200).json({message:'this user has been deleted successfully'});

            } 
            catch (error) 
            {
                  return res.status(503).json({error:'this user does not deleted'});
            }

    }
}