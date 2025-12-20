"use client";

import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/axios";
import type { User } from "@/app/lib/auth-types";
import { useAuth } from "@/app/context/auth-context";

type PersonalForm = {
  name: string;
  bio: string;
  phone: string;
  email: string;
  avatarUrl: string;
};

type ForgotForm = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

type TabKey = "personal" | "security" | "account";

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

  // Protected route
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  // Load user profile
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

  // Auto hide success
  useEffect(() => {
    if (!success) return;
    const id = window.setTimeout(() => setSuccess(null), 3000);
    return () => window.clearTimeout(id);
  }, [success]);

  // Handlers – personal info
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
    if (personalForm.phone && personalForm.phone.length < 8)
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
      setError(null);
      setSuccess(null);

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

  // Handlers – forgot password (login & security)
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

      // Find user by email
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

  // Handlers – account (logout + delete)
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
        {/* Left sidebar */}
        <aside className="hidden w-60 flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-4 text-sm md:block">
          <div className="mb-4 text-xs font-semibold text-slate-500">
            MENU
          </div>
          <nav className="space-y-1">
            <button
              className="flex w-full items-center rounded-lg bg-slate-100 px-3 py-2 text-left text-slate-900 font-medium"
              disabled
            >
              Profile Settings
            </button>
            <button className="flex w-full items-center rounded-lg px-3 py-2 text-left text-slate-500 hover:bg-slate-50">
              Billing
            </button>
          </nav>

          <div className="mt-8 border-t border-slate-200 pt-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information, login security, and account.
          </p>

          {/* Header card with avatar + name */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                    {personalForm?.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {personalForm?.name || "Your name"}
                </p>
                <p className="text-xs text-slate-500">
                  Student • Premium Member
                </p>
              </div>
            </div>

            <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* Tabs */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 pt-3">
              <div className="flex gap-6 text-sm font-medium">
                <button
                  className={`pb-3 ${
                    activeTab === "personal"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Info
                </button>
                <button
                  className={`pb-3 ${
                    activeTab === "security"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  Login & Security
                </button>
                <button
                  className={`pb-3 ${
                    activeTab === "account"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  onClick={() => setActiveTab("account")}
                >
                  Account
                </button>
              </div>
            </div>

            <div className="p-5 md:p-6">
              {isLoading && (
                <p className="text-sm text-slate-500">Loading profile...</p>
              )}

              {error && (
                <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}
              {success && (
                <p className="mb-4 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-sm text-green-700">
                  {success}
                </p>
              )}

              {/* TAB 1: Personal Info */}
              {!isLoading && personalForm && activeTab === "personal" && (
                <form
                  onSubmit={handleSavePersonal}
                  className="space-y-5 text-sm"
                >
                  <h2 className="text-sm font-semibold text-slate-900">
                    Basic Information
                  </h2>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={personalForm.name}
                      onChange={handlePersonalChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Email Address (read-only)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={personalForm.email}
                      readOnly
                      className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={personalForm.phone}
                      onChange={handlePersonalChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Bio / Headline
                    </label>
                    <textarea
                      name="bio"
                      value={personalForm.bio}
                      onChange={handlePersonalChange}
                      rows={3}
                      placeholder="Tell us a little about yourself..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSavingPersonal}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                      {isSavingPersonal ? "Saving..." : "Save personal info"}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: Login & Security (forgot password) */}
              {!isLoading && activeTab === "security" && (
                <form
                  onSubmit={handleResetPassword}
                  className="space-y-5 text-sm"
                >
                  <h2 className="text-sm font-semibold text-slate-900">
                    Reset password
                  </h2>

                  <p className="text-xs text-slate-500">
                    Update your password using your account email.
                  </p>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={forgotForm.email}
                      onChange={handleForgotChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">
                        New password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={forgotForm.newPassword}
                        onChange={handleForgotChange}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={forgotForm.confirmPassword}
                        onChange={handleForgotChange}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isResettingPassword}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                      {isResettingPassword
                        ? "Updating..."
                        : "Update password"}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: Account (logout + delete) */}
              {!isLoading && activeTab === "account" && (
                <div className="space-y-5 text-sm">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Account actions
                  </h2>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-900">
                      Sign out
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Log out from this device. You can log back in at
                      any time.
                    </p>
                    <button
                      onClick={handleLogout}
                      className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Logout
                    </button>
                  </div>

                  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-700">
                      Delete account
                    </p>
                    <p className="mt-1 text-xs text-red-600">
                      This action is permanent and will remove your
                      profile, enrolled courses, and progress.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:border-red-200 disabled:text-red-300"
                    >
                      {isDeleting ? "Deleting..." : "Delete account"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
