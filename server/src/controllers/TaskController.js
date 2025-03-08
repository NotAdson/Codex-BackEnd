import { TaskService } from "../services/TaskService.js";
import { ERROR } from "../shared/messages.js";

const taskService = new TaskService();

export async function createTask(req, res) {
	try {
		const userId = req.userId;
		const { title, description, dueDate } = req.body;
		const { statusValue, message, taskId } = await taskService.createTask(title, description, userId, dueDate);

		return res.status(statusValue).json({
			message: message,
			taskId: taskId,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to create the task.`,
		});
	}
}

export async function getTasksByUser(req, res) {
	try {
		const userId = req.userId;
		const { statusValue, message, content } = await taskService.getTasksByUser(userId);

		return res.status(statusValue).json({
			message: message,
			tasks: content,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to get tasks.`,
		});
	}
}

export async function updateTask(req, res) {
	try {
		const id = req.userId;
		const updateData = req.body;
		const { statusValue, message, content } = await taskService.updateTask(id, updateData);

		return res.status(statusValue).json({
			message: message,
			task: content,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to update the task.`,
		});
	}
}

export async function deleteTask(req, res) {
	try {
		const id = req.userId;
		const { statusValue, message } = await taskService.deleteTask(id);

		return res.status(statusValue).json({
			message: message,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: `${ERROR.INTERNAL} while trying to delete the task.`,
		});
	}
}
