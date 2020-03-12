import mongoose, { Mongoose } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

export default async (mongoose: Mongoose, connectionUri: string) => {
  try {
    await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
  }
};

export const AutoIncrement = AutoIncrementFactory(mongoose);
