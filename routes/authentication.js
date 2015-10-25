var bcrypt = require('bcrypt');
var jsonwebtoken = require('jsonwebtoken');
var User = require('mongoose').model('User');
var authRouter = require('express').Router();
var config = require('../config');

authRouter.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}).lean().exec(function(err, user){
        if(err) throw err;
        else if(!user) res.status(404).send("Username doesn't exist");
        else {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) throw err;
                else if(!result) res.status(401).send("Incorrect password");
                else {
                    //Imagine the tasks array grows too much. We don't need that on the token.
                    var signed = {
                        _id: user._id.toString(),
                        username: user.username,
                        password: user.password
                    };

                    var token = jsonwebtoken.sign(signed, config.jwt_secret);
                    delete user.password;
                    res.status(200).json({
                        user: user,
                        token: token
                    });
                }
            });
        }
    });
});

module.exports = authRouter;