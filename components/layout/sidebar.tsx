"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import Logo from "@/components/shared/Logo";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-72 flex-col border-r bg-background p-5">
      {/* Logo */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                "hover:bg-muted",
                isActive && "bg-primary text-primary-foreground shadow-sm",
              )}
            >
              <Icon className="h-5 w-5" />

              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Profil */}
      <div>
        <Separator className="mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>IS</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">Ibrahim</p>

              <p className="text-xs text-muted-foreground">Administrateur</p>
            </div>
          </div>

          <button
            className="rounded-lg p-2 hover:bg-muted transition"
            title="Déconnexion"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
