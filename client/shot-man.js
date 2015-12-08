// track shots from the given shipRef.
var Shot = require('./shot');
var constants = require('./constants');
var deg2Rad = require('./deg2rad');

function ShotMan(shipRef) {
	this.shipRef = shipRef;
    this.shots = [];
    this.deadShots = [];
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
    this.deadShots.forEach(function(thisDeadShot) {
        var index = self.shots.indexOf(thisDeadShot);
        if (index === -1) {
            console.log('unexpected: didnt find dead shot.');
            return;
        }
        self.shots.splice(index, 1);
    });
    this.deadShots = [];
};

ShotMan.prototype.onShotOffscreen = function(shot) {
    this.deadShots.push(shot);
};

ShotMan.prototype.drawAll = function(ctx) {
    this.shots.forEach(function(thisShot) {
        thisShot.draw(ctx);
    });
};

module.exports = ShotMan;
