var raf = require('raf');
var Ship = require('./ship');
var Rock = require('./rock');
var KeyHandler = require('./key-handler');
var drawObjects = require('./draw-objects');
var $ = require('jquery');

var constants = require('./constants');

function Game($canvas) {
	this.keyHandler = new KeyHandler($(document));
	this.keyHandler.on('keydown', this.onKeyDown.bind(this));
	this.keyHandler.on('keyup', this.onKeyUp.bind(this));

	this.ctx = $canvas.get(0).getContext('2d');

	this.createShip($canvas);
	this.createRocks($canvas);

	this.rafHandle = null;
	this.timerTick = this.timerTick.bind(this);
	this.lastTickTime = null;
}

Game.prototype.start = function() {
	this.scheduleTick();
};

Game.prototype.createShip = function($canvas) {
	var ship = new Ship();
	ship.x = $canvas.width() / 2;
	ship.y = $canvas.height() / 2;
	this.ship = ship;
};

Game.prototype.createRocks = function($canvas) {
	var i;
	var thisRock;
	var rockList = [];
	var w = $canvas.width();
	var h = $canvas.height();
	for (i = 0; i < constants.numSmallRocks; ++i) {
		thisRock = new Rock('small');
		thisRock.x = Math.random() * w;
		thisRock.y = Math.random() * h;
		rockList.push(thisRock);
	}
	for (i = 0; i < constants.numMediumRocks; ++i) {
		thisRock = new Rock('medium');
		thisRock.x = Math.random() * w;
		thisRock.y = Math.random() * h;
		rockList.push(thisRock);
	}
	for (i = 0; i < constants.numLargeRocks; ++i) {
		thisRock = new Rock('large');
		thisRock.x = Math.random() * w;
		thisRock.y = Math.random() * h;
		rockList.push(thisRock);
	}
	this.rockList = rockList;
};

Game.prototype.scheduleTick = function() {
	this.rafHandle = raf(this.timerTick);
};

Game.prototype.timerTick = function() {
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
};

Game.prototype.gameLoop = function(deltaMs) {
	var self = this;

	// game logic
	this.ship.updateShip(deltaMs);
	this.rockList.forEach(function(thisRock) {
		thisRock.updateRock(deltaMs);
	});

	// drawing
	drawObjects.clearCtx(this.ctx);
	this.ship.draw(this.ctx);
	this.rockList.forEach(function(thisRock) {
		thisRock.draw(self.ctx);
	});
};

Game.prototype.onKeyDown = function(dir) {
	if (dir == 'left') {
		this.ship.turningLeft = true;
	} else if (dir == 'right') {
		this.ship.turningRight = true;
	} else if (dir == 'up') {
		this.ship.thrustersActive = true;
	} else if (dir == 'down') {
		// TODO: shooting
	}
};

Game.prototype.onKeyUp = function(dir) {
	if (dir == 'left') {
		this.ship.turningLeft = false;
	} else if (dir == 'right') {
		this.ship.turningRight = false;
	} else if (dir == 'up') {
		this.ship.thrustersActive = false;
	} else if (dir == 'down') {
	}
};

module.exports = Game;
