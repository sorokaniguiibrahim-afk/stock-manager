import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Product } from "@/types/product";

export function exportProductsToExcel(products: Product[]) {
  const data = products.map((product) => ({
    Produit: product.name,
    Catégorie: product.category ?? "Non classé",
    Stock: product.quantity,
    "Prix achat": product.purchase_price,
    "Prix vente": product.selling_price,
    Statut:
      product.quantity === 0
        ? "Rupture"
        : product.quantity <= product.alert_threshold
          ? "Stock faible"
          : "Disponible",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Produits");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  const date = new Date().toISOString().split("T")[0];

  link.href = url;
  link.download = `stock-manager-${date}.xlsx`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

export function exportProductsToPDF(products: Product[]) {
  const doc = new jsPDF();

  const date = new Date().toLocaleDateString("fr-FR");

  doc.setFontSize(18);

  doc.text("StockManager - Inventaire produits", 14, 20);

  doc.setFontSize(11);

  doc.text(`Date d'export : ${date}`, 14, 30);

  const rows = products.map((product) => [
    product.name,
    product.category ?? "Non classé",
    product.quantity.toString(),
    `${product.purchase_price} FCFA`,
    `${product.selling_price} FCFA`,
    product.quantity === 0
      ? "Rupture"
      : product.quantity <= product.alert_threshold
        ? "Stock faible"
        : "Disponible",
  ]);

  autoTable(doc, {
    startY: 40,

    head: [
      ["Produit", "Catégorie", "Stock", "Prix achat", "Prix vente", "Statut"],
    ],

    body: rows,

    styles: {
      fontSize: 9,
    },
  });

  const fileDate = new Date().toISOString().split("T")[0];

  doc.save(`stock-manager-${fileDate}.pdf`);
}
