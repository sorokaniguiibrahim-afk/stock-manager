"use client";

import { StockEntry } from "@/services/stockEntryService";

interface EntryTableProps {
  entries: StockEntry[];
  loading: boolean;
}

export default function EntryTable({ entries, loading }: EntryTableProps) {
  if (loading) {
    return <div className="py-10 text-center">Chargement des entrées...</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center text-muted-foreground">
        Aucune entrée enregistrée.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Produit</th>

            <th className="p-3 text-left">Quantité</th>

            <th className="p-3 text-left">Motif</th>

            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-t">
              <td className="p-3">
                {entry.product?.name ?? "Produit supprimé"}
              </td>

              <td className="p-3">+{entry.quantity}</td>

              <td className="p-3">{entry.reason}</td>

              <td className="p-3">
                {new Date(entry.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
