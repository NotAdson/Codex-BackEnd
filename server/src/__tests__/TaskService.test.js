import { TaskService } from "../services/TaskService.js";
import { Task } from "../models/Task.js";
import { SUCCESS, ERROR } from "../shared/messages.js";

jest.mock("../models/Task.js");

describe("TaskService", () => {
	let taskService;

	beforeEach(() => {
		taskService = new TaskService();
		jest.clearAllMocks();
	});

	describe("createTask", () => {
		it("should create a task", async () => {
			const mockTask = {
				_id: "65a1b2c3d4e5f6a7b8c9d0e1",
				title: "Complete project",
				description: "Finish the REST API",
				user: "65a1b2c3d4e5f6a7b8c9d0e1",
			};
			Task.create.mockResolvedValue(mockTask);

			const result = await taskService.createTask("Complete project", "Finish the REST API", "65a1b2c3d4e5f6a7b8c9d0e1");

			expect(Task.create).toHaveBeenCalledWith({
				title: "Complete project",
				description: "Finish the REST API",
				user: "65a1b2c3d4e5f6a7b8c9d0e1",
			});
			expect(result).toEqual({
				statusValue: 201,
				taskId: mockTask._id,
				message: `Created ${SUCCESS.TASK}`,
			});
		});

		it("should handle errors when creating a task", async () => {
			const errorMessage = "Database error";
			Task.create.mockRejectedValue(new Error(errorMessage));

			const result = await taskService.createTask("Complete project", "Finish the REST API", "65a1b2c3d4e5f6a7b8c9d0e1");

			expect(result).toEqual({
				statusValue: 400,
				message: errorMessage,
			});
		});
	});

	describe("getTasksByUser", () => {
		it("should return tasks for a user", async () => {
			const mockTasks = [
				{
					_id: "65a1b2c3d4e5f6a7b8c9d0e1",
					title: "Complete project",
					description: "Finish the REST API",
					user: "65a1b2c3d4e5f6a7b8c9d0e1",
				},
			];
			Task.find.mockResolvedValue(mockTasks);

			const result = await taskService.getTasksByUser("65a1b2c3d4e5f6a7b8c9d0e1");

			expect(Task.find).toHaveBeenCalledWith({ user: "65a1b2c3d4e5f6a7b8c9d0e1" });
			expect(result).toEqual({
				statusValue: 200,
				content: mockTasks,
				message: `Found ${SUCCESS.TASK}`,
			});
		});

		it("should handle errors when fetching tasks", async () => {
			const errorMessage = "Database error";
			Task.find.mockRejectedValue(new Error(errorMessage));

			const result = await taskService.getTasksByUser("65a1b2c3d4e5f6a7b8c9d0e1");

			expect(result).toEqual({
				statusValue: 400,
				message: errorMessage,
			});
		});
	});

});
