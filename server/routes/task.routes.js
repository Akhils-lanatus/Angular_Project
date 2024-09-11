import { Router } from "express";
import { postTaskController } from "../controllers/task.controller.js";
const router = Router();

//POST
router.post("/post-task", postTaskController);

export default router;
