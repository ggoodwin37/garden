var BaseSpaceObject = require('./base-space-object');
var drawObjects = require('./draw-objects');

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
};

module.exports = Ship;
