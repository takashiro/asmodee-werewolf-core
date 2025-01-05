/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	testEnvironment: 'node',
	collectCoverageFrom: [
		'src/**/*.ts',
	],
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^@asmodee/werewolf-(.*)\\.js$': '<rootDir>/src/$1',
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
};
