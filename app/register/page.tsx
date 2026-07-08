"use client";

import { useState } from "react";
import { signUp } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(form.email, form.password, form.full_name);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-5">Créer un compte</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          placeholder="Nom complet"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          placeholder="Email"
          type="email"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Mot de passe"
          type="password"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          S&apos;inscrire
        </button>
      </form>
    </main>
  );
}
