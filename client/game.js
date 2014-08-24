var Ship = require('./ship');

function Game($canvas) {
	this.ctx = $canvas.get(0).getContext('2d');

	var ship = new Ship();
	ship.x = $canvas.width() / 2;
	ship.y = $canvas.height() / 2;
	ship.thetaDeg = 245;
	ship.r = 30;
	ship.thrustersActive = true;
	this.ship = ship;
}

Game.prototype.start = function() {
	// test
	this.ship.draw(this.ctx);
};

module.exports = Game;
