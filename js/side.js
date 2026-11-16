// J.C. Broch – felles skript for alle sider. Hver del sjekker selv om elementene den trenger finnes.

  // Laster: teller 1–100 %, men går ikke forbi 90 % før siden og fontene er lastet
  (() => {
    const el = document.getElementById('laster');
    if (!el) return;
    const tall = el.querySelector('.laster-tall');
    const rolig = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const varighet = rolig ? 400 : 2200;       // minste visningstid i ms
    const start = performance.now();
    let klar = false, vist = 1;
    document.documentElement.classList.add('laster-aktiv');
    Promise.all([
      new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true })),
      document.fonts ? document.fonts.ready : Promise.resolve()
    ]).then(() => { klar = true; });
    const ease = t => 1 - Math.pow(1 - t, 3);
    const steg = (na) => {
      const t = Math.min(1, (na - start) / varighet);
      let mal = Math.max(1, Math.round(ease(t) * 100));
      if (!klar) mal = Math.min(mal, 90);
      if (mal > vist) { vist = mal; tall.textContent = vist + '%'; el.setAttribute('aria-valuenow', vist); }
      if (vist >= 100) {
        el.classList.add('ferdig');
        dispatchEvent(new Event('laster-ferdig'));
        document.documentElement.classList.remove('laster-aktiv');
        el.addEventListener('transitionend', () => el.remove(), { once: true });
        setTimeout(() => el.remove(), 1200);
        return;
      }
      requestAnimationFrame(steg);
    };
    requestAnimationFrame(steg);
  })();

  // Hero: grainy ball glir mykt etter musepekeren (lerp). Står stille på berøringsskjerm og ved redusert bevegelse.
  (() => {
    const hero = document.querySelector('.hero');
    if (!hero || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
    const hvile = { x: 64, y: 48 };
    let mx = hvile.x, my = hvile.y, x = mx, y = my, kjorer = false;
    const tegn = () => {
      x += (mx - x) * .018; y += (my - y) * .018;   // lav faktor = flyter tregt etter pekeren
      hero.style.setProperty('--ball-x', x.toFixed(2) + '%');
      hero.style.setProperty('--ball-y', y.toFixed(2) + '%');
      kjorer = Math.abs(mx - x) > .02 || Math.abs(my - y) > .02;
      if (kjorer) requestAnimationFrame(tegn);
    };
    const start = () => { if (!kjorer) { kjorer = true; requestAnimationFrame(tegn); } };
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width * 100; my = (e.clientY - r.top) / r.height * 100; start();
    });
    hero.addEventListener('pointerleave', () => { mx = hvile.x; my = hvile.y; start(); });
  })();

  // Sidebredde uten rullefelt, brukes til kolonnebredden i .hero-monster
  const settVb = () => document.documentElement.style.setProperty('--vb', document.documentElement.clientWidth + 'px');
  settVb(); new ResizeObserver(settVb).observe(document.body);

  // Ovale knapper: fargesirkler vokser ut fra der pekeren kommer inn, og trekker seg sammen der den går ut
  document.querySelectorAll('.knapp-oval').forEach((k) => {
    const punkt = (e) => {
      const r = k.getBoundingClientRect();
      k.style.setProperty('--x', (e.clientX - r.left) + 'px');
      k.style.setProperty('--y', (e.clientY - r.top) + 'px');
    };
    k.addEventListener('pointerenter', (e) => { punkt(e); k.classList.add('er-over'); });
    k.addEventListener('pointerleave', (e) => { punkt(e); k.classList.remove('er-over'); });
  });

  // Rulleanimasjoner (inspirert av conwest.com): ord for ord på tekst, bilder glir opp og vokser svakt,
  // små elementer toner inn. Bare når brukeren ikke har slått av bevegelse. Teksten endres ikke, ord pakkes bare i <span>.
  (() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const rot = document.documentElement;
    rot.classList.add('rull');
    const merk = (sel, type) => document.querySelectorAll(sel).forEach((el) => el.dataset.r = type);
    merk('.hero .t-h1, .ingress, .tekst-h .t-stor, .port-liste .t-h3, .modul .t-ingress, .spalte-smal .t-stor, .spalte-band .t-stor, .omrade-tekst .t-stor, .omrade-tittel', 'ord');
    merk('.etikett, .lenke, .port-liste p, .adresse, .bunn-meny li, .bunn-logo, .til-topp, .snarveier, .bla-ned', 'inn');
    merk('.bilde-v, .klynge, .monster, .klynge3 img, .omrade-bilde, .mosaikk', 'bilde');
    merk('.org', 'org');
    // Undersidene (AD 13.11.2026): alle elementer lastes rolig inn når de ruller inn
    merk('.p-tittel, .om-flyt .t-stor, .om-flyt .t-ingress, .om-band .t-stor', 'ord');
    merk('.hero-tittel .etikett, .p-tekst .t-brod, .p-tekst .t-stor, .spalte-ingress, .om-band-ikon, .om-band-strek, .om-band .lenke, .rullemeny-lenker a', 'inn');
    merk('.p-bilde, .om-band-bilde, .port-propell, .hi-bilde', 'bilde');
    merk('.k3, .om-propell, .modul-blad', 'fade');
    merk('.omrade-tekst .t-brod', 'inn');
    // Ord for ord
    document.querySelectorAll('[data-r="ord"]').forEach((el) => {
      let i = 0;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const noder = []; while (walker.nextNode()) noder.push(walker.currentNode);
      noder.forEach((n) => {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((del) => {
          if (!del) return;
          if (/^\s+$/.test(del)) { frag.append(del); return; }
          const sp = document.createElement('span'); sp.className = 'ord'; sp.style.setProperty('--i', i++); sp.textContent = del; frag.append(sp);
        });
        n.replaceWith(frag);
      });
    });
    // Forskyv søsken som kommer inn samtidig
    document.querySelectorAll('[data-r]').forEach((el) => {
      const sosken = [...el.parentElement.children].filter((s) => s.dataset.r);
      el.style.setProperty('--d', (sosken.indexOf(el) * 90) + 'ms');
    });
    const vis = (el) => el.classList.add('vist');
    const io = new IntersectionObserver((liste) => liste.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      if (e.target.closest('.hero') && rot.classList.contains('laster-aktiv')) addEventListener('laster-ferdig', () => vis(e.target), { once: true });
      else vis(e.target);
    }), { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('[data-r]').forEach((el) => io.observe(el));
  })();

  // Kort som festes i toppen etter tur. Er et kort høyere enn skjermen, klebes det først når bunnen er synlig.
  (() => {
    const lag = document.querySelectorAll('.hero, main > .kort, .modul-ramme, footer.lag-1');
    const sett = () => lag.forEach((el) => el.style.setProperty('--klebe', Math.min(0, innerHeight - el.offsetHeight) + 'px'));
    sett(); const ro = new ResizeObserver(sett); lag.forEach((el) => ro.observe(el)); addEventListener('resize', sett);
  })();

  // Historien: hjørnene runder seg gradvis (0 → --radius-seksjon over 160 px) når kortet slipper og glir mot bunnfeltet.
  (() => {
    const h = document.querySelector('.historien');
    if (!h) return;
    document.documentElement.classList.add('rull-kort');
    let r = -1;
    const oppdater = () => {
      const R = Math.min(64, Math.max(32, innerWidth * .0333));             // samme som --radius-seksjon
      const klebe = parseFloat(h.style.getPropertyValue('--klebe')) || 0;   // toppen når kortet står fast
      const flyttet = Math.max(0, klebe - h.getBoundingClientRect().top);   // hvor langt kortet har glidd bort
      const ny = Math.round(Math.min(1, flyttet / 160) * R);
      if (ny !== r) { r = ny; h.style.setProperty('--hist-runding', r + 'px'); }
    };
    addEventListener('scroll', () => requestAnimationFrame(oppdater), { passive: true });
    addEventListener('resize', oppdater); oppdater();
  })();

  // Bunnfeltet: industriblå glød og forløpning flyter tregt etter musepekeren, som i hero
  (() => {
    const f = document.querySelector('footer.bunn');
    if (!f || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
    const hvile = { x: 66, y: 30 };
    let mx = hvile.x, my = hvile.y, x = mx, y = my, kjorer = false;
    const tegn = () => {
      x += (mx - x) * .018; y += (my - y) * .018;
      f.style.setProperty('--bunn-x', x.toFixed(2) + '%'); f.style.setProperty('--bunn-y', y.toFixed(2) + '%');
      // forløpningen følger samme bevegelse, men bare 60 % av veien (rolig dybde): hvile 66 % / 22 %
      f.style.setProperty('--bunn-gx', (66 + (x - hvile.x) * .6).toFixed(2) + '%'); f.style.setProperty('--bunn-gy', (22 + (y - hvile.y) * .6).toFixed(2) + '%');
      kjorer = Math.abs(mx - x) > .02 || Math.abs(my - y) > .02;
      if (kjorer) requestAnimationFrame(tegn);
    };
    const start = () => { if (!kjorer) { kjorer = true; requestAnimationFrame(tegn); } };
    f.addEventListener('pointermove', (e) => { const r = f.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width * 100; my = (e.clientY - r.top) / r.height * 100; start(); });
    f.addEventListener('pointerleave', () => { mx = hvile.x; my = hvile.y; start(); });
  })();

  // Meny: åpne/lukke, Esc lukker, fokus tilbake til knappen
  const knapp = document.querySelector('.meny-knapp');
  const meny = document.getElementById('meny');
  const lukk = meny.querySelector('.meny-lukk');
  // Glasspanel som glir inn fra høyre (test etter iwcglobal.net, AD 13.11.2026). Sløret bak lukker ved klikk.
  const slor = document.createElement('div');
  slor.className = 'meny-slor';
  meny.before(slor);
  let tidtaker;
  const sett = (apen) => {
    clearTimeout(tidtaker);
    knapp.setAttribute('aria-expanded', apen);
    document.documentElement.classList.toggle('meny-apen', apen);
    if (apen) {
      meny.hidden = false;
      meny.offsetWidth;
      requestAnimationFrame(() => document.documentElement.classList.add('meny-inne'));
      lukk.focus({ preventScroll: true });
    } else {
      document.documentElement.classList.remove('meny-inne');
      tidtaker = setTimeout(() => { meny.hidden = true; }, 1100);
      knapp.focus({ preventScroll: true });
    }
  };
  slor.addEventListener('click', () => sett(false));
  knapp.addEventListener('click', () => sett(true));
  lukk.addEventListener('click', () => sett(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !meny.hidden) sett(false); });

  // Om oss: tre bildekort som skyves opp i hver sin fart mens man ruller (rolig, lerp).
  // Kort 1 står stille, kort 2 og 3 starter 48 og 96 px lavere og glir på plass når headeren har rullet halvveis.
  // Avrundingen regnes ut fra kortets egen bredde (3,33 %, som Historien-modulen på forsiden).
  (() => {
    const kort = [...document.querySelectorAll('.k3')];
    if (!kort.length) return;
    const runding = () => kort.forEach((k) => k.style.setProperty('--k3-b', k.offsetWidth + 'px'));
    runding(); addEventListener('resize', runding);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth < 1024) return;
    const start = [0, 144, 288];   // lengre vei opp (AD 13.11.2026), samme sluttposisjon
    const naa = start.slice();
    let mal = start.slice(), kjorer = false;
    const regn = () => {
      // Headeren festes når bildene står helt i skjermen (hero-spor). Kortene glir opp mens den står fast,
      // og når alle står på linje, holder den en kort pause før siden ruller videre.
      const h = document.querySelector('.hero-spor > .hero');
      const fest = h ? Math.max(0, h.offsetHeight - innerHeight) : 0;
      const p = Math.min(1, scrollY / (fest + innerHeight * .7));
      mal = start.map((s) => s * (1 - p));
      if (!kjorer) { kjorer = true; requestAnimationFrame(tegn); }
    };
    const tegn = () => {
      let igjen = false;
      kort.forEach((k, i) => {
        naa[i] += (mal[i] - naa[i]) * .08;
        if (Math.abs(mal[i] - naa[i]) > .1) igjen = true;
        k.style.setProperty('--k3-y', naa[i].toFixed(2) + 'px');
      });
      kjorer = igjen; if (igjen) requestAnimationFrame(tegn);
    };
    addEventListener('scroll', regn, { passive: true }); regn();
  })();

  // Rullemeny (AD 13.11.2026): når man har rullet forbi headeren, glir en smal meny i sten ned fra toppen.
  // Logo til venstre, undersidene med et lite blad foran, og menyknappen som åpner hovedmenyen.
  (() => {
    const nav = document.querySelector('.hero-nav');
    if (!nav) return;
    const blad = 'M.33,311.34c-.5-.64-.43-1.55.16-2.11L325.9.43c.63-.6,1.62-.57,2.22.06l.28.3h0s291.71,307.4,291.71,307.4c11.65,12.44,8.41,34.43-4.03,46.08-.53.49-1.07.97-1.63,1.42-125.81,102.46-289.06,130.5-429.27,84.56-18.27-5.99-36.16-13.22-53.52-21.72l.09.5c-38.86-19.21-75.31-45.99-107.98-80.43-8.33-8.78-16.12-17.89-23.43-27.26Z';
    const sider = [['om-oss.html', 'Om oss'], ['portefolje.html', 'Portefølje'], ['historien.html', 'Historien'], ['kontakt.html', 'Kontakt']];
    const her = location.pathname.split('/').pop() || 'index.html';
    const bar = document.createElement('div');
    bar.className = 'rullemeny';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = `<div class="rullemeny-indre">
      <a class="rullemeny-logo" href="index.html" tabindex="-1" aria-label="J.C. Broch, til forsiden">${nav.querySelector('.logo-svg').outerHTML}</a>
      <nav class="rullemeny-lenker" aria-label="Snarveier">${sider.map(([h, t]) =>
        `<a class="t-lenke" href="${h}" tabindex="-1"${h === her ? ' aria-current="page"' : ''}><svg viewBox="-2 -2 631.5 465.5" aria-hidden="true"><path d="${blad}"/></svg>${t}</a>`).join('')}</nav>
    </div>`;
    document.body.append(bar);
    const hero = document.querySelector('.hero');
    let vis = false;
    const sjekk = () => {
      const ny = scrollY > (hero ? hero.offsetHeight * .6 : innerHeight * .6);
      if (ny === vis) return;
      vis = ny;
      bar.classList.toggle('synlig', vis);
      bar.setAttribute('aria-hidden', String(!vis));
      bar.querySelectorAll('a, button').forEach((el) => vis ? el.removeAttribute('tabindex') : el.setAttribute('tabindex', '-1'));
    };
    addEventListener('scroll', sjekk, { passive: true }); sjekk();
  })();

  // Rullemenyen blir negativ (lys tekst, mørk glassflate) når den ligger over mørke bilder eller plommeflater.
  // Bildenes lyshet måles én gang (snitt av et nedskalert bilde) og huskes.
  (() => {
    const bar = document.querySelector('.rullemeny');
    if (!bar) return;
    const indre = bar.querySelector('.rullemeny-indre');
    const lyshet = new WeakMap();
    const maalBilde = (img) => {
      if (lyshet.has(img)) return lyshet.get(img);
      if (!img.complete || !img.naturalWidth) return 1;
      try {
        const c = document.createElement('canvas'); c.width = c.height = 16;
        const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, 16, 16);
        const d = x.getImageData(0, 0, 16, 16).data; let s = 0;
        for (let i = 0; i < d.length; i += 4) s += (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255;
        const v = s / (d.length / 4); lyshet.set(img, v); return v;
      } catch (e) { lyshet.set(img, 1); return 1; }
    };
    const morkFarge = (el) => {
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
        if (bg && (bg.length < 4 || +bg[3] > .5)) {
          const [r, g, b] = bg.map(Number);
          return (.2126 * r + .7152 * g + .0722 * b) / 255 < .45;
        }
      }
      return false;
    };
    let ventende = false;
    const sjekk = () => {
      ventende = false;
      if (!bar.classList.contains('synlig')) return;
      const r = indre.getBoundingClientRect();
      let mork = 0, n = 0;
      const erMork = (x, y) => { const el = document.elementFromPoint(x, y); return el ? (el.tagName === 'IMG' ? maalBilde(el) < .45 : morkFarge(el)) : false; };
      const deler = [...bar.querySelectorAll('.rullemeny-logo, .rullemeny-lenker a')];
      const punkt = deler.map((d) => { const b = d.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; });
      bar.style.visibility = 'hidden';
      for (let i = 1; i <= 5; i++) { n++; if (erMork(r.left + r.width * i / 6, r.top + r.height / 2)) mork++; }
      const svar = punkt.map(([x, y]) => erMork(x, y));
      bar.style.visibility = '';
      indre.classList.toggle('mork', n && mork / n >= .5);
      // Hver lenke og logoen blir negativ for seg når det som ligger rett under den er mørkt
      deler.forEach((d, i) => d.classList.toggle('negativ', svar[i]));
    };
    const plan = () => { if (!ventende) { ventende = true; requestAnimationFrame(sjekk); } };
    addEventListener('scroll', plan, { passive: true }); addEventListener('resize', plan); addEventListener('load', plan);
  })();
