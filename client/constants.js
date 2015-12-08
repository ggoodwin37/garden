module.exports = {
	sanityCheck: false,

	shipRadius: 30,
	shipRotationalVelocity: 270,
	shipThrust: 7,
	shipVelMax: 14,

	shipDeadTimeMs: 2000,

	rockSmallRadius: 15,
	rockMediumRadius: 30,
	rockLargeRadius: 60,

	rockAngVelSmall: 440,
	rockAngVelMedium: 100,
	rockAngVelLarge: 55,

	rockVelSmall: 160,
	rockVelMedium: 100,
	rockVelLarge: 70,

	numSmallRocks: 8,
	numMediumRocks: 6,
	numLargeRocks: 4,

	largeRockBabies: 2,
	mediumRockBabies: 3,

	shipSpriteSrcSize: 64,
	rockSmallSpriteSrcSize: 32,
	rockMediumSpriteSrcSize: 64,
	rockLargeSpriteSrcSize: 128,

	bubSrcConfigExplode: {
		spawnRadius: 80,
		spawnTime: 2,
		rgbStart1: { r: 1, g: 0, b: 0 },
		rgbStart2: { r: 1, g: 1, b: 0 },
		rgbEnd1: { r: 1, g: 1, b: 1 },
		rgbEnd2: { r: 1, g: 1, b: 1 },
		maxDur: 400,
		maxSize: 48,
		srcTimeToLive: 2000
	},
	bubSrcConfigShipThrust: {
		spawnRadius: 10,
		spawnTime: 10,
		rgbStart1: { r: 0, g: 0, b: 1 },
		rgbStart2: { r: 0, g: 0, b: 0.5 },
		rgbEnd1: { r: 1, g: 1, b: 1 },
		rgbEnd2: { r: 1, g: 1, b: 1 },
		maxDur: 750,
		maxSize: 24,
		srcTimeToLive: 0
	},
	bubSrcConfigRockHit: {
		spawnRadius: 20,
		spawnTime: 3,
		rgbStart1: { r: 0.1, g: 0.1, b: 0.1  },
		rgbStart2: { r: 0.4, g: 0.4, b: 0.4 },
		rgbEnd1: { r: 0.5, g: 0.5, b: 0.5 },
		rgbEnd2: { r: 0.9, g: 0.9, b: 0.9 },
		maxDur: 250,
		maxSize: 48,
		srcTimeToLive: 500
	},

    shotVel: 700,
    shotR: 8,
	shotDebounceGapMs: 100
};
