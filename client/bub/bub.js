var interp = require('../interp');
var drawObjects = require('./draw-objects');

// represents an individual particle. It can update itself and be drawn.
// delegate param is an event handler callback.
function Bub(maxDur, maxSize, targetRgb, pos, delegate) {
	// consider adding more config to this. initial color, velocity, etc.
	this.maxDur = maxDur;
	this.maxSize = maxSize;
	this.targetRgb = targetRgb;
	this.pos = pos;
	this.delegate = delegate;

	this.currentDur = 0;
	this.initialSize = 0;
	this.initialRgb = {r: 0, g: 0, b: 0};
}

Bub.prototype.update = function(deltaMs) {
	this.currentDur += deltaMs;
	if (this.currentDur >= this.maxDur) {
		this.currentDur = this.maxDur;
		this.onEvent('done');
	}
};

Bub.prototype.onEvent = function(ev) {
	if (this.delegate) {
		this.delegate(ev);
	}
};

Bub.prototype.draw = function(ctx) {
	var f = this.curDur / this.maxDur;  // how far through this bub's lifetime are we? 0-1
	var curSize = interp(this.initialSize, this.maxSize, f);
	var curRgb = {
		r: interp(this.initialRgb.r, this.targetRgb.r, f),
		g: interp(this.initialRgb.g, this.targetRgb.g, f),
		b: interp(this.initialRgb.b, this.targetRgb.b, f)
	};
	var curPos = this.pos;
	drawObjects.drawBub(ctx, curPos, curSize, curRgb);
};

module.exports = Bub;
