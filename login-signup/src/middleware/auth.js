const jwt = require('jsonwebtoken');
const Collection = require('../models/collection');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // res.send(token);
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const user = await Collection.findOne({ _id: verifyUser._id });
        console.log(user.first_name);

        req.token = token;
        req.user = user;

        next();

    } catch (err) {
        res.status(401).send('You are not logged in.' + err);
        console.log(err);
    }
}

module.exports = auth;