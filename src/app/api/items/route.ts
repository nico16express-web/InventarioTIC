import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/items?q=&categoria=&estado=&nivel=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const categoria = searchParams.get("categoria");
  const estado = searchParams.get("estado");
  const nivel = searchParams.get("nivel");

  const where: any = { AND: [] as any[] };

  if (q) {
    where.AND.push({
      OR: [
        { objeto: { contains: q, mode: "insensitive" } },
        { codigo: { contains: q, mode: "insensitive" } },
        { dependencia: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (categoria && categoria !== "Todas las Categorías") {
    where.AND.push({ categoria });
  }
  if (estado && estado !== "Todos los Estados") {
    where.AND.push({ estado });
  }
  if (nivel && nivel !== "Todos los Niveles") {
    where.AND.push({ nivel });
  }

  const items = await prisma.item.findMany({
    where: where.AND.length ? where : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(items);
}

// POST /api/items
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.objeto || !body.codigo) {
    return NextResponse.json(
      { error: "El código y el objeto tecnológico son obligatorios." },
      { status: 400 }
    );
  }

  const item = await prisma.item.create({
    data: {
      nivel: body.nivel || "Básica",
      codigo: body.codigo,
      objeto: body.objeto,
      cantidad: Number(body.cantidad) || 1,
      dependencia: body.dependencia || "",
      financiamiento: body.financiamiento || "Sin información",
      adquisicion: body.adquisicion || "Sin información",
      categoria: body.categoria || "Otros",
      estado: body.estado || "En uso",
      fecha: body.fecha || null,
      observaciones: body.observaciones || null,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
