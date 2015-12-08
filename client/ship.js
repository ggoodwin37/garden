var deg2Rad = require('./deg2rad');

var BaseSpaceObject = require('./base-space-object');
var drawObjects = require('./draw-objects');

var constants = require('./constants');

var Ship = BaseSpaceObject.extend({

	init: function() {
		this.thrustersActive = false;
		this.turningLeft = false;
		this.turningRight = false;
		this.thetaDeg = 270;
		this.r = constants.shipRadius;

		this.state = 'alive';
		this.deadTime = 0;
	},

	draw: function(ctx) {
		if (this.state == 'alive') {
			drawObjects.drawShipSprite(ctx, this.x, this.y, this.r, this.thetaDeg, this.thrustersActive);
		}
	},

	update: function(deltaMs) {
		this._super(deltaMs);

		if (this.turningLeft) {
			this.thetaDeg -= (deltaMs / 1000) * constants.shipRotationalVelocity;
		}
		if (this.turningRight) {
			this.thetaDeg += (deltaMs / 1000) * constants.shipRotationalVelocity;
		}
		if (this.thrustersActive) {
			this.vx += constants.shipThrust * Math.cos(deg2Rad(this.thetaDeg));
			this.vy += constants.shipThrust * Math.sin(deg2Rad(this.thetaDeg));
			//this.clipMaxSpeed();
		}
	},

	// TODO fix this.
	clipMaxSpeed: function() {
		var velMag = Math.sqrt((this.vx * this.vx) + (this.vy + this.vy));
		if (velMag > constants.shipVelMax) {
			var travelDirectionRad;
			if (this.vx === 0) {
				travelDirectionRad = (this.vy < 0 ? (Math.PI / 2) : (3 * Math.PI / 2));
			} else {
				travelDirectionRad = Math.tan(this.vy / this.vx);
			}
			this.vx = constants.shipVelMax * Math.cos(travelDirectionRad);
			this.vy = constants.shipVelMax * Math.sin(travelDirectionRad);
		}
	}
});

module.exports = Ship;
