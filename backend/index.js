import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import InputRoute from "./routes/InputRoute.js";
import KeluarRoute from "./routes/KeluarRoute.js";
import UserRoute from "./routes/UserRoute.js";
import SupllierRoute from "./routes/SupllierRoute.js";
import { errorHandler } from "./middleWare/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ProductRoute, InputRoute, KeluarRoute, UserRoute, SupllierRoute);

// erorHandler middleware
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log("server is running...");
});
