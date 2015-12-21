// plant creature
var Creature = require('./base-creature');

var Plant = Creature.extend({
	init: function(map, params) {
		this._super(map, params);
	},
	update: function(deltaMs) {
		this._super(deltaMs);
	},
	draw: function(ctx) {
		this._super(ctx);
	}
});

module.exports = Plant;
