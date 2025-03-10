import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const ACCESS_TOKEN_EXPIRATION = "1h";
const REFRESH_TOKEN_EXPIRATION = "7d";

export function generateAccessToken(userId) {
	try {
		return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRATION,
		});
	} catch (error) {
		console.error("Error generating access token:", error.message);
		return null;
	}
}

export function verifyAccessToken(token) {
	try {
		return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (error) {
		console.error("Error verifying access token:", error.message);
		return null;
	}
}

export function verifyJWT(req, res, next) {
	try {
		const token = req.headers["authorization"];

		if (!token) {
			return res.status(401).json({
				message: "Access token is required.",
			});
		}

		const decoded = verifyAccessToken(token);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Unauthorized: Invalid or expired access token.",
			error: error.message,
		});
	}
}
