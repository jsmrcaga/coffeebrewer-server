var utils = {};
var spawn = require('child_process').spawnSync;
utils.init = function(){
	spawn('stty', ['-F', '/dev/ttyUSB0', 9600, '-parity', 'cs8', '-cstopb']);
	console.log('DONE INITIALIZING...');
};

utils.brew = function(){
	return send('ON');
};

utils.cancel = function(){
	return send('OFF');
};

function send(string){
	var o = spawn('echo', ['-n',  string,  '> /dev/ttyUSB0']).output;
	console.log('BREWED: ', o.map(e=>{
		if(e instanceof Buffer){
			return e.toString('utf8');
		}
		return e;
	}));
	return o;
}
module.exports = utils;