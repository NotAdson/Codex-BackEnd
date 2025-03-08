export default {
	testEnvironment: "node",
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	moduleFileExtensions: ["js", "json"],
	testMatch: ["**/__tests__/**/*.test.js"],
	setupFiles: ["dotenv/config"],
	globalSetup: './src/__tests__/jest.globalSetup.js',
	globalTeardown: './src/__tests__/jest.globalTeardown.js'
};
