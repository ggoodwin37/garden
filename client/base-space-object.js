// TODO: consider using a class helper.
function BaseSpaceObject() {
	this.x = 0;
	this.y = 0;
	this.thetaDeg = 0;

	// per second
	this.vx = 0;
	this.vy = 0;
	this.vTheta = 0;

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
};

module.exports = BaseSpaceObject;
