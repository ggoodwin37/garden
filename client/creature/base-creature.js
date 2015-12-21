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
		// TODO: pick a suitable random location within this.map's dims
	},
	update: function(deltaMs) {
		// TODO
	},
	draw: function(ctx) {
		// no-op
	}
});

module.exports = Creature;
