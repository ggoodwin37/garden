var simConfig = {
	plantParams: {
		count: 1,
		individualParams: {
			baselineGenes: {
				'metabolic-rate': 20,

				// mutation probabilities and outcomes
				'no-mutation-chance': 0.50,
				'small-mutation-chance': 0.75,
				'medium-mutation-chance': 0.93,
				'small-mutation-range': 0.08,
				'medium-mutation-range': 0.15,
				'large-mutation-range': 0.30
			}
		}
	}
};

module.exports = simConfig;
