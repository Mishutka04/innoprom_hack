import { create } from 'zustand';
import { User } from '@/types/employee';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// Dummy user for development
const dummyUser: User = {
    id: '1',
    email: 'john.doe@company.com',
    role: 'manager',
    employeeId: '1'
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: async (email: string, password: string) => {
        // In real app, this would make an API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        set({ user: dummyUser, isAuthenticated: true });
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    }
}));