import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { projectService } from '../services/project.service.js';

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getAllProjects(req.user?.id);
  res.status(200).json(new ApiResponse(200, projects, 'Projects retrieved successfully'));
});

export const createProject = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'stub-owner-id';
  const project = await projectService.createProject(userId, req.body);
  res.status(201).json(new ApiResponse(201, project, 'Project created successfully'));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const project = await projectService.getProjectById(id);
  res.status(200).json(new ApiResponse(200, project, 'Project fetched successfully'));
});

export const updateProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const project = await projectService.getProjectById(id);
  
  // Only the creator (or admin) can edit
  if (project && project.ownerId && req.user?.id && project.ownerId.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'فقط منشئ المشروع يملك صلاحية تعديل هذا المشروع');
  }

  const updated = await projectService.updateProject(id, req.body);
  res.status(200).json(new ApiResponse(200, updated, 'Project updated successfully'));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const project = await projectService.getProjectById(id);

  // Only the creator (or admin) can delete
  if (project && project.ownerId && req.user?.id && project.ownerId.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'فقط منشئ المشروع يملك صلاحية حذف هذا المشروع');
  }

  await projectService.deleteProject(id);
  res.status(200).json(new ApiResponse(200, null, 'Project deleted successfully'));
});
