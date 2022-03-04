 const express=require('express');

 const router =express.Router();

 const {register} =require('../controllers/registerController')
 const validationMiddleware = require('../middlewares/middleware');

 router.post('/register',validationMiddleware.signup,register);

 module.exports = router