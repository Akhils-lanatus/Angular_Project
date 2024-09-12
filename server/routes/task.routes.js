import { Router } from "express";
import {
  deleteTaskController,
  getTaskController,
  postTaskController,
  updateTaskController,
} from "../controllers/task.controller.js";
const router = Router();

//POST
router.post("/post-task", postTaskController);
//GET
router.get("/get-task", getTaskController);
//DELETE
router.delete("/delete-post/:id", deleteTaskController);
//PUT
router.patch("/update-task/:id", updateTaskController);
export default router;
