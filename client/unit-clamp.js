function unitClamp(val) {
	return Math.min(1, Math.max(0, val));
}

module.exports = unitClamp;
