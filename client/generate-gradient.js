var Gradient = require('./gradient');

function helper(grad, val, r, g, b) {
	grad.addStop({
		val: val,
		r: r,
		g: g,
		b: b
	});
}

function helperHex(grad, valByte, rByte, gByte, bByte) {
	helper(grad, valByte / 0xff, rByte / 0xff, gByte / 0xff, bByte / 0xff);
}

var generateGradient = {
	landscape: function() {
		var grad = new Gradient();
		helperHex(grad, 50, 29, 48, 112);
		helperHex(grad, 55, 57, 88, 163);
		helperHex(grad, 62, 229, 200, 124);
		helperHex(grad, 130, 108, 115, 59);
		helperHex(grad, 180, 59, 85, 12);
		helperHex(grad, 235, 105, 83, 42);
		helperHex(grad, 255, 218, 219, 224);
		return grad;
	}
};

module.exports = generateGradient;
