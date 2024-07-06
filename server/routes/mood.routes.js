import express from "express"
import { getJokes } from "../controllers/mood.controller.js"

const router = express.Router()

router.get("/jokes", getJokes)

export default router