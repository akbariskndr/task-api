import { Schema, model, Document } from "mongoose";
import { AutoIncrement } from "root/database/connect";

export interface ItemProps extends Document {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt: Date;
  dueAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  task: number;
  user: number;
}

const ItemSchema: Schema = new Schema({
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
  task: {
    type: Number,
    ref: "Task",
    required: true
  },
  user: {
    type: Number,
    ref: "User",
    required: true
  }
}, {
  _id: false,
  timestamps: true
});

ItemSchema.plugin(AutoIncrement, { id: "itemId" });

const Item = model<ItemProps>("Item", ItemSchema);

export default Item;
