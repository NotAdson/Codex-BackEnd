import { UserService } from "../services/UserService.js";
import { generateAccessToken } from "../authentication/Authenticator.js";
import { ERROR } from "../shared/messages.js";

const userService = new UserService();

export async function createUser(req, res) {
	try {
		const { name, email, password } = req.body;
		const { statusValue, message, userId } = await userService.createUser(name, email, password);

		if (statusValue === 201) {
			const userToken = generateAccessToken(userId);
			return res.status(statusValue).json({
				message: message,
				token: userToken,
			});
		}

		return res.status(statusValue).json({
			message: message,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to create the user.`,
		});
	}
}

export async function getUserById(req, res) {
	try {
		const { id } = req.params;
		const { statusValue, message, content } = await userService.getUserById(id);

		return res.status(statusValue).json({
			message: message,
			user: content,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to get the user.`,
		});
	}
}

export async function updateUser(req, res) {
	try {
		const { id } = req.params;
		const updateData = req.body;
		const { statusValue, message, content } = await userService.updateUser(id, updateData);

		return res.status(statusValue).json({
			message: message,
			user: content,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to update the user.`,
		});
	}
}

export async function deleteUser(req, res) {
	try {
		const { id } = req.params;
		const { statusValue, message } = await userService.deleteUser(id);

		return res.status(statusValue).json({
			message: message,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to delete the user.`,
		});
	}
}
