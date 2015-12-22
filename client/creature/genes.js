// represents the genes for a creature.
// These are just key-value pairs with some helpers for mutating and offspring.
// it's a little self-referential in that some of the choices in mutation are
// governed by certain genes.
//var probMap = require('../prob-map');
var Genes = window.Class.extend({
	init: function() {
		this.genes = {};
	},
	get: function(geneName) {
		if (this.genes[geneName] === undefined) {
			console.log('unknown gene named: ' + geneName);
			return 0;
		}
		return this.genes[geneName];
	},
	set: function(geneName, val) {
		this.genes[geneName] = val;
	},
	mutate: function(val) {
	},
	// single-parent version. basically a clone with mutations.
	generateOffspringGenes: function() {
		var offspring = {}, self = this;
		Object.keys(this.genes).forEach(function(geneName) {
			offspring[geneName] = self.mutate(self.genes[geneName]);
		});
		
	}
	// TODO: later, might be interesting to add sexual reproduction to see
	//  if that has advantages in the sim.
});

module.exports = Genes;
