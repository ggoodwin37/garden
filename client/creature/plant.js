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
		this.absorb(deltaMs);
		// TODO: rest of loop. spawning, etc.
	},
	getFoodValue: function() {
		var foodValue = 1 - ((this.map[this.x][this.y] - constants.mapWaterCutoff) / (1 - constants.mapWaterCutoff));
		return foodValue;
	},
	absorb: function(deltaMs) {
		var rate = this.genes.getGene('absorb-efficiency') || 1;
		var result = this.getFoodValue() * (deltaMs / 1000) * rate;
		this.vitality += result;
	},
	getDrawRadius: function() {
		return (this.vitality / 100) * 18;
	},
	getDrawColor: function() {
		// green intensity is based on some mishmash of genes and food values for now, might revisit this.
		var tuneFactor = 2.3;
		var val = this.genes.getGene('absorb-efficiency') * this.getFoodValue() * tuneFactor;
		var g = Math.min(0xff, Math.max(0, Math.round(val)));
		return 'rgb(0, ' + g + ', 0)';
	},
	draw: function(ctx) {
		drawLib.drawPlant(ctx, this.x, this.y, this.getDrawRadius(), this.getDrawColor());
	}
});

module.exports = Plant;
