import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// cross origin resource sharing  - it will check the frontend with port
app.use(
  cors({
    origin: "https://blog-app-frontend-amber.vercel.app",
    credentials: true,
  })
);
const __dirname = path.resolve();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use(cookieParser());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index  .html"));
});

//routes import
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/listing", listingRouter);

// http://localhost:8000/api/v1/users/register

export { app };
