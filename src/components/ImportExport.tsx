"use client";

import { useRef, useState } from "react";

export default function ImportExport({ onImported }: { onImported: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/items/import", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al importar");
      setMsg(
        `Se importaron ${data.creados} equipos.${
          data.errores?.length ? ` (${data.errores.length} filas omitidas)` : ""
        }`
      );
      onImported();
    } catch (err: any) {
      setMsg(err.message || "Error al importar el archivo.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
      <h3 className="font-display mb-3 text-sm font-bold text-navy-900">Importar / Exportar</h3>
      <div className="flex flex-col gap-2">
        <a
          href="/api/items/export"
          className="rounded-lg bg-navy-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          Exportar a Excel
        </a>
        <button
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="rounded-lg border border-navy-100 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50 disabled:opacity-60"
        >
          {busy ? "Importando…" : "Importar desde Excel / CSV"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFile}
          className="hidden"
        />
        {msg && <p className="text-xs text-navy-600">{msg}</p>}
      </div>
    </div>
  );
}
