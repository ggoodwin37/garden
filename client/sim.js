// encapsulate the simulation itself
var drawLib = require('./draw-lib');
//var constants = require('./constants');

var CreatureMan = require('./creature/creature-man');
var simConfig = require('./sim-config');

var Sim = window.Class.extend({
	init: function(ctx, map) {
		this.ctx = ctx;
		this.map = map;
		this.plantMan = new CreatureMan('plant', this.map, simConfig.plantParams);
	},
	update: function(deltaMs) {
		this.plantMan.updateAll(deltaMs);
	},
	draw: function() {
		drawLib.clearCtx(this.ctx);
		this.plantMan.drawAll(this.ctx);
	}
});

module.exports = Sim;
