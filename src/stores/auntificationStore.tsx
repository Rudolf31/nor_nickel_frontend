import { create } from 'zustand';
import { AuthState } from '../types/auntification';


export const useAuthStore = create<AuthState>((set) => ({
    username: '',
    password: '',
    isAuthenticated: false,
    setCredentials: (username, password) => set({ username, password }),
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false, username: '', password: '' }),
}));
