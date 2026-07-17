"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  getStockMovements,
  StockMovement,
} from "@/services/stockMovementService";

import { Badge } from "@/components/ui/badge";

export default function MovementsPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<"ALL" | "CREATE" | "UPDATE" | "DELETE">(
    "ALL",
  );

  useEffect(() => {
    async function loadMovements() {
      try {
        const data = await getStockMovements();

        console.log("Mouvements :", data);

        setMovements(data);
      } catch (error) {
        console.error("Erreur chargement historique :", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovements();
  }, []);

  const filteredMovements = useMemo(() => {
    return movements.filter((movement) => {
      const productName = movement.product?.[0]?.name ?? "Produit supprimé";

      const matchesSearch = productName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "ALL" || movement.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [movements, search, filter]);

  if (loading) {
    return <div className="py-10 text-center">Chargement historique...</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Historique des mouvements</h1>

        <p className="text-muted-foreground">
          Suivi des opérations effectuées sur votre stock.
        </p>

        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as "ALL" | "CREATE" | "UPDATE" | "DELETE",
              )
            }
            className="rounded-lg border px-4 py-2"
          >
            <option value="ALL">Tous</option>
            <option value="CREATE">Créations</option>
            <option value="UPDATE">Modifications</option>
            <option value="DELETE">Suppressions</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Produit</th>

              <th className="p-3 text-left">Action</th>

              <th className="p-3 text-left">Avant</th>

              <th className="p-3 text-left">Après</th>

              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredMovements.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-muted-foreground"
                >
                  Aucun mouvement trouvé.
                </td>
              </tr>
            ) : (
              filteredMovements.map((movement) => (
                <tr key={movement.id} className="border-t">
                  <td className="p-3">
                    {movement.product?.[0]?.name ?? "Produit supprimé"}
                  </td>

                  <td className="p-3">
                    {movement.type === "CREATE" && <Badge>Création</Badge>}

                    {movement.type === "UPDATE" && (
                      <Badge variant="secondary">Modification</Badge>
                    )}

                    {movement.type === "DELETE" && (
                      <Badge variant="destructive">Suppression</Badge>
                    )}
                  </td>

                  <td className="p-3">{movement.previous_quantity}</td>

                  <td className="p-3">{movement.new_quantity}</td>

                  <td className="p-3">
                    {new Date(movement.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
