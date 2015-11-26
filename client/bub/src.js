// represents a bub spawner. It has a concept of location (which can be updated), and possibly additional state.
// since this is a visual effect that is typically tied to a game object, this will just have position, not velocity.
// it can update its position to lock on to a game object (which itself may have velocity).
// TODO: all bubsrcs act the same for now, might want to make them have unique behavior.
var constants = require('../constants');
var Bub = require('./bub');

function BubSrc(pos) {
	this.pos = pos;
	this.spawnRadius = constants.bubSpawnRadius;
	this.bubList = [];
	this.spawnTimer = 0;
	this.nextSpawn = constants.bubSpawnTime;
}

BubSrc.prototype.update = function(deltaMs) {
	this.spawnTimer += deltaMs;
	if (this.spawnTimer >= this.nextSpawn) {
		this.spawnTimer = 0;
		this.spawnBub();
	}
	this.bubList.forEach(function(thisBub) {
		thisBub.update(deltaMs);
	});
};

BubSrc.prototype.spawnBub = function() {
	var self = this;
	var delegate = function(bub, ev) {
		setTimeout(self.onBubEvent(bub, ev), 0);
	};
	var targetRgb = {
		r: 1,
		g: 0,
		b: 1
	};
	var newPos = this.pos; // TODO randomize
	var newBub = new Bub(constants.bubDur, constants.bubSize, targetRgb, newPos, delegate);
	this.bubList.push(newBub);
};

BubSrc.prototype.onBubEvent = function(bub, ev) {
	// TODO
};

BubSrc.prototype.draw = function(ctx) {
	this.bubList.forEach(function(thisBub) {
		thisBub.draw(ctx);
	});
};

module.exports = BubSrc;
