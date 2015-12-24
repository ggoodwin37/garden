// plant creature
var Creature = require('./base-creature');
var constants = require('../constants');
var drawLib = require('../draw-lib');
var unitClamp = require('../unit-clamp');

var Plant = Creature.extend({
	init: function(map, hitGrids, params) {
		this._super(map, hitGrids, params);
		// x and y guaranteed to be set by this point, and won't change after this for the plant case.
		this.hitGrids.plant.register(this);
	},
	// override
	setRandomInitialPosition: function() {
		// plants pick a few spots randomly, then select the spot that's closest to water from those.
		var x, y, spots = [];
		var numSuitableSpots = constants.plantsNumSuitableSpots;
		do {
			x = Math.floor(Math.random() * this.map.length);
			y = Math.floor(Math.random() * this.map[0].length);
			if (this.map[x][y] >= constants.mapWaterCutoff) {
				spots.push({
					x: x,
					y: y,
					val: this.map[x][y]
				});
			}
		} while(spots.length < numSuitableSpots);
		spots.sort(function(a, b) {
			return a.val - b.val;
		});
		this.x = spots[0].x;
		this.y = spots[0].y;
	},
	update: function(deltaMs) {
		this._super(deltaMs);
		this.absorb(deltaMs);
		this.trySpawn(deltaMs);
		this.checkDead(deltaMs);
	},
	getFoodValue: function() {
		var baseValue = this.map[this.x][this.y];
		var competitorRange = this.genes.getGene('competitor-range');
		var numCompetitors = this.hitGrids.plant.findAllEntitiesWithinRange(this, competitorRange).length - 1;
		var maxCompetitors = 5;  // TODO: gene?
		var foodValue = 1 - ((baseValue - constants.mapWaterCutoff) / (1 - constants.mapWaterCutoff));
		return foodValue * (1 - unitClamp(numCompetitors / maxCompetitors));
	},
	absorb: function(deltaMs) {
		var rate = this.genes.getGene('absorb-efficiency') || 1;
		var result = this.getFoodValue() * (deltaMs / 1000) * rate;
		this.vitality += result;
	},
	getSpawnLocation: function(maxRadius) {
		var x, y, spots = [];
		var numSuitableSpots = constants.plantsNumSuitableSpots;
		var theta, r;
		do {
			r = Math.random() * maxRadius;
			theta = Math.random() * Math.PI * 2;
			x = Math.max(0, Math.min(this.map.length - 1, this.x + Math.floor(Math.cos(theta) * r)));
			y = Math.max(0, Math.min(this.map[0].length - 1, this.y + Math.floor(Math.sin(theta) * r)));
			if (this.map[x][y] >= constants.mapWaterCutoff) {
				spots.push({
					x: x,
					y: y,
					val: this.map[x][y]
				});
			}
		} while(spots.length < numSuitableSpots);
		spots.sort(function(a, b) {
			return a.val - b.val;
		});
		return {
			x: spots[0].x,
			y: spots[0].y
		};
	},
	trySpawn: function(deltaMs) {
		var spawnCutoff = this.genes.getGene('spawn-cutoff') || 100;
		if (this.vitality >= spawnCutoff) {
			// TODO: genes
			var childVitality = this.vitality * 0.3;
			this.vitality = this.vitality * 0.6;
			var maxSpawnRadius = this.genes.getGene('spawn-radius') || 100;
			var initialLocation = this.getSpawnLocation(maxSpawnRadius);
			var params = {};
			params.initialVitality = childVitality;
			params.initialX = initialLocation.x;
			params.initialY = initialLocation.y;
			params.baselineGenes = this.genes.generateOffspringGenes();
			// TODO: better events/delegates
			window.sim.spawnNewPlant(params);
		}
	},
	checkDead: function(deltaMs) {
		if (this.vitality < 1) {
			window.sim.plantDied(this);
		}
	},
	onDying: function() {
		this.hitGrids.plant.unregister(this);
	},
	getDrawRadius: function() {
		return Math.max(2, (this.vitality / 100) * 18);
	},
	getDrawColor: function() {
		// green intensity is based on some mishmash of genes and food values for now, might revisit this.
		var tuneFactor = 2.3;
		var val = this.genes.getGene('absorb-efficiency') * this.getFoodValue() * tuneFactor;
		var g = Math.min(0xff, Math.max(0, Math.round(val)));
		return 'rgb(0, ' + g + ', 0)';
	},
	draw: function(ctx) {
		drawLib.drawPlant(ctx, this.x, this.y, this.getDrawRadius(), this.getDrawColor());
	}
});

module.exports = Plant;
