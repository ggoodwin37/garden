var uid = require('./uid');

// TODO: consider using a class helper.
function BaseSpaceObject() {
	this.id = uid();

	this.x = 0;
	this.y = 0;
	this.thetaDeg = 0;

	// per second
	this.vx = 0;
	this.vy = 0;
	this.vTheta = 0;

	// TODO: I think these are unused.
	this.ax = 0;
	this.ay = 0;
	// not modelling rotational acceleration

	this.r = 0;
}

BaseSpaceObject.prototype.update = function(deltaMs) {
	var timeFactor = deltaMs / 1000;
	this.x += timeFactor * this.vx;
	this.y += timeFactor * this.vy;
	this.thetaDeg += timeFactor * this.vTheta;

	this.vx += timeFactor * this.ax;
	this.vy += timeFactor * this.ay;
	// TODO: maybe we just have a thrust vector and get ax and ay from theta and thrust.

	this.checkWrap();
};

BaseSpaceObject.prototype.checkWrap = function() {
	var canvasWidth = window.app.canvasSize.width;
	var canvasHeight = window.app.canvasSize.height;
	while (this.x - this.r > canvasWidth) {
		this.x -= canvasWidth + this.r;
	}
	while (this.x + this.r < 0) {
		this.x += canvasWidth + this.r;
	}
	while (this.y - this.r > canvasHeight) {
		this.y -= canvasHeight + this.r;
	}
	while (this.y + this.r < 0) {
		this.y += canvasHeight + this.r;
	}
	while (this.thetaDeg > 360) {
		this.thetaDeg -= 360;
	}
	while (this.thetaDeg < 0) {
		this.thetaDeg += 360;
	}
};

module.exports = BaseSpaceObject;
