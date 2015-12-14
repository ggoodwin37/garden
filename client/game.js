//var $ = require('jquery');
var raf = require('raf');
var drawLib = require('./draw-lib');
//var constants = require('./constants');
var terrainGen = require('./terrain-gen');
var Gradient = require('./gradient');

var Game = window.Class.extend({

	init: function($canvas) {
		this.ctx = $canvas.get(0).getContext('2d');
		this.canvasWidth = $canvas.width();
		this.canvasHeight = $canvas.height();

		this.rafHandle = null;
		this.timerTick = this.timerTick.bind(this);
		this.lastTickTime = null;

		this.gradient = new Gradient();
		this.gradient.addStop({
			val: 0.2,
			r: 0.0,
			g: 0.0,
			b: 1.0
		});
		this.gradient.addStop({
			val: 0.3,
			r: 1.0,
			g: 0.0,
			b: 0.1
		});
		this.gradient.addStop({
			val: 0.4,
			r: 0.8,
			g: 0.7,
			b: 0.2
		});
		this.gradient.addStop({
			val: 0.5,
			r: 0.3,
			g: 0.0,
			b: 0.7
		});
		this.gradient.addStop({
			val: 0.6,
			r: 0.3,
			g: 0.0,
			b: 0.5
		});
		this.gradient.addStop({
			val: 0.7,
			r: 0.8,
			g: 0.8,
			b: 1.0
		});
		this.gradient.addStop({
			val: 0.8,
			r: 1.0,
			g: 1.0,
			b: 0.0
		});
		this.gradient.addStop({
			val: 0.95,
			r: 1,
			g: 1,
			b: 1
		});
		this.testTerrain();
	},

	testTerrain: function() {
		var dim = 65;
		var width = dim, height = dim;
		var map = terrainGen(width, height);

		// var i, j, str;
		// console.log('dumping map ----');
		// for (i = 0; i < width; ++i) {
		// 	str = '';
		// 	for (j = 0; j < height; ++j) {
		// 		str += '' + map[i][j] + ',';
		// 	}
		// 	console.log(str);
		// }

		drawLib.drawMap(this.ctx, map, this.gradient);
	},

	start: function() {
		this.scheduleTick();
	},

	scheduleTick: function() {
		this.rafHandle = raf(this.timerTick);
	},

	timerTick: function() {
		if (!this.lastTickTime) {
			this.lastTickTime = Date.now();
			this.scheduleTick();
			return;
		}
		var now = Date.now();

		var deltaMs = now - this.lastTickTime;
		this.lastTickTime = now;

		this.gameLoop(deltaMs);

		this.scheduleTick();
	},

	gameLoop: function(deltaMs) {
//		drawLib.clearCtx(this.ctx);
	}

});

module.exports = Game;
