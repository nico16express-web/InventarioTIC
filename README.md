# Inventario Tecnológico · Escuela Básica Mulchén

Aplicación web para gestionar el inventario tecnológico escolar: registrar equipos, filtrar y
buscar, descontar stock, e importar/exportar en Excel. Construida con **Next.js 14**,
**Prisma** y **PostgreSQL**, lista para desplegarse en **Vercel** con una base de datos incluida.

## 1. Requisitos

- [Node.js](https://nodejs.org) 18 o superior
- Una cuenta gratuita en [GitHub](https://github.com)
- Una cuenta gratuita en [Vercel](https://vercel.com)

## 2. Ejecutar en tu computador (opcional, para probar antes de publicar)

```bash
npm install
cp .env.example .env
# Edita .env con una base de datos Postgres (puedes crear una gratis en https://neon.tech
# o en Vercel, ver paso 4 más abajo, y pegar aquí sus credenciales)

npx prisma migrate dev --name init   # crea las tablas
npm run db:seed                       # (opcional) carga datos de ejemplo
npm run dev                           # abre http://localhost:3000
```

## 3. Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Inventario tecnológico Escuela Mulchén"
```

Luego, en GitHub:
1. Crea un repositorio nuevo (vacío, sin README) en https://github.com/new
2. Copia los comandos que GitHub te muestra bajo "…or push an existing repository", algo así:

```bash
git remote add origin https://github.com/TU-USUARIO/inventario-mulchen.git
git branch -M main
git push -u origin main
```

## 4. Publicar en Vercel con base de datos incluida

1. Entra a https://vercel.com/new e importa el repositorio que acabas de subir a GitHub.
2. Antes de darle a "Deploy", ve a la pestaña **Storage** del proyecto (o hazlo después del
   primer deploy) y elige **Create Database → Postgres** (Vercel usa Neon por debajo). Está
   disponible en el plan gratuito.
3. Conecta esa base de datos a tu proyecto. Vercel agrega automáticamente las variables
   `DATABASE_URL` y `DIRECT_URL` (o `POSTGRES_PRISMA_URL` / `POSTGRES_URL_NON_POOLING`, según
   la integración — si los nombres difieren, cópialos en **Settings → Environment Variables**
   como `DATABASE_URL` y `DIRECT_URL` para que coincidan con `prisma/schema.prisma`).
4. Despliega el proyecto (botón **Deploy**).
5. Crea las tablas en la base de datos de producción ejecutando, una sola vez, desde tu
   computador (con el `.env` apuntando a la base de datos de Vercel):
   ```bash
   npx prisma migrate deploy
   ```
   o, más simple para empezar rápido:
   ```bash
   npx prisma db push
   ```
6. Recarga la URL de tu proyecto en Vercel — la app ya debería funcionar con la base de datos
   conectada.

Cada vez que hagas `git push` a `main`, Vercel vuelve a publicar la app automáticamente.

## 5. Funciones principales

- **Registrar / editar / eliminar** equipos tecnológicos con nivel, código, dependencia,
  financiamiento, adquisición, categoría, estado y fecha.
- **Buscar y filtrar** por texto, nivel, categoría y estado.
- **Descontar stock** rápidamente desde el panel lateral.
- **Exportar a Excel** el inventario completo con un clic.
- **Importar desde Excel/CSV**: sube un archivo con columnas como `Nivel, ID/Código, Objeto
  Tecnológico, Stock, Dependencia, Financiamiento, Adquisición, Categoría, Estado, Fecha` (el
  sistema reconoce variaciones de estos encabezados).

## 6. Estructura del proyecto

```
src/app/            Páginas y rutas de la API (Next.js App Router)
src/components/     Componentes de la interfaz
src/lib/            Cliente de Prisma y constantes compartidas
prisma/schema.prisma Modelo de la base de datos
```
