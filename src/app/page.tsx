"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import FiltersBar from "@/components/FiltersBar";
import InventoryTable from "@/components/InventoryTable";
import InventoryForm from "@/components/InventoryForm";
import StockControl from "@/components/StockControl";
import ImportExport from "@/components/ImportExport";
import { Item } from "@/lib/constants";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);

  const [filters, setFilters] = useState({
    q: "",
    categoria: "Todas las Categorías",
    estado: "Todos los Estados",
    nivel: "Todos los Niveles",
  });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.categoria) params.set("categoria", filters.categoria);
    if (filters.estado) params.set("estado", filters.estado);
    if (filters.nivel) params.set("nivel", filters.nivel);
    const res = await fetch(`/api/items?${params.toString()}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(fetchItems, 250); // debounce búsqueda
    return () => clearTimeout(timeout);
  }, [fetchItems]);

  async function handleSave(data: any, id: string | null) {
    setSaving(true);
    try {
      const res = await fetch(id ? `/api/items/${id}` : "/api/items", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "No se pudo guardar el registro.");
        return;
      }
      setSelected(null);
      await fetchItems();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    if (selected?.id === id) setSelected(null);
    await fetchItems();
  }

  async function handleDiscount(id: string, cantidad: number) {
    const res = await fetch("/api/items/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, cantidad }),
    });
    const updated = await res.json();
    setSelected(updated);
    await fetchItems();
  }

  const alertas = useMemo(() => items.filter((i) => i.cantidad <= 0).length, [items]);

  return (
    <main className="min-h-screen bg-paper pb-16">
      <Header total={items.length} alertas={alertas} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[340px_1fr]">
        <aside className="flex flex-col gap-5">
          <InventoryForm
            selected={selected}
            onSave={handleSave}
            onDelete={handleDelete}
            onClear={() => setSelected(null)}
            saving={saving}
          />
          <StockControl selected={selected} onDiscount={handleDiscount} />
          <ImportExport onImported={fetchItems} />
        </aside>

        <section className="flex flex-col gap-4">
          <FiltersBar
            q={filters.q}
            categoria={filters.categoria}
            estado={filters.estado}
            nivel={filters.nivel}
            onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
            onReset={() =>
              setFilters({
                q: "",
                categoria: "Todas las Categorías",
                estado: "Todos los Estados",
                nivel: "Todos los Niveles",
              })
            }
          />
          <InventoryTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
            onDelete={handleDelete}
            loading={loading}
          />
        </section>
      </div>
    </main>
  );
}
