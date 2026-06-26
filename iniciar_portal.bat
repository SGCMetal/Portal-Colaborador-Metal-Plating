@echo off
title Portal del Colaborador MPS - Vista local
echo Iniciando vista local del Portal del Colaborador MPS...
echo.
echo Abre en tu navegador:
echo http://localhost:8000
echo.
echo Para detenerlo, cierra esta ventana.
echo.
python -m http.server 8000
pause
