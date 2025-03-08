import request from "supertest";
import { app } from "../../index.js";
import { Task } from "../models/Task.js";
import { ERROR } from "../shared/messages.js";

jest.mock("../models/Task.js");

describe("Task Routes", () => {
	describe("POST /api/task/create", () => {
		it("should create a new task", async () => {
			const mockTask = {
				_id: "65a1b2c3d4e5f6a7b8c9d0e1",
				title: "Complete project",
				user: "65a1b2c3d4e5f6a7b8c9d0e1",
			};
			Task.create.mockResolvedValue(mockTask);

			const response = await request(app)
				.post("/api/task/create")
				.send({
					title: "Complete project",
					userId: "65a1b2c3d4e5f6a7b8c9d0e1",
				});

			expect(response.status).toBe(201);
			expect(response.body.message).toBe("Task operation successful");
			expect(response.body.taskId).toBeDefined();
		});

		it("should return 400 if validation fails", async () => {
			const response = await request(app)
				.post("/api/task/create")
				.send({});

			expect(response.status).toBe(400);
			expect(response.body.errors).toBeDefined();
		});
	});

	describe("GET /api/tasks/:userId", () => {
		it("should return tasks for a user", async () => {
			const mockTasks = [
				{
					_id: "65a1b2c3d4e5f6a7b8c9d0e1",
					title: "Complete project",
					user: "65a1b2c3d4e5f6a7b8c9d0e1",
				},
			];
			Task.find.mockResolvedValue(mockTasks);

			const response = await request(app).get(
				"/api/tasks/65a1b2c3d4e5f6a7b8c9d0e1"
			);

			expect(response.status).toBe(200);
			expect(response.body.tasks).toEqual(mockTasks);
		});

		it("should return 400 if userId is missing", async () => {
			const response = await request(app).get("/api/tasks/");

			expect(response.status).toBe(404);
		});
	});
});
