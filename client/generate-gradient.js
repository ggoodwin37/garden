var Gradient = require('./gradient');

function helper(grad, val, r, g, b) {
	grad.addStop({
		val: val,
		r: r,
		g: g,
		b: b
	});
}

var generateGradient = {
	landscape: function() {
		var grad = new Gradient();
		helper(grad, 0.2, 0.0, 0.0, 1.0);
		helper(grad, 0.3, 1.0, 0.0, 0.1);
		helper(grad, 0.4, 0.8, 0.7, 0.2);
		helper(grad, 0.5, 0.3, 0.0, 0.7);
		helper(grad, 0.6, 0.3, 0.0, 0.5);
		helper(grad, 0.7, 0.8, 0.8, 1.0);
		helper(grad, 0.8, 1.0, 1.0, 0.0);
		helper(grad, 0.95, 1, 1, 1);
		return grad;
	}
};

module.exports = generateGradient;
