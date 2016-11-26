var Utils = require('./utils.js');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');

app.set('views', __dirname+'/views');
app.use(express.static(__dirname+'/views/public'));

app.use('/', function(req, res, next){
	if(req.method === 'GET'){
		return next();
	}
	if(!req.body.app_key || req.body.app_key !== 'jaimeleCafedu60!!'){
		return res.status(403).json({error:{message:'Valid app_key required'}});
	}
	return next();
});

app.get('/', function (req, res, err){
	return res.status(418).redirect('/')
});

app.post('/profile', function(req, res, err){
	
});

app.post('/brew', function(req, res, err){
	var now = Date.now();
	if(!req.body.time){
		req.body.time = now;
	}
	var time = req.body.time - now;
	setTimeout(function(){
		console.log('BREWING COFFEE');
		var o = Utils.brew();
		if(time < 2000){
			return res.status(200).json({success:true, output: o});		
		}
	}, time);
	if(time >= 2000){
		return res.status(200).json({success:true, output: null});
	}
});

app.post('/cancel', function(req,res, err){
	Utils.cancel();
	return 
});

app.listen(1234, function(){
	console.log('Server listening!');
});