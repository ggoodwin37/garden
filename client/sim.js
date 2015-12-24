// encapsulate the simulation itself
var drawLib = require('./draw-lib');
//var constants = require('./constants');

var CreatureMan = require('./creature/creature-man');
var HitGrid = require('./hit-grid');
var simConfig = require('./sim-config');

var Sim = window.Class.extend({
	init: function(ctx, map) {
		this.ctx = ctx;
		this.map = map;
		var w = this.map.length;
		var h = this.map[0].length;
		this.hitGrids = {
			plant: new HitGrid(w, h)
		};
		this.plantMan = new CreatureMan('plant', this.map, this.hitGrids, simConfig.plantParams);
	},
	update: function(deltaMs) {
		this.plantMan.updateAll(deltaMs);
	},
	draw: function() {
		drawLib.clearCtx(this.ctx);
		this.plantMan.drawAll(this.ctx);
	},
	spawnNewPlant: function(params) {
		this.plantMan.spawnWithParams(params);
	},
	plantDied: function(plant) {
		this.plantMan.remove(plant);
	}
});

module.exports = Sim;
