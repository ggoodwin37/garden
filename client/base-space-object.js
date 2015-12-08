var uid = require('./uid');

var BaseSpaceObject = window.Class.extend({

	init: function() {
		this.id = uid();

		this.x = 0;
		this.y = 0;
		this.thetaDeg = 0;

		// per second
		this.vx = 0;
		this.vy = 0;
		this.vTheta = 0;

		this.r = 0;
	},
	update: function(deltaMs) {
		var timeFactor = deltaMs / 1000;
		this.x += timeFactor * this.vx;
		this.y += timeFactor * this.vy;
		this.thetaDeg += timeFactor * this.vTheta;

		this.checkWrap();
	},
	checkWrap: function() {
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
	}

});

module.exports = BaseSpaceObject;
