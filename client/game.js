//var $ = require('jquery');
var raf = require('raf');
var drawLib = require('./draw-lib');
//var constants = require('./constants');
var terrainGen = require('./terrain-gen');

var Game = window.Class.extend({

	init: function($canvas) {
		this.ctx = $canvas.get(0).getContext('2d');
		this.canvasWidth = $canvas.width();
		this.canvasHeight = $canvas.height();

		this.rafHandle = null;
		this.timerTick = this.timerTick.bind(this);
		this.lastTickTime = null;

		this.testTerrain();
	},

	testTerrain: function() {
		var dim = 9;
		var width = dim, height = dim;
		var map = terrainGen(width, height);

		var i, j, str;
		console.log('dumping map ----');
		for (i = 0; i < width; ++i) {
			str = '';
			for (j = 0; j < height; ++j) {
				str += '' + map[i][j] + ',';
			}
			console.log(str);
		}

		drawLib.drawMap(this.ctx, map);
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
