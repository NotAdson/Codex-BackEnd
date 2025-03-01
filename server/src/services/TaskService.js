import { Task } from "../models/Task.js";
import { SUCCESS, ERRORS } from "../shared/messages.js";

export class TaskService {
	async createTask(title, description, userId, dueDate) {
		try {
			const newTask = await Task.create({
				title,
				description,
				user: userId,
				dueDate,
			});
			return {
				statusValue: 201,
				taskId: newTask._id,
				message: `Created ${SUCCESS.TASK}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}

	async getTasksByUser(userId) {
		try {
			const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
			return {
				statusValue: 200,
				content: tasks,
				message: `Found ${SUCCESS.TASK}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}

	async updateTask(taskId, updateData) {
		try {
			const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
				new: true,
			});
			if (!updatedTask) {
				return {
					statusValue: 404,
					message: ERRORS.TASK_NOT_FOUND,
				};
			}
			return {
				statusValue: 200,
				content: updatedTask,
				message: `Updated ${SUCCESS.TASK}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}

	async deleteTask(taskId) {
		try {
			const deletedTask = await Task.findByIdAndDelete(taskId);
			if (!deletedTask) {
				return {
					statusValue: 404,
					message: ERRORS.TASK_NOT_FOUND,
				};
			}
			return {
				statusValue: 200,
				message: `Deleted ${SUCCESS.TASK}`,
			};
		} catch (error) {
			return {
				statusValue: 400,
				message: error.message,
			};
		}
	}
}
