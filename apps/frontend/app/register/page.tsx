"use client";
import { useState } from "react";
import KeyboardNav from "../components/KeyboardNav";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
  const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      setSuccess("Registration successful! Please login.");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError("Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100" style={{padding: 24}}>
      <div className="bg-white rounded-2xl shadow-xl p-0 w-full max-w-md flex flex-col items-center relative" style={{boxShadow: '0 4px 32px rgba(37,99,235,0.08)'}}>
        <div style={{height: 8, width: '100%', background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)', borderTopLeftRadius: 16, borderTopRightRadius: 16}} />
        <div className="flex items-center gap-3 mb-6 mt-8">
          <img src="/next.svg" alt="TaskAura.ai logo" width={36} height={36} />
          <span className="font-extrabold text-2xl text-gray-900">TaskAura<span className="text-blue-600">.ai</span></span>
        </div>
        <form onSubmit={handleSubmit} className="w-full px-10" aria-label="Register form">
          <h2 className="text-2xl font-bold mb-4 text-center">Create your TaskAura.ai account</h2>
          <div className="flex justify-center mb-6">
            <span className="inline-block w-16 h-1 rounded bg-blue-100" />
          </div>
          {error && <div className="text-red-500 mb-2 text-center" role="alert">{error}</div>}
          {success && <div className="text-green-600 mb-2 text-center" role="status">{success}</div>}
          <div className="mb-4">
            <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-blue-50/30"
              required
              aria-label="Name"
              autoComplete="name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="register-email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-blue-50/30"
              required
              aria-label="Email"
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-blue-50/30"
              required
              aria-label="Password"
              autoComplete="new-password"
            />
          </div>
          <button id="register-submit" type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm" aria-label="Register">Sign Up</button>
        </form>
        <div className="mt-6 mb-8 text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Sign in</a>
        </div>
      </div>
      <KeyboardNav selectors={["#register-name", "#register-email", "#register-password", "#register-submit"]} />
    </div>
  );
}
