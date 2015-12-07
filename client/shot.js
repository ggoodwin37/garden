//var deg2Rad = require('./deg2rad');

var BaseSpaceObject = require('./base-space-object');
//var drawObjects = require('./draw-objects');

//var constants = require('./constants');

function Shot() {
}
Shot.prototype = new BaseSpaceObject();

Shot.prototype.draw = function(ctx) {
	// change this shit cuz this aint right.
//	drawObjects.drawShipSprite(ctx, this.x, this.y, this.r, this.thetaDeg, this.thrustersActive);
};

// TODO: how do we override base and call super?
Shot.prototype.updateShot = function(deltaMs) {
	this.update(deltaMs);
	// if (this.thrustersActive) {
	// 	this.vx += constants.shipThrust * Math.cos(deg2Rad(this.thetaDeg));
	// 	this.vy += constants.shipThrust * Math.sin(deg2Rad(this.thetaDeg));
	// 	//this.clipMaxSpeed();
	// }
};

// TODO fix this.
Shot.prototype.clipMaxSpeed = function() {
	// var velMag = Math.sqrt((this.vx * this.vx) + (this.vy + this.vy));
	// if (velMag > constants.shipVelMax) {
	// 	var travelDirectionRad;
	// 	if (this.vx === 0) {
	// 		travelDirectionRad = (this.vy < 0 ? (Math.PI / 2) : (3 * Math.PI / 2));
	// 	} else {
	// 		travelDirectionRad = Math.tan(this.vy / this.vx);
	// 	}
	// 	this.vx = constants.shipVelMax * Math.cos(travelDirectionRad);
	// 	this.vy = constants.shipVelMax * Math.sin(travelDirectionRad);
	// }
};

module.exports = Shot;
