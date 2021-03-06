var $ = require('jquery');
var raf = require('raf');
var drawLib = require('./draw-lib');
//var constants = require('./constants');
var terrainGen = require('./terrain-gen');
var generateGradient = require('./generate-gradient');
var Sim = require('./sim');

var Game = window.Class.extend({

	init: function(canvasMap) {
		this.bgCtx = canvasMap.$bgCanvas.get(0).getContext('2d');
		this.fgCtx = canvasMap.$fgCanvas.get(0).getContext('2d');
		this.canvasWidth = canvasMap.$bgCanvas.width();
		this.canvasHeight = canvasMap.$bgCanvas.height();

		this.rafHandle = null;
		this.timerTick = this.timerTick.bind(this);
		this.lastTickTime = null;

		this.gradient = generateGradient.landscape();
		this.sim = null;  // will be started once map is generated
		this.generateMap();
	},

	setStatus: function(statusText) {
		$('.status-message').text(statusText);
	},

	generateMap: function() {
		this.setStatus('Generating map');
		var self = this;
		var downsampleFactor = 1;
		terrainGen(this.canvasWidth / downsampleFactor, this.canvasHeight / downsampleFactor, function(map) {
			self.map = map;
			drawLib.drawMap(self.bgCtx, self.map, self.gradient);
			self.setStatus('Done');
			self.startSim();
		}, function(map, cur, tot) {
			console.log('generate map progress: ' + cur + ' of ' + tot);
			drawLib.drawMap(self.bgCtx, map, self.gradient);
		});
	},

	startSim: function() {
		this.sim = new Sim(this.fgCtx, this.map);
		// TODO: I am in a hurry but would like to avoid doing this later ^_^
		window.sim = this.sim;
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
		if (!this.sim) {
			// sim not started yet
			return;
		}
		this.sim.update(deltaMs);
		this.sim.draw();
		this.setStatus('Plants: ' + this.sim.plantMan.creatures.length);
	}

});

module.exports = Game;
