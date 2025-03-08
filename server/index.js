import express from "express";
import cors from "cors";
import { routerUser } from "./src/routes/User.routes.js";
import { routerTask } from "./src/routes/Task.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routerUser);
app.use("/api", routerTask);

app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

export { app };

const server = {
	start: () => {
		return new Promise((resolve) => {
			const instance = app.listen(PORT, () => {
				console.log(`Server is running on port ${PORT}`);
				resolve(instance);
			});
		});
	},
	stop: (instance) => {
		return new Promise((resolve) => {
			instance.close(() => {
				console.log("Server stopped");
				resolve();
			});
		});
	},
};

export default server;
