var express = require('express');
var procedures = require('../procedures/comments.proc');

var router = express.Router();

//need route for /api/comments/?
router.route('/')
    .get(function(req, res) {
        procedures.all()
        .then(function(comments) {
            res.send(comments);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })
    .post(function(req, res) {
        procedures.create(req.body.animalid, req.body.userid, req.body.comment)
        .then(function (id) {
            res.status(201).send(id);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

///api/comments
router.route('/flagged')
    .get(function(req, res) {
        procedures.flagged()
        .then(function(comments) {
            res.send(comments);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    });


// /api/comments/:id
router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id)
        .then(function(comments) {
            res.send(comments);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })
    .put(function(req, res) {
        procedures.update(req.body.flagged, req.params.id)
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