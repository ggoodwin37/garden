// creature manager/factory
var Plant = require('./plant');

var CreatureMan = window.Class.extend({
	init: function(type, map, params) {
		this.type = type;
		this.map = map;
		this.params = params;
		this.creatures = [];
		this.initialSetup();
	},
	initialSetup: function() {
		var initialCreatures = 4;
		var params = {};  // TODO: based on this.params;
		var i;
		if (this.type === 'plant') {
			for (i = 0; i < initialCreatures; ++i) {
				this.creatures.push(new Plant(this.map, params));
			}
		}
	},
	updateAll: function(deltaMs) {
		this.creatures.forEach(function(thisCreature) {
			thisCreature.update(deltaMs);
		});
	},
	drawAll: function(ctx) {
		this.creatures.forEach(function(thisCreature) {
			thisCreature.draw(ctx);
		});
	}
});

module.exports = CreatureMan;
