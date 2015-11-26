// Bub is the basic particle system in this game.
//  BubMan manages a list of BubSrc's, each of which own their own individual Bubs.
function BubMan() {
	this.srcList = [];
}

BubMan.prototype.update = function(deltaMs) {
	this.srcList.forEach(function(thisSrc) {
		thisSrc.update(deltaMs);
	});
};

BubMan.prototype.drawAll = function(ctx) {
	this.srcList.forEach(function(thisSrc) {
		thisSrc.draw(ctx);
	});
};

BubMan.prototype.addSource = function(src) {
	this.srcList.push(src);
};

module.exports = BubMan;
