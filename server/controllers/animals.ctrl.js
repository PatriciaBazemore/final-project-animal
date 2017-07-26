var express = require('express');
var procedures = require('../procedures/animals.proc');

var router = express.Router();

router.route('/')
    .get(function(req, res){
        procedures.all()
        .then(function(animals) {
            res.send(animals);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

// need to add isAdmin? see users.ctrl
router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id)
        .then(function(animal) {
            res.send(animal);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function(req, res) {
        procedures.update(req.body.name, req.body.age, req.body.gender, req.body.species, req.body.breed, req.body.size, req.body.shelterid, req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .delete(function(req, res) {
        procedures.destroy(req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = router;