var simConfig = {
	plantParams: {
		count: 30,
		individualParams: {
			initialVitality: 1,
			baselineGenes: {
				'metabolic-rate': 60,
				'absorb-efficiency': 80,

				// mutation probabilities and outcomes
				'no-mutation-chance': 0.50,
				'small-mutation-chance': 0.75,
				'medium-mutation-chance': 0.93,
				'small-mutation-range': 0.08,
				'medium-mutation-range': 0.15,
				'large-mutation-range': 0.30,

				'competitor-range': 50
			}
		}
	}
};

module.exports = simConfig;
