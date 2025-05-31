import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/user.routes";
import restauntRoutes from "./routes/resturant.routes";
import menuRoutes from "./routes/menu.route";
import orderRoute from "./routes/order.route";

dotenv.config();
connectDB();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DIRNAME = path.resolve();

// Middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restauntRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoute);

// Serve frontend
app.use(express.static(path.join(DIRNAME, "/Client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "Client", "dist", "index.html"));
});

// Listen on port (bind to 0.0.0.0 for Render)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});
