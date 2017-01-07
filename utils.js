var utils = {};
var exec = require('child_process').execSync;

utils.defaultPort = 'ttyUSB0';

utils.init = function(){
	var o = exec(`stty -F /dev/${utils.defaultPort} 9600 -parity cs8 -cstopb`);
	console.log('DONE INITIALIZING...', o);
};

utils.brew = function(){
	return send('ON');
};

utils.cancel = function(){
	return send('OFF');
};

function send(string){
	try {
		var o = exec(`echo -n ${string} > /dev/${utils.defaultPort}`);
		console.log('BREWED: ', o);
		return o;
	} catch(e) {
		return null;
	}
}

utils.send = send;
module.exports = utils;