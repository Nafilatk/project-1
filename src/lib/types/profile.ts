
export type PersonalForm = {
  name: string;
  bio: string;
  phone: string;
  email: string;
  avatarUrl: string;
};

export type ForgotForm = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export type TabKey = "personal" | "security" | "account";
