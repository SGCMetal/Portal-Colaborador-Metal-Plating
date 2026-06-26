const qs = (sel) => document.querySelector(sel);

async function cargarJSON(ruta) {
  const resp = await fetch(ruta, { cache: "no-store" });
  if (!resp.ok) throw new Error(`No se pudo cargar ${ruta}`);
  return await resp.json();
}

function claseEstado(estado) {
  const normalizado = (estado || '').toLowerCase();
  if (normalizado.includes('vigente')) return 'ok';
  if (normalizado.includes('borrador')) return 'draft';
  return 'pending';
}

function crearMeta(doc) {
  const estado = doc.estado || (doc.vigente ? 'Vigente' : 'Pendiente');
  return `
    <div class="meta-row">
      <span class="pill ${claseEstado(estado)}">${estado}</span>
      <span class="pill">${doc.clave || 'Sin clave'}</span>
      <span class="pill">${doc.revision || 'Sin revisión'}</span>
      <span class="pill">${doc.fecha || 'Sin fecha'}</span>
    </div>`;
}

function crearBotones(doc) {
  if (doc.nota) {
    return `<div class="note-chip">Nota informativa</div>`;
  }
  if (doc.archivo && doc.vigente) {
    return `<div class="btn-row"><a class="btn" href="${doc.archivo}" target="_blank" rel="noopener">Ver PDF</a></div>`;
  }
  return `<div class="btn-row"><span class="btn disabled">Pendiente de carga</span></div>`;
}

function tarjetaDocumento(doc) {
  return `
    <article class="doc-card">
      <h3>${doc.titulo}</h3>
      <p>${doc.descripcion}</p>
      ${crearMeta(doc)}
      ${crearBotones(doc)}
    </article>`;
}

function renderCategory(documentos, categoria, selector) {
  const cont = qs(selector);
  if (!cont) return;
  cont.innerHTML = '';
  documentos
    .filter(doc => doc.categoria === categoria)
    .forEach(doc => cont.insertAdjacentHTML('beforeend', tarjetaDocumento(doc)));
}

function renderPoliticaDestacada(documentos) {
  const cont = qs('#politica-destacada');
  if (!cont) return;
  const politica = documentos.find(d => d.destacado);
  if (!politica) {
    cont.innerHTML = 'No se encontró documento destacado.';
    return;
  }
  cont.innerHTML = `
    <div class="doc-mini">
      <strong>${politica.titulo}</strong>
      ${crearMeta(politica)}
      ${crearBotones(politica)}
    </div>`;
}

function formatearFecha(fechaISO) {
  const [y,m,d] = (fechaISO || '').split('-').map(Number);
  if (!y || !m || !d) return fechaISO || 'Sin fecha';
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

function tarjetaComunicado(c) {
  const archivo = c.archivo ? `<a class="btn secondary" href="${c.archivo}" target="_blank" rel="noopener">Ver archivo</a>` : '';
  return `
    <article class="comunicado-card">
      <p class="fecha">${formatearFecha(c.fecha)} · ${c.tipo}</p>
      <h3>${c.titulo}</h3>
      <div class="meta-row">
        <span class="pill">${c.area}</span>
        <span class="pill ${c.estatus === 'Vigente' ? 'ok' : ''}">${c.estatus}</span>
      </div>
      <p>${c.mensaje}</p>
      ${archivo ? `<div class="btn-row">${archivo}</div>` : ''}
    </article>`;
}

function renderComunicados(comunicados, selector, limite = null) {
  const cont = qs(selector);
  if (!cont) return;
  cont.innerHTML = '';
  let lista = [...comunicados].sort((a,b) => (b.fecha || '').localeCompare(a.fecha || ''));
  if (limite) lista = lista.slice(0, limite);
  lista.forEach(c => cont.insertAdjacentHTML('beforeend', tarjetaComunicado(c)));
}

async function iniciar() {
  try {
    const [documentos, comunicados] = await Promise.all([
      cargarJSON('data/documentos.json'),
      cargarJSON('data/comunicados.json')
    ]);

    renderPoliticaDestacada(documentos);
    renderCategory(documentos, 'calidad', '#docs-calidad');
    renderCategory(documentos, 'rh', '#docs-rh');
    renderCategory(documentos, 'seguridad', '#docs-seguridad');
    renderComunicados(comunicados, '#comunicados-lista');
    renderComunicados(comunicados, '#comunicados-recientes', 2);
  } catch (err) {
    console.error(err);
    const politica = qs('#politica-destacada');
    if (politica) politica.innerHTML = 'No se pudo cargar la información. Abre el portal usando el servidor de Python incluido.';
  }
}

document.addEventListener('DOMContentLoaded', iniciar);


function iniciarBuzon() {
  const form = qs('#form-buzon');
  if (!form) return;

  const radios = form.querySelectorAll('input[name="modo"]');
  const datos = qs('#datos-personales');
  const respuesta = qs('#buzon-respuesta');

  function actualizarModo() {
    const modo = form.querySelector('input[name="modo"]:checked')?.value || 'Anónimo';
    if (modo === 'Con nombre') {
      datos.classList.remove('hidden');
    } else {
      datos.classList.add('hidden');
      form.nombre.value = '';
      form.puesto.value = '';
    }
  }

  radios.forEach(r => r.addEventListener('change', actualizarModo));
  actualizarModo();

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    respuesta.textContent = 'Enviando...';
    respuesta.className = 'form-response';

    const datosFormulario = Object.fromEntries(new FormData(form).entries());

    try {
      const resp = await fetch('/api/buzon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosFormulario)
      });

      if (!resp.ok) throw new Error('No se pudo guardar el mensaje');

      form.reset();
      actualizarModo();
      respuesta.textContent = 'Mensaje enviado correctamente. Gracias por participar.';
      respuesta.className = 'form-response ok';
    } catch (err) {
      console.warn(err);
      respuesta.textContent = 'No se pudo enviar desde este modo. Abre el portal con servidor_portal.py para guardar mensajes en CSV.';
      respuesta.className = 'form-response error';
    }
  });
}

document.addEventListener('DOMContentLoaded', iniciarBuzon);
