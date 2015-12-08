// track shots from the given shipRef.
var Shot = require('./shot');
var constants = require('./constants');
var deg2Rad = require('./deg2rad');

function ShotMan(shipRef) {
	this.shipRef = shipRef;
	this.shots = [];
	this.deadShots = null;
}

ShotMan.prototype.fire = function() {
	// TODO: shoot 2x lasers instead, offset from ship's position such that it looks like they're actually coming out of blasters.
	var shot = new Shot(this);
	shot.x = this.shipRef.x;
	shot.y = this.shipRef.y;
	shot.thetaDeg = this.shipRef.thetaDeg;
	shot.vx = this.shipRef.vx + (constants.shotVel * Math.cos(deg2Rad(shot.thetaDeg)));
	shot.vy = this.shipRef.vy + (constants.shotVel * Math.sin(deg2Rad(shot.thetaDeg)));
	this.shots.push(shot);
};

ShotMan.prototype.update = function(deltaMs) {
	var self = this;
	this.shots.forEach(function(thisShot) {
		thisShot.updateShot(deltaMs);
	});
	if (this.deadShots) {
		this.shots = this.shots.filter(function(thisShot) {
			return !self.deadShots[thisShot.id];
		});
		this.deadShots = null;
	}
};

ShotMan.prototype.onShotOffscreen = function(shot) {
	this.deadShots = this.deadShots || {};
	this.deadShots[shot.id] = true;
};

ShotMan.prototype.drawAll = function(ctx) {
	this.shots.forEach(function(thisShot) {
		thisShot.draw(ctx);
	});
};

module.exports = ShotMan;
