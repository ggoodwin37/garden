// a grid-based collision detection thing.
var _ = require('lodash');

var chunkSize = 200;

var HitGrid = window.Class.extend({

	init: function(clientW, clientH) {
		this.clientW = clientW;
		this.clientH = clientH;
		// this is a map of keyStrings to lists of entities.
		// each keystring is of the form 'xindex,yindex' where
		// xcol and ycol are the chunk indices corresponding
		// to this grid square.
		this.cache = {};
	},

	clear: function() {
		this.cache = {};
	},

	register: function(entity) {
		this._doForAllOverlappingSquares(entity, 1, function(squareList) {
			squareList.push(entity);
		});
	},

	unregister: function(entity) {
		var r = 1;
		var xMin = Math.floor((entity.x - r) / chunkSize),
			xMax = Math.floor((entity.x + r) / chunkSize),
			yMin = Math.floor((entity.y - r) / chunkSize),
			yMax = Math.floor((entity.y + r) / chunkSize);
		var i, j, keyString, list;
		var filterFunc = function(thisEntity) {
			return thisEntity !== entity;
		};
		for (j = yMin; j <= yMax; ++j) {
			for (i = xMin; i <= xMax; ++i) {
				keyString = '' + i + ',' + j;
				list = this.cache[keyString];
				if (list) {
					this.cache[keyString] = list.filter(filterFunc);
				} else {
					// shouldn't happen, all grid lists should have been created identically at register time.
					console.log('unexpected: wanted to unregister an entity from a nonexistent cache grid?');
				}
			}
		}
	},

	findAllEntitiesWithinRange: function(entity, r) {
		var allHits = [];
		this._doForAllOverlappingSquares(entity, r, function(squareList) {
			squareList.forEach(function(hit) {
				var dx = hit.x - entity.x;
				var dy = hit.y - entity.y;
				var distSquared = (dx * dx) + (dy * dy);
				var limitSquared = r * r;
				if (distSquared < limitSquared) {
					allHits.push(hit);
				}
			});
		});
		return _.uniq(allHits);
	},

	_doForAllOverlappingSquares: function(entity, checkR, cb) {
		var xMin = Math.floor((entity.x - checkR) / chunkSize),
			xMax = Math.floor((entity.x + checkR) / chunkSize),
			yMin = Math.floor((entity.y - checkR) / chunkSize),
			yMax = Math.floor((entity.y + checkR) / chunkSize);
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
