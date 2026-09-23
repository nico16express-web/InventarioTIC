import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

const COLUMNS: { key: string; header: string }[] = [
  { key: "nivel", header: "Nivel" },
  { key: "codigo", header: "ID / Código" },
  { key: "objeto", header: "Objeto Tecnológico" },
  { key: "cantidad", header: "Stock" },
  { key: "dependencia", header: "Dependencia" },
  { key: "financiamiento", header: "Financiamiento" },
  { key: "adquisicion", header: "Adquisición" },
  { key: "categoria", header: "Categoría" },
  { key: "estado", header: "Estado" },
  { key: "fecha", header: "Fecha" },
  { key: "observaciones", header: "Observaciones" },
];

// GET /api/items/export -> descarga un .xlsx con todo el inventario
export async function GET() {
  const items = await prisma.item.findMany({ orderBy: { createdAt: "asc" } });

  const rows = items.map((item) => {
    const row: Record<string, any> = {};
    for (const col of COLUMNS) {
      row[col.header] = (item as any)[col.key] ?? "";
    }
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: COLUMNS.map((c) => c.header),
  });
  worksheet["!cols"] = COLUMNS.map(() => ({ wch: 22 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  const fecha = new Date().toISOString().slice(0, 10);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="inventario-mulchen-${fecha}.xlsx"`,
    },
  });
}
