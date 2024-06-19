import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import connectDB from "./db/conn.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/auth", authRoutes)

connectDB()
app.listen(PORT, () => {
    console.log(`The application start at port ${PORT}`);
})