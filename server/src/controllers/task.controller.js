import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { taskService } from '../services/task.service.js';

export const getTasks = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const tasks = await taskService.getTasksByProject(projectId);
  res.status(200).json(new ApiResponse(200, tasks, 'Tasks retrieved successfully'));
});

export const createTask = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const task = await taskService.createTask(projectId, req.body);
  res.status(201).json(new ApiResponse(201, task, 'Task created successfully'));
});

export const updateTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const task = await taskService.updateTask(id, req.body);
  res.status(200).json(new ApiResponse(200, task, 'Task updated successfully'));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await taskService.deleteTask(id);
  res.status(200).json(new ApiResponse(200, null, 'Task deleted successfully'));
});
