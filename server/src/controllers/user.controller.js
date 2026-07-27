import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getUsers = asyncHandler(async (_req, res) => {
  res.status(200).json(new ApiResponse(200, [], 'Users retrieved successfully'));
});

export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = { id, name: 'Sample User', email: 'user@example.com', role: 'user' };
  res.status(200).json(new ApiResponse(200, user, 'User details retrieved successfully'));
});
