export interface AuthState {
    username: string;
    password: string;
    isAuthenticated: boolean;
    setCredentials: (username: string, password: string) => void;
    login: () => void;
    logout: () => void;
}