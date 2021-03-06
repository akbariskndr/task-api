import crypto from "crypto";
import hash from "root/util/hash";
import { Schema, model, Document } from "mongoose";
import { AutoIncrement } from "root/database/connect";

export interface UserProps extends Document {
  _id: number;
  name: string;
  email: string;
  role: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpired: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: [ true, "Please add a name" ],
  },
  email: {
    type: String,
    required: [ true, "Please add an email" ],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email"
    ]
  },
  role: {
    type: String,
    enum: [
      "user", "admin"
    ],
    default: "user"
  },
  password: {
    type: String,
    required: [ true, "Please add a password" ],
    minLength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
  createdAt: Date,
  updatedAt: Date
}, {
  _id: false,
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

UserSchema.plugin(AutoIncrement, { id: "userId" });

UserSchema.pre("save", async function (this: UserProps, next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await hash.create(this.password);

  next();
});

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpired = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

UserSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

UserSchema.virtual("tags", {
  ref: "Tag",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const User = model<UserProps>("User", UserSchema);

export default User;
