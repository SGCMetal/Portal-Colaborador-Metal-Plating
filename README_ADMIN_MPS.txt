PORTAL DEL COLABORADOR MPS - GUIA RAPIDA

1) COMO ABRIRLO EN TU COMPUTADORA
   - Abre la carpeta Portal_Colaborador_MPS.
   - Da doble clic en iniciar_portal.bat.
   - En tu navegador abre: http://localhost:8000

2) COMO PROBARLO EN CELULAR
   - La computadora y el celular deben estar conectados a la misma red Wi-Fi.
   - En Windows abre CMD y escribe: ipconfig
   - Busca la direccion IPv4, por ejemplo: 192.168.1.25
   - En el celular abre: http://192.168.1.25:8000
   - Si no abre, revisa firewall/red. En algunas redes de empresa no permiten comunicacion entre equipos.

3) COMO ACTUALIZAR DOCUMENTOS
   - Los documentos para consulta deben estar en PDF.
   - Si quieres reemplazar la Politica de Calidad, conserva el mismo nombre:
     docs/calidad/DC-DIR-003_Politica_Calidad.pdf
   - Para activar documentos pendientes, coloca el PDF en la carpeta correspondiente y actualiza:
     data/documentos.json
   - Cambia archivo, clave, revision, fecha y vigente:true.

4) COMO ACTUALIZAR COMUNICADOS
   Opcion facil:
   - Edita data/comunicados.csv con Notepad++ o Excel.
   - Ejecuta: python scripts/generar_comunicados.py
   - Recarga la pagina del portal.

   Campos del CSV:
   fecha,titulo,area,tipo,estatus,mensaje,archivo

5) COMO GENERAR QR DE PRUEBA O FINAL
   - Ejecuta: python scripts/generar_qr.py
   - Escribe la URL del portal.
   - Se generara: qr_portal_mps.png

6) RECOMENDACION DE CONTROL
   - El portal no debe publicar documentos sensibles de clientes, precios, dibujos, especificaciones o informacion personal.
   - Mantener PDF solo para consulta.
   - La version vigente debe estar controlada por el responsable autorizado.

Contenido inicial incluido:
   - Logo MPS.
   - Politica de Calidad DC-DIR-003 convertida a PDF.
   - Estructura para Calidad/SGC, RH, Seguridad y Comunicados.


VERSIÓN 3:
- El portal ya está separado por páginas: index.html, calidad.html, rh.html, seguridad.html y comunicados.html.
- En celular aparece una barra inferior fija para navegar entre secciones.
- Si parece igual a una versión anterior, borra la carpeta anterior antes de descomprimir o limpia caché del navegador.


VERSIÓN 4:
- Calidad, RH, Seguridad y Comunicados ahora tienen una apariencia más diferenciada.
- Se agregaron franjas/resúmenes visuales únicos por sección y estilos propios en tarjetas/fondos.


VERSIÓN 5:
- Se mejoró el atractivo visual sin perder claridad.
- La portada y las secciones ahora usan tarjetas, insignias, bloques y acentos más dinámicos.
- Cada sección se siente más viva y diferenciada.


VERSIÓN 6:
- Se agregaron bloques más creativos, tarjetas más vistosas y fondos más vivos.
- RH cambió de gris a una identidad teal/turquesa más fresca.
- La portada tiene listones/resúmenes visuales y las secciones se sienten más atractivas.


VERSIÓN 7 - BUZÓN DEL COLABORADOR
- Se agregó la página buzon.html.
- Permite enviar sugerencias, quejas, necesidades o comentarios.
- El colaborador puede elegir envío Anónimo o Con nombre.
- Para que el buzón guarde mensajes, abre el portal usando iniciar_portal.bat o servidor_portal.py.
- Los mensajes se guardan en data/buzon_colaborador.csv.
- Si abres index.html directamente sin servidor, el formulario se verá, pero no podrá guardar mensajes.
- Recomendación: definir quién revisa el buzón, frecuencia de revisión y tratamiento confidencial.


VERSIÓN 8 - PRIVACIDAD Y CONTROL DEL BUZÓN
- Se eliminó el guardado de IP de origen en data/buzon_colaborador.csv.
- Se desactivó el log de acceso en consola del servidor Python.
- Se agregaron columnas de seguimiento al CSV: estatus_revision, responsable_revision y comentarios_seguimiento.
- Se agregó CONTROL_BUZON_COLABORADOR_MPS.txt.
- Se agregó COMUNICADO_LANZAMIENTO_PORTAL_MPS.txt.


VERSIÓN 9 - DOCUMENTOS REALES DE CALIDAD / SGC
- Se integraron los PDFs DC-DIR-003 Política de Calidad, DC-DIR-004 Misión, DC-DIR-005 Visión y DC-DIR-006 Valores.
- Se agregó la Guía básica para el uso correcto del SGC como borrador para revisión.
- El Mapa de procesos queda pendiente de carga.
- El portal ahora permite visualizar documentos en estado borrador si tienen archivo PDF asociado.


VERSIÓN 10 - DOCUMENTOS REALES DE CALIDAD / SGC
- Se integró DC-SGC-009 Guía básica para el uso correcto del SGC como documento vigente.
- Se integraron/confirmaron los documentos de Calidad / SGC:
  * DC-DIR-003 Política de Calidad
  * DC-DIR-004 Misión
  * DC-DIR-005 Visión
  * DC-DIR-006 Valores
  * DC-SGC-009 Guía básica para el uso correcto del SGC
- Mapa de procesos permanece pendiente de carga.


VERSIÓN 11 - PERSONAL / RH
- Se integró DC-RHU-002 Reglamento Interno en la sección Personal / RH.
- Se omitió Código de Conducta porque MPS no cuenta con documento específico.
- Asistencia y puntualidad quedó como nota informativa:
  Jornada de 6:00 a.m. a 6:00 p.m.; favor de llegar a tiempo y registrar checadas.
- Uso de gafete quedó como nota informativa.
- Reglas de comedor y áreas comunes quedaron como nota informativa.


VERSIÓN 12 - SEGURIDAD
- Toda la sección Seguridad quedó como notas informativas.
- Se actualizó EPP por área a EPP obligatorio.
- EPP obligatorio muestra:
  * Zapato industrial
  * Guantes cuando sea necesario
  * Lentes cuando sea necesario
- Se agregaron iconos visuales para la tarjeta de EPP obligatorio.


VERSIÓN FINAL DE TRABAJO
- Se entrega versión consolidada del Portal del Colaborador MPS.
- El administrador del portal será el Coordinador del SGC.
- Comunicados serán gestionados por RH / SGC / Dirección.
- Buzón del Colaborador será revisado por RH / SGC / Dirección.
- Revisión del buzón y comunicados: quincenal.
- Respaldo: periódico.
- QR y alojamiento quedan pendientes para una etapa posterior.


VERSIÓN WEB - BUZÓN CON GOOGLE FORMS
- El Buzón del Colaborador fue adaptado para usar Google Forms.
- Liga del formulario: https://docs.google.com/forms/d/e/1FAIpQLSewBGHp7c_jRxtkH9OO-62f5FGheH67mSQRC5M9bnCL1MNGZw/viewform?usp=sharing&ouid=113415303447286872352
- Las respuestas deberán revisarse en Google Sheets por RH / SGC / Dirección.
- Ya no se requiere servidor Python para recibir mensajes del buzón.
- El portal queda listo para publicarse en GitHub Pages.
