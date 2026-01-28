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
import {PersonalForm,ForgotForm,TabKey} from "@/lib/types/profile"

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [personalForm, setPersonalForm] = useState<PersonalForm | null>(null);
  const [forgotForm, setForgotForm] = useState<ForgotForm>({
    email: "",
    currentPassword : "",
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
          email: u.email ?? "",
        };

        setPersonalForm(base);
        setForgotForm({
          email: u.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (e) {
        console.error(e);
        setError("Failed to load profile.");
      } finally {
        setIsLoading(false);
        // Animate after data loads
        setTimeout(() => animatePage(), 100);
      }
    };

    load();
  }, [user]);

  useEffect(() => {
    if (success) {
      // Animate success message
      const successEl = document.querySelector('[data-success]');
      if (successEl) {
        gsap.fromTo(successEl,
          { scale: 0.8, opacity: 0, y: -10 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
        );
      }
      
      const id = window.setTimeout(() => {
        if (successEl) {
          gsap.to(successEl, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            onComplete: () => setSuccess(null)
          });
        } else {
          setSuccess(null);
        }
      }, 3000);
      return () => window.clearTimeout(id);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      // Animate error message
      const errorEl = document.querySelector('[data-error]');
      if (errorEl) {
        gsap.fromTo(errorEl,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }
    }
  }, [error]);

  const animatePage = () => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Main card animation
      gsap.fromTo(cardRef.current,
        { scale: 0.95, opacity: 0, y: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          delay: 0.2, 
          ease: "power3.out" 
        }
      );

      // Tab content animation on change
      const content = document.querySelector('[data-tab-content]');
      if (content) {
        gsap.fromTo(content,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  };

  const handleTabChange = (tab: TabKey) => {
    // Tab switch animation
    const content = document.querySelector('[data-tab-content]');
    if (content) {
      gsap.to(content, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        onComplete: () => {
          setActiveTab(tab);
          gsap.fromTo(content,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
          );
        }
      });
    } else {
      setActiveTab(tab);
    }
  };

  const handlePersonalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!personalForm) return;
    const { name, value } = e.target;
    setPersonalForm((prev) => (prev ? { ...prev, [name]: value } : prev));
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
      setError(null);
      setSuccess(null);


      await api.patch(`/users/${user.id}`, {
        name: personalForm.name,
        bio: personalForm.bio,
        phone: personalForm.phone,
      });

      setPersonalForm((prev) =>
        prev ? { ...prev } : prev
      );
      setSuccess("Personal information updated.");
      
      // Success animation
      const saveButton = e.currentTarget.querySelector('button[type="submit"]');
      if (saveButton) {
        gsap.to(saveButton, {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });
      }
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
    if (!forgotForm.currentPassword.trim())
    return "Current password is required.";
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

          if (u.password !== forgotForm.currentPassword) {
      setError("Current password is incorrect.");
      return;
    }

      await api.patch(`/users/${u.id}`, {
        password: forgotForm.newPassword,
      });

      setSuccess("Password updated. You can now log in with the new password.");
      setForgotForm((prev) => ({
        ...prev,
        currentPassword: "",
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
    // Animate logout
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      onComplete: () => {
        logoutUser();
        router.replace("/login");
      }
    });
  };

  const handleDeleteAccount = async () => {
    if (!user || !confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      setSuccess(null);

      await api.delete(`/users/${user.id}`);

      // Animate before redirect
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        onComplete: () => {
          logoutUser();
          router.replace("/signup");
        }
      });
    } catch (e) {
      console.error(e);
      setError("Failed to delete account.");
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
<main
  ref={containerRef}
  className="min-h-screen bg-white text-gray-900 px-4 py-8 sm:px-6 lg:px-8"
>
  <div className="mx-auto max-w-7xl">

    {/* HEADER – full width */}
    <div ref={headerRef} className="space-y-4 mb-8">
      <div className="group relative">
        <h1 className="text-3xl sm:text-4xl font-bold bg-blue-950 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <div className="absolute -bottom-1 left-0 w-56 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full group-hover:w-32 transition-all duration-300"></div>
      </div>

      <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
        Manage your personal information, login security, and account settings.
      </p>
    </div>

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

      {/* ================= SIDEBAR ================= */}
      <aside className="sticky top-6 h-fit rounded-2xl bg-blue-50 border border-slate-200 shadow-lg p-6 space-y-6">
        {personalForm && (
          <>
            {/* Letter Avatar */}
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 
                              flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {personalForm.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Name + Email */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-gray-900">
                {personalForm.name}
              </h2>
              <p className="text-sm text-gray-600">
                {personalForm.email}
              </p>
            </div>

            {/* Bio */}
            {personalForm.bio && (
              <div className="rounded-xl bg-white p-4 text-sm text-gray-600 leading-relaxed shadow-sm">
                {personalForm.bio}
              </div>
            )}
          </>
        )}
      </aside>

      {/* ================= CONTENT ================= */}
      <div
        ref={cardRef}
        className="rounded-2xl bg-blue-50 shadow-lg shadow-slate-200/50 
                   border border-slate-200 overflow-y-auto 
                   max-h-[calc(100vh-7rem)] scrollbar-hide"
      >
        <TabsComponent
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="p-6 sm:p-8 relative">

          {/* ERROR / SUCCESS */}
          <div className="space-y-4 mb-6">
            {error && (
              <div
                data-error
                className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium shadow-sm"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                data-success
                className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-medium shadow-sm"
              >
                {success}
              </div>
            )}
          </div>

          {/* TAB CONTENT */}
          <div data-tab-content className="transition-all duration-300">
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
      </div>
    </div>

    {/* LOADER */}
    {isLoading && (
      <div className="flex items-center justify-center h-64">
        <div className="text-indigo-600 font-medium">
          Loading profile...
        </div>
      </div>
    )}
  </div>
</main>
  )
}