import { Package2 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
        <Package2 className="h-6 w-6" />
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">Stock Manager</h1>

        <p className="text-xs text-muted-foreground">Gestion intelligente</p>
      </div>
    </div>
  );
}
