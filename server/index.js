var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var prerender = require('prerender-node');
var api = require('./api');
var configurePassport = require('./config/passport');
var routing = require('./middleware/routing.mw');

var clientPath = path.join(__dirname, '../client');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN); //this needs to be protected before putting into github
//prerender.set('prerenderServiceUrl', 'http://localhost:1337/'); //this is to test, comment when it shows it works well
//ENVIRO variable 

var app = express();
app.use(prerender);

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());
configurePassport(app);

app.use('/api', api);

app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);