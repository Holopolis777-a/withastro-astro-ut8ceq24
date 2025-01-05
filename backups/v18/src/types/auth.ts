export type UserRole = 'admin' | 'broker' | 'user' | 'employer' | 'employee' | 'salary-employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  employerId?: string; // For employees to reference their employer
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  profileImage: string | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
}