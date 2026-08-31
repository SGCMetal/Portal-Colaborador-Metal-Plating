
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

async function cargarJSON(ruta){
  const resp = await fetch(ruta, {cache:'no-store'});
  if(!resp.ok) throw new Error('No se pudo cargar ' + ruta);
  return await resp.json();
}

function claseEstado(estado){
  const e = (estado || '').toLowerCase();
  if(e.includes('vigente')) return 'ok';
  return 'info';
}

function metaHTML(doc){
  const estado = doc.estatus || (doc.vigente ? 'Vigente' : 'Pendiente');
  return `
    <div class="meta">
      <span class="pill ${claseEstado(estado)}">${estado}</span>
      <span class="pill">${doc.clave || 'Sin clave'}</span>
      <span class="pill">${doc.revision || 'Sin revisión'}</span>
    </div>`;
}

function botonesHTML(doc){
  if(doc.nota) return '<div class="note-chip">Nota informativa</div>';
  if(doc.archivo && doc.vigente) return `<div class="btn-row"><a class="btn" href="${doc.archivo}" target="_blank" rel="noopener">Abrir documento</a></div>`;
  return '<div class="btn-row"><span class="btn disabled">Pendiente de carga</span></div>';
}

function tarjetaDoc(doc){
  return `
  <article class="doc-card">
    <h3>${doc.titulo}</h3>
    <p>${doc.descripcion}</p>
    ${metaHTML(doc)}
    ${botonesHTML(doc)}
  </article>`;
}

function renderDocumentos(documentos, selector, categoria=null){
  const cont = qs(selector);
  if(!cont) return;
  const lista = categoria ? documentos.filter(d => d.categoria === categoria) : documentos;
  cont.innerHTML = lista.map(tarjetaDoc).join('');
}

function activarFiltros(documentos){
  const cont = qs('#docs-todos');
  if(!cont) return;
  qsa('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const lista = filter === 'todos' ? documentos : documentos.filter(d => d.categoria === filter);
      cont.innerHTML = lista.map(tarjetaDoc).join('');
    });
  });
}

function formatearFecha(fecha){
  if(!fecha) return 'Sin fecha';
  const p = fecha.split('-');
  if(p.length !== 3) return fecha;
  const [y,m,d] = p.map(Number);
  return new Date(y,m-1,d).toLocaleDateString('es-MX', {day:'2-digit', month:'short', year:'numeric'});
}

function tarjetaAviso(item){
  const archivo = item.archivo ? `<a class="btn secondary" href="${item.archivo}" target="_blank" rel="noopener">Ver archivo</a>` : '';
  return `
  <article class="feed-card">
    <div class="feed-head">
      <div class="feed-avatar">📣</div>
      <div class="feed-meta">
        <strong>${item.titulo}</strong>
        <span>${formatearFecha(item.fecha)} · ${item.area || 'MPS'} · ${item.tipo || 'Aviso'}</span>
      </div>
    </div>
    <p>${item.mensaje || ''}</p>
    <div class="btn-row">${archivo}</div>
  </article>`;
}

function renderAvisos(avisos, selector, limite=null){
  const cont = qs(selector);
  if(!cont) return;
  let lista = [...avisos].sort((a,b) => (b.fecha || '').localeCompare(a.fecha || ''));
  if(limite) lista = lista.slice(0, limite);
  cont.innerHTML = lista.map(tarjetaAviso).join('');
}

function activarNav(){
  const page = document.body.dataset.page;
  qsa('.bottom-nav a').forEach(a => {
    if(a.dataset.nav === page) a.classList.add('active');
  });
}

async function iniciar(){
  activarNav();
  try{
    const [documentos, avisos] = await Promise.all([
      cargarJSON('data/documentos.json'),
      cargarJSON('data/comunicados.json')
    ]);
    renderDocumentos(documentos, '#docs-identidad', 'identidad');
    renderDocumentos(documentos, '#docs-rh', 'rh');
    renderDocumentos(documentos, '#docs-seguridad', 'seguridad');
    renderDocumentos(documentos, '#docs-todos', null);
    renderAvisos(avisos, '#avisos-feed');
    activarFiltros(documentos);
  }catch(err){
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', iniciar);
