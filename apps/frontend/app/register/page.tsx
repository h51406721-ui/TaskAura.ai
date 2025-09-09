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
    const res = await fetch("/api/register", {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80" aria-label="Register form">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-500 mb-2" role="alert">{error}</div>}
        {success && <div className="text-green-600 mb-2" role="status">{success}</div>}
        <label htmlFor="register-name" className="sr-only">Name</label>
        <input
          id="register-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-label="Name"
        />
        <label htmlFor="register-email" className="sr-only">Email</label>
        <input
          id="register-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-label="Email"
        />
        <label htmlFor="register-password" className="sr-only">Password</label>
        <input
          id="register-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-label="Password"
        />
        <button id="register-submit" type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Register">Register</button>
      </form>
      <KeyboardNav selectors={["#register-name", "#register-email", "#register-password", "#register-submit"]} />
    </div>
  );
}
