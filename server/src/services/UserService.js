import { User } from "../models/User.js";
import { SUCCESS, ERROR } from "../shared/messages.js";

export class UserService {
	async createUser(name, email, password) {
		try {
			const newUser = await User.create({ name, email, password });
			return {
				statusValue: 201,
				userId: newUser._id,
				message: `Created ${SUCCESS.USER}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}

	async getUserById(userId) {
		try {
			const user = await User.findById(userId);
			if (!user) {
				return {
					statusValue: 404,
					message: ERROR.USER_NOT_FOUND,
				};
			}
			return {
				statusValue: 200,
				content: user,
				message: `Found ${SUCCESS.USER}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}

	async updateUser(userId, updateData) {
		try {
			const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
				new: true,
			});
			if (!updatedUser) {
				return {
					statusValue: 404,
					message: ERROR.USER_NOT_FOUND,
				};
			}
			return {
				statusValue: 200,
				content: updatedUser,
				message: `Updated ${SUCCESS.USER}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}

	async deleteUser(userId) {
		try {
			const deletedUser = await User.findByIdAndDelete(userId);
			if (!deletedUser) {
				return {
					statusValue: 404,
					message: ERROR.USER_NOT_FOUND,
				};
			}
			return {
				statusValue: 200,
				message: `Deleted ${SUCCESS.USER}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}

	async validateUserCredentials(email, password) {
		try {
			const user = await User.findOne({ email });

			if (!user) {
				return {
					statusValue: 404,
					message: "User not found.",
				};
			}

			if (password !== user.password) {
				return {
					statusValue: 401,
					message: "Invalid credentials.",
				};
			}

			return {
				statusValue: 200,
				message: "Login successful.",
				userId: user._id,
			};
		} catch (error) {
			console.error(error.message);
			return {
				statusValue: 500,
				message: `${ERROR.INTERNAL} while validating user credentials.`,
			};
		}
	}
}

