"use client";

import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { api } from "@/lib/axios";
import type { User } from "@/lib/auth-types";
import { useAuth } from "@/context/auth-context";

import TabsComponent from "@/components/Profile/TabsComponent";
import PersonalInfoForm from "@/components/Profile/PersonalInfoForm";
import SecurityForm from "@/components/Profile/SecurityForm";
import AccountActions from "@/components/Profile/AccountActions";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";

import { PersonalForm, ForgotForm, TabKey } from "@/lib/types/profile";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [personalForm, setPersonalForm] = useState<PersonalForm | null>(null);
  const [forgotForm, setForgotForm] = useState<ForgotForm>({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingPersonal, setIsSavingPersonal] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ---------------- Auth Guard ---------------- */
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  /* ---------------- Load Profile ---------------- */
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await api.get<User>(`/users/${user.id}`);
        const u = res.data;

        setPersonalForm({
          name: u.name ?? "",
          email: u.email ?? "",
          phone: u.phone ?? "",
          bio: u.bio ?? "",
        });

        setForgotForm({
          email: u.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch {
        setError("Failed to load profile.");
      } finally {
        setIsLoading(false);
        animatePage();
      }
    };

    load();
  }, [user]);

  /* ---------------- Animations ---------------- */
  const animatePage = () => {
    if (!containerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );

    gsap.fromTo(
      cardRef.current,
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, delay: 0.1 }
    );
  };

  const handleTabChange = (tab: TabKey) => {
    const content = document.querySelector("[data-tab-content]");
    if (!content) return setActiveTab(tab);

    gsap.to(content, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(
          content,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35 }
        );
      },
    });
  };

  /* ---------------- Handlers ---------------- */
  const handlePersonalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!personalForm) return;
    setPersonalForm({ ...personalForm, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSavePersonal = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !personalForm) return;

    try {
      setIsSavingPersonal(true);
      await api.patch(`/users/${user.id}`, personalForm);
      setSuccess("Profile updated successfully.");
      setTimeout(() => setSuccess(null), 4000);
    } catch {
      setError("Failed to update profile.");
    } finally {
      setIsSavingPersonal(false);
    }
  };

  const handleForgotChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsResettingPassword(true);

      const res = await api.get<User[]>("/users", {
        params: { email: forgotForm.email },
      });

      if (!res.data.length) {
        setError("No account found.");
        return;
      }

      const u = res.data[0];
      if (u.password !== forgotForm.currentPassword) {
        setError("Current password incorrect.");
        return;
      }

      await api.patch(`/users/${u.id}`, {
        password: forgotForm.newPassword,
      });

      setSuccess("Password updated successfully.");
      setForgotForm({
        ...forgotForm,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(null), 4000);
    } catch {
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
    if (!user || !confirm("Delete account permanently?")) return;

    try {
      setIsDeleting(true);
      await api.delete(`/users/${user.id}`);
      logoutUser();
      router.replace("/signup");
    } catch {
      setError("Failed to delete account.");
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  /* ---------------- UI ---------------- */
  return (
    <main ref={containerRef} className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* 🔥 SIDEBAR + SCROLLABLE CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar (STICKY) */}
          <ProfileSidebar personalForm={personalForm} />

          {/* Right panel (SCROLLS INSIDE) */}
          <div
            className="
              max-h-[calc(100vh-6rem)]
              overflow-y-auto
              pr-2
              scrollbar-hide
            "
          >
            <div
              ref={cardRef}
              className="rounded-2xl bg-white border border-slate-200 shadow-lg"
            >
              <TabsComponent
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              <div className="p-6">
                {error && (
                  <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-sm text-rose-800">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-emerald-800">{success}</span>
                  </div>
                )}

                <div data-tab-content>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <>
                      {personalForm && activeTab === "personal" && (
                        <PersonalInfoForm
                          personalForm={personalForm}
                          isSavingPersonal={isSavingPersonal}
                          onChange={handlePersonalChange}
                          onSubmit={handleSavePersonal}
                        />
                      )}

                      {activeTab === "security" && (
                        <SecurityForm
                          forgotForm={forgotForm}
                          isResettingPassword={isResettingPassword}
                          onChange={handleForgotChange}
                          onSubmit={handleResetPassword}
                        />
                      )}

                      {activeTab === "account" && (
                        <AccountActions
                          onLogout={handleLogout}
                          onDeleteAccount={handleDeleteAccount}
                          isDeleting={isDeleting}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Your account information is securely stored.
        </p>
      </div>
    </main>
  );
}
