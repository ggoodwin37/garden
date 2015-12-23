// common creature stuff
var Genes = require('./genes');

var Creature = window.Class.extend({
	init: function(map, params) {
		this.map = map;
		if (params.initialX && params.initialY) {
			this.x = params.initialX;
			this.y = params.initialY;
		} else {
			this.setRandomInitialPosition();
		}
		this.activeState = 'none';
		this.vitality = params.initialVitality || 1;
		this.genes = params.genes || new Genes();
	},
	setRandomInitialPosition: function() {
		console.log('abstract');
	},
	update: function(deltaMs) {
		// all creatures burn vitality at a certain metabolic rate.
		var rate = this.genes.getGene('metabolic-rate');  // consume vitality units per second
		var vitalityChange = (deltaMs / 1000) * rate;
		this.vitality = Math.max(0, this.vitality - vitalityChange);
	},
	draw: function(ctx) {
		console.log('abstract');
	}
});

module.exports = Creature;
