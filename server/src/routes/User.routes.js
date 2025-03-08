import { Router } from "express";
import {
	createUser,
	getUserById,
	updateUser,
	deleteUser,
} from "../controllers/UserController.js";
import { UserValidator } from "../middleware/User.validator.js";
import { verifyJWT } from "../authentication/Authenticator.js";

const routerUser = Router();
const instanceUserValidator = new UserValidator();

routerUser.post(
	"/register-user",
	instanceUserValidator.createUserValidation,
	async (req, res) => {
		return await createUser(req, res);
	}
);

routerUser.get(
	"/user/:id",
	instanceUserValidator.getUserValidation,
	async (req, res) => {
		return await getUserById(req, res);
	}
);

routerUser.put(
	"/user/update/:id",
	verifyJWT,
	instanceUserValidator.updateUserValidation,
	async (req, res) => {
		return await updateUser(req, res);
	}
);

routerUser.delete(
	"/user/delete/:id",
	verifyJWT,
	instanceUserValidator.deleteUserValidation,
	async (req, res) => {
		return await deleteUser(req, res);
	}
);

export { routerUser };
