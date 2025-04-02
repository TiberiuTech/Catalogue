import { useState, useEffect } from 'react';
import type { User } from '../types';

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'teacher@example.com',
    name: 'John Teacher',
    role: 'teacher'
  },
  {
    id: '2',
    email: 'student@example.com',
    name: 'Jane Student',
    role: 'student'
  }
];

const USER_STORAGE_KEY = 'grade_manager_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  async function signIn(email: string) {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const matchedUser = MOCK_USERS.find(u => u.email === email);
      if (!matchedUser) {
        throw new Error('Invalid credentials');
      }

      setUser(matchedUser);
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signOut(event?: React.MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem(USER_STORAGE_KEY);
      
      setUser(null);
      
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    signIn,
    signOut
  };
} 