"use client";

import { CATEGORIAS, ESTADOS, NIVELES } from "@/lib/constants";

type Props = {
  q: string;
  categoria: string;
  estado: string;
  nivel: string;
  onChange: (patch: Partial<{ q: string; categoria: string; estado: string; nivel: string }>) => void;
  onReset: () => void;
};

export default function FiltersBar({ q, categoria, estado, nivel, onChange, onReset }: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
      <div className="min-w-[220px] flex-1">
        <label className="mb-1 block text-xs font-medium text-navy-600">Buscar</label>
        <input
          value={q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Código, objeto o dependencia…"
          className="w-full rounded-lg border border-navy-100 bg-paper px-3 py-2 text-sm outline-none ring-gold-400 focus:ring-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy-600">Nivel</label>
        <select
          value={nivel}
          onChange={(e) => onChange({ nivel: e.target.value })}
          className="rounded-lg border border-navy-100 bg-paper px-3 py-2 text-sm outline-none ring-gold-400 focus:ring-2"
        >
          <option>Todos los Niveles</option>
          {NIVELES.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy-600">Categoría</label>
        <select
          value={categoria}
          onChange={(e) => onChange({ categoria: e.target.value })}
          className="rounded-lg border border-navy-100 bg-paper px-3 py-2 text-sm outline-none ring-gold-400 focus:ring-2"
        >
          <option>Todas las Categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy-600">Estado</label>
        <select
          value={estado}
          onChange={(e) => onChange({ estado: e.target.value })}
          className="rounded-lg border border-navy-100 bg-paper px-3 py-2 text-sm outline-none ring-gold-400 focus:ring-2"
        >
          <option>Todos los Estados</option>
          {ESTADOS.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </div>
      <button
        onClick={onReset}
        className="rounded-lg border border-navy-100 px-4 py-2 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
