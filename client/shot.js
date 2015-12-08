var BaseSpaceObject = require('./base-space-object');
var drawObjects = require('./draw-objects');

//var constants = require('./constants');

function Shot() {
}
Shot.prototype = new BaseSpaceObject();

Shot.prototype.draw = function(ctx) {
    var rBounding = 15; // TODO: ??
	drawObjects.drawLaserSprite(ctx, this.x, this.y, rBounding);
};

// TODO: how do we override base and call super?
Shot.prototype.updateShot = function(deltaMs) {
	this.update(deltaMs);
    // TODO: anything else in here?
};

module.exports = Shot;
