import {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	refreshTokens,
} from "../authentication/Authenticator.js";
import jwt from "jsonwebtoken";

function withEnvironment(key, value, callback) {
	const originalValue = process.env[key];
	if (value === undefined) {
		delete process.env[key];
	} else {
		process.env[key] = value;
	}

	try {
		callback();
	} finally {
		if (originalValue === undefined) {
			delete process.env[key];
		} else {
			process.env[key] = originalValue;
		}
	}
}

describe("Environment Variables", () => {
	it("should have ACCESS_TOKEN_SECRET set", () => {
		expect(process.env.ACCESS_TOKEN_SECRET).toBeDefined();
		console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
	});

	it("should have REFRESH_TOKEN_SECRET set", () => {
		expect(process.env.REFRESH_TOKEN_SECRET).toBeDefined();
		console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);
	});
});

describe("Authenticator", () => {
	const userId = "65a1b2c3d4e5f6a7b8c9d0e1";

	describe("generateAccessToken", () => {
		it("should generate a valid access token", () => {
			const token = generateAccessToken(userId);
			expect(token).toBeDefined();

			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
			expect(decoded.userId).toBe(userId);
		});

		it("should return null if ACCESS_TOKEN_SECRET is missing", () => {
			withEnvironment("ACCESS_TOKEN_SECRET", undefined, () => {
				const token = generateAccessToken(userId);
				expect(token).toBeNull();
			});
		});
	});

	describe("generateRefreshToken", () => {
		it("should generate a valid refresh token", () => {
			const token = generateRefreshToken(userId);
			expect(token).toBeDefined();

			const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
			expect(decoded.userId).toBe(userId);
		});

		it("should return null if REFRESH_TOKEN_SECRET is missing", () => {
			withEnvironment("REFRESH_TOKEN_SECRET", undefined, () => {
				const token = generateRefreshToken(userId);
				expect(token).toBeNull();
			});
		});
	});

	describe("verifyAccessToken", () => {
		it("should verify a valid access token", () => {
			const token = generateAccessToken(userId);
			const decoded = verifyAccessToken(token);
			expect(decoded.userId).toBe(userId);
		});

		it("should return null for an invalid access token", () => {
			const invalidToken = "invalid.token.here";
			const decoded = verifyAccessToken(invalidToken);
			expect(decoded).toBeNull();
		});
	});

	describe("verifyRefreshToken", () => {
		it("should verify a valid refresh token", () => {
			const token = generateRefreshToken(userId);
			const decoded = verifyRefreshToken(token);
			expect(decoded.userId).toBe(userId);
		});

		it("should return null for an invalid refresh token", () => {
			const invalidToken = "invalid.token.here";
			const decoded = verifyRefreshToken(invalidToken);
			expect(decoded).toBeNull();
		});
	});

	describe("refreshTokens", () => {
		it("should generate new access and refresh tokens", () => {
			const refreshToken = generateRefreshToken(userId);
			const newTokens = refreshTokens(refreshToken);

			expect(newTokens.accessToken).toBeDefined();
			expect(newTokens.refreshToken).toBeDefined();

			const decodedAccessToken = verifyAccessToken(newTokens.accessToken);
			expect(decodedAccessToken.userId).toBe(userId);

			const decodedRefreshToken = verifyRefreshToken(newTokens.refreshToken);
			expect(decodedRefreshToken.userId).toBe(userId);
		});

		it("should return null for an invalid refresh token", () => {
			const invalidRefreshToken = "invalid.refresh.token";
			const newTokens = refreshTokens(invalidRefreshToken);
			expect(newTokens).toBeNull();
		});
	});
});
