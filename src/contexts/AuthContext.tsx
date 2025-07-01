import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";
import { loginApi } from "../services/api.service";

type UserRole = 'Student' | 'Staff' | 'Technician' | 'Admin' | 'Tech';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    matNo?: string,
    level?: string,
    gender?: string,
    department?: string,
    faculty?: string,
    staffId?: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@edouniversity.edu.ng', role: 'Admin' },
  { id: '2', name: 'Tech Support', email: 'tech@edouniversity.edu.ng', role: 'Technician' },
  { id: '3', name: 'Itseh Hillary', email: 'Itseh21.hillary@edouniversity.edu.ng', role: 'Student' },
  { id: '4', name: 'Staff User', email: 'staff@edouniversity.edu.ng', role: 'Staff' },
];

const API_BASE = "/api/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      let user = JSON.parse(storedUser);
      if (user.role === 'Tech') user.role = 'Technician';
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      if (!data.success) {
        toast.error(data.error || 'Login failed');
        setLoading(false);
        throw new Error(data.error || 'Login failed');
      }
      // Map backend 'Tech' role to frontend 'Technician'
      let user = data.user;
      if (user.role === 'Tech') user.role = 'Technician';
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
      setLoading(false);
      throw err;
    }
    setLoading(false);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    matNo?: string,
    level?: string,
    gender?: string,
    department?: string,
    faculty?: string,
    staffId?: string
  ) => {
    setLoading(true);
    // Only allow student/staff registration via API
    if (role === 'Admin' || role === 'Technician') {
      toast.error('Registration for this role is not allowed');
      setLoading(false);
      throw new Error('Registration for this role is not allowed');
    }
    try {
      const body: any = { name, email, password, role: role.toLowerCase() };
      if (matNo) body.matNo = matNo;
      if (level) body.level = level;
      if (gender) body.gender = gender;
      if (department) body.department = department;
      if (faculty) body.faculty = faculty;
      if (staffId) body.staffId = staffId;
      const res = await fetch(`${API_BASE}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.error || 'Registration failed');
        setLoading(false);
        throw new Error(data.error || 'Registration failed');
      }
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Registration successful');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
    setLoading(false);
  };

  const logout = async () => {
    // If student/staff, call PHP logout
    if (user && (user.role === 'Student' || user.role === 'Staff')) {
      await fetch(`${API_BASE}/logout.php`, { method: 'POST' });
    }
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
