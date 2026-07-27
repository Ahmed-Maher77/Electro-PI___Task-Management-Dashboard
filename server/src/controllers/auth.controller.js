import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { authService } from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.cookie('token', result.token, { httpOnly: true });
  res.status(200).json(new ApiResponse(200, result, 'Login successful'));
});

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user?.id || 'stub-id';
  const user = await authService.getCurrentUser(userId);
  res.status(200).json(new ApiResponse(200, { user }, 'User details fetched successfully'));
});
