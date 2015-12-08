var raf = require('raf');
var Ship = require('./ship');
var Rock = require('./rock');
var KeyHandler = require('./key-handler');
var drawObjects = require('./draw-objects');
var bubMan = require('./bub/man');
var bubSrc = require('./bub/src');
var shotMan = require('./shot-man');
var $ = require('jquery');
var deg2Rad = require('./deg2rad');

var constants = require('./constants');

var Game = window.Class.extend({

	init: function($canvas) {
		this.keyHandler = new KeyHandler($(document));
		this.keyHandler.on('keydown', this.onKeyDown.bind(this));
		this.keyHandler.on('keyup', this.onKeyUp.bind(this));

		this.ctx = $canvas.get(0).getContext('2d');
		this.canvasWidth = $canvas.width();
		this.canvasHeight = $canvas.height();

		this.createShip();
		this.createRocks();

		this.rafHandle = null;
		this.timerTick = this.timerTick.bind(this);
		this.lastTickTime = null;

		this.bubMan = new bubMan();
		this.shipThrustBubSrc = new bubSrc({x: this.ship.x, y: this.ship.y}, constants.bubSrcConfigShipThrust);
		this.shipThrustBubSrc.active = false;
		this.bubMan.addSource(this.shipThrustBubSrc);

		this.shotMan = new shotMan(this.ship);
	},

	start: function() {
		this.scheduleTick();
	},

	createShip: function() {
		var ship = new Ship();
		ship.x = this.canvasWidth / 2;
		ship.y = this.canvasHeight / 2;
		this.ship = ship;
		if (this.shotMan) {
			this.shotMan.shipRef = this.ship;
		}
	},

	createRocks: function() {
		var i;
		var thisRock;
		var rockList = [];
		for (i = 0; i < constants.numSmallRocks; ++i) {
			thisRock = new Rock('small');
			thisRock.x = Math.random() * this.canvasWidth;
			thisRock.y = Math.random() * this.canvasHeight;
			rockList.push(thisRock);
		}
		for (i = 0; i < constants.numMediumRocks; ++i) {
			thisRock = new Rock('medium');
			thisRock.x = Math.random() * this.canvasWidth;
			thisRock.y = Math.random() * this.canvasHeight;
			rockList.push(thisRock);
		}
		for (i = 0; i < constants.numLargeRocks; ++i) {
			thisRock = new Rock('large');
			thisRock.x = Math.random() * this.canvasWidth;
			thisRock.y = Math.random() * this.canvasHeight;
			rockList.push(thisRock);
		}
		this.rockList = rockList;
	},

	scheduleTick: function() {
		this.rafHandle = raf(this.timerTick);
	},

	timerTick: function() {
		if (!this.lastTickTime) {
			this.lastTickTime = Date.now();
			this.scheduleTick();
			return;
		}
		var now = Date.now();

		var deltaMs = now - this.lastTickTime;
		this.lastTickTime = now;

		this.gameLoop(deltaMs);

		this.scheduleTick();
	},

	gameLoop: function(deltaMs) {
		var self = this;

		// game logic
		if (this.ship.state == 'alive') {
			this.ship.update(deltaMs);
			this.updateShipThrustBubs();
			this.checkShipRockCollisions();
		} else if (this.ship.state == 'dead') {
			this.ship.deadTime -= deltaMs;
			if (this.ship.deadTime <= 0) {
				this.shipReborn();
			}
		}
		this.rockList.forEach(function(thisRock) {
			thisRock.update(deltaMs);
		});
		this.bubMan.update(deltaMs);
		this.shotMan.update(deltaMs);

		// drawing
		if (!constants.sanityCheck) {
			drawObjects.clearCtx(this.ctx);
		}
		this.ship.draw(this.ctx);
		this.rockList.forEach(function(thisRock) {
			thisRock.draw(self.ctx);
		});
		this.bubMan.drawAll(this.ctx);
		this.shotMan.drawAll(this.ctx);
	},

	updateShipThrustBubs: function() {
		if (this.ship.thrustersActive) {
			// figure out where the thrust bub src should be positioned
			var thetaR = deg2Rad(this.ship.thetaDeg + 180);
			var halfShipSize = constants.shipSpriteSrcSize / 2;
			var x = this.ship.x + (Math.cos(thetaR) * halfShipSize);
			var y = this.ship.y + (Math.sin(thetaR) * halfShipSize);
			this.shipThrustBubSrc.setPos({x: x, y: y});
			this.shipThrustBubSrc.active = true;
		} else {
			this.shipThrustBubSrc.active = false;
		}
	},

	checkShipRockCollisions: function() {
		var self = this;

		// for now, do a brute-force check. later we can improve this by using a grid or something.
		// also, this doesn't handle collisions around the edges correctly.
		this.rockList.forEach(function(thisRock) {
			var dx = thisRock.x - self.ship.x;
			var dy = thisRock.y - self.ship.y;
			var distSquared = (dx * dx) + (dy * dy);
			var limitSquared = (thisRock.r + self.ship.r) * (thisRock.r + self.ship.r);
			if (distSquared < limitSquared) {
				self.shipHitRock();
				return;
			}
		});
	},

	shipHitRock: function() {
		this.ship.state = 'dead';
		this.ship.deadTime = constants.shipDeadTimeMs;
		this.bubMan.addSource(new bubSrc({x: this.ship.x, y: this.ship.y}, constants.bubSrcConfigExplode));
		this.shipThrustBubSrc.active = false;
	},

	shipReborn: function() {
		this.createShip();
	},

	onKeyDown: function(keyString) {
		if (keyString == 'left') {
			this.ship.turningLeft = true;
		} else if (keyString == 'right') {
			this.ship.turningRight = true;
		} else if (keyString == 'up') {
			this.ship.thrustersActive = true;
		} else if (keyString == 'space' || keyString == 'down') {
			if (this.ship.state == 'alive') {
				this.shotMan.fire();
			}
		}
	},

	onKeyUp: function(dir) {
		if (dir == 'left') {
			this.ship.turningLeft = false;
		} else if (dir == 'right') {
			this.ship.turningRight = false;
		} else if (dir == 'up') {
			this.ship.thrustersActive = false;
		} else if (dir == 'down') {
		}
	}
});

module.exports = Game;
