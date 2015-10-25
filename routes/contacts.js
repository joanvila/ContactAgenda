var express = require('express');
var router = express.Router();
var Contact = require('mongoose').model('Contact');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', function(req, res, next){
    Contact.find({}, function(err, data) {
        if(!err) {
            res.status(200).json(data);
        } else {
            console.log(err);
        }
    });
});

router.post('/', function(req, res, next) {
    var contactData = req.body;
    var new_contact = new Contact(contactData);
    new_contact.save(function(err, saved) {
        if(!err) {
            res.status(200).json(saved);
        } else {
            console.log(err);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    var contactId = req.params.id;
    Contact.remove({_id: new ObjectId(contactId)}, function(err){
        if(!err) {
            res.status(200).end();
        } else {
            console.log(err);
        }
    });
});

router.patch('/:id', function(req, res, next) {
    var contactId = req.params.id;
    var contactData = req.body;
    Contact.update({_id: contactId}, {$set: contactData}, function(err) {
        if(!err) {
            res.status(200).end();
        } else {
            console.log(err);
        }
    });
});

module.exports = router;