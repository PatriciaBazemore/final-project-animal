var express = require('express');
var stripeSvc = require('../services/stripe.svc');
var procedures = require('../procedures/donation.proc');
var mailService = require('../services/email.svc');
var router = express.Router();

router.post('/', function(req, res) {
    stripeSvc.charge(req.body.token, req.body.amount)
    .then(function(response) {
        console.log(response);
        return procedures.create(response.id, req.body.amount);
    })
    .then(function(response) {
    let content = `<h3>We've received your generous donation of $${req.body.amount} to McKamey Animal Center.</h3>
    <p>Your money will be used to improve the lives of many Hamilton County animals in need.</p>
    <h6>From all of us to you, </h6>
    <h6>Thank You!</h6>`;

    return mailService.sendEmail(req.body.email, 'no-reply@mckameyshelter.org', 'McKamey Animals', content);
    })
    .then(function(response) {
        res.status(201).send(response);
    })
    .catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router;