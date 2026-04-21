import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/NoteAppsDB";

    await mongoose.connect(dbUrl);

    console.log("Mongo DB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
