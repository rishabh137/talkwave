import express from "express"
import { getHappyContent, getJokes, getAngryContent } from "../controllers/mood.controller.js"

const router = express.Router()

router.get("/happy", getJokes)
router.get("/sad", getHappyContent)
router.get("/angry", getAngryContent)

export default router