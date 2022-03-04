 const express=require('express');

 const router =express.Router();

 const registerController =require('../controllers/registerController');
 const validationMiddleware = require('../middlewares/middlewareValidation');

 router.post('/register',validationMiddleware.signup,registerController.register);
 router.get('/users',registerController.getUsers)

 module.exports = router