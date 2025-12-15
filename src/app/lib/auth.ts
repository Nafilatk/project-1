// // services/auth.ts
// // JSON Server based Auth Service (Next.js + TypeScript)

// import axios from 'axios';

// const API_URL = 'http://localhost:3001'; // json-server url

// // ================= TYPES =================
// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   avatar?: string;
// }

// export interface AuthResponse {
//   user: User;
// }

// // ================= AXIOS INSTANCE =================
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // ================= AUTH SERVICE =================
// const authService = {
//   // -------- SIGN UP --------
//   async signup(data: Omit<User, 'id'>): Promise<AuthResponse> {
//     const res = await api.post<User>('/users', data);

//     const authData: AuthResponse = { user: res.data };
//     localStorage.setItem('user', JSON.stringify(authData));

//     return authData;
//   },

//   // -------- LOGIN --------
//   async login(email: string, password: string): Promise<AuthResponse> {
//     const res = await api.get<User[]>(`/users?email=${email}&password=${password}`);

//     if (res.data.length === 0) {
//       throw new Error('Invalid email or password');
//     }

//     const authData: AuthResponse = { user: res.data[0] };
//     localStorage.setItem('user', JSON.stringify(authData));

//     return authData;
//   },

//   // -------- LOGOUT --------
//   logout() {
//     localStorage.removeItem('user');
//   },

//   // -------- CURRENT USER --------
//   getCurrentUser(): AuthResponse | null {
//     if (typeof window === 'undefined') return null;

//     const stored = localStorage.getItem('user');
//     return stored ? JSON.parse(stored) : null;
//   },

//   // -------- IS AUTH --------
//   isAuthenticated(): boolean {
//     return !!this.getCurrentUser();
//   },
// };

// export default authService;
