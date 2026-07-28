import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { authService } from '../services/auth.service.js';

// Cookie configuration options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Register Controller
export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.cookie('token', result.token, cookieOptions);
  res.status(201).json(new ApiResponse(201, result, 'تم إنشاء الحساب بنجاح'));
});

// Login Controller
export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.cookie('token', result.token, cookieOptions);
  res.status(200).json(new ApiResponse(200, result, 'تم تسجيل الدخول بنجاح'));
});

// Current User Controller
export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  res.status(200).json(new ApiResponse(200, { user }, 'تم جلب بيانات المستخدم بنجاح'));
});

// Update Profile Controller
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, user, 'تم تحديث الملف الشخصي بنجاح'));
});

// Update Password Controller
export const updatePassword = asyncHandler(async (req, res) => {
  await authService.updatePassword(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, null, 'تم تحديث كلمة المرور بنجاح'));
});

// Get All Users Controller
export const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await authService.getAllUsers();
  res.status(200).json(new ApiResponse(200, users, 'تم جلب قائمة الفريق بنجاح'));
});

// Delete User Controller
export const deleteUser = asyncHandler(async (req, res) => {
  await authService.deleteUser(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'تم إزالة العضو من الفريق بنجاح'));
});

// Logout Controller
export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('token', cookieOptions);
  res.status(200).json(new ApiResponse(200, null, 'تم تسجيل الخروج بنجاح'));
});
