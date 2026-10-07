# Inventario Tecnológico Escolar – Escuela Mulchén

App web (Flask). Local usa SQLite; en Vercel usa Postgres (variable `DATABASE_URL`).

## Uso local (Windows)
Doble clic en `iniciar.bat` → http://localhost:5000

## Publicar en Vercel
1. Sube esta carpeta a un repositorio **privado** de GitHub (el `.db` no se sube: está en `.gitignore`).
2. En Vercel: *Add New → Project* → importa el repositorio (detecta Flask solo).
3. En el proyecto: *Storage → Create Database → Neon (Postgres)* y conéctalo. Vercel crea `DATABASE_URL`.
4. En *Settings → Environment Variables* agrega `APP_USER` y `APP_PASS` (usuario y clave para entrar). Sin ellas, cualquiera con el enlace puede editar.
5. Copia el valor de `DATABASE_URL` y, desde esta carpeta (donde está `inventario_escolar.db`), ejecuta una vez:
   `set DATABASE_URL=...` y luego `python migrar_datos.py`
6. Haz *Redeploy* en Vercel.

Las imágenes están en `public/` (Vercel las sirve desde ahí).
