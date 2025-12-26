"use client";

import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import type { User } from "@/lib/auth-types";
import { useAuth } from "@/context/auth-context";
import AvatarSection from "@/components/Profile/AvatarSection";
import TabsComponent from "@/components/Profile/TabsComponent";
import PersonalInfoForm from "@/components/Profile/PersonalInfoForm";
import SecurityForm from "@/components/Profile/SecurityForm";
import AccountActions from "@/components/Profile/AccountActions";
import {PersonalForm,ForgotForm,TabKey} from "@/types/profile"


export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  const [activeTab, setActiveTab] = useState<TabKey>("personal");

  const [personalForm, setPersonalForm] = useState<PersonalForm | null>(
    null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [forgotForm, setForgotForm] = useState<ForgotForm>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingPersonal, setIsSavingPersonal] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await api.get<User>(`/users/${user.id}`);
        const u = res.data;

        const base: PersonalForm = {
          name: u.name ?? "",
          bio: u.bio ?? "",
          phone: u.phone ?? "",
          email: u.email,
          avatarUrl: u.avatarUrl ?? "",
        };

        setPersonalForm(base);
        setAvatarPreview(base.avatarUrl || null);
        setForgotForm({
          email: u.email,
          newPassword: "",
          confirmPassword: "",
        });
      } catch (e) {
        console.error(e);
        setError("Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [user]);

  useEffect(() => {
    if (!success) return;
    const id = window.setTimeout(() => setSuccess(null), 3000);
    return () => window.clearTimeout(id);
  }, [success]);

  const handlePersonalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!personalForm) return;
    const { name, value } = e.target;
    setPersonalForm((prev) => (prev ? { ...prev, [name]: value } : prev));
    setError(null);
    setSuccess(null);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    setError(null);
    setSuccess(null);
  };

  const validatePersonal = () => {
    if (!personalForm) return "Form not ready.";
    if (!personalForm.name.trim()) return "Name is required.";
    if (!personalForm.email.trim()) return "Email is required.";
    if (personalForm.phone && personalForm.phone.length <= 10)
      return "Phone number looks too short.";
    return null;
  };

  const handleSavePersonal = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !personalForm) return;

    const v = validatePersonal();
    if (v) {
      setError(v);
      setSuccess(null);
      return;
    }

    try {
      setIsSavingPersonal(true);
      setError(null) ;
      setSuccess(null) ;

      let avatarUrlToSave = personalForm.avatarUrl;
      if (avatarFile) {
        avatarUrlToSave = `/uploads/${avatarFile.name}`;
      }

      await api.patch(`/users/${user.id}`, {
        name: personalForm.name,
        bio: personalForm.bio,
        phone: personalForm.phone,
        avatarUrl: avatarUrlToSave,
      });

      setPersonalForm((prev) =>
        prev ? { ...prev, avatarUrl: avatarUrlToSave } : prev
      );
      setSuccess("Personal information updated.");
    } catch (e) {
      console.error(e);
      setError("Failed to update personal info.");
    } finally {
      setIsSavingPersonal(false);
    }
  };

  const handleForgotChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateForgot = () => {
    if (!forgotForm.email.trim()) return "Email is required.";
    if (!forgotForm.newPassword.trim())
      return "New password is required.";
    if (forgotForm.newPassword.length < 6)
      return "Password must be at least 6 characters.";
    if (forgotForm.newPassword !== forgotForm.confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    const v = validateForgot();
    if (v) {
      setError(v);
      setSuccess(null);
      return;
    }

    try {
      setIsResettingPassword(true);
      setError(null);
      setSuccess(null);

      const res = await api.get<User[]>("/users", {
        params: { email: forgotForm.email },
      });
      if (!res.data.length) {
        setError("No account found with that email.");
        return;
      }
      const u = res.data[0];

      await api.patch(`/users/${u.id}`, {
        password: forgotForm.newPassword,
      });

      setSuccess("Password updated. You can now log in with the new password.");
      setForgotForm((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (e) {
      console.error(e);
      setError("Failed to reset password.");
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.replace("/login");
  };

  const handleDeleteAccount = async () => {
    if (!user || !confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      setSuccess(null);

      await api.delete(`/users/${user.id}`);

      logoutUser();
      router.replace("/signup");
    } catch (e) {
      console.error(e);
      setError("Failed to delete account.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto flex max-w-6xl gap-6">



        <section className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information, login security, and account.
          </p>

          <AvatarSection
            personalForm={personalForm}
            avatarPreview={avatarPreview}
            onAvatarChange={handleAvatarChange}
          />

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
            <TabsComponent
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="p-5 md:p-6">
              {error && <p className="mb-4 ...">{error}
              </p>}
              {success && <p className="mb-4 ...">{success}</p>}

              {!isLoading && personalForm && activeTab === "personal" && (
                <PersonalInfoForm
                  personalForm={personalForm}
                  isSavingPersonal={isSavingPersonal}
                  onChange={handlePersonalChange}
                  onSubmit={handleSavePersonal}
                />
              )}

              {!isLoading && activeTab === "security" && (
                <SecurityForm
                  forgotForm={forgotForm}
                  isResettingPassword={isResettingPassword}
                  onChange={handleForgotChange}
                  onSubmit={handleResetPassword}
                />
              )}
              {!isLoading && activeTab === "account" && (
                <AccountActions
                  onLogout={handleLogout}
                  onDeleteAccount={handleDeleteAccount}
                  isDeleting={isDeleting}
                />
              )}


            </div>
          </div>

        </section>
      </div>
    </main>
  )
}
