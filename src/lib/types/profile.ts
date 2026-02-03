

export type ForgotForm = {
  email: string;
    currentPassword: string;

  newPassword: string;
  confirmPassword: string;
};


export type TabKey = "personal" | "security" | "account";

export interface PersonalForm {
  name: string;
  email: string;
  bio?: string;
  title?: string;
  phone?: string;
  location?: string;
  website?: string;
}


export interface SecurityFormData {
   email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

