// track shots from the given shipRef.
var Shot = require('./shot');
var constants = require('./constants');
var deg2Rad = require('./deg2rad');

var ShotMan = window.Class.extend({

	// TODO: limit number of shots.
	init: function(shipRef) {
		this.shipRef = shipRef;
		this.shots = [];
		this.deadShots = null;
		this.shotDebounce = 0;
	},

	fire: function() {
		if (this.shotDebounce > 0) {
			return;  // too soon, man
		}
		this.shotDebounce = constants.shotDebounceGapMs;

		var shot;
		// figure out the displacement we need to space out two shots as if they are coming from the wing guns.
		//  modify the heading by a quarter circle cuz we're going out perpendicular to ship heading.
		var dx = this.shipRef.r * Math.cos(deg2Rad(this.shipRef.thetaDeg + 90)) * constants.shipShotSpacingRatio;
		var dy = this.shipRef.r * Math.sin(deg2Rad(this.shipRef.thetaDeg + 90)) * constants.shipShotSpacingRatio;

		// left gun
		shot = new Shot(this);
		shot.x = this.shipRef.x - dx;
		shot.y = this.shipRef.y - dy;
		shot.thetaDeg = this.shipRef.thetaDeg;
		shot.vx = this.shipRef.vx + (constants.shotVel * Math.cos(deg2Rad(shot.thetaDeg)));
		shot.vy = this.shipRef.vy + (constants.shotVel * Math.sin(deg2Rad(shot.thetaDeg)));
		this.shots.push(shot);

		// right gun
		shot = new Shot(this);
		shot.x = this.shipRef.x + dx;
		shot.y = this.shipRef.y + dy;
		shot.thetaDeg = this.shipRef.thetaDeg;
		shot.vx = this.shipRef.vx + (constants.shotVel * Math.cos(deg2Rad(shot.thetaDeg)));
		shot.vy = this.shipRef.vy + (constants.shotVel * Math.sin(deg2Rad(shot.thetaDeg)));
		this.shots.push(shot);
	},

	update: function(deltaMs, hitGrid) {
		var self = this;
		this.shots.forEach(function(thisShot) {
			thisShot.update(deltaMs);
		});
		if (this.deadShots) {
			this.shots = this.shots.filter(function(thisShot) {
				return !self.deadShots[thisShot.id];
			});
			this.deadShots = null;
		}
		this.shots.forEach(function(thisShot) {
			hitGrid.register(thisShot, 'shot');
		});
		this.shotDebounce = Math.max(0, this.shotDebounce - deltaMs);
	},

	checkShotHitsOnRocks: function(rockList, hitGrid, callback) {
		this.shots.forEach(function(thisShot) {
			var rocksHittingThis = hitGrid.findHitsByType(thisShot, 'rock');
			rocksHittingThis.forEach(function(thisRock) {
				callback(thisRock, thisShot);
			});
		});
	},

	onShotOffscreen: function(shot) {
		this.deadShots = this.deadShots || {};
		this.deadShots[shot.id] = true;
	},

	killShotsByMap: function(map) {
		this.shots = this.shots.filter(function(thisShot) {
			return !map[thisShot.id];
		});
	},

	drawAll: function(ctx) {
		this.shots.forEach(function(thisShot) {
			thisShot.draw(ctx);
		});
	}
});

module.exports = ShotMan;
