// track shots from the given shipRef.
var Shot = require('./shot');
var constants = require('./constants');
var deg2Rad = require('./deg2rad');

function ShootMan(shipRef) {
	this.shipRef = shipRef;
    this.shots = [];
}

ShootMan.prototype.fire = function() {
    // TODO: shoot 2x lasers instead, offset from ship's position such that it looks like they're actually coming out of blasters.
    var shot = new Shot();
    shot.x = this.shipRef.x;
    shot.y = this.shipRef.y;
    shot.thetaDeg = this.shipRef.thetaDeg;
    shot.vx = this.shipRef.vx + (constants.shotVel * Math.cos(deg2Rad(shot.thetaDeg)));
    shot.vy = this.shipRef.vy + (constants.shotVel * Math.sin(deg2Rad(shot.thetaDeg)));
    this.shots.push(shot);
};

ShootMan.prototype.update = function(deltaMs) {
    this.shots.forEach(function(thisShot) {
        thisShot.updateShot(deltaMs);
    });
};

ShootMan.prototype.drawAll = function(ctx) {
    this.shots.forEach(function(thisShot) {
        thisShot.draw(ctx);
    });
};

module.exports = ShootMan;
