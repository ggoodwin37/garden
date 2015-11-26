module.exports = function interp(min, max, f) {
	return min + ((max - min) * f);
};
