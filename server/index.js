import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDatabase from "./config/db.config.js";
import welcomeRoutes from "./routes/welcome.routes.js";
import userRoutes from "./routes/public/users.routes.js";
import basicRoutes from "./routes/basic.routes.js";

dotenv.config();
connectDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");
const uploadsPath = path.join(__dirname, "uploads");

const app = express();
const PORT = process.env.PORT || 4000;
const hello = () => console.log(`app listing on port ${PORT}`);
const routeError = (req, res) => res.status(400).send("Sorry, this is an invalid URL.");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", welcomeRoutes);
app.use("/", basicRoutes);
app.use("/public", userRoutes);
app.use("/static", express.static(publicPath));
app.use("/uploads", express.static(uploadsPath));

app.get("*", routeError);

app.listen(PORT, hello);