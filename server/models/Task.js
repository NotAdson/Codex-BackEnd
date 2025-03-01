import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
		title: {
			type: String,
			required: true,
		},

		description: {
			type: String,
		},

		completed: {
			type: Boolean,
			default: false,
		},

		dueDate: {
			type: Date,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export const Tas: = mongoose.model("Task", taskSchema);
