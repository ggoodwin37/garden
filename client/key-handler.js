var EventEmitter = require('event-emitter');

function KeyHandler($el) {
	var self = this;
	// TODO: transform ev to game-space data
	$el.on('keydown', function(ev) {
		self.emit('keydown', ev);
	});
	$el.on('keyup', function(ev) {
		self.emit('keyup', ev);
	});
}
KeyHandler.prototype = new EventEmitter();

module.exports = KeyHandler;
