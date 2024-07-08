import express from "express"
import { getHappyContent, getJokes, getAngryContent, getLoveContent } from "../controllers/mood.controller.js"

const router = express.Router()

router.get("/happy", getJokes)
router.get("/sad", getHappyContent)
router.get("/angry", getAngryContent)
router.get("/love", getLoveContent)

export default router