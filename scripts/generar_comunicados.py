import csv
import json
from pathlib import Path

base = Path(__file__).resolve().parents[1]
csv_path = base / "data" / "comunicados.csv"
json_path = base / "data" / "comunicados.json"

with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
    rows = list(csv.DictReader(f))

# Normaliza campos esperados
campos = ["fecha", "titulo", "area", "tipo", "estatus", "mensaje", "archivo"]
limpios = []
for row in rows:
    item = {campo: (row.get(campo, "") or "").strip() for campo in campos}
    if item["titulo"]:
        limpios.append(item)

json_path.write_text(json.dumps(limpios, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Comunicados actualizados: {len(limpios)} registro(s).")
print(f"Archivo generado: {json_path}")
