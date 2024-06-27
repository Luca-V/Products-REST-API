import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// Router Imports
import productRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Init Express
const app = express();

// Settings
app.set("port", 3000);
app.set("json spaces", 4);

// Middlewares
app.use(cors({}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;