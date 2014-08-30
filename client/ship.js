var deg2Rad = require('./deg2rad');

var BaseSpaceObject = require('./base-space-object');
var drawObjects = require('./draw-objects');

var ROTATIONAL_VELOCITY_DEG_PER_SEC = 210;
var THRUST = 7;
var VEL_MAX = 14;

function Ship() {
	this.thrustersActive = false;
	this.turningLeft = false;
	this.turningRight = false;
}
Ship.prototype = new BaseSpaceObject();

Ship.prototype.draw = function(ctx) {
	// TODO: do we need a coordinate transform here?
	drawObjects.drawShip(ctx, this.x, this.y, this.r, this.thetaDeg, this.thrustersActive);
};

// TODO: how do we override base and call super?
Ship.prototype.updateShip = function(deltaMs) {
	this.update(deltaMs);

	if (this.turningLeft) {
		this.thetaDeg -= (deltaMs / 1000) * ROTATIONAL_VELOCITY_DEG_PER_SEC;
	}
	if (this.turningRight) {
		this.thetaDeg += (deltaMs / 1000) * ROTATIONAL_VELOCITY_DEG_PER_SEC;
	}
	if (this.thrustersActive) {
		this.vx += THRUST * Math.cos(deg2Rad(this.thetaDeg));
		this.vy += THRUST * Math.sin(deg2Rad(this.thetaDeg));
		//this.clipMaxSpeed();
	}

};

// TODO fix this.
Ship.prototype.clipMaxSpeed = function() {
	var velMag = Math.sqrt((this.vx * this.vx) + (this.vy + this.vy));
	if (velMag > VEL_MAX) {
		var travelDirectionRad;
		if (this.vx === 0) {
			travelDirectionRad = (this.vy < 0 ? (Math.PI / 2) : (3 * Math.PI / 2));
		} else {
			travelDirectionRad = Math.tan(this.vy / this.vx);
		}
		this.vx = VEL_MAX * Math.cos(travelDirectionRad);
		this.vy = VEL_MAX * Math.sin(travelDirectionRad);
	}
};

module.exports = Ship;
