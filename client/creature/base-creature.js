// common creature stuff
var Creature = window.Class.extend({
	init: function(map, params) {
		this.map = map;
		if (params.initialX && params.initialY) {
			this.x = params.initialX;
			this.y = params.initialY;
		} else {
			this.setRandomInitialPosition();
		}
	},
	setRandomInitialPosition: function() {
		// abstract
	},
	update: function(deltaMs) {
		// TODO: what common update functionality?
	},
	draw: function(ctx) {
		// abstract
	}
});

module.exports = Creature;
