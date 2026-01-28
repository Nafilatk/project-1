

export type ForgotForm = {
  email: string;
    currentPassword: string;

  newPassword: string;
  confirmPassword: string;
};


export type TabKey = "personal" | "security" | "account";

export interface PersonalForm {
  name: string;
  bio: string;
  phone: string;
  email: string;
}

export interface SecurityFormData {
   email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

