"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiLogIn, FiArrowRight } from "react-icons/fi";
import { useAuth } from "@/app/context/auth-context";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, password } = form;
    if (!name || !email || !password) {
      toast.warn("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${encodeURIComponent(email)}`
      );
      if (Array.isArray(res.data) && res.data.length > 0) {
        toast.error("Email already registered");
        setIsSubmitting(false);
        return;
      }

      const newUser = {
        id: uuid(),
        name,
        email,
        password,
        role: "user" as const,
        isBlock: false,
        cart: [],
        wishlist: [],
        orders: [],
        created_at: new Date().toISOString(),
      };

      await axios.post("http://localhost:3001/users", newUser);

      toast.success("Account created successfully");
      loginUser(newUser);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md rounded-2xl overflow-hidden p-8 bg-white shadow-xl border border-gray-200"
      >
        <motion.div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Join learnest.ai
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          />
          <p className="mt-3 text-gray-600">
            Create your account to start learning
          </p>
        </motion.div>

        <form onSubmit={handleSignup} className="space-y-5">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <FiUser className="absolute left-3 top-3 text-blue-600" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FiMail className="absolute left-3 top-3 text-blue-600" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <FiLock className="absolute left-3 top-3 text-blue-600" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-gray-600">
              I agree to the{" "}
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Account...
              </>
            ) : (
              <>
                <FiArrowRight />
                Create Account
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center my-6"
        >
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-center mt-6 text-gray-600"
        >
          Already have an account?{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/login")}
            className="cursor-pointer font-semibold inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiLogIn />
            Login here
          </motion.span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}