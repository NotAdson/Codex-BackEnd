import { ERROR } from "../shared/messages.js";

export class UserValidator {
	async createUserValidation(req, res, next) {
		try {
			const { name, email, password } = req.body || {};
			const fields = ["name", "email", "password"];
			const errors = [];

			for (const field of fields) {
				if (!req.body[field]) {
					errors.push(`${ERROR.USER_NEEDS} a/an ${field}`);
				}
			}

			if (errors.length) {
				return res.status(400).json({ errors });
			}

			next();
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({
				message: `${ERROR.INTERNAL} while validating request.`,
			});
		}
	}

	async getUserValidation(req, res, next) {
		try {
			const { id } = req.params;
			const errors = [];

			if (!id) {
				errors.push(`${ERROR.USER_NEEDS} an id`);
			}

			if (errors.length) {
				return res.status(400).json({ errors });
			}

			next();
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({
				message: `${ERROR.INTERNAL} while validating request.`,
			});
		}
	}

	async updateUserValidation(req, res, next) {
		try {
			const { id } = req.params;
			const updateData = req.body;
			const errors = [];

			if (!id) {
				errors.push(`${ERROR.USER_NEEDS} an id`);
			}

			if (!updateData || Object.keys(updateData).length === 0) {
				errors.push("Update data cannot be empty.");
			}

			if (errors.length) {
				return res.status(400).json({ errors });
			}

			next();
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({
				message: `${ERROR.INTERNAL} while validating request.`,
			});
		}
	}

	async deleteUserValidation(req, res, next) {
		try {
			const { id } = req.params;
			const errors = [];

			if (!id) {
				errors.push(`${ERROR.USER_NEEDS} an id`);
			}

			if (errors.length) {
				return res.status(400).json({ errors });
			}

			next();
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({
				message: `${ERROR.INTERNAL} while validating request.`,
			});
		}
	}
}
