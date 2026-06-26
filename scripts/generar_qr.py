from pathlib import Path

try:
    import qrcode
except Exception:
    print("Falta instalar la libreria qrcode. Ejecuta: pip install qrcode[pil]")
    raise

url = input("Escribe la URL del portal para generar el QR: ").strip()
if not url:
    raise SystemExit("No se ingreso URL.")

base = Path(__file__).resolve().parents[1]
salida = base / "qr_portal_mps.png"
img = qrcode.make(url)
img.save(salida)
print(f"QR generado: {salida}")
