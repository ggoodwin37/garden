var imageMap = require('./image-loader.js').imageMap;
var constants = require('./constants');

var BLANK_CANVAS_COLOR = '#0c0c0c',
	TEST_CANVAS_COLOR = '#d0d',
	testBounds = false;

var deg2Rad = require('./deg2rad');

function rgbToStyleString(rgb) {
	var r = Math.floor(rgb.r * 0xff);
	var g = Math.floor(rgb.g * 0xff);
	var b = Math.floor(rgb.b * 0xff);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

var drawObjects = {
	clearCtx: function(ctx) {
		var w = ctx.canvas.clientWidth;
		var h = ctx.canvas.clientHeight;
		ctx.fillStyle = BLANK_CANVAS_COLOR;
		ctx.fillRect(0, 0, w, h);
	},
	drawShipSprite: function(ctx, cx, cy, rBounding, thetaDeg, thrusters) {
		var img = imageMap[thrusters ? '/img/ben-ship-on.png' : '/img/ben-ship-off.png'];
		if (!img) {
			console.log('error: sprite not available??');
			return;
		}

		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(cx, cy);
		ctx.rotate(deg2Rad(thetaDeg + 90));
		ctx.translate(-cx, -cy);

		if (testBounds) {
			ctx.beginPath();
			ctx.arc(cx, cy, rBounding, 2 * Math.PI, false);
			ctx.fillStyle = TEST_CANVAS_COLOR;
			ctx.closePath();
			ctx.fill();
		}

		ctx.drawImage(img, 0, 0,
					  constants.shipSpriteSrcSize, constants.shipSpriteSrcSize,
					  cx - rBounding, cy - rBounding, rBounding * 2, rBounding * 2);
		ctx.restore();
	},
	drawRockSprite: function(ctx, cx, cy, rBounding, thetaDeg, size) {
		var spriteName;
		var spriteSize;
		if (size == 'small') {
			spriteName = '/img/ben-rock-sm.png';
			spriteSize = constants.rockSmallSpriteSrcSize;
		} else if (size == 'medium') {
			spriteName = '/img/ben-rock-med.png';
			spriteSize = constants.rockMediumSpriteSrcSize;
		} else if (size == 'large') {
			spriteName = '/img/ben-rock-lg.png';
			spriteSize = constants.rockLargeSpriteSrcSize;
		} else {
			console.log('bad size');
			return;
		}

		var img = imageMap[spriteName];
		if (!img) {
			console.log('error: sprite not available??');
			return;
		}

		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(cx, cy);
		ctx.rotate(deg2Rad(thetaDeg + 90));
		ctx.translate(-cx, -cy);

		if (testBounds) {
			ctx.beginPath();
			ctx.arc(cx, cy, rBounding, 2 * Math.PI, false);
			ctx.fillStyle = TEST_CANVAS_COLOR;
			ctx.closePath();
			ctx.fill();
		}

		ctx.drawImage(img, 0, 0,
					  spriteSize, spriteSize,
					  cx - rBounding, cy - rBounding, rBounding * 2, rBounding * 2);
		ctx.restore();
	},
	drawBub: function(ctx, pos, size, rgb) {
		var halfSize = size / 2;
		ctx.save();
		ctx.strokeStyle = rgbToStyleString(rgb);
		ctx.strokeRect(pos.x - halfSize, pos.y - halfSize, size, size);
		ctx.restore();
	},
	drawLaserSprite: function(ctx, cx, cy, rBounding, thetaDeg, size) {
		var spriteName = '/img/ben-laser.png';
		var spriteSize = 15;
		// TODO: from here down is boilerplate?
		var img = imageMap[spriteName];
		if (!img) {
			console.log('error: sprite not available??');
			return;
		}

		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(cx, cy);
		ctx.rotate(deg2Rad(thetaDeg + 90));
		ctx.translate(-cx, -cy);

		if (testBounds) {
			ctx.beginPath();
			ctx.arc(cx, cy, rBounding, 2 * Math.PI, false);
			ctx.fillStyle = TEST_CANVAS_COLOR;
			ctx.closePath();
			ctx.fill();
		}

		ctx.drawImage(img, 0, 0,
					  spriteSize, spriteSize,
					  cx - rBounding, cy - rBounding, rBounding * 2, rBounding * 2);
		ctx.restore();
	}
};

module.exports = drawObjects;
