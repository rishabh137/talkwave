import express from "express"
import authRoutes from "./routes/auth.routes.js"


const app = express()
const PORT = 8000


app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`The application start at port ${PORT}`);
})