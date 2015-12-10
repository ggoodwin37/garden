var constants = require('./constants');

var BLANK_CANVAS_COLOR = '#0c0c0c';

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
	}
};

module.exports = drawObjects;
