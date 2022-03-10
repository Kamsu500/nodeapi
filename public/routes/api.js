 const express=require('express');

 const router =express.Router();

 const registerController =require('../controllers/registerController');
 const validationMiddleware = require('../middlewares/middlewareValidation');

 router.post('/register',validationMiddleware.signup,registerController.register);
 router.get('/users',registerController.getUsers);
 router.get('/user/:id',registerController.getUserById);
 router.get('/authentication/activate/:token',registerController.verifyEmail);
 router.delete('/user/delete/:id',registerController.deleteUser);

 module.exports = router