import Image from "next/image";

export default function Header({ total, alertas }: { total: number; alertas: number }) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-7">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center">
          <Image src="/logo.png" alt="Escuela Básica Mulchén" width={64} height={64} priority />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-300">
            Escuela Básica Mulchén
          </p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Inventario Tecnológico
          </h1>
        </div>
        <div className="hidden gap-6 sm:flex">
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{total}</p>
            <p className="text-xs text-navy-300">equipos registrados</p>
          </div>
          <div className="w-px bg-navy-700" />
          <div className="text-right">
            <p className="text-2xl font-bold text-gold-400">{alertas}</p>
            <p className="text-xs text-navy-300">sin stock disponible</p>
          </div>
        </div>
      </div>
    </header>
  );
}
