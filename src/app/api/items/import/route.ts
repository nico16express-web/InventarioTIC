import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

// Alias de encabezados aceptados (normalizados: minúsculas, sin tildes/espacios extra)
const HEADER_ALIASES: Record<string, string> = {
  nivel: "nivel",
  "id/codigo": "codigo",
  "id / codigo": "codigo",
  codigo: "codigo",
  "objeto tecnologico": "objeto",
  objeto: "objeto",
  stock: "cantidad",
  cantidad: "cantidad",
  "cantidad inicial": "cantidad",
  dependencia: "dependencia",
  financiamiento: "financiamiento",
  adquisicion: "adquisicion",
  categoria: "categoria",
  estado: "estado",
  fecha: "fecha",
  observaciones: "observaciones",
};

function normalize(header: string) {
  return header
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// POST /api/items/import  (multipart/form-data, campo "file")
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(bytes, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  if (rows.length === 0) {
    return NextResponse.json({ error: "El archivo no contiene filas." }, { status: 400 });
  }

  let creados = 0;
  const errores: string[] = [];

  for (const [i, row] of rows.entries()) {
    const mapped: Record<string, any> = {};
    for (const rawHeader of Object.keys(row)) {
      const key = HEADER_ALIASES[normalize(rawHeader)];
      if (key) mapped[key] = row[rawHeader];
    }

    if (!mapped.objeto || !mapped.codigo) {
      errores.push(`Fila ${i + 2}: falta código u objeto tecnológico, se omitió.`);
      continue;
    }

    try {
      await prisma.item.create({
        data: {
          nivel: String(mapped.nivel || "Básica"),
          codigo: String(mapped.codigo),
          objeto: String(mapped.objeto),
          cantidad: Number(mapped.cantidad) || 1,
          dependencia: String(mapped.dependencia || ""),
          financiamiento: String(mapped.financiamiento || "Sin información"),
          adquisicion: String(mapped.adquisicion || "Sin información"),
          categoria: String(mapped.categoria || "Otros"),
          estado: String(mapped.estado || "En uso"),
          fecha: mapped.fecha ? String(mapped.fecha) : null,
          observaciones: mapped.observaciones ? String(mapped.observaciones) : null,
        },
      });
      creados++;
    } catch (e) {
      errores.push(`Fila ${i + 2}: error al guardar.`);
    }
  }

  return NextResponse.json({ creados, errores });
}
