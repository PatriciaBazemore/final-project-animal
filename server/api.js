var express = require('express');

var animals = require('./controllers/animals.ctrl');
var users = require('./controllers/users.ctrl');
var comments = require('./controllers/comments.ctrl');
var donation = require('./controllers/donation.ctrl');



var router = express.Router();

router.use('/animals', animals);
router.use('/users', users);
router.use('/comments', comments);
router.use('/donation', donation);

module.exports = router;
