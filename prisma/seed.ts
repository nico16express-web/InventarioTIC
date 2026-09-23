import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sample = [
  { nivel: "Básica", codigo: "CN0X74T0PE2000C50440", objeto: "All In One Dell Inspiron 5400", cantidad: 1, dependencia: "Laboratorio de Computación", financiamiento: "Inversión", adquisicion: "Subvención Regular", categoria: "Equipos informáticos", estado: "En uso", fecha: "2019" },
  { nivel: "Básica", codigo: "X9HG004787", objeto: "Impresora Multifuncional Epson L8160", cantidad: 1, dependencia: "Laboratorio de Computación", financiamiento: "Inversión", adquisicion: "Fondos SEP", categoria: "Equipos multicopiadores", estado: "En uso", fecha: "2024" },
  { nivel: "Básica", codigo: "NTBHZZQT8KNN", objeto: "Computador de Escritorio Clio PC-1", cantidad: 1, dependencia: "Laboratorio de Computación", financiamiento: "Inversión", adquisicion: "Fondos SEP", categoria: "Equipos informáticos", estado: "En uso", fecha: "2019" },
  { nivel: "Básica", codigo: "667804B12920", objeto: "Mouse 3D Óptico PC-1", cantidad: 1, dependencia: "Laboratorio de Computación", financiamiento: "Donación", adquisicion: "Sin información", categoria: "Equipos informáticos", estado: "En uso", fecha: "2021" },
];

async function main() {
  console.log("Sembrando datos de ejemplo...");
  for (const item of sample) {
    await prisma.item.create({ data: item });
  }
  console.log(`Listo: ${sample.length} registros creados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
