var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();
// console.log(router);

app.set('port', (process.env.PORT || 5000));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

// routes
router.get('/', function(req, res) {
  res.render('crimetap');
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