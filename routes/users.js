var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');
var ObjectId = require('mongoose').Types.ObjectId;
var bcrypt = require('bcrypt');
var express_jwt = require('express-jwt');
var config = require('../config');


router.get('/:id', function(req, res, next){
    var userId = req.params.id;
    User.find({_id: new ObjectId(userId)}, function(err, data) {
        if(!err) {
            res.status(200).json(data);
        } else {
            console.log(err);
        }
    });
});

//Get user according to the token
router.get('/', express_jwt({secret: config.jwt_secret}),function(req, res, next){
    var userId = req.user._id;
    User.find({_id: new ObjectId(userId)}, function(err, data) {
        if(!err) {
            res.status(200).json(data);
        } else {
            console.log(err);
        }
    });
});

//TODO: Comprovar que l'usuari no existeixi
router.post('/', function(req, res, next) {
    var userData = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            userData.password = hash;
            var new_user = new User(userData);
            new_user.save(function(err, saved) {
                if(!err) {
                    res.status(200).json(saved);
                } else {
                    console.log(err);
                }
            });
        });
    });
});


module.exports = router;