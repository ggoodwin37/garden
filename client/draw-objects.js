var imageMap = require('./image-loader.js').imageMap;

var BLANK_CANVAS_COLOR = '#0c0c0c';

var SHIP_COLOR = '#0f0';
var SHIP_LINE_WIDTH = 2;
var SHIP_WING_ANGLE_DEG = 140;
var SHIP_BUTT_RATIO = 0.3;
var THRUSTER_COLOR = '#f00';
var THRUSTER_LINE_WIDTH = 1;
var THRUSTER_RATIO = 0.6;

var SHIP_SPRITE_SW = 16;
var SHIP_SPRITE_SH = 16;
var SHIP_SPRITE_SX_OFF = 0;
var SHIP_SPRITE_SY_OFF = 0;
var SHIP_SPRITE_SX_ON = 16;
var SHIP_SPRITE_SY_ON = 0;

var deg2Rad = require('./deg2rad');

function xOffs(r, thetaDeg) {
	return r * Math.cos(deg2Rad(thetaDeg));
}
function yOffs(r, thetaDeg) {
	return r * Math.sin(deg2Rad(thetaDeg));
}
function interp(v1, v2, f) {
	return v1 + ((v2 - v1) * f);
}

var drawObjects = {
	clearCtx: function(ctx) {
		var w = ctx.canvas.clientWidth;
		var h = ctx.canvas.clientHeight;
		ctx.fillStyle = BLANK_CANVAS_COLOR;
		ctx.fillRect(0, 0, w, h);
	},
	drawShipPrimitives: function(ctx, cx, cy, rBounding, thetaDeg, thrusters) {
		var i;

		// TODO: can refactor this?

		var xCoordsShip = [];
		xCoordsShip.push(cx + xOffs(rBounding, thetaDeg));
		xCoordsShip.push(cx + xOffs(rBounding, thetaDeg + SHIP_WING_ANGLE_DEG));
		xCoordsShip.push(cx + xOffs(rBounding * SHIP_BUTT_RATIO, thetaDeg + 180));
		xCoordsShip.push(cx + xOffs(rBounding, thetaDeg - SHIP_WING_ANGLE_DEG));
		var yCoordsShip = [];
		yCoordsShip.push(cy + yOffs(rBounding, thetaDeg));
		yCoordsShip.push(cy + yOffs(rBounding, thetaDeg + SHIP_WING_ANGLE_DEG));
		yCoordsShip.push(cy + yOffs(rBounding * SHIP_BUTT_RATIO, thetaDeg + 180));
		yCoordsShip.push(cy + yOffs(rBounding, thetaDeg - SHIP_WING_ANGLE_DEG));

		if (thrusters) {
			var xCoordsThrusters = [];
			xCoordsThrusters.push(xCoordsShip[2]);
			xCoordsThrusters.push(interp(xCoordsShip[1], xCoordsShip[2], THRUSTER_RATIO));
			xCoordsThrusters.push(cx + xOffs(rBounding, thetaDeg + 180));
			xCoordsThrusters.push(interp(xCoordsShip[3], xCoordsShip[2], THRUSTER_RATIO));
			var yCoordsThrusters = [];
			yCoordsThrusters.push(yCoordsShip[2]);
			yCoordsThrusters.push(interp(yCoordsShip[1], yCoordsShip[2], THRUSTER_RATIO));
			yCoordsThrusters.push(cy + yOffs(rBounding, thetaDeg + 180));
			yCoordsThrusters.push(interp(yCoordsShip[3], yCoordsShip[2], THRUSTER_RATIO));

			ctx.fillStyle = THRUSTER_COLOR;
			ctx.lineWidth = THRUSTER_LINE_WIDTH;
			ctx.beginPath();
			ctx.moveTo(xCoordsThrusters[0], yCoordsThrusters[0]);
			for (i = 1; i < xCoordsThrusters.length; ++i) {
				ctx.lineTo(xCoordsThrusters[i], yCoordsThrusters[i]);
			}
			ctx.closePath();
			ctx.fill();
		}

		ctx.fillStyle = SHIP_COLOR;
		ctx.lineWidth = SHIP_LINE_WIDTH;
		ctx.beginPath();
		ctx.moveTo(xCoordsShip[0], yCoordsShip[0]);
		for (i = 1; i < xCoordsShip.length; ++i) {
			ctx.lineTo(xCoordsShip[i], yCoordsShip[i]);
		}
		ctx.closePath();
		ctx.fill();
	},
	drawShipSprite: function(ctx, cx, cy, rBounding, thetaDeg, thrusters) {
		var img = imageMap['/img/benterprise1.png'];
		if (!img) {
			console.log('error: sprite not available??');
			return;
		}

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(cx + rBounding, cy + rBounding);
		ctx.rotate(deg2Rad(thetaDeg + 90));
		ctx.translate(-(cx + rBounding), -(cy + rBounding));
		ctx.drawImage(img,
					  thrusters ? SHIP_SPRITE_SX_ON : SHIP_SPRITE_SX_OFF,
					  thrusters ? SHIP_SPRITE_SY_ON : SHIP_SPRITE_SY_OFF,
					  SHIP_SPRITE_SW, SHIP_SPRITE_SH,
					  cx, cy, rBounding * 2, rBounding * 2);
	}

};

module.exports = drawObjects;