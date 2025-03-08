import { createUser, getUserById, updateUser, deleteUser } from "../controllers/UserController.js";
import { UserService } from "../services/UserService.js";
import { ERROR } from "../shared/messages.js";

jest.mock("../services/UserService.js");

describe("UserController", () => {
	let req, res;

	beforeEach(() => {
		req = {};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		jest.clearAllMocks();
	});

	describe("createUser", () => {
		it("should create a user and return a token", async () => {
			const mockUser = { _id: "65a1b2c3d4e5f6a7b8c9d0e1" };
			UserService.prototype.createUser.mockResolvedValue({
				statusValue: 201,
				message: "User created successfully",
				userId: mockUser._id,
			});

			req.body = { name: "John Doe", email: "john@example.com", password: "password123" };

			await createUser(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				message: "User created successfully",
				token: expect.any(String),
			});
		});

		it("should handle errors when creating a user", async () => {
			UserService.prototype.createUser.mockRejectedValue(new Error("Database error"));

			req.body = { name: "John Doe", email: "john@example.com", password: "password123" };

			await createUser(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				message: `${ERROR.INTERNAL} while trying to create the user.`,
			});
		});
	});

});
