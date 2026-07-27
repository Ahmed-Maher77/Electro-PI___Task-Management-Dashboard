export class AuthService {
  async registerUser(userData) {
    return { user: { id: 'stub-id', name: userData.name, email: userData.email, role: 'user' }, token: 'stub-token' };
  }

  async loginUser(credentials) {
    return { user: { id: 'stub-id', name: 'Sample User', email: credentials.email, role: 'user' }, token: 'stub-token' };
  }

  async getCurrentUser(userId) {
    return { id: userId, name: 'Sample User', email: 'user@example.com', role: 'user' };
  }
}

export const authService = new AuthService();
