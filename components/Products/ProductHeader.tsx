"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText } from "lucide-react";

import ProductForm from "./ProductForm";

import { Product } from "@/types/product";
import {
  exportProductsToExcel,
  exportProductsToPDF,
} from "@/services/exportService";

interface ProductHeaderProps {
  refreshProducts: () => Promise<void>;
  products: Product[];
}

export default function ProductHeader({
  refreshProducts,
  products,
}: ProductHeaderProps) {
  const [open, setOpen] = useState(false);

  function handleExportExcel() {
    if (products.length === 0) {
      alert("Aucun produit à exporter.");
      return;
    }

    exportProductsToExcel(products);
  }

  function handleExportPDF() {
    if (products.length === 0) {
      alert("Aucun produit à exporter.");
      return;
    }

    exportProductsToPDF(products);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>

          <p className="text-muted-foreground">
            Gérez votre stock et vos produits.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>

          <Button variant="outline" onClick={handleExportPDF}>
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>

          <Button onClick={() => setOpen(true)}>+ Ajouter un produit</Button>
        </div>
      </div>

      <ProductForm
        open={open}
        onOpenChange={setOpen}
        refreshProducts={refreshProducts}
      />
    </>
  );
}
