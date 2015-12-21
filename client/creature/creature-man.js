// creature manager/factory
var CreatureMan = window.Class.extend({
	init: function(type, map, params) {
		this.type = type;
		this.map = map;
		this.params = params;
		this.initialSetup();
		this.creatures = [];
	},
	initialSetup: function() {
		// TODO: spawn initial batch of creatures here
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
