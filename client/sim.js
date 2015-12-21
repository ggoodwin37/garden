// encapsulate the simulation itself
//var drawLib = require('./draw-lib');

var Sim = window.Class.extend({
	init: function(ctx, map) {
		this.ctx = ctx;
		this.map = map;
	},
	update: function(deltaMs) {
	},
	draw: function() {
	}
});

module.exports = Sim;
