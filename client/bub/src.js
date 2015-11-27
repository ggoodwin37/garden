// represents a bub spawner. It has a concept of location (which can be updated), and possibly additional state.
// since this is a visual effect that is typically tied to a game object, this will just have position, not velocity.
// it can update its position to lock on to a game object (which itself may have velocity).
// TODO: all bubsrcs act the same for now, might want to make them have unique behavior.
var interp = require('../interp');
var Bub = require('./bub');

/*
var config = {
  spawnRadius,
  spawnTime,
  rgbStart1, rgbStart2,
  rgbEnd1, rgbEnd2,
  maxDur,
  maxSize,
  srcTimeToLive  (0 to live forever)
*/
function BubSrc(initialPos, config) {
	this.pos = initialPos;
	this.config = config;

	this.bubList = [];
	this.spawnTimer = 0;
	this.srcDelegate = null;
	this.active = true;
	this.timeLeft = config.srcTimeToLive;

	var self = this;
	this.bubDelegate = function(bub, ev) {
		setTimeout(self.onBubEvent(bub, ev), 0);
	};
}

BubSrc.prototype.setPos = function(newPos) {
	this.pos = newPos;
};

BubSrc.prototype.update = function(deltaMs) {
	this.spawnTimer += deltaMs;
	if (this.active && this.spawnTimer >= this.config.spawnTime) {
		this.spawnTimer = 0;
		this.spawnBub();
	}
	this.bubList.forEach(function(thisBub) {
		thisBub.update(deltaMs);
	});
	if (this.timeLeft > 0) {
		this.timeLeft = Math.max(0, this.timeLeft - deltaMs);
		if (this.timeLeft === 0) {
			this.srcDelegate && this.srcDelegate(this, 'done');
		}
	}
};

BubSrc.prototype.spawnBub = function() {
	var fRgb1 = Math.random();
	var initialRgb = {
		r: interp(this.config.rgbStart1.r, this.config.rgbStart2.r, fRgb1),
		g: interp(this.config.rgbStart1.g, this.config.rgbStart2.g, fRgb1),
		b: interp(this.config.rgbStart1.b, this.config.rgbStart2.b, fRgb1),
	};
	var fRgb2 = Math.random();
	var targetRgb = {
		r: interp(this.config.rgbEnd1.r, this.config.rgbEnd2.r, fRgb2),
		g: interp(this.config.rgbEnd1.g, this.config.rgbEnd2.g, fRgb2),
		b: interp(this.config.rgbEnd1.b, this.config.rgbEnd2.b, fRgb2),
	};
	var randomTheta = Math.random() * 2 * Math.PI;
	var randomRadius = Math.random() * this.config.spawnRadius;
	var dx = Math.cos(randomTheta) * randomRadius;
	var dy = Math.sin(randomTheta) * randomRadius;
	var newPos = {
		x: this.pos.x + dx,
		y: this.pos.y + dy
	};
	var newBub = new Bub(this.config.maxDur,
						 this.config.maxSize,
						 initialRgb,
						 targetRgb,
						 newPos,
						 this.bubDelegate);
	this.bubList.push(newBub);
};

BubSrc.prototype.onBubEvent = function(bub, ev) {
	if (ev === 'done') {
		var newList = this.bubList.filter(function(test) {
			return test !== bub;
		});
		this.bubList = newList;
	}
};

BubSrc.prototype.draw = function(ctx) {
	this.bubList.forEach(function(thisBub) {
		thisBub.draw(ctx);
	});
};

module.exports = BubSrc;
