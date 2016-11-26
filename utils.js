var utils = {};
var exec = require('child_process').execSync;
utils.init = function(){
	var o = exec('stty -F /dev/ttyUSB0 9600 -parity cs8 -cstopb');
	console.log('DONE INITIALIZING...', o);
};

utils.brew = function(){
	return send('ON');
};

utils.cancel = function(){
	return send('OFF');
};

function send(string){
	var o = exec(`echo -n ${string} > /dev/ttyUSB0`);
	console.log('BREWED: ', o);
	return o;
}

utils.send = send;
module.exports = utils;