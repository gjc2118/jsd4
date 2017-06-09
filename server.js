var express = require('express');
var app = express();
var router = express.Router();
// console.log(router);

var secure = require('express-force-https'); 
var api = require('sendwithus')('live_2bc07b48e1dce873100b099a086a2f4f737494ea');
var CIO = require('customerio-node');
var cio = new CIO('4f91f70835d4a66dba89', '1e8cb9321877111f4ccc');

var amount;
var cra;
var id = 0;

var callback = function(err, response) {
    if (err) {
        console.log(err.statusCode, response);
    } else {
        console.log(response);
    }
};

var app = express();

app.use(secure);


app.set('port', (process.env.PORT || 5000));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));


// routes
router.get('/', function(req, res) {
  res.render('luhack');
})

router.get('/luhack/', function(req, res) {
  res.render('home');
})

//SendWithUs
router.get('/signup/', function(req, res) {
  res.send('Confirmed')
  api.send({
    template: 'tem_YC8VxS3Kd7pqRMK9kBXpDKVG',
    recipient: { address: 'geoffrey.charles@lendup.com'}
}, callback);
})

router.get('/sendemail/', function(req, res) {
	res.send('OH YEA')
	api.send({
    template: 'tem_YC8VxS3Kd7pqRMK9kBXpDKVG',
    recipient: { address: 'geoffrey.charles@lendup.com'}
}, callback);
})

//Customer.io
router.get('/sendevent/', function(req, res) {
  res.send('Welcome '+req.query.first_name +" !")
  id = id+1;
  cio.identify(id, {
  first_name: req.query.first_name,
  last_name: req.query.last_name,
  email: 'geoffrey.charles@lendup.com',
  created_at: Math.round((new Date()).getTime() / 1000),
  });
  amount = req.query.amount;
  cra = req.query.cra;
})

router.get('/sendevent/due', function(req, res) {
  res.send('A Payment is due!')
  cio.track(id, { 
    name: 'payment due' ,
    data: {
      amount: amount,
      credit_reporting: cra
    }
  });
})

router.get('/sendevent/paid', function(req, res) {
  res.send('You paid off your loan!')
  cio.track(id, { name: 'Paid off' });
})

router.get('/sendevent/noaction', function(req, res) {
  res.send('You have been inactive for 3 months')
  cio.track(id, { name: 'activate_time' });
})

router.get('/sendevent/fail', function(req, res) {
  res.send('We screwed up payments!')
  cio.track(id, { name: 'fail payment' });
})

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// var express = require('express');
// var app = express();
// var router = express.Router();
// var twitter = require('twitter');

// app.set('port', (process.env.PORT || 5000));

// // access new twitter client
// var client = new twitter({
// 	consumer_key: 'P03KI9Cld7xSAJzlM6WPuJ4E4',
//   	consumer_secret: 'uovnJ4T9LTf0ihwpE9X19AnSHJ4zRlcPiCgmg0WXmWW3abbdgN',
//   	access_token_key: '279120016-HbTumg3A2v5uD7grOexdjcd5yNAl7aPIGVv3SCsE',
//   	access_token_secret: 'csyP7AWp0wkZ9bnloHmlxTCLAorZIdAeEr5Rgqgb9qPn2'
// });

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

// app.use(express.static(__dirname + '/public'));

// // routes
// router.get('/', function(req, res) {
// 	res.render('/crimeTap/index.html'); //sends data down to respond to the request. in this case it is an ejx file under views (html)
// });

// router.get('/contacts', function(req, res) {
// 	res.render('contacts');
// });

// router.get('/timeline', function(req, res) {
// 	var params = {screen_name: 'nodejs'};
// 	client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   		if (!error) {
//     		console.log(tweets);
//   		}
//   		res.send(tweets);
// 	});
// });

// app.use('/', router);

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(8124, "127.0.0.1");
// console.log('Server running at http://127.0.0.1:8124/');