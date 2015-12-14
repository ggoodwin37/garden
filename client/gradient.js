var interp = require('./interp');
var badColor = {r: 1, g: 0, b: 1};

var Gradient = window.Class.extend({
	init: function() {
		this.stops = [];
	},

	// {val: [0-1], r: [0-1], g: [0-1], b: [0-1]}}
	addStop: function(stop) {
		this.stops.push(stop);
		this.stops.sort(function(a, b) {
			return a.val - b.val;
		});
	},

	getRgbForValue: function(val) {
		if (this.stops.length === 0) {
			return badColor;
		}
		if (val < this.stops[0].val) {
			return {r: this.stops[0].r, g: this.stops[0].g, b: this.stops[0].b };
		}
		var endIndex = this.stops.length - 1;
		if (val >= this.stops[endIndex].val) {
			return {r: this.stops[endIndex].r, g: this.stops[endIndex].g, b: this.stops[endIndex].b };
		}
		var index = 0;
		while (this.stops[index + 1].val < val) index++;
		var r0 = this.stops[index].r, r1 = this.stops[index + 1].r;
		var g0 = this.stops[index].g, g1 = this.stops[index + 1].g;
		var b0 = this.stops[index].b, b1 = this.stops[index + 1].b;
		var v0 = this.stops[index].val, v1 = this.stops[index + 1].val;
		var valMapped = (val - v0) / (v1 - v0);
		return {
			r: interp(r0, r1, valMapped),
			g: interp(g0, g1, valMapped),
			b: interp(b0, b1, valMapped)
		};
	}
});

module.exports = Gradient;
