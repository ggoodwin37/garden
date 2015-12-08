var BaseSpaceObject = require('./base-space-object');
var drawObjects = require('./draw-objects');
var constants = require('./constants');

var Shot = BaseSpaceObject.Extend({

	init: function(shotManRef) {
		this.shotManRef = shotManRef;
	},

	draw: function(ctx) {
		var rBounding = constants.shotR;
		drawObjects.drawLaserSprite(ctx, this.x, this.y, rBounding, this.thetaDeg);
	},

	// override
	checkWrap: function() {
		var canvasWidth = window.app.canvasSize.width;
		var canvasHeight = window.app.canvasSize.height;
		var offscreen = false;
		if (this.x - this.r > canvasWidth) {
			offscreen = true;
		}
		if (this.x + this.r < 0) {
			offscreen = true;
		}
		if (this.y - this.r > canvasHeight) {
			offscreen = true;
		}
		if (this.y + this.r < 0) {
			offscreen = true;
		}
		if (offscreen) {
			this.shotManRef && this.shotManRef.onShotOffscreen(this);
		}
	}
});

module.exports = Shot;
