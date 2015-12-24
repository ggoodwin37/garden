// creature manager/factory
var Plant = require('./plant');
var constants = require('../constants');
var _ = require('lodash');

var CreatureMan = window.Class.extend({
	init: function(type, map, hitGrids, params) {
		this.type = type;
		this.map = map;
		this.hitGrids = hitGrids;
		this.params = params;
		this.creatures = [];
		this.initialSetup();
	},
	initialSetup: function() {
		var initialCreatures = this.params.count;
		var params = _.clone(this.params.individualParams, true);
		var i;
		if (this.type === 'plant') {
			for (i = 0; i < initialCreatures; ++i) {
				this.creatures.push(new Plant(this.map, this.hitGrids, params));
			}
		}
	},
	spawnWithParams: function(params) {
		if (this.creatures.length >= constants.maxCreaturesPerMan) {
			return;
		}
		if (this.type === 'plant') {
			this.creatures.push(new Plant(this.map, this.hitGrids, params));
		}
	},
	remove: function(entity) {
		entity.onDying();
		this.creatures = this.creatures.filter(function(thisCreature) {
			return entity !== thisCreature;
		});
	},
	updateAll: function(deltaMs) {
		this.creatures.forEach(function(thisCreature) {
			thisCreature.update(deltaMs);
		});
	},
	drawAll: function(ctx) {
		this.creatures.forEach(function(thisCreature) {
			thisCreature.draw(ctx);
		});
	}
});

module.exports = CreatureMan;
