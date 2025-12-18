"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Save user in JSON Server
    const res = await axios.post("http://localhost:5000/users", form);

    // Save logged user
    localStorage.setItem("user", JSON.stringify(res.data));

    // Redirect to home
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border p-6 rounded-xl shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

        <input
          placeholder="Name"
          className="w-full p-2 border rounded mb-3"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded mb-3"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded mb-4"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Create Account
        </button>
      </form>
    </div>
  );
}
