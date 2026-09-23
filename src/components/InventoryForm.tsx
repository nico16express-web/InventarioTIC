"use client";

import { useEffect, useState } from "react";
import { ADQUISICIONES, CATEGORIAS, ESTADOS, FINANCIAMIENTOS, Item, NIVELES } from "@/lib/constants";

const EMPTY = {
  nivel: "Básica",
  codigo: "",
  objeto: "",
  cantidad: 1,
  dependencia: "",
  financiamiento: FINANCIAMIENTOS[0],
  adquisicion: ADQUISICIONES[0],
  categoria: CATEGORIAS[0],
  estado: ESTADOS[0],
  fecha: "",
  observaciones: "",
};

type Props = {
  selected: Item | null;
  onSave: (data: typeof EMPTY, id: string | null) => Promise<void>;
  onDelete: (id: string) => void;
  onClear: () => void;
  saving: boolean;
};

export default function InventoryForm({ selected, onSave, onDelete, onClear, saving }: Props) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (selected) {
      setForm({
        nivel: selected.nivel,
        codigo: selected.codigo,
        objeto: selected.objeto,
        cantidad: selected.cantidad,
        dependencia: selected.dependencia,
        financiamiento: selected.financiamiento,
        adquisicion: selected.adquisicion,
        categoria: selected.categoria,
        estado: selected.estado,
        fecha: selected.fecha || "",
        observaciones: selected.observaciones || "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [selected]);

  const field = (key: keyof typeof EMPTY) => ({
    value: form[key] as any,
    onChange: (e: any) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const inputClass =
    "w-full rounded-lg border border-navy-100 bg-paper px-3 py-2 text-sm outline-none ring-gold-400 focus:ring-2";
  const labelClass = "mb-1 block text-xs font-medium text-navy-600";

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
      <h2 className="font-display mb-4 text-base font-bold text-navy-900">
        {selected ? "Editar equipo" : "Registrar equipo"}
      </h2>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Nivel</label>
            <select className={inputClass} {...field("nivel")}>
              {NIVELES.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Cantidad (stock)</label>
            <input type="number" min={0} className={inputClass} {...field("cantidad")} />
          </div>
        </div>

        <div>
          <label className={labelClass}>ID / Código *</label>
          <input className={inputClass} placeholder="Ej: INC18068107117" {...field("codigo")} />
        </div>

        <div>
          <label className={labelClass}>Objeto tecnológico *</label>
          <input className={inputClass} placeholder="Ej: Notebook HP 240 G8" {...field("objeto")} />
        </div>

        <div>
          <label className={labelClass}>Dependencia</label>
          <input
            className={inputClass}
            placeholder="Ej: Laboratorio de Computación"
            {...field("dependencia")}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Financiamiento</label>
            <select className={inputClass} {...field("financiamiento")}>
              {FINANCIAMIENTOS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Adquisición</label>
            <select className={inputClass} {...field("adquisicion")}>
              {ADQUISICIONES.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Categoría</label>
            <select className={inputClass} {...field("categoria")}>
              {CATEGORIAS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <select className={inputClass} {...field("estado")}>
              {ESTADOS.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Fecha (año o detalle)</label>
          <input className={inputClass} placeholder="Ej: 2024 o Sin información" {...field("fecha")} />
        </div>

        <div>
          <label className={labelClass}>Observaciones</label>
          <textarea className={inputClass} rows={2} {...field("observaciones")} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          disabled={saving}
          onClick={() => onSave(form, selected?.id ?? null)}
          className="flex-1 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60"
        >
          {saving ? "Guardando…" : selected ? "Actualizar" : "Agregar"}
        </button>
        {selected && (
          <button
            onClick={() => onDelete(selected.id)}
            className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
          >
            Eliminar
          </button>
        )}
        <button
          onClick={onClear}
          className="rounded-lg border border-navy-100 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
