import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import notesRouter from "./routes/notesRouter.js";
import { connectDB } from "./repository/db.js";
import AppError from "./utilities/appError.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env" });
}

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

app.use("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;

  res.status(status).json({ message });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("LISTEN PORT 5001"));
  })
  .catch((err) => {
    console.error("DB FAILED:", err);
  });
