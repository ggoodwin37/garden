var EventEmitter = require('event-emitter');
var keyMappings = require('./key-mappings');

function KeyHandler($el) {
	var self = this;
	$el.on('keydown', function(ev) {
		var key = 'key-' + ev.which;
		if (keyMappings[key]) {
			self.emit('keydown', keyMappings[key]);
		}
	});
	$el.on('keyup', function(ev) {
		var key = 'key-' + ev.which;
		if (keyMappings[key]) {
			self.emit('keyup', keyMappings[key]);
		}
	});
}
KeyHandler.prototype = new EventEmitter();

module.exports = KeyHandler;
