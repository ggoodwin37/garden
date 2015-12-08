var randomBipolar = require('./random-bipolar');

var BaseSpaceObject = require('./base-space-object');
var drawObjects = require('./draw-objects');

var constants = require('./constants');

var Rock = BaseSpaceObject.extend({

	init: function (size) {
		var headingDeg = randomBipolar(180);  // heading doesn't change
		if (size == 'small') {
			this.r = constants.rockSmallRadius;
			this.vTheta = randomBipolar(constants.rockAngVelSmall);
			this.vx = constants.rockVelSmall * Math.cos(headingDeg);
			this.vy = constants.rockVelSmall * Math.sin(headingDeg);
		} else if (size == 'medium') {
			this.r = constants.rockMediumRadius;
			this.vTheta = randomBipolar(constants.rockAngVelMedium);
			this.vx = constants.rockVelMedium * Math.cos(headingDeg);
			this.vy = constants.rockVelMedium * Math.sin(headingDeg);
		} else if (size == 'large') {
			this.r = constants.rockLargeRadius;
			this.vTheta = randomBipolar(constants.rockAngVelLarge);
			this.vx = constants.rockVelLarge * Math.cos(headingDeg);
			this.vy = constants.rockVelLarge * Math.sin(headingDeg);
		} else {
			console.log('you fail at passing me a value for rock size.');
		}
		this.size = size;
		this.thetaDeg = randomBipolar(180);
	},

	draw: function(ctx) {
		drawObjects.drawRockSprite(ctx, this.x, this.y, this.r, this.thetaDeg, this.size);
	}
});

module.exports = Rock;
