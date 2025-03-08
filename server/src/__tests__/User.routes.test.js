import request from "supertest";
import { app } from "../../index.js";
import { User } from "../models/User.js";
import { ERROR } from "../shared/messages.js";

jest.mock("../models/User.js");

describe("User Routes", () => {
	describe("POST /api/register-user", () => {
		it("should create a new user", async () => {
			const mockUser = {
				_id: "65a1b2c3d4e5f6a7b8c9d0e1",
				name: "John Doe",
				email: "john@example.com",
			};
			User.create.mockResolvedValue(mockUser);

			const response = await request(app)
				.post("/api/register-user")
				.send({
					name: "John Doe",
					email: "john@example.com",
					password: "password123",
				});

			expect(response.status).toBe(201);
			expect(response.body.message).toBe("Created User operation successful");
			expect(response.body.token).toBeDefined();
		});

		it("should return 400 if validation fails", async () => {
			const response = await request(app)
				.post("/api/register-user")
				.send({});

			expect(response.status).toBe(400);
			expect(response.body.errors).toBeDefined();
		});
	});

	describe("GET /api/user/:id", () => {
		it("should return a user by ID", async () => {
			const mockUser = {
				_id: "65a1b2c3d4e5f6a7b8c9d0e1",
				name: "John Doe",
				email: "john@example.com",
			};
			User.findById.mockResolvedValue(mockUser);

			const response = await request(app).get(
				"/api/user/65a1b2c3d4e5f6a7b8c9d0e1"
			);

			expect(response.status).toBe(200);
			expect(response.body.user).toEqual(mockUser);
		});

		it("should return 404 if user is not found", async () => {
			User.findById.mockResolvedValue(null);

			const response = await request(app).get(
				"/api/user/65a1b2c3d4e5f6a7b8c9d0e1"
			);

			expect(response.status).toBe(404);
			expect(response.body.message).toBe(ERROR.USER_NOT_FOUND);
		});
	});
});
