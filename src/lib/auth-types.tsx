export type User = {
  id: string;
  name: string;
  email: string;
  password: string;         
  bio?: string;            
  phone?: string;
  avatarUrl?: string;        
  role: "user" | "admin";
  isBlock: boolean;
};
