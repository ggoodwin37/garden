// Bub is the basic particle system in this game.
//  BubMan manages a list of BubSrc's, each of which own their own individual Bubs.
var BubMan = window.Class.extend({

	init: function() {
		this.srcList = [];

		var self = this;
		this.srcDelegate = function(src, ev) {
			setTimeout(self.onSrcEvent(src, ev), 0);
		};
	},

	update: function(deltaMs) {
		this.srcList.forEach(function(thisSrc) {
			thisSrc.update(deltaMs);
		});
	},

	drawAll: function(ctx) {
		this.srcList.forEach(function(thisSrc) {
			thisSrc.draw(ctx);
		});
	},

	addSource: function(src) {
		src.srcDelegate = this.srcDelegate;
		this.srcList.push(src);
	},

	onSrcEvent: function(src, ev) {
		if (ev === 'done') {
			var newList = this.srcList.filter(function(test) {
				return test !== src;
			});
			this.srcList = newList;
		}
	}
});

module.exports = BubMan;
