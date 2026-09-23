"use client";

import { useState } from "react";
import { Item } from "@/lib/constants";

export default function StockControl({
  selected,
  onDiscount,
}: {
  selected: Item | null;
  onDiscount: (id: string, cantidad: number) => void;
}) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <div className="rounded-2xl border border-gold-300/60 bg-gold-100/40 p-5">
      <h3 className="font-display mb-1 text-sm font-bold text-navy-900">Descuento de stock</h3>
      <p className="mb-3 text-xs text-navy-600">
        {selected
          ? `Seleccionado: ${selected.objeto} (stock actual: ${selected.cantidad})`
          : "Selecciona un equipo en la tabla para descontar stock."}
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-24 rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm outline-none ring-gold-400 focus:ring-2"
        />
        <button
          disabled={!selected}
          onClick={() => selected && onDiscount(selected.id, cantidad)}
          className="flex-1 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Descontar ahora
        </button>
      </div>
    </div>
  );
}
