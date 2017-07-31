var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');

var router = express.Router();

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        if (!user) {
            return res.status(401).send(info);
        }

        req.logIn(user, function(err) {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});

router.all('*', auth.isLoggedIn);

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', function(req, res) {
    res.send(req.user);
});

//add auth.isAdmin to block requests to admin only
//example:
//.get(auth.isAdmin, function(req, res) {
//    ...
//})

// /api/users/
router.route('/')
    .get(auth.isAdmin, function(req, res) { //view all users
        procedures.all()
        .then(function(users) {
            res.send(users);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(function(req, res) { //create new user
        var u = req.body;
        utils.encryptPassword(u.password)
        .then(function(hash) {
            return procedures.create(u.email, hash, u.firstname, u.lastname);
        }).then(function(id) {
            res.status(201).send(id);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

// /api/users/:id
router.route('/:id')
    .get(auth.canUpdateUser, function(req, res) {
        procedures.read(req.params.id)
        .then(function(user) {
            res.send(user);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    //should be using this to update
    .put(function(req, res) {
        procedures.update(req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.role, req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .delete(auth.isAdmin, function(req, res) {
        procedures.destroy(req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = router;