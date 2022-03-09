require('dotenv').config()
const db = require('../models');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');


exports.auth = async (req, res, next) => {
  
}