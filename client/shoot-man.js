// track shots from the given shipRef.
function ShootMan(shipRef) {
	this.shipRef = shipRef;
}

ShootMan.prototype.fire = function() {
};

ShootMan.prototype.update = function(deltaMs) {
};

ShootMan.prototype.drawAll = function(ctx) {
};

module.exports = ShootMan;
