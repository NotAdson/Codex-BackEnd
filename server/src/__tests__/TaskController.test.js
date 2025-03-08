import { createTask, getTasksByUser, updateTask, deleteTask } from "../controllers/TaskController.js";
import { TaskService } from "../services/TaskService.js";
import { ERROR } from "../shared/messages.js";

jest.mock("../services/TaskService.js");

describe("TaskController", () => {
	let req, res;

	beforeEach(() => {
		req = {};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		jest.clearAllMocks();
	});

	describe("createTask", () => {
		it("should create a task", async () => {
			const mockTask = { _id: "65a1b2c3d4e5f6a7b8c9d0e1" };
			TaskService.prototype.createTask.mockResolvedValue({
				statusValue: 201,
				message: "Task created successfully",
				taskId: mockTask._id,
			});

			req.body = { title: "Complete project", description: "Finish the REST API", userId: "65a1b2c3d4e5f6a7b8c9d0e1" };

			await createTask(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				message: "Task created successfully",
				taskId: mockTask._id,
			});
		});

		it("should handle errors when creating a task", async () => {
			TaskService.prototype.createTask.mockRejectedValue(new Error("Database error"));

			req.body = { title: "Complete project", description: "Finish the REST API", userId: "65a1b2c3d4e5f6a7b8c9d0e1" };

			await createTask(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				message: `${ERROR.INTERNAL} while trying to create the task.`,
			});
		});
	});

});
