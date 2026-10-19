(function () {
  "use strict";
  var S = SITE;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ---------- tiny DOM helper (uses textContent, so text is always safe) ---------- */
  function h(tag, props) {
    var e = document.createElement(tag);
    props = props || {};
    for (var k in props) {
      var v = props[k];
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return e;
  }
  function img(src, alt, cls) {
    var i = h("img", { src: src, alt: alt || "", loading: "lazy", decoding: "async", class: cls || "" });
    i.addEventListener("error", function () {
      var p = h("div", { class: "ph " + (cls || ""), role: "img", "aria-label": alt || "Photo placeholder" }, "📷");
      if (i.parentNode) i.parentNode.replaceChild(p, i);
    });
    return i;
  }
  function title(text, intro) {
    return [h("h2", { class: "sec-title", text: text }), intro ? h("p", { class: "sec-intro", text: intro }) : null];
  }
  function section(id, cls) { return h("section", { id: id, class: "sec reveal " + (cls || "") }); }
  function name() { return S.girlfriendName || ""; }

  /* ---------- theme ---------- */
  function applyTheme() {
    var t = S.theme, r = document.documentElement.style;
    r.setProperty("--pink", t.pink); r.setProperty("--cream", t.cream); r.setProperty("--ivory", t.ivory);
    r.setProperty("--wine", t.wine); r.setProperty("--accent", t.accent); r.setProperty("--text", t.text);
    r.setProperty("--font-head", t.headingFont); r.setProperty("--font-script", t.scriptFont); r.setProperty("--font-body", t.bodyFont);
    if (t.googleFontsUrl) document.head.appendChild(h("link", { rel: "stylesheet", href: t.googleFontsUrl }));
    document.title = S.pageTitle || document.title;
  }

  /* ---------- floating hearts ---------- */
  function hearts() {
    if (!S.floatingHearts || reduce) return;
    var box = $("#hearts"), list = S.heartEmojis || ["💗"];
    function spawn() {
      if (document.hidden || box.childElementCount > 14) return;
      var s = h("span", { text: list[Math.floor(Math.random() * list.length)] });
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = 12 + Math.random() * 18 + "px";
      s.style.animationDuration = 9 + Math.random() * 9 + "s";
      box.appendChild(s);
      setTimeout(function () { s.remove(); }, 19000);
    }
    for (var i = 0; i < 6; i++) setTimeout(spawn, i * 400);
    setInterval(spawn, 1600);
  }
  function burst(x, y, n) {
    if (reduce) return;
    var list = S.heartEmojis || ["💗"];
    for (var i = 0; i < (n || 14); i++) {
      var s = h("span", { class: "burst", text: list[i % list.length] });
      var a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 120;
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--dx", Math.cos(a) * d + "px");
      s.style.setProperty("--dy", Math.sin(a) * d - 40 + "px");
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }.bind(null, s), 1400);
    }
  }
  function burstFrom(el) { var r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2); }

  /* ---------- opening screen ---------- */
  function opening() {
    var o = S.opening, box = $("#opening");
    if (!o || !o.enabled) { box.remove(); return; }
    document.body.classList.add("locked");
    var btn = h("button", { class: "btn big", type: "button", text: o.buttonText, onclick: function () {
      burstFrom(btn);
      box.classList.add("gone");
      document.body.classList.remove("locked");
      setTimeout(function () { box.remove(); }, 1000);
      window.scrollTo(0, 0);
    } });
    box.appendChild(h("div", { class: "open-card" },
      h("div", { class: "gift", "aria-hidden": "true", text: "🎁" }),
      h("p", { class: "open-greet", text: o.greeting }),
      h("h1", { class: "open-name", text: name() }),
      h("p", { class: "open-msg", text: o.message }),
      btn));
    setTimeout(function () { btn.focus({ preventScroll: true }); }, 100);
  }

  /* ---------- sections ---------- */
  function hero() {
    var c = S.hero, s = h("section", { id: "hero", class: "hero v-" + c.textVertical });
    var bg = h("div", { class: "hero-bg" });
    bg.style.backgroundImage = "url('" + encodeURI(c.image || "") + "')";
    bg.style.backgroundPosition = c.imagePosition;
    bg.style.filter = "brightness(" + c.brightness + ")";
    var ov = h("div", { class: "hero-ov" }); ov.style.opacity = c.overlayOpacity;
    var inner = h("div", { class: "hero-in", style: "text-align:" + c.textAlign },
      h("p", { class: "script", text: name() }),
      h("h1", { class: "hero-title", text: c.title }),
      h("p", { class: "hero-sub", text: c.subtitle }));
    var scroll = h("a", { class: "scroll", href: "#" + nextId("hero") }, h("span", { text: c.scrollText }), h("i", { "aria-hidden": "true", text: "⌄" }));
    s.appendChild(bg); s.appendChild(ov); s.appendChild(inner); s.appendChild(scroll);
    return s;
  }

  function letter() {
    var c = S.loveLetter, s = section("letter", "letter-sec");
    var paper = h("article", { class: "paper" }, h("h2", { class: "sec-title", text: c.title }));
    var ps = [];
    (c.paragraphs || []).forEach(function (p) {
      var o = typeof p === "string" ? { text: p } : p;
      var el = h("p", { class: o.highlight ? "hl" : "", text: String(o.text).replace(/\\n/g, "\n") });
      el.dataset.full = el.textContent; ps.push(el); paper.appendChild(el);
    });
    if (c.signature) paper.appendChild(h("p", { class: "sign script", text: c.signature }));
    s.appendChild(paper);
    if (c.typingEffect && !reduce) {
      ps.forEach(function (p) { p.textContent = ""; });
      var started = false;
      new IntersectionObserver(function (e, ob) {
        if (!e[0].isIntersecting || started) return; started = true; ob.disconnect();
        var pi = 0, ci = 0;
        (function tick() {
          if (pi >= ps.length) return;
          var full = ps[pi].dataset.full;
          ci += 2; ps[pi].textContent = full.slice(0, ci);
          if (ci >= full.length) { pi++; ci = 0; }
          setTimeout(tick, 18);
        })();
      }, { threshold: 0.2 }).observe(paper);
    }
    return s;
  }

  function reasons() {
    var c = S.reasons, s = section("reasons");
    title(c.title, c.intro).forEach(function (x) { if (x) s.appendChild(x); });
    var g = h("div", { class: "cards" });
    (c.items || []).forEach(function (r) {
      g.appendChild(h("div", { class: "card" },
        r.image ? img(r.image, r.title, "card-img") : null,
        h("div", { class: "emo", "aria-hidden": "true", text: r.emoji || "💗" }),
        h("h3", { text: r.title }), h("p", { text: r.description })));
    });
    s.appendChild(g); return s;
  }

  /* gallery + lightbox */
  var lb;
  function gallery() {
    var c = S.gallery, s = section("gallery");
    title(c.title, c.intro).forEach(function (x) { if (x) s.appendChild(x); });
    var wrap = h("div", { class: "polaroids" });
    var items = c.items || [];
    items.forEach(function (it, idx) {
      var b = h("button", { class: "polaroid", type: "button", "aria-label": "Open photo: " + (it.caption || "photo " + (idx + 1)), onclick: function () { openLb(items, idx); } },
        img(it.image, it.caption || "Photo " + (idx + 1), "p-img"),
        it.date ? h("span", { class: "p-date", text: it.date }) : null,
        it.caption ? h("span", { class: "p-cap", text: it.caption }) : null);
      wrap.appendChild(b);
    });
    s.appendChild(wrap); return s;
  }
  function openLb(items, i) {
    var cur = i, last = document.activeElement;
    var picture = h("div", { class: "lb-pic" }), cap = h("div", { class: "lb-cap" });
    function show() {
      var it = items[cur]; picture.textContent = ""; cap.textContent = "";
      picture.appendChild(img(it.image, it.caption || "Photo", "lb-img"));
      if (it.date) cap.appendChild(h("small", { text: it.date }));
      if (it.caption) cap.appendChild(h("strong", { text: it.caption }));
      if (it.note) cap.appendChild(h("em", { text: it.note }));
    }
    function go(d) { cur = (cur + d + items.length) % items.length; show(); }
    function close() { document.removeEventListener("keydown", key); lb.remove(); document.body.classList.remove("locked"); if (last) last.focus(); }
    function key(e) { if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") go(-1); else if (e.key === "ArrowRight") go(1); }
    var closeBtn = h("button", { class: "lb-x", type: "button", "aria-label": "Close", text: "✕", onclick: close });
    lb = h("div", { class: "lb", role: "dialog", "aria-modal": "true", "aria-label": "Photo viewer" },
      closeBtn,
      h("button", { class: "lb-nav prev", type: "button", "aria-label": "Previous photo", text: "‹", onclick: function () { go(-1); } }),
      picture, cap,
      h("button", { class: "lb-nav next", type: "button", "aria-label": "Next photo", text: "›", onclick: function () { go(1); } }));
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) { if (sx == null) return; var d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) go(d > 0 ? -1 : 1); sx = null; });
    document.addEventListener("keydown", key);
    document.body.appendChild(lb); document.body.classList.add("locked");
    show(); closeBtn.focus();
  }

  function timeline() {
    var c = S.timeline, s = section("timeline");
    title(c.title, c.intro).forEach(function (x) { if (x) s.appendChild(x); });
    var t = h("ol", { class: "tl" });
    (c.items || []).forEach(function (m) {
      t.appendChild(h("li", { class: "tl-item reveal" },
        h("span", { class: "tl-dot", "aria-hidden": "true", text: m.emoji || "💗" }),
        h("div", { class: "tl-card" },
          m.date ? h("time", { text: m.date }) : null,
          h("h3", { text: m.title }),
          m.location ? h("p", { class: "loc", text: "📍 " + m.location }) : null,
          m.image ? img(m.image, m.title, "tl-img") : null,
          m.description ? h("p", { class: "desc", text: m.description }) : null)));
    });
    s.appendChild(t); return s;
  }

  function surprises() {
    var c = S.surprises, s = section("surprises");
    title(c.title).forEach(function (x) { if (x) s.appendChild(x); });
    var g = h("div", { class: "surp" });

    var e = c.envelope;
    if (e && e.enabled) {
      var env = h("div", { class: "env" }, h("div", { class: "env-back" }),
        h("div", { class: "env-paper" }, h("p", { text: String(e.message).replace(/\\n/g, "\n") })),
        h("div", { class: "env-front" }), h("div", { class: "env-flap" }));
      var eb = h("button", { class: "btn", type: "button", "aria-expanded": "false", text: e.buttonText, onclick: function () {
        var o = env.classList.toggle("open"); eb.setAttribute("aria-expanded", o); if (o) burstFrom(env);
      } });
      g.appendChild(h("div", { class: "box" }, h("h3", { text: e.title }), env, eb));
    }

    var r = c.randomMessage;
    if (r && r.enabled && (r.messages || []).length) {
      var out = h("p", { class: "rand", "aria-live": "polite", text: "…" }), lastI = -1;
      var rb = h("button", { class: "btn", type: "button", text: r.buttonText, onclick: function () {
        var i; do { i = Math.floor(Math.random() * r.messages.length); } while (i === lastI && r.messages.length > 1);
        lastI = i; out.textContent = r.messages[i]; out.classList.remove("pop"); void out.offsetWidth; out.classList.add("pop"); burstFrom(rb);
      } });
      g.appendChild(h("div", { class: "box" }, h("h3", { text: r.title }), out, rb));
    }

    var v = c.reveal;
    if (v && v.enabled) {
      var hidden = h("div", { class: "reveal-body", hidden: "" }, v.image ? img(v.image, "Surprise", "rv-img") : null, h("p", { text: v.text }));
      var vb = h("button", { class: "btn", type: "button", "aria-expanded": "false", text: v.buttonText, onclick: function () {
        hidden.hidden = false; vb.hidden = true; burstFrom(hidden);
      } });
      g.appendChild(h("div", { class: "box" }, h("h3", { text: v.title }), vb, hidden));
    }

    var k = c.cake;
    if (k && k.enabled) g.appendChild(cake(k));

    var lc = c.loveCounter;
    if (lc && lc.enabled) {
      var p = String(lc.startDate).split("-").map(Number);
      var days = Math.floor((Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - Date.UTC(p[0], p[1] - 1, p[2])) / 864e5);
      g.appendChild(h("div", { class: "box" }, h("h3", { text: lc.title }),
        h("p", { class: "count", text: isNaN(days) ? "?" : days.toLocaleString() }), h("p", { text: lc.label })));
    }
    s.appendChild(g); return s;
  }

  function cake(k) {
    var n = Math.max(1, Math.min(7, k.candles || 3)), out = 0;
    var msg = h("p", { class: "cake-msg", "aria-live": "polite", text: k.hint });
    var candles = h("div", { class: "candles" });
    for (var i = 0; i < n; i++) (function (i) {
      var flame = h("span", { class: "flame", "aria-hidden": "true" });
      var b = h("button", { class: "candle", type: "button", "aria-label": "Blow out candle " + (i + 1), onclick: function () {
        if (b.classList.contains("out")) return;
        b.classList.add("out"); b.setAttribute("aria-label", "Candle " + (i + 1) + " blown out"); out++;
        if (out === n) { msg.textContent = k.doneMessage; msg.classList.add("pop"); burstFrom(cakeEl); }
      } }, flame);
      candles.appendChild(b);
    })(i);
    var cakeEl = h("div", { class: "cake" }, candles, h("div", { class: "tier t1" }), h("div", { class: "tier t2" }), h("div", { class: "plate" }));
    var again = h("button", { class: "link", type: "button", text: "Relight the candles", onclick: function () {
      out = 0; msg.textContent = k.hint; msg.classList.remove("pop");
      candles.querySelectorAll(".candle").forEach(function (c) { c.classList.remove("out"); });
    } });
    return h("div", { class: "box" }, h("h3", { text: k.title }), cakeEl, msg, again);
  }

  function final() {
    var c = S.final, s = h("section", { id: "final", class: "sec final reveal" });
    if (c.image) { var bg = h("div", { class: "final-bg" }); bg.style.backgroundImage = "url('" + encodeURI(c.image) + "')"; s.appendChild(bg); }
    var extra = h("p", { class: "script extra", "aria-live": "polite" });
    var b = h("button", { class: "btn", type: "button", text: c.buttonText, onclick: function () {
      extra.textContent = c.buttonMessage; extra.classList.add("pop"); burstFrom(b);
      for (var i = 1; i < 4; i++) setTimeout(function () { burstFrom(b); }, i * 350);
    } });
    s.appendChild(h("div", { class: "final-in" },
      h("p", { class: "script", text: name() }), h("h2", { class: "sec-title", text: c.title }),
      h("p", { class: "final-msg", text: String(c.message).replace(/\\n/g, "\n") }),
      c.signature ? h("p", { class: "sign script", text: c.signature }) : null,
      c.buttonText ? b : null, extra));
    return s;
  }

  /* ---------- assemble ---------- */
  var order = ["hero", "letter", "reasons", "gallery", "timeline", "surprises", "final"];
  var builders = { hero: hero, letter: letter, reasons: reasons, gallery: gallery, timeline: timeline, surprises: surprises, final: final };
  var active = order.filter(function (k) { return S.sections[k] !== false; });
  function nextId(id) { var i = active.indexOf(id); return active[i + 1] || id; }

  function nav() {
    var n = $("#nav"); n.hidden = false;
    var list = h("ul");
    active.forEach(function (k) { if (k !== "hero") list.appendChild(h("li", {}, h("a", { href: "#" + k, text: S.navLabels[k] || k }))); });
    n.appendChild(h("a", { class: "brand", href: "#hero", text: "💗" }));
    n.appendChild(list);
  }

  /* ---------- music ---------- */
  function music() {
    var m = S.music; if (!m || !m.enabled || !m.file) return;
    var a = new Audio(); a.preload = "none"; a.loop = true; a.src = m.file; a.volume = m.volume == null ? 0.5 : m.volume;
    var p = $("#player"), playing = false, failed = false;
    var bars = h("span", { class: "bars", "aria-hidden": "true" }, h("i"), h("i"), h("i"));
    var btn = h("button", { type: "button", class: "pbtn", "aria-label": "Play music", text: "▶", onclick: function () {
      if (failed) return;
      if (playing) a.pause(); else a.play().catch(function () { fail(); });
    } });
    var vol = h("input", { type: "range", min: "0", max: "1", step: "0.05", value: String(a.volume), "aria-label": "Volume", oninput: function () { a.volume = parseFloat(vol.value); } });
    var label = h("span", { class: "ptitle", text: m.title || "Music" });
    function fail() { failed = true; p.hidden = true; }
    a.addEventListener("play", function () { playing = true; btn.textContent = "❚❚"; btn.setAttribute("aria-label", "Pause music"); p.classList.add("on"); });
    a.addEventListener("pause", function () { playing = false; btn.textContent = "▶"; btn.setAttribute("aria-label", "Play music"); p.classList.remove("on"); });
    a.addEventListener("error", fail);
    p.appendChild(btn); p.appendChild(bars); p.appendChild(label); p.appendChild(vol); p.hidden = false;
  }

  function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- password gate (soft lock, see README) ---------- */
  function norm(s) { return String(s).toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, ""); }
  function hex(b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join(""); }
  function unhex(s) { var a = new Uint8Array(s.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(s.substr(i * 2, 2), 16); return a; }
  function check(pw) {
    var g = S.gate;
    return crypto.subtle.importKey("raw", new TextEncoder().encode(norm(pw)), "PBKDF2", false, ["deriveBits"]).then(function (k) {
      return crypto.subtle.deriveBits({ name: "PBKDF2", salt: unhex(g.salt), iterations: 150000, hash: "SHA-256" }, k, 256);
    }).then(function (b) { return hex(b) === g.hash; });
  }
  function gate(done) {
    var g = S.gate;
    if (!g || !g.enabled || !g.hash) return done();
    try { if (sessionStorage.getItem("unlocked") === g.hash) return done(); } catch (e) {}
    applyTheme();
    var box = h("div", { id: "gate", role: "dialog", "aria-modal": "true", "aria-label": "Password" });
    var input = h("input", { type: "password", id: "gpw", autocomplete: "off", autocapitalize: "none", "aria-describedby": "gerr" });
    var err = h("p", { id: "gerr", class: "gerr", role: "alert" });
    var btn = h("button", { class: "btn", type: "submit", text: g.buttonText });
    var form = h("form", { class: "open-card", novalidate: "" },
      h("div", { class: "gift", "aria-hidden": "true", text: "🔒" }),
      h("h1", { class: "open-name", text: g.title }),
      h("label", { for: "gpw", class: "open-msg", text: g.prompt }), input,
      h("p", { class: "ghint", text: g.hint }), err, btn);
    form.addEventListener("submit", function (e) {
      e.preventDefault(); btn.disabled = true; err.textContent = "";
      var p = window.crypto && crypto.subtle ? check(input.value) : Promise.reject();
      p.then(function (ok) {
        btn.disabled = false;
        if (ok) { try { sessionStorage.setItem("unlocked", g.hash); } catch (e2) {} box.remove(); document.body.classList.remove("locked"); done(); }
        else { err.textContent = g.wrongMessage; form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake"); input.select(); }
      }).catch(function () { btn.disabled = false; err.textContent = "This browser can't check the password. Try Chrome, Safari or Firefox over https."; });
    });
    box.appendChild(form); document.body.appendChild(box); document.body.classList.add("locked");
    input.focus();
  }

  function start() {
    try {
      applyTheme();
      var main = $("#main");
      active.forEach(function (k) {
        try { main.appendChild(builders[k]()); } catch (err) { console.error("Section failed:", k, err); }
      });
      nav(); opening(); music(); hearts();
      $("#footer").textContent = S.footer || "";
      reveals();
    } catch (err) {
      console.error(err);
      document.body.appendChild(h("p", { style: "padding:2rem", text: "Something went wrong reading content.js. Check for a missing comma or quote." }));
    }
  }
  gate(start);
})();
