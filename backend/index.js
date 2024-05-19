import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ProductRoute from "./routes/ProductRoute.js"
import InputRoute from "./routes/InputRoute.js"
import KeluarRoute from "./routes/KeluarRoute.js"

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(ProductRoute, InputRoute, KeluarRoute);

app.listen(process.env.APP_PORT, () =>{
    console.log('server is running...')
})