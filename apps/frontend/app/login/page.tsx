"use client";
import { useState } from "react";
import KeyboardNav from "../components/KeyboardNav";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100" style={{padding: 24}}>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md flex flex-col items-center" style={{boxShadow: '0 4px 32px rgba(37,99,235,0.08)'}}>
        <div className="flex items-center gap-3 mb-8">
          <img src="/next.svg" alt="TaskAura.ai logo" width={36} height={36} />
          <span className="font-extrabold text-2xl text-gray-900">TaskAura<span className="text-blue-600">.ai</span></span>
        </div>
        <form onSubmit={handleSubmit} className="w-full" aria-label="Login form">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign in to your account</h2>
          {error && <div className="text-red-500 mb-2 text-center" role="alert">{error}</div>}
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
              aria-label="Email"
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
              aria-label="Password"
              autoComplete="current-password"
            />
          </div>
          <button id="login-submit" type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" aria-label="Login">Sign In</button>
        </form>
        <div className="mt-6 text-sm text-gray-500">
          Don&apos;t have an account? <a href="/register" className="text-blue-600 font-medium hover:underline">Sign up</a>
        </div>
      </div>
      <KeyboardNav selectors={["#login-email", "#login-password", "#login-submit"]} />
    </div>
  );
}
