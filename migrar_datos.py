"""Copia los datos de inventario_escolar.db (SQLite) a Postgres. Uso:
   Windows:  set DATABASE_URL=postgres://...   y luego   python migrar_datos.py
   Mac/Linux: DATABASE_URL=postgres://... python migrar_datos.py"""
import os, sqlite3, sys
if not os.environ.get("DATABASE_URL"):
    sys.exit("Falta la variable DATABASE_URL (cadena de conexión de Postgres).")
from app import init_db, Conn
init_db()
src = sqlite3.connect("inventario_escolar.db")
rows = src.execute("SELECT id,nivel,objeto_tecnologico,cantidad,dependencia,financiamiento,adquisicion,categoria,estado,fecha FROM inventario").fetchall()
c = Conn()
for r in rows:
    c.execute("INSERT INTO inventario VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT (id) DO NOTHING", r)
c.commit(); c.close()
print(f"Listo: {len(rows)} registros copiados.")
