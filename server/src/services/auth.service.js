import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

class AuthService {
  // Generate JWT Token helper
  generateToken(userId, role) {
    return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  // Register a new user
  async registerUser({ name, email, password, role }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'البريد الإلكتروني مسجل بالفعل');
    }

    const user = await User.create({ name, email, password, role: role || 'member' });
    const token = this.generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  // Login user
  async loginUser({ email, password }) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const token = this.generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  // Get logged-in user profile
  async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'المستخدم غير موجود');
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  // Update User Profile
  async updateProfile(userId, { name, email }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'المستخدم غير موجود');
    }

    if (name) user.name = name;
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) throw new ApiError(400, 'البريد الإلكتروني مستخدم بالفعل');
      user.email = email;
    }

    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  // Update Password
  async updatePassword(userId, { currentPassword, newPassword }) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new ApiError(404, 'المستخدم غير موجود');
    }

    const isValid = await user.comparePassword(currentPassword);
    if (!isValid) {
      throw new ApiError(400, 'كلمة المرور الحالية غير صحيحة');
    }

    user.password = newPassword;
    await user.save();

    return true;
  }

  // Get All Team Members / Users
  async getAllUsers() {
    let users = await User.find().select('-password');

    // Seed initial team members ONLY if database has 0 users
    if (users.length === 0) {
      const seedUsers = [
        { name: 'سارة محمود', email: 'sarah.mahmoud@electro-pi.com', role: 'admin' },
        { name: 'أحمد ماهر', email: 'ahmed.maher@electro-pi.com', role: 'member' },
        { name: 'محمد علي', email: 'mohamed.ali@electro-pi.com', role: 'member' },
        { name: 'مريم حسن', email: 'maryam.hassan@electro-pi.com', role: 'member' },
      ];
      for (const u of seedUsers) {
        const exists = await User.findOne({ email: u.email });
        if (!exists) {
          await User.create({ ...u, password: 'Password123!' });
        }
      }
      users = await User.find().select('-password');
    }

    return users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.role === 'admin' ? 'البنية التحتية' : 'تطوير البرمجيات',
      status: 'active',
    }));
  }

  // Delete User Permanent
  async deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'المستخدم غير موجود');
    }
    await User.findByIdAndDelete(userId);
    return true;
  }
}

export const authService = new AuthService();
