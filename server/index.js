var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var prerender = require('prerender-node');
var api = require('./api');
var configurePassport = require('./config/passport');
var routing = require('./middleware/routing.mw');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

var clientPath = path.join(__dirname, '../client');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN); //this needs to be protected before putting into github
//prerender.set('prerenderServiceUrl', 'http://localhost:1337/'); //this is to test, comment when it shows it works well
//ENVIRO variable 

var app = express();
// aws.config.update({region: 'us-east-1'});
aws.config.region = 'us-east-1';
//fill in the below brackets with bucket name
var s3 = new aws.S3({ params: { Bucket: 'mcKameyImages'}});
// var bucketParams = {Bucket: 'mcKameyImages'};
s3.createBucket(bucketParams);

var upload = multer({

  storage: multerS3({
    s3: s3,
    bucket: 'mcKameyImages',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


app.use(prerender);

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());
configurePassport(app);

app.use('/api', api);

app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);