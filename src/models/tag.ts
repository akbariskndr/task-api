import { Schema, model, Document } from "mongoose";
import { AutoIncrement } from "root/database/connect";

export interface TagProps extends Document {
  _id: number;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  task: number;
  user: number;
}

const TagSchema: Schema = new Schema({
  _id: Number,
  name: {
    type: String,
    maxlength: [ 12, "Tag name could only be 12 characters long" ],
    required: [ true, "Please add a tag name" ],
  },
  color: {
    type: String,
    default: "0xffffff"
  },
  createdAt: Date,
  updatedAt: Date,
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

TagSchema.plugin(AutoIncrement);

const Tag = model<TagProps>("Tag", TagSchema);

export default Tag;
