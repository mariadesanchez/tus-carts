// Tus Carts · menú lateral para pasar de una app a otra, y una etiqueta que siempre dice en qué sección estás.
// El mismo archivo va en todas las apps (Super, Perfu, Tecno, Mundo Apple, Juguetes y Deporte, Tus Carts).
(function () {
  if (window.tusCartsNav) return;
  const JYD = 'https://juguetes-cart-y-deporte-cart.vercel.app';
  const SECCIONES = [
    { id: 'inicio', nombre: 'Tus Carts', sub: 'Todas las apps', url: 'https://tus-carts.vercel.app', color: '#5B5BD6', ico: '🏠' },
    { id: 'super', nombre: 'Super Cart', sub: 'Coto, Carrefour, ChangoMás, Día', url: 'https://compras-super-cart.vercel.app', color: '#22A55B', ico: '🛒' },
    { id: 'perfu', nombre: 'Perfu Cart', sub: 'Perfumería y farmacia', url: 'https://perfu-cart.vercel.app', color: '#E2367F', ico: '💄' },
    { id: 'tecno', nombre: 'Tecno Cart', sub: 'Tecnología y electro', url: 'https://tecno-cart.vercel.app', color: '#7B5CFF', ico: '📺' },
    { id: 'apple', nombre: 'Mundo Apple', sub: 'iPhone, iPad, Mac, AirPods', url: 'https://tecno-cart.vercel.app/apple', color: '#F0603F', ico: '' },
    { id: 'juguetes', nombre: 'Juguetes Cart', sub: 'Cebra, Kinderland y LEGO', url: JYD + '/juguetes', color: '#F28C00', ico: '🧸' },
    { id: 'indumentaria', nombre: 'Indumentaria Cart', sub: 'Dexter, Moov, Stock Center, Sporting, Grid', url: JYD + '/indumentaria', color: '#0F9F8F', ico: '👟' },
  ];
  const ETIQUETA = {};

  // ¿Dónde estoy?
  function detectar() {
    const h = location.hostname, p = location.pathname, qs = new URLSearchParams(location.search);
    const forzado = document.currentScript && document.currentScript.dataset.app;
    if (forzado) return forzado;
    if (/perfu-cart/.test(h)) return 'perfu';
    if (/tecno-cart/.test(h)) return (/^\/apple\/?$/.test(p) || qs.get('apple') === '1') ? 'apple' : 'tecno';
    if (/juguetes-cart/.test(h)) return (/^\/indumentaria\/?$/.test(p) || qs.get('seccion') === 'deporte') ? 'indumentaria' : 'juguetes';
    if (/tus-carts/.test(h)) return 'inicio';
    return 'super';
  }
  let actual = detectar();

  const css = `
  .tcn-bar{position:fixed;top:max(8px,env(safe-area-inset-top));left:12px;z-index:31;display:flex;align-items:center;gap:6px;max-width:calc(100vw - 170px)}
  .tcn-btn{appearance:none;border:2px solid rgba(255,255,255,.7);background:rgba(30,20,50,.38);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);color:#fff;
    width:40px;height:40px;border-radius:999px;display:grid;place-items:center;cursor:pointer;flex:none;box-shadow:0 6px 16px -8px rgba(0,0,0,.6);padding:0}
  .tcn-btn svg{width:20px;height:20px;stroke:currentColor;stroke-width:2.4;fill:none;stroke-linecap:round}
  .tcn-pill{display:flex;align-items:center;gap:6px;min-width:0;border:2px solid rgba(255,255,255,.7);background:rgba(30,20,50,.38);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
    color:#fff;border-radius:999px;padding:5px 12px 5px 6px;font:800 13px/1.1 Figtree,system-ui,sans-serif;cursor:pointer;box-shadow:0 6px 16px -8px rgba(0,0,0,.6)}
  .tcn-pill i{width:22px;height:22px;border-radius:999px;display:grid;place-items:center;font-style:normal;font-size:13px;flex:none}
  .tcn-pill span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .tcn-pill small{display:block;font-weight:600;font-size:10px;opacity:.8;letter-spacing:.04em;text-transform:uppercase}
  .tcn-back{position:fixed;inset:0;z-index:95;background:rgba(20,14,35,.45);opacity:0;pointer-events:none;transition:opacity .2s}
  .tcn-back.on{opacity:1;pointer-events:auto}
  .tcn-panel{position:fixed;top:0;bottom:0;left:0;z-index:96;width:min(320px,86vw);background:#fff;color:#1B1530;transform:translateX(-102%);transition:transform .22s ease;
    display:flex;flex-direction:column;box-shadow:12px 0 40px -12px rgba(0,0,0,.4);font-family:Figtree,system-ui,sans-serif;padding-top:env(safe-area-inset-top)}
  .tcn-panel.on{transform:none}
  .tcn-head{display:flex;align-items:center;justify-content:space-between;padding:18px 16px 10px}
  .tcn-head b{font-family:Fredoka,Figtree,sans-serif;font-size:22px;letter-spacing:-.01em}
  .tcn-x{appearance:none;border:0;background:#F2EFF8;width:36px;height:36px;border-radius:999px;font-size:20px;cursor:pointer;color:#1B1530}
  .tcn-list{list-style:none;margin:0;padding:4px 10px 24px;overflow:auto}
  .tcn-list li{margin:0 0 6px}
  .tcn-list a{display:flex;align-items:center;gap:12px;padding:10px;border-radius:14px;text-decoration:none;color:inherit;border:2px solid transparent}
  .tcn-list a:hover{background:#F6F3FC}
  .tcn-list a.on{border-color:var(--c);background:color-mix(in srgb,var(--c) 10%,#fff)}
  .tcn-list .ic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:20px;flex:none;background:var(--c);color:#fff;box-shadow:0 3px 0 color-mix(in srgb,var(--c) 70%,#000)}
  .tcn-list .tx{min-width:0;flex:1}
  .tcn-list .tx b{display:block;font-size:16px}
  .tcn-list .tx small{display:block;color:#6B6480;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .tcn-list .aca{font-size:11px;font-weight:800;color:var(--c);text-transform:uppercase;letter-spacing:.04em;flex:none}
  .tcn-grupo{font-size:11px;font-weight:800;color:#8A84A0;text-transform:uppercase;letter-spacing:.06em;padding:12px 10px 4px}
  @media (prefers-reduced-motion:reduce){.tcn-panel,.tcn-back{transition:none}}`;

  const manzana = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#fff" d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1.1 2.6-2.1.8-1.2 1.2-2.3 1.2-2.4 0 0-2.2-.9-2.2-3.4zM14.3 6.1c.6-.7 1-1.7.9-2.6-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5 1 .1 1.9-.5 2.5-1.2z"/></svg>';
  const icono = s => s.id === 'apple' ? manzana : s.ico;

  function armar() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const bar = document.createElement('div'); bar.className = 'tcn-bar';
    bar.innerHTML = '<button type="button" class="tcn-btn" aria-label="Menú de secciones" aria-haspopup="dialog" aria-expanded="false">'
      + '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'
      + '<button type="button" class="tcn-pill" aria-label="Sección actual"><i></i><span><small>Estás en</small><b></b></span></button>';
    const back = document.createElement('div'); back.className = 'tcn-back';
    const panel = document.createElement('nav'); panel.className = 'tcn-panel'; panel.setAttribute('aria-label', 'Secciones'); panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = '<div class="tcn-head"><b>Tus Carts</b><button type="button" class="tcn-x" aria-label="Cerrar">×</button></div><ul class="tcn-list"></ul>';
    // Fuera del <body>: algunas apps ocultan todo el body menos el encabezado mientras no iniciaste sesión
    const raiz = document.createElement('div'); raiz.id = 'tcn'; raiz.append(bar, back, panel);
    document.documentElement.appendChild(raiz);

    const ul = panel.querySelector('ul');
    SECCIONES.forEach((s, i) => {
      if (i === 1) { const g = document.createElement('li'); g.className = 'tcn-grupo'; g.textContent = 'Secciones'; ul.appendChild(g); }
      const li = document.createElement('li');
      li.innerHTML = `<a href="${s.url}" data-id="${s.id}" style="--c:${s.color}"><span class="ic">${icono(s)}</span><span class="tx"><b></b><small></small></span><span class="aca" hidden>Estás acá</span></a>`;
      li.querySelector('b').textContent = s.nombre; li.querySelector('small').textContent = s.sub;
      ul.appendChild(li);
    });

    const btn = bar.querySelector('.tcn-btn'), pill = bar.querySelector('.tcn-pill');
    function abrir() { panel.classList.add('on'); back.classList.add('on'); panel.setAttribute('aria-hidden', 'false'); btn.setAttribute('aria-expanded', 'true'); setTimeout(() => panel.querySelector('a.on, a').focus(), 50); }
    function cerrar() { panel.classList.remove('on'); back.classList.remove('on'); panel.setAttribute('aria-hidden', 'true'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', abrir); pill.addEventListener('click', abrir);
    back.addEventListener('click', cerrar); panel.querySelector('.tcn-x').addEventListener('click', cerrar);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

    function pintar() {
      const s = SECCIONES.find(x => x.id === actual) || SECCIONES[0];
      const i = pill.querySelector('i'); i.style.background = s.color; i.innerHTML = icono(s);
      pill.querySelector('b').textContent = ETIQUETA[s.id] || s.nombre;
      ul.querySelectorAll('a').forEach(a => { const on = a.dataset.id === actual; a.classList.toggle('on', on); a.querySelector('.aca').hidden = !on; if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    }
    pintar();
    window.tusCartsNav = { actual(id) { actual = id; pintar(); }, abrir, cerrar };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', armar); else armar();
})();
