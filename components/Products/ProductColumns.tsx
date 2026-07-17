"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnsProps {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function getColumns({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: "Produit",

      cell: ({ row }) => {
        return row.original.name;
      },
    },

    {
      accessorKey: "category",
      header: "Catégorie",

      cell: ({ row }) => {
        return row.original.category || "Non classé";
      },
    },

    {
      accessorKey: "quantity",
      header: "Stock",

      cell: ({ row }) => {
        const product = row.original;

        return (
          <Badge
            variant={
              product.quantity <= product.alert_threshold
                ? "destructive"
                : "default"
            }
          >
            {product.quantity}
          </Badge>
        );
      },
    },

    {
      accessorKey: "purchase_price",
      header: "Prix achat",

      cell: ({ row }) => {
        return `${row.original.purchase_price} FCFA`;
      },
    },

    {
      accessorKey: "selling_price",
      header: "Prix vente",

      cell: ({ row }) => {
        return `${row.original.selling_price} FCFA`;
      },
    },

    {
      id: "status",
      header: "Statut",

      cell: ({ row }) => {
        const product = row.original;

        if (product.quantity === 0) {
          return <Badge variant="destructive">Rupture</Badge>;
        }

        if (product.quantity <= product.alert_threshold) {
          return <Badge variant="secondary">Stock faible</Badge>;
        }

        return <Badge>Disponible</Badge>;
      },
    },

    {
      id: "actions",
      header: "Actions",

      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(product)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onDelete(product)}
                variant="destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
