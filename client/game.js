var raf = require('raf');
var Ship = require('./ship');
var KeyHandler = require('./key-handler');
var drawObjects = require('./draw-objects');
var $ = require('jquery');

function Game($canvas) {
	this.keyHandler = new KeyHandler($(document));
	this.keyHandler.on('keydown', this.onKeyDown.bind(this));
	this.keyHandler.on('keyup', this.onKeyUp.bind(this));

	this.ctx = $canvas.get(0).getContext('2d');

	var ship = new Ship();
	ship.x = $canvas.width() / 2;
	ship.y = $canvas.height() / 2;
	ship.thetaDeg = 238;
	ship.r = 30;
	ship.thrustersActive = true;
	ship.vx = 300;
	ship.vy = 220;
	this.ship = ship;

	this.rafHandle = null;
	this.timerTick = this.timerTick.bind(this);
	this.lastTickTime = null;
}

Game.prototype.start = function() {
	this.scheduleTick();
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
	// game logic
	this.ship.update(deltaMs);
	this.ship.thetaDeg += 2;  // test

	// drawing
	drawObjects.clearCtx(this.ctx);
	this.ship.draw(this.ctx);
};

Game.prototype.onKeyDown = function(dir) {
};

Game.prototype.onKeyUp = function(dir) {
};

module.exports = Game;
