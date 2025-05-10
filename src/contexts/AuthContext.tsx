
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

// Define the user roles
export type UserRole = 'admin' | 'customer';

// Define the user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Define the auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for users (in a real app, this would come from a backend)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'customer@example.com',
    name: 'Customer User',
    role: 'customer'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for logged-in user on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate credentials against an API
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') { // Simple mock password check
        setUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast(`Welcome back, ${user.name}!`, {
          description: "You've successfully logged in."
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast("Login failed", {
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email is already in use
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // In a real app, this would create a user in your backend
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email,
        name,
        role
      };
      
      // Simulate adding user to database
      mockUsers.push(newUser);
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      toast("Registration successful!", {
        description: "Your account has been created."
      });
    } catch (error) {
      toast("Registration failed", {
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast("Logged out", {
      description: "You have been logged out successfully"
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
