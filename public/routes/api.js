 const express=require('express');

 const router =express.Router();

 const registerController = require('../controllers/registerController');
 const taskController=require('../controllers/tacheController');
 const loginController = require('../controllers/loginController');
 const validationMiddleware = require('../middlewares/middlewareValidation');

 router.post('/register',validationMiddleware.signup,registerController.register);
 router.get('/users',registerController.getUsers);
 router.get('/user/:id',registerController.getUserById);
 router.get('/authentication/activate/:token',registerController.verifyEmail);
 router.delete('/user/delete/:id',registerController.deleteUser);
 router.post('/login',validationMiddleware.auth,loginController.auth);
 router.get('/tasks',taskController.displayTask);
 router.post('/addtask',taskController.addTask)

 module.exports = router