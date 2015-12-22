// plant creature
var Creature = require('./base-creature');
var constants = require('../constants');
var drawLib = require('../draw-lib');

var Plant = Creature.extend({
	init: function(map, params) {
		this._super(map, params);
	},
	// override
	setRandomInitialPosition: function() {
		this._super();
		var x, y, suitable = false;
		do {
			x = Math.floor(Math.random() * this.map.length);
			y = Math.floor(Math.random() * this.map[0].length);
			suitable = (this.map[x][y] >= constants.mapWaterCutoff);
		} while(!suitable);
		this.x = x;
		this.y = y;
	},
	update: function(deltaMs) {
		this._super(deltaMs);
	},
	draw: function(ctx) {
		this._super(ctx);
		var radius = 12; // TODO: based on vitality
		var color = 'rgb(0, 240, 0)';
		drawLib.drawPlant(ctx, this.x, this.y, radius, color);
	}
});

module.exports = Plant;
