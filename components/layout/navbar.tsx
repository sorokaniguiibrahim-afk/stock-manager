"use client";

import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-20 border-b bg-background/80 backdrop-blur-xl flex items-center justify-between px-8">
      {/* Partie gauche */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <p className="text-sm text-muted-foreground">
          Bienvenue sur Stock Manager
        </p>
      </div>

      {/* Partie droite */}
      <div className="flex items-center gap-4">
        {/* Recherche */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Rechercher un produit..."
            className="w-72 rounded-xl"
          />
        </div>

        {/* Mode sombre */}
        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Profil */}
        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground">
            IS
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
