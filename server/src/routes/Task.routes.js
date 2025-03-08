import { Router } from "express";
import {
	createTask,
	getTasksByUser,
	updateTask,
	deleteTask,
} from "../controllers/TaskController.js";
import { TaskValidator } from "../middleware/Task.validator.js";
import { verifyJWT } from "../authentication/Authenticator.js";

const routerTask = Router();
const instanceTaskValidator = new TaskValidator();

routerTask.post(
	"/task/create",
	verifyJWT,
	instanceTaskValidator.createTaskValidation,
	async (req, res) => {
		return await createTask(req, res);
	}
);

routerTask.get(
	"/tasks",
	verifyJWT,
	instanceTaskValidator.getTasksValidation,
	async (req, res) => {
		return await getTasksByUser(req, res);
	}
);

routerTask.put(
	"/task/update/:id",
	verifyJWT,
	instanceTaskValidator.updateTaskValidation,
	async (req, res) => {
		return await updateTask(req, res);
	}
);

routerTask.delete(
	"/task/delete/:id",
	verifyJWT,
	instanceTaskValidator.deleteTaskValidation,
	async (req, res) => {
		return await deleteTask(req, res);
	}
);

export { routerTask };
