// a grid-based collision detection thing.

var chunkSize = 200;

var HitGrid = window.Class.extend({

	init: function(clientW, clientH) {
		this.clientW = clientW;
		this.clientH = clientH;
		// this is a map of keyStrings to lists of spaceObjs.
		// each keystring is of the form 'xindex,yindex' where
		// xcol and ycol are the chunk indices corresponding
		// to this grid square.
		this.cache = {};
	},

	clear: function() {
		this.cache = {};
	},

	register: function(spaceObj, type) {
		this._doForAllOverlappingSquares(spaceObj, function(squareList) {
			squareList.push({
				spaceObj: spaceObj,
				type: type
			});
		});
	},

	findHitsByType: function(spaceObj, type) {
		var allHits = [];
		this._doForAllOverlappingSquares(spaceObj, function(squareList) {
			squareList.forEach(function(hit) {
				if (hit.type === type) {
					var dx = hit.spaceObj.x - spaceObj.x;
					var dy = hit.spaceObj.y - spaceObj.y;
					var distSquared = (dx * dx) + (dy * dy);
					var limitSquared = (hit.spaceObj.r + spaceObj.r) * (hit.spaceObj.r + spaceObj.r);
					if (distSquared < limitSquared) {
						allHits.push(hit.spaceObj);
					}
				}
			});
		});
		return allHits;
	},

	_doForAllOverlappingSquares: function(spaceObj, cb) {
		var xMin = Math.floor((spaceObj.x - spaceObj.r) / chunkSize),
			xMax = Math.floor((spaceObj.x + spaceObj.r) / chunkSize),
			yMin = Math.floor((spaceObj.y - spaceObj.r) / chunkSize),
			yMax = Math.floor((spaceObj.y + spaceObj.r) / chunkSize);
		var i, j, keyString, list;
		for (j = yMin; j <= yMax; ++j) {
			for (i = xMin; i <= xMax; ++i) {
				keyString = '' + i + ',' + j;
				list = this.cache[keyString];
				if (!list) {
					list = this.cache[keyString] = [];
				}
				cb(list);
			}
		}
	}

});

module.exports = HitGrid;
