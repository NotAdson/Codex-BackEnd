import { UserService } from "../services/UserService.js";
import { User } from "../models/User.js";
import { SUCCESS, ERRORS } from "../shared/messages.js";

jest.mock("../models/User.js");

describe("UserService", () => {
	let userService;

	beforeEach(() => {
		userService = new UserService();
		jest.clearAllMocks();
	});

	describe("createUser", () => {
		it("should create a new user", async () => {
			const mockUser = {
				_id: "65a1b2c3d4e5f6a7b8c9d0e1",
				name: "John Doe",
				email: "john@example.com",
				password: "hashedPassword123",
			};
			User.create.mockResolvedValue(mockUser);

			const result = await userService.createUser("John Doe", "john@example.com", "hashedPassword123");

			expect(User.create).toHaveBeenCalledWith({
				name: "John Doe",
				email: "john@example.com",
				password: "hashedPassword123",
			});
			expect(result).toEqual({
				statusValue: 201,
				userId: mockUser._id,
				message: `Created ${SUCCESS.USER}`,
			});
		});

		it("should handle errors when creating a user", async () => {
			const errorMessage = "Database error";
			User.create.mockRejectedValue(new Error(errorMessage));

			const result = await userService.createUser("John Doe", "john@example.com", "hashedPassword123");

			expect(result).toEqual({
				statusValue: 400,
				message: errorMessage,
			});
		});
	});

	describe("getUserById", () => {
		it("should return a user by ID", async () => {
			const mockUser = {
				_id: "65a1b2c3d4e5f6a7b8c9d0e1",
				name: "John Doe",
				email: "john@example.com",
			};
			User.findById.mockResolvedValue(mockUser);

			const result = await userService.getUserById("65a1b2c3d4e5f6a7b8c9d0e1");

			expect(User.findById).toHaveBeenCalledWith("65a1b2c3d4e5f6a7b8c9d0e1");
			expect(result).toEqual({
				statusValue: 200,
				content: mockUser,
				message: `Found ${SUCCESS.USER}`,
			});
		});

		it("should return an error if user is not found", async () => {
			User.findById.mockResolvedValue(null);

			const result = await userService.getUserById("65a1b2c3d4e5f6a7b8c9d0e1");

			expect(result).toEqual({
				statusValue: 404,
				message: ERRORS.USER_NOT_FOUND,
			});
		});
	});

});
