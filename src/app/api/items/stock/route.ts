import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/items/stock  { id, cantidad }
// Descuenta stock de un ítem sin dejarlo bajo cero.
export async function POST(req: NextRequest) {
  const { id, cantidad } = await req.json();

  const current = await prisma.item.findUnique({ where: { id } });
  if (!current) {
    return NextResponse.json({ error: "No se encontró el registro." }, { status: 404 });
  }

  const descuento = Number(cantidad) || 0;
  const nuevaCantidad = Math.max(0, current.cantidad - descuento);

  const item = await prisma.item.update({
    where: { id },
    data: { cantidad: nuevaCantidad },
  });

  return NextResponse.json(item);
}
