var EventEmitter = require('event-emitter');

function KeyHandler($el) {
	var self = this;
	$el.on('keydown', function(ev) {
		console.log('fadsfasf'); // no go??
		self.emit('keydown', {});
	});
	$el.on('keyup', function(ev) {
		self.emit('keyup', {});
	});
}
KeyHandler.prototype = new EventEmitter();

module.exports = KeyHandler;
