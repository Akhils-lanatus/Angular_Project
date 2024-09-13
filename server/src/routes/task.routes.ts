import { Router } from 'express';
import {
  deleteTaskController,
  getSelectedTaskController,
  getTaskController,
  postTaskController,
  updateTaskController,
} from '../controllers/task.controller.js';
const router = Router();

//POST
router.post('/post-task', postTaskController);
//GET
router.get('/get-task', getTaskController);
router.get('/get-selected-task/:id', getSelectedTaskController);
//DELETE
router.delete('/delete-post/:id', deleteTaskController);
//PUT
router.patch('/update-task/:id', updateTaskController);
export default router;
