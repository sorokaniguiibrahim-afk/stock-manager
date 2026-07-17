"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import EntryForm from "./EntryForm";
import EntryTable from "./EntryTable";

import { getStockEntries, StockEntry } from "@/services/stockEntryService";

export default function EntryManager() {
  const [open, setOpen] = useState(false);

  const [entries, setEntries] = useState<StockEntry[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadEntries() {
    try {
      setLoading(true);

      const data = await getStockEntries();

      setEntries(data);
    } catch (error) {
      console.error("Erreur chargement entrées :", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      await loadEntries();
    }

    init();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Entrées de stock</h1>

          <p className="text-muted-foreground">
            Gérez les ajouts de produits dans votre stock.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>+ Nouvelle entrée</Button>
      </div>

      {/* Formulaire */}

      <EntryForm
        open={open}
        onOpenChange={setOpen}
        refreshEntries={loadEntries}
      />

      {/* Tableau */}

      <EntryTable entries={entries} loading={loading} />
    </div>
  );
}
