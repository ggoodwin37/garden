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
		// plants pick a few spots randomly, then select the spot that's closest to water from those.
		var x, y, spots = [];
		var numSuitableSpots = 5;
		do {
			x = Math.floor(Math.random() * this.map.length);
			y = Math.floor(Math.random() * this.map[0].length);
			if (this.map[x][y] >= constants.mapWaterCutoff) {
				spots.push({
					x: x,
					y: y,
					val: this.map[x][y]
				});
			}
		} while(spots.length < numSuitableSpots);
		spots.sort(function(a, b) {
			return a.val - b.val;
		});
		this.x = spots[0].x;
		this.y = spots[0].y;
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
