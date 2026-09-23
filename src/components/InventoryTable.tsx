"use client";

import { Item } from "@/lib/constants";

const ESTADO_STYLES: Record<string, string> = {
  "En uso": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "En bodega": "bg-sky-50 text-sky-700 ring-sky-200",
  "En reparación": "bg-amber-50 text-amber-700 ring-amber-200",
  "Dado de baja": "bg-rose-50 text-rose-700 ring-rose-200",
  Prestado: "bg-violet-50 text-violet-700 ring-violet-200",
};

type Props = {
  items: Item[];
  selectedId: string | null;
  onSelect: (item: Item) => void;
  onDelete: (id: string) => void;
  loading: boolean;
};

const COLS = [
  "Nivel",
  "ID / Código",
  "Objeto",
  "Stock",
  "Dependencia",
  "Financiamiento",
  "Adquisición",
  "Categoría",
  "Estado",
  "Fecha",
  "",
];

export default function InventoryTable({ items, selectedId, onSelect, onDelete, loading }: Props) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white shadow-sm">
      <div className="table-scroll max-h-[540px] overflow-auto rounded-2xl">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-navy-950 text-left text-xs uppercase tracking-wide text-navy-200">
            <tr>
              {COLS.map((c) => (
                <th key={c} className="whitespace-nowrap px-4 py-3 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={COLS.length} className="px-4 py-10 text-center text-navy-400">
                  Cargando inventario…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={COLS.length} className="px-4 py-14 text-center text-navy-400">
                  No hay equipos que coincidan con la búsqueda. Agrega uno nuevo desde el panel
                  izquierdo.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className={`cursor-pointer border-t border-navy-50 transition hover:bg-gold-100/40 ${
                  selectedId === item.id ? "bg-gold-100/70" : ""
                }`}
              >
                <td className="whitespace-nowrap px-4 py-2.5">{item.nivel}</td>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-navy-600">
                  {item.codigo}
                </td>
                <td className="px-4 py-2.5 font-medium">{item.objeto}</td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <span
                    className={
                      item.cantidad <= 0
                        ? "font-semibold text-rose-600"
                        : "font-semibold text-navy-800"
                    }
                  >
                    {item.cantidad}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-navy-600">{item.dependencia}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-navy-600">{item.financiamiento}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-navy-600">{item.adquisicion}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-navy-600">{item.categoria}</td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                      ESTADO_STYLES[item.estado] || "bg-navy-50 text-navy-700 ring-navy-200"
                    }`}
                  >
                    {item.estado}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-navy-600">
                  {item.fecha || "Sin información"}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`¿Eliminar "${item.objeto}" del inventario?`)) {
                        onDelete(item.id);
                      }
                    }}
                    className="rounded-md px-2 py-1 text-xs font-medium text-rose-500 hover:bg-rose-50"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
