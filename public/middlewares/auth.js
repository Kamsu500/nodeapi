require('dotenv').config()
const jwt= require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const access_token = authHeader.split(' ')[1];

        jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { 
    authenticateJWT 
  }