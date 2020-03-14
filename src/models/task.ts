import { Schema, model, Document } from "mongoose";
import { AutoIncrement } from "root/database/connect";

export interface TaskProps extends Document {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt: Date;
  dueAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user: number;
}

const TaskSchema: Schema = new Schema({
  _id: Number,
  title: {
    type: String,
    maxlength: [ 20, "Title could only be 20 characters long" ],
    required: [ true, "Please add a title" ],
  },
  description: {
    type: String,
    required: [ true, "Please add a description" ],
    maxlength: [ 100, "Description could only be 100 characters long" ],
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
  user: {
    type: Number,
    ref: "User",
    required: true
  }
}, {
  _id: false,
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

TaskSchema.plugin(AutoIncrement, { id: "taskId" });

TaskSchema.pre("remove", async function (this: TaskProps, next) {
  await this.model("Item").deleteMany({ task: this._id });
  next();
});

TaskSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "task",
  justOne: false,
});

TaskSchema.virtual("tags", {
  ref: "Tag",
  localField: "_id",
  foreignField: "task",
  justOne: false,
});

const Task = model<TaskProps>("Task", TaskSchema);

export default Task;
