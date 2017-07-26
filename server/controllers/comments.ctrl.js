var express = require('express');
var procedures = require('../procedures/comments.proc');

var router = express.Router();

//need route for /api/comments/?

// /api/comments/:id
router.route('/:id')
    .get(function(req, res) {
        procedures.all(req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })
    .put(function(req, res) {
        procedures.update(req.body.comment, req.params.id)
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