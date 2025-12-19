export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isBlock: boolean;
};
