
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

const icon = {
  home:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`,
  star:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.9 5.87 6.48.94-4.69 4.57 1.11 6.46L12 17.77 6.2 20.84l1.11-6.46L2.62 9.81l6.48-.94L12 3z"/></svg>`,
  users:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  shield:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  bell:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></svg>`,
  message:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>`,
  more:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
  library:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  open:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>`,
  info:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  pin:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m12 17 4-4 4 1-9-9-1 4-4 4 6 4z"/><path d="M7 17 3 21"/></svg>`,
  bookmark:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21 12 17 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  search:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  spark:`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/></svg>`
};

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
  return `<div class="meta">
    <span class="pill ${claseEstado(estado)}">${estado}</span>
    <span class="pill">${doc.clave || 'Sin clave'}</span>
    <span class="pill">${doc.revision || 'Sin revisión'}</span>
  </div>`;
}
function botonesHTML(doc){
  if(doc.nota) return '<div class="note-chip">Nota informativa</div>';
  if(doc.archivo && doc.vigente) return `<div class="btn-row"><a class="btn" href="${doc.archivo}" target="_blank" rel="noopener">${icon.open}<span>Abrir</span></a></div>`;
  return '<div class="btn-row"><span class="btn disabled">Pendiente de carga</span></div>';
}
function previewHTML(doc){
  if(doc.archivo && doc.vigente && doc.categoria === 'identidad' && !doc.nota){
    return `<div class="preview-pane">
      <span class="preview-label">${icon.search}<span>Vista rápida</span></span>
      <iframe src="${doc.archivo}#toolbar=0&navpanes=0&scrollbar=0&page=1" loading="lazy" title="${doc.titulo}"></iframe>
    </div>`;
  }
  return '';
}
function tarjetaDoc(doc, preview=false){
  return `<article class="doc-card${preview ? ' preview-card' : ''}">
    ${preview ? previewHTML(doc) : ''}
    <h3>${doc.titulo}</h3>
    <p>${doc.descripcion}</p>
    ${metaHTML(doc)}
    ${botonesHTML(doc)}
  </article>`;
}
function renderDocumentos(documentos, selector, categoria=null, preview=false){
  const cont = qs(selector);
  if(!cont) return;
  const lista = categoria ? documentos.filter(d => d.categoria === categoria) : documentos;
  cont.innerHTML = lista.map(d => tarjetaDoc(d, preview)).join('');
}
function activarFiltros(documentos){
  const cont = qs('#docs-todos');
  if(!cont) return;
  qsa('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      const lista = f === 'todos' ? documentos : documentos.filter(d => d.categoria === f);
      cont.innerHTML = lista.map(d => tarjetaDoc(d, false)).join('');
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
function areaColor(area=''){
  const t = area.toLowerCase();
  if(t.includes('rh') || t.includes('personal')) return 'RH';
  if(t.includes('sgc') || t.includes('calidad')) return 'SGC';
  if(t.includes('dire')) return 'DIR';
  if(t.includes('seg')) return 'SEG';
  if(t.includes('todo')) return 'MPS';
  return 'MPS';
}
function featuredAvisoHTML(item){
  if(!item) return '';
  const archivo = item.archivo ? `<a class="btn secondary" href="${item.archivo}" target="_blank" rel="noopener">${icon.open}<span>Ver archivo</span></a>` : '';
  return `<article class="featured-card">
    <div class="post-media">
      <div class="post-media-icon">${icon.spark}</div>
      <div class="post-media-title">
        <small>Aviso destacado</small>
        <strong>${item.titulo || 'Aviso'}</strong>
      </div>
    </div>
    <div class="post-pad">
      <div class="post-head">
        <div class="post-avatar"><div class="post-avatar-inner">${areaColor(item.area)}</div></div>
        <div class="post-meta">
          <strong>${item.area || 'MPS'}</strong>
          <span>${formatearFecha(item.fecha)} · ${item.tipo || 'Aviso'}</span>
        </div>
        <div class="post-menu">${icon.more}</div>
      </div>
      <div class="post-caption">
        <strong>${item.titulo}</strong>
        <p>${item.mensaje || ''}</p>
      </div>
      <div class="post-actions">
        <div class="post-action-icons">
          <span class="icon-btn">${icon.pin}</span>
          <span class="icon-btn">${icon.info}</span>
          <span class="icon-btn">${icon.bookmark}</span>
        </div>
      </div>
      <div class="post-tags">
        <span class="compact-chip">${formatearFecha(item.fecha)}</span>
        <span class="compact-chip">${item.area || 'MPS'}</span>
        <span class="compact-chip">${item.tipo || 'Aviso'}</span>
      </div>
      <div class="btn-row">${archivo}</div>
    </div>
  </article>`;
}
function tarjetaAviso(item){
  const archivo = item.archivo ? `<a class="btn secondary" href="${item.archivo}" target="_blank" rel="noopener">${icon.open}<span>Ver archivo</span></a>` : '';
  return `<article class="feed-card aviso-card">
    <div class="feed-head">
      <div class="feed-avatar"><div class="feed-avatar-inner">${areaColor(item.area)}</div></div>
      <div class="feed-meta">
        <strong>${item.area || 'MPS'}</strong>
        <span>${formatearFecha(item.fecha)} · ${item.tipo || 'Aviso'}</span>
      </div>
      <div class="post-menu">${icon.more}</div>
    </div>
    <div class="post-caption">
      <strong>${item.titulo}</strong>
      <p>${item.mensaje || ''}</p>
    </div>
    <div class="post-tags">
      <span class="compact-chip">${item.area || 'MPS'}</span>
      <span class="compact-chip">${item.tipo || 'Aviso'}</span>
    </div>
    <div class="btn-row">${archivo}</div>
  </article>`;
}
function renderStories(avisos){
  const cont = qs('#story-filters');
  if(!cont) return;
  const areas = ['Todos', ...new Set(avisos.map(a => a.area || 'MPS'))];
  cont.innerHTML = areas.map((area, idx) => `
    <button class="story-chip ${idx===0 ? 'active' : ''}" data-story="${area.toLowerCase()}">
      <div class="story-bubble"><div class="story-inner">${area === 'Todos' ? icon.spark : `<span style="font-weight:900;font-size:.74rem">${areaColor(area)}</span>`}</div></div>
      <span>${area}</span>
    </button>
  `).join('');
  qsa('.story-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.story-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filtrarAvisos(btn.dataset.story);
    });
  });
}
let avisosCache = [];
function filtrarAvisos(filtro){
  const destacado = qs('#aviso-destacado');
  const feed = qs('#avisos-feed');
  let lista = [...avisosCache];
  if(filtro && filtro !== 'todos'){
    lista = lista.filter(a => (a.area || 'MPS').toLowerCase() === filtro);
  }
  if(destacado) destacado.innerHTML = lista.length ? featuredAvisoHTML(lista[0]) : '<div class="info-box"><p>No hay avisos para esta categoría.</p></div>';
  if(feed) feed.innerHTML = lista.slice(1).map(tarjetaAviso).join('') || '<div class="info-box"><p>No hay más avisos para esta categoría.</p></div>';
}
function renderAvisos(avisos){
  avisosCache = [...avisos].sort((a,b) => (b.fecha || '').localeCompare(a.fecha || ''));
  renderStories(avisosCache);
  filtrarAvisos('todos');
}
function activarNav(){
  const page = document.body.dataset.page;
  qsa('.bottom-nav a').forEach(a => { if(a.dataset.nav === page) a.classList.add('active'); });
}
function renderStaticIcons(){
  qsa('[data-icon]').forEach(el => {
    const key = el.dataset.icon;
    if(icon[key]) el.innerHTML = icon[key];
  });
}
async function iniciar(){
  renderStaticIcons();
  activarNav();
  try{
    const [documentos, avisos] = await Promise.all([
      cargarJSON('data/documentos.json'),
      cargarJSON('data/comunicados.json')
    ]);
    renderDocumentos(documentos, '#docs-identidad', 'identidad', true);
    renderDocumentos(documentos, '#docs-rh', 'rh', false);
    renderDocumentos(documentos, '#docs-seguridad', 'seguridad', false);
    renderDocumentos(documentos, '#docs-todos', null, false);
    renderAvisos(avisos);
    activarFiltros(documentos);
  }catch(err){
    console.error(err);
  }
}
document.addEventListener('DOMContentLoaded', iniciar);
