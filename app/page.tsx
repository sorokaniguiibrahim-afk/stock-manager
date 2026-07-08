"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase.from("products").select("*");

      console.log("Produits :", data);
      console.log("Erreur :", error);
    }

    testSupabase();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Stock Manager</h1>

      <p>Connexion Supabase en test...</p>
    </main>
  );
}
