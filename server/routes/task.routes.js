import { Router } from "express";
import {
  deleteTaskController,
  getTaskController,
  postTaskController,
} from "../controllers/task.controller.js";
const router = Router();

//POST
router.post("/post-task", postTaskController);
//GET
router.get("/get-task", getTaskController);
//DELETE
router.delete("/delete-post/:id", deleteTaskController);
export default router;
