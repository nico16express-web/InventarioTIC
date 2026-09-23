export const NIVELES = ["Parvularia", "Básica", "Media"] as const;

export const CATEGORIAS = [
  "Equipos informáticos",
  "Equipos multicopiadores",
  "Audiovisual y proyección",
  "Redes y conectividad",
  "Mobiliario tecnológico",
  "Otros",
] as const;

export const FINANCIAMIENTOS = [
  "Inversión",
  "Fondos SEP",
  "Subvención Regular",
  "Donación",
  "PIE",
  "Otro",
] as const;

export const ADQUISICIONES = ["Compra", "Donación", "Comodato", "Sin información"] as const;

export const ESTADOS = [
  "En uso",
  "En bodega",
  "En reparación",
  "Dado de baja",
  "Prestado",
] as const;

export type Item = {
  id: string;
  nivel: string;
  codigo: string;
  objeto: string;
  cantidad: number;
  dependencia: string;
  financiamiento: string;
  adquisicion: string;
  categoria: string;
  estado: string;
  fecha: string | null;
  observaciones: string | null;
  createdAt: string;
  updatedAt: string;
};
