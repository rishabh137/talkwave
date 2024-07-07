import express from "express"
import { getHappyContent, getJokes } from "../controllers/mood.controller.js"

const router = express.Router()

router.get("/happy", getJokes)
router.get("/sad", getHappyContent)

export default router