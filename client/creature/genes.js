// represents the genes for a creature.
// These are just key-value pairs with some helpers for mutating and offspring.
// it's a little self-referential in that some of the choices in mutation are
// governed by certain genes.
var probMap = require('../prob-map');
var randomBipolar = require('../random-bipolar');

var Genes = window.Class.extend({
	init: function(baseline) {
		this.genes = baseline;

		// start with an initial mutation with respect to baseline.
		this.genes = this.generateOffspringGenes();
	},
	getGene: function(geneName) {
		if (this.genes[geneName] === undefined) {
			console.log('unknown gene named: ' + geneName);
			return 0;
		}
		return this.genes[geneName];
	},
	setGene: function(geneName, val) {
		this.genes[geneName] = val;
	},
	mutate: function(val) {
		var probabilities = [
			this.getGene('no-mutation-chance') || 0.75,
			this.getGene('small-mutation-chance') || 0.9,
			this.getGene('medium-mutation-chance') || 0.98
		];
		var outcomes = [
			0, // no mutation
			this.getGene('small-mutation-range') || 0.01,
			this.getGene('medium-mutation-range') || 0.08,
			this.getGene('large-mutation-range') || 0.25
		];
		var map = {outcomes: outcomes, probabilities: probabilities};
		var mutateLevel = probMap(map, Math.random());
		// TODO: are negative values allowed? how about >1?
		return val * (1 + randomBipolar(mutateLevel));
	},
	// single-parent version. basically a clone with mutations.
	generateOffspringGenes: function() {
		var offspring = {}, self = this;
		Object.keys(this.genes).forEach(function(geneName) {
			offspring[geneName] = self.mutate(self.genes[geneName]);
		});
		return offspring;
	}
	// TODO: later, might be interesting to add sexual reproduction to see
	//  if that has advantages in the sim.
});

module.exports = Genes;
