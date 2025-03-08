import { ERROR } from "../shared/messages.js";

export class TaskValidator {
	async createTaskValidation(req, res, next) {
		try {
			const { title, userId } = req.body || {};
			const fields = ["title", "userId"];
			const errors = [];

			for (const field of fields) {
				if (!req.body[field]) {
					errors.push(`${ERROR.TASK_NEEDS} a/an ${field}`);
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

	async getTasksValidation(req, res, next) {
		try {
			const { userId } = req.params;
			const errors = [];

			if (!userId) {
				errors.push(`${ERROR.TASK_NEEDS} a userId`);
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

	async updateTaskValidation(req, res, next) {
		try {
			const { id } = req.params;
			const updateData = req.body;
			const errors = [];

			if (!id) {
				errors.push(`${ERROR.TASK_NEEDS} an id`);
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

	async deleteTaskValidation(req, res, next) {
		try {
			const { id } = req.params;
			const errors = [];

			if (!id) {
				errors.push(`${ERROR.TASK_NEEDS} an id`);
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
