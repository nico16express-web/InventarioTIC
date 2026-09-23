import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT /api/items/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();

  try {
    const item = await prisma.item.update({
      where: { id: params.id },
      data: {
        nivel: body.nivel,
        codigo: body.codigo,
        objeto: body.objeto,
        cantidad: Number(body.cantidad),
        dependencia: body.dependencia,
        financiamiento: body.financiamiento,
        adquisicion: body.adquisicion,
        categoria: body.categoria,
        estado: body.estado,
        fecha: body.fecha || null,
        observaciones: body.observaciones || null,
      },
    });
    return NextResponse.json(item);
  } catch (e) {
    return NextResponse.json({ error: "No se encontró el registro." }, { status: 404 });
  }
}

// DELETE /api/items/:id
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.item.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "No se encontró el registro." }, { status: 404 });
  }
}
