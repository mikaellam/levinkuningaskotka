(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Levin keskusta
  var LAT = 67.8047;
  var LON = 24.8093;

  /* ---------- Kieli (FI / EN) ---------- */
  var DICT = window.KOTKA_I18N || { fi: {}, en: {} };
  var lang = root.lang === "en" ? "en" : "fi";
  var langListeners = [];

  function t(key, vars) {
    var s = (DICT[lang] && DICT[lang][key]) || (DICT.fi && DICT.fi[key]) || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    }
    return s;
  }

  function applyStaticTexts() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      // muoto: "attr:avain; attr2:avain2"
      el.dataset.i18nAttr.split(";").forEach(function (pair) {
        var p = pair.split(":");
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    document.title = t("meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t("meta.desc");
    document.querySelectorAll(".lang__opt").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  function setLang(next) {
    lang = next;
    root.lang = next;
    try { localStorage.setItem("kotka-lang", next); } catch (e) {}
    applyStaticTexts();
    langListeners.forEach(function (fn) { fn(); });
  }

  document.querySelectorAll(".lang__opt").forEach(function (b) {
    b.addEventListener("click", function () { if (b.dataset.lang !== lang) setLang(b.dataset.lang); });
  });
  applyStaticTexts();

  /* ---------- Vuodenaika ---------- */
  var seasonListeners = [];
  function setSeason(season) {
    root.dataset.season = season;
    try { localStorage.setItem("kotka-season", season); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = season === "winter" ? "#000220" : "#f8f7ea";
    seasonListeners.forEach(function (fn) { fn(season); });
  }

  var toggle = document.getElementById("seasonToggle");
  function syncToggleLabel() {
    toggle.setAttribute("aria-label", t(root.dataset.season === "winter" ? "season.toSummer" : "season.toWinter"));
  }
  syncToggleLabel();
  langListeners.push(syncToggleLabel);
  toggle.addEventListener("click", function (ev) {
    var next = root.dataset.season === "winter" ? "summer" : "winter";
    var r = toggle.getBoundingClientRect();
    root.style.setProperty("--vt-x", (ev.clientX || r.left + r.width / 2) + "px");
    root.style.setProperty("--vt-y", (ev.clientY || r.top + r.height / 2) + "px");
    if (document.startViewTransition && !reduceMotion.matches) {
      document.startViewTransition(function () { setSeason(next); });
    } else {
      setSeason(next);
    }
    syncToggleLabel();
  });

  /* ---------- Navigaation tausta vieritettäessä ---------- */
  var nav = document.querySelector(".nav");
  var sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(function (entries) {
    nav.classList.toggle("is-scrolled", !entries[0].isIntersecting);
  }).observe(sentinel);

  /* ---------- Kuvat: näytetään vasta kun ladattu, muuten jää tyylitelty tausta ---------- */
  function wireImage(img) {
    function ok() { if (img.naturalWidth > 0) img.classList.add("is-loaded"); }
    if (img.complete) ok();
    img.addEventListener("load", ok);
    img.addEventListener("error", function () { img.remove(); });
    if (img.complete && img.naturalWidth === 0) img.remove();
  }
  document.querySelectorAll(".frame img").forEach(wireImage);

  /* ---------- Ilmestymisanimaatiot ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Huoneistot ---------- */
  var apartments = window.KOTKA_HUONEISTOT || [];
  var email = window.KOTKA_SAHKOPOSTI || "levinkuningaskotka@gmail.com";
  var grid = document.getElementById("aptGrid");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function mailto(subject) {
    return "mailto:" + email + "?subject=" + encodeURIComponent(subject);
  }

  function localized(a, field) {
    var en = a[field + "_en"];
    if (lang === "en" && en && (!Array.isArray(en) || en.length)) return en;
    return a[field];
  }

  function renderApartments() {
    if (!apartments.length) {
      grid.innerHTML = '<p class="apt__desc">' + esc(t("apt.empty")) + ' <a href="' + mailto(t("contact.subject")) + '">' + esc(email) + "</a></p>";
      return;
    }
    grid.innerHTML = apartments.map(function (a) {
      var facts = [];
      if (a.hlo) facts.push('<span><i class="ph ph-users" aria-hidden="true"></i>' + a.hlo + " " + esc(t("apt.guests")) + "</span>");
      if (a.m2) facts.push('<span><i class="ph ph-house-line" aria-hidden="true"></i>' + a.m2 + " m²</span>");
      var tags = (localized(a, "ominaisuudet") || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
      var desc = localized(a, "kuvaus");
      // Varauslinkki: Airbnb-linkille oma teksti, muille (esim. Hosta) "Varaa suoraan".
      var link = a.varaus || a.airbnb;
      var bookLabel = /airbnb\./i.test(link || "") ? t("apt.bookAirbnb") : t("apt.bookDirect");
      var cta = link
        ? '<a class="btn btn--primary" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(bookLabel) + ' <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>'
        : '<a class="btn btn--ghost" href="' + mailto(t("apt.subject", { x: a.nimi })) + '">' + esc(t("apt.ask")) + "</a>";
      return (
        '<article class="apt" data-name="' + esc(a.nimi) + '">' +
          '<div class="frame">' +
            (a.kuva ? '<img src="' + esc(a.kuva) + '" alt="' + esc(t("apt.alt", { x: a.nimi })) + '" loading="lazy" width="1200" height="800">' : "") +
            '<i class="ph ph-bed frame__icon" aria-hidden="true"></i>' +
          "</div>" +
          '<div class="apt__body">' +
            '<div class="apt__head"><div><h3 class="apt__name">' + esc(a.nimi) + "</h3>" +
              (a.talo ? '<p class="apt__building">' + esc(t("apt.building", { x: a.talo })) + "</p>" : "") +
            '</div><div class="apt__facts">' + facts.join("") + "</div></div>" +
            (desc ? '<p class="apt__desc">' + esc(desc) + "</p>" : "") +
            (tags ? '<ul class="apt__tags">' + tags + "</ul>" : "") +
            '<div class="apt__cta">' + cta + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
    grid.querySelectorAll(".frame img").forEach(wireImage);
  }
  renderApartments();

  /* ---------- Ryhmäkokolaskuri ---------- */
  var range = document.getElementById("groupSize");
  var out = document.getElementById("groupOut");
  var result = document.getElementById("sizerResult");
  var known = apartments.filter(function (a) { return a.hlo > 0; });
  var totalBeds = known.reduce(function (s, a) { return s + a.hlo; }, 0);
  range.max = String(Math.max(totalBeds + 4, 12));

  // Ehdotusjärjestys taloittain (huoneistot.js: KOTKA_TALOJARJESTYS), esim. ["E", "D", "B"].
  var houseOrder = window.KOTKA_TALOJARJESTYS || [];
  function houseRank(a) {
    var i = houseOrder.indexOf(a.talo);
    return i === -1 ? houseOrder.length : i;
  }

  // Valinta: 1) pienin määrä huoneistoja, 2) talojärjestyksessä ensimmäiset talot,
  // 3) vähiten tyhjiä paikkoja.
  function bestCombo(n) {
    var best = null;
    var count = known.length;
    for (var mask = 1; mask < (1 << count); mask++) {
      var beds = 0, rank = 0, picks = [];
      for (var i = 0; i < count; i++) {
        if (mask & (1 << i)) { beds += known[i].hlo; rank += houseRank(known[i]); picks.push(known[i]); }
      }
      if (beds < n) continue;
      if (!best || picks.length < best.picks.length ||
          (picks.length === best.picks.length && (rank < best.rank ||
            (rank === best.rank && beds < best.beds)))) {
        best = { picks: picks, beds: beds, rank: rank };
      }
    }
    return best;
  }

  function contactLink(subject, label) {
    return '<a class="text-link" href="' + mailto(subject) + '">' + esc(label) + ' <i class="ph ph-arrow-right" aria-hidden="true"></i></a>';
  }

  function updateSizer() {
    var n = Number(range.value);
    out.textContent = n;
    range.style.setProperty("--fill", ((n - range.min) / (range.max - range.min)) * 100 + "%");
    var cards = grid.querySelectorAll(".apt");
    cards.forEach(function (c) { c.classList.remove("is-match"); });

    if (!known.length) {
      result.innerHTML = "<p>" + t("sizer.noData") + "</p>" + contactLink(t("sizer.subject", { n: n }), t("nav.contact"));
      grid.classList.remove("is-filtering");
      return;
    }

    var combo = bestCombo(n);
    if (!combo) {
      grid.classList.remove("is-filtering");
      result.innerHTML = "<p>" + t("sizer.big", { n: n }) + "</p>" + contactLink(t("sizer.subject", { n: n }), t("nav.contact"));
      return;
    }

    grid.classList.add("is-filtering");
    var names = combo.picks.map(function (a) { return a.nimi; });
    cards.forEach(function (c) { if (names.indexOf(c.dataset.name) !== -1) c.classList.add("is-match"); });

    var chips = '<ul class="sizer__chips">' + names.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    var lead = combo.picks.length === 1
      ? "<p>" + t("sizer.one", { n: combo.beds }) + "</p>"
      : "<p>" + t("sizer.many", { x: combo.picks.length, n: combo.beds }) + "</p>";
    var ask = combo.picks.length > 1
      ? contactLink(t("sizer.subjectCombo", { x: names.join(" + "), n: n }), t("sizer.askCombo"))
      : "";
    result.innerHTML = lead + chips + ask;
  }
  range.addEventListener("input", updateSizer);
  updateSizer();
  langListeners.push(function () { renderApartments(); updateSizer(); });

  /* ---------- Levi juuri nyt ---------- */
  function setNow(id, value, note, muted) {
    var el = document.getElementById(id);
    if (!el) return;
    var v = el.querySelector(".now__value");
    var n = el.querySelector(".now__note");
    v.textContent = value;
    n.textContent = note || "";
    v.classList.remove("skeleton");
    v.classList.toggle("is-muted", !!muted);
    n.classList.remove("skeleton");
  }

  // Päivän pituus lasketaan paikallisesti (NOAA:n yksinkertaistettu aurinkokaava).
  function daylightHours(date) {
    var rad = Math.PI / 180;
    var start = Date.UTC(date.getUTCFullYear(), 0, 0);
    var doy = Math.floor((date - start) / 86400000);
    var g = (2 * Math.PI / 365) * (doy - 1);
    var decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) +
      0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    var lat = LAT * rad;
    var cosH = (Math.sin(-0.833 * rad) - Math.sin(lat) * Math.sin(decl)) / (Math.cos(lat) * Math.cos(decl));
    if (cosH <= -1) return 24;
    if (cosH >= 1) return 0;
    return (2 * Math.acos(cosH) / rad) / 15;
  }

  var dayHours = daylightHours(new Date());
  var dayDiff = Math.round((dayHours - daylightHours(new Date(Date.now() - 86400000))) * 60);
  // Haetut tiedot talteen, jotta ne voidaan piirtää uudelleen kielen vaihtuessa.
  // undefined = haku kesken, null = haku epäonnistui
  var weather, kp;

  function renderNow() {
    if (dayHours >= 24) {
      setNow("nowDay", "24 h", t("now.midnightSun"));
    } else if (dayHours <= 0) {
      setNow("nowDay", "0 h", t("now.polarNight"));
    } else {
      var h = Math.floor(dayHours);
      var m = Math.round((dayHours - h) * 60);
      if (m === 60) { h += 1; m = 0; }
      var note = dayDiff === 0 ? t("now.sameAsYesterday") :
        (dayDiff > 0 ? t("now.more", { n: dayDiff }) : t("now.less", { n: Math.abs(dayDiff) }));
      setNow("nowDay", h + " h " + m + " min", note);
    }

    if (weather === null) {
      setNow("nowTemp", t("now.tempNA"), "", true);
      setNow("nowSnow", t("now.snowNA"), "", true);
    } else if (weather) {
      var temp = Math.round(weather.temperature_2m);
      var feels = Math.round(weather.apparent_temperature);
      var desc = t("weather")[weather.weather_code] || "";
      setNow("nowTemp", (temp > 0 ? "+" : "") + temp + " °C",
        desc + (isFinite(feels) && feels !== temp ? ", " + t("now.feels") + " " + (feels > 0 ? "+" : "") + feels + " °C" : ""));
      var cm = Math.round((weather.snow_depth || 0) * 100);
      setNow("nowSnow", cm + " cm", cm > 0 ? (cm >= 50 ? t("now.snowGood") : t("now.snowSome")) : t("now.snowNone"));
    }

    if (kp === null) {
      setNow("nowAurora", t("now.auroraNA"), "", true);
    } else if (kp !== undefined) {
      var note2;
      if (dayHours > 20) note2 = t("now.auroraBright");
      else if (kp >= 4) note2 = t("now.auroraHigh");
      else if (kp >= 2) note2 = t("now.auroraMid");
      else note2 = t("now.auroraLow");
      setNow("nowAurora", "Kp " + kp.toFixed(kp % 1 ? 1 : 0), note2);
    }
  }
  renderNow();
  langListeners.push(renderNow);

  function fetchJSON(url) {
    var ctrl = "AbortController" in window ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;
    return fetch(url, ctrl ? { signal: ctrl.signal } : {}).then(function (r) {
      if (timer) clearTimeout(timer);
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }

  fetchJSON("https://api.open-meteo.com/v1/forecast?latitude=" + LAT + "&longitude=" + LON +
    "&current=temperature_2m,apparent_temperature,weather_code,snow_depth&timezone=Europe%2FHelsinki")
    .then(function (d) { weather = d.current || null; })
    .catch(function () { weather = null; })
    .then(renderNow);

  fetchJSON("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json")
    .then(function (rows) {
      var last = rows[rows.length - 1];
      var v = Array.isArray(last) ? parseFloat(last[1]) : parseFloat(last.Kp != null ? last.Kp : last.kp_index);
      kp = isFinite(v) ? v : null;
    })
    .catch(function () { kp = null; })
    .then(renderNow);

  /* ---------- Taivas: revontulet (talvi), keskiyön aurinko tai ruska (kesä) ---------- */
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");
  var SCALE = 0.5; // piirretään puolella resoluutiolla: kevyempi ja luonnollinen pehmeys
  var W = 0, H = 0, stars = [], running = false, visible = true, t0 = performance.now();

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * SCALE));
    H = Math.max(1, Math.round(r.height * SCALE));
    canvas.width = W; canvas.height = H;
    stars = [];
    var count = Math.round((W * H) / 900);
    for (var i = 0; i < count; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H * 0.75, r: Math.random() * 0.9 + 0.2, p: Math.random() * Math.PI * 2 });
    }
    makeParticles();
    draw(performance.now());
  }

  // Levitunturin siluetti (0..1 koordinaatit)
  function fellY(x) {
    var u = x / W;
    var k = Math.min(1, W / H); // kapealla näytöllä matalampi tunturi
    return H * 0.86 - H * k * (0.2 * Math.exp(-Math.pow((u - 0.62) / 0.22, 2)) + 0.05 * Math.exp(-Math.pow((u - 0.2) / 0.15, 2)));
  }

  function drawFell(color) {
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (var x = 0; x <= W; x += 4) ctx.lineTo(x, fellY(x));
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawWinter(t) {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#00010f");
    g.addColorStop(0.6, "#01031f");
    g.addColorStop(1, "#000220");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.globalAlpha = 0.35 + 0.35 * Math.sin(t * 1.3 + s.p);
      ctx.fillStyle = "#f8f7ea";
      ctx.fillRect(s.x, s.y, s.r, s.r);
    }
    ctx.globalAlpha = 1;

    // Revontulinauhat: pystysuoria valoviiruja siniaallon varrella
    ctx.globalCompositeOperation = "lighter";
    var bands = [
      { y: 0.22, amp: 0.07, len: 0.28, hue: [62, 232, 164], speed: 0.22, phase: 0 },
      { y: 0.34, amp: 0.05, len: 0.2, hue: [31, 190, 176], speed: 0.31, phase: 2.1 },
      { y: 0.16, amp: 0.04, len: 0.16, hue: [120, 240, 170], speed: 0.17, phase: 4.2 }
    ];
    var step = Math.max(2, Math.round(W / 320));
    for (var b = 0; b < bands.length; b++) {
      var bd = bands[b];
      for (var x = 0; x < W; x += step) {
        var u = x / W;
        var yy = H * (bd.y + bd.amp * Math.sin(u * 5.2 + t * bd.speed + bd.phase) + 0.02 * Math.sin(u * 17 - t * 0.6 + bd.phase));
        var len = H * bd.len * (0.6 + 0.4 * Math.sin(u * 7 + t * 0.4 + bd.phase));
        var a = 0.1 + 0.14 * Math.max(0, Math.sin(u * 11 + t * 0.7 + bd.phase * 1.7));
        a *= Math.sin(Math.PI * Math.min(1, Math.max(0, u * 1.15 - 0.05)));
        var grad = ctx.createLinearGradient(0, yy - len, 0, yy);
        grad.addColorStop(0, "rgba(" + bd.hue.join(",") + ",0)");
        grad.addColorStop(0.75, "rgba(" + bd.hue.join(",") + "," + a.toFixed(3) + ")");
        grad.addColorStop(1, "rgba(" + bd.hue.join(",") + ",0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, yy - len, step, len);
      }
    }
    ctx.globalCompositeOperation = "source-over";

    drawFell("#070b33");
    // Lumen heijastus tunturin reunalla
    ctx.beginPath();
    for (var fx = 0; fx <= W; fx += 4) { if (fx === 0) ctx.moveTo(fx, fellY(fx)); else ctx.lineTo(fx, fellY(fx)); }
    ctx.strokeStyle = "rgba(248, 247, 234, 0.16)";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Valaistut rinteet tunturin kyljessä
    ctx.fillStyle = "rgba(232, 214, 180, 0.6)";
    for (var k = 0; k < 5; k++) {
      var sx = W * (0.5 + k * 0.035);
      for (var j = 0; j < 9; j++) {
        var px = sx + j * W * 0.006;
        var py = fellY(px) + (j + 1) * H * 0.009;
        var flick = 0.6 + 0.4 * Math.sin(t * 2 + j + k);
        ctx.globalAlpha = flick;
        ctx.fillRect(px, py, 1.2, 1.2);
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- Kesätaivas: ruska (elo-syyskuu) tai keskiyön aurinko (muulloin) ----------
     Esikatselu: lisää osoitteen perään ?taivas=ruska tai ?taivas=aurinko */
  var summerSky = (function () {
    var q = /[?&]taivas=(ruska|aurinko)/.exec(location.search);
    if (q) return q[1] === "ruska" ? "ruska" : "midnight";
    var m = new Date().getMonth(); // 7 = elokuu, 8 = syyskuu
    return (m === 7 || m === 8) ? "ruska" : "midnight";
  })();

  // Satunnaisluvut, jotka pysyvät samoina koko sivun ajan (partikkelit piirretään ajasta laskien)
  var seeds = [], leaves = [], ruskaPatches = [];
  function makeParticles() {
    seeds = []; leaves = []; ruskaPatches = [];
    var i;
    for (i = 0; i < 46; i++) {
      seeds.push({ x0: Math.random() * W, y0: Math.random() * H, v: 3 + Math.random() * 6, drift: 2 + Math.random() * 5,
        amp: 4 + Math.random() * 10, f: 0.2 + Math.random() * 0.5, ph: Math.random() * 6.28, r: 0.8 + Math.random() * 1.4 });
    }
    var cols = ["#b0643f", "#c99a4b", "#8e3b2e", "#d4a55a", "#a5482f"];
    for (i = 0; i < 34; i++) {
      leaves.push({ x0: Math.random() * W, y0: Math.random() * H, v: 6 + Math.random() * 9, drift: 3 + Math.random() * 6,
        amp: 6 + Math.random() * 14, f: 0.3 + Math.random() * 0.6, ph: Math.random() * 6.28, spin: (Math.random() - 0.5) * 1.6,
        size: 2.8 + Math.random() * 3, c: cols[i % cols.length] });
    }
    for (i = 0; i < 700; i++) {
      var x = Math.random() * W;
      var top = fellY(x);
      var y = top + 4 + Math.pow(Math.random(), 0.8) * (H - top);
      ruskaPatches.push({ x: x, y: y, rx: 2 + Math.random() * 6, ry: 1 + Math.random() * 2, c: cols[i % cols.length], a: 0.12 + Math.random() * 0.22 });
    }
    ruskaFell = null; // piirretään uudelleen seuraavalla kerralla
  }

  // Ruskan tunturi piirretään kerran erilliseen kuvaan ja sumennetaan pehmeäksi väripinnaksi
  var ruskaFell = null;
  function getRuskaFell() {
    if (ruskaFell) return ruskaFell;
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var cx = c.getContext("2d");
    var fg = cx.createLinearGradient(0, H * 0.6, 0, H);
    fg.addColorStop(0, "#a8987c");
    fg.addColorStop(0.25, "#a7714c");
    fg.addColorStop(0.6, "#8f4a33");
    fg.addColorStop(1, "#6f3a2a");
    cx.beginPath();
    cx.moveTo(0, H);
    for (var x = 0; x <= W; x += 4) cx.lineTo(x, fellY(x));
    cx.lineTo(W, H);
    cx.closePath();
    cx.fillStyle = fg;
    cx.fill();
    cx.save();
    cx.clip();
    cx.filter = "blur(2px)";
    for (var i = 0; i < ruskaPatches.length; i++) {
      var r = ruskaPatches[i];
      cx.globalAlpha = r.a;
      cx.fillStyle = r.c;
      cx.beginPath();
      cx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
      cx.fill();
    }
    cx.restore();
    ruskaFell = c;
    return c;
  }

  function wrap(v, max) { return ((v % max) + max) % max; }

  function drawMidnightSun(t) {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#d9dfe6");
    g.addColorStop(0.45, "#efece0");
    g.addColorStop(0.7, "#f3e4c6");
    g.addColorStop(1, "#f8f7ea");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Aurinko kulkee horisontin suuntaisesti: matalimmillaan keskellä, mutta ei laske koskaan
    var s = Math.sin(t * (2 * Math.PI / 200));
    var sx = W * (0.6 + 0.3 * s);
    var sy = H * (0.5 - 0.13 * s * s);
    var R = Math.max(W, H);

    // Valojuovat
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.translate(sx, sy);
    ctx.rotate(t * 0.02);
    var rays = 14;
    for (var i = 0; i < rays; i++) {
      var ang = (i / rays) * Math.PI * 2;
      var width = 0.07 + 0.04 * Math.sin(i * 2.3);
      var a = 0.028 + 0.022 * Math.sin(t * 0.5 + i * 1.7);
      var rg = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.9);
      rg.addColorStop(0, "rgba(255, 238, 205," + a.toFixed(3) + ")");
      rg.addColorStop(1, "rgba(255, 238, 205,0)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R * 0.9, ang - width, ang + width);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Hehku ja aurinkokiekko
    var glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, H * 0.55);
    glow.addColorStop(0, "rgba(255, 244, 222, 0.95)");
    glow.addColorStop(0.06, "rgba(250, 226, 180, 0.75)");
    glow.addColorStop(0.3, "rgba(226, 196, 150, 0.25)");
    glow.addColorStop(1, "rgba(226, 196, 150, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    ctx.beginPath();
    ctx.arc(sx, sy, Math.max(3, H * 0.028), 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 250, 238, 0.95)";
    ctx.fill();

    drawFell("#a39479");
    // Tunturin reuna hehkuu auringon puolelta
    var rim = ctx.createLinearGradient(sx - W * 0.35, 0, sx + W * 0.35, 0);
    rim.addColorStop(0, "rgba(255, 236, 200, 0)");
    rim.addColorStop(0.5, "rgba(255, 236, 200, 0.8)");
    rim.addColorStop(1, "rgba(255, 236, 200, 0)");
    ctx.beginPath();
    for (var fx = 0; fx <= W; fx += 4) { if (fx === 0) ctx.moveTo(fx, fellY(fx)); else ctx.lineTo(fx, fellY(fx)); }
    ctx.strokeStyle = rim;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Tupasvillan haituvat nousevat valossa
    for (var k = 0; k < seeds.length; k++) {
      var p = seeds[k];
      var y = H * 1.05 - wrap(p.y0 + p.v * t, H * 1.1);
      var x = wrap(p.x0 + p.drift * t + p.amp * Math.sin(t * p.f + p.ph), W);
      var d = Math.hypot(x - sx, y - sy) / R;
      var shine = Math.max(0, 1 - d * 2.2);
      var alpha = 0.45 + 0.35 * Math.sin(t * 1.4 + p.ph) + shine * 0.4;
      var rr = p.r * (1 + shine);
      var sg = ctx.createRadialGradient(x, y, 0, x, y, rr * 2.4);
      sg.addColorStop(0, "rgba(255, 255, 250," + Math.min(1, alpha).toFixed(3) + ")");
      sg.addColorStop(1, "rgba(255, 255, 250, 0)");
      ctx.fillStyle = sg;
      ctx.fillRect(x - rr * 2.4, y - rr * 2.4, rr * 4.8, rr * 4.8);
    }
  }

  function drawRuska(t) {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#dfe2e2");
    g.addColorStop(0.5, "#efe9d9");
    g.addColorStop(0.78, "#ecd8ba");
    g.addColorStop(1, "#f8f7ea");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Matala syysaurinko
    var sx = W * (0.3 + 0.04 * Math.sin(t * 0.03));
    var sy = H * 0.5;
    var glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, H * 0.6);
    glow.addColorStop(0, "rgba(255, 236, 205, 0.9)");
    glow.addColorStop(0.08, "rgba(240, 206, 160, 0.55)");
    glow.addColorStop(0.4, "rgba(220, 180, 130, 0.15)");
    glow.addColorStop(1, "rgba(220, 180, 130, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Tunturi: paljas laki ylhäällä, ruskan värit rinteillä
    ctx.drawImage(getRuskaFell(), 0, 0);
    // Valo osuu tunturin reunaan
    var rim = ctx.createLinearGradient(sx - W * 0.3, 0, sx + W * 0.5, 0);
    rim.addColorStop(0, "rgba(255, 226, 180, 0)");
    rim.addColorStop(0.4, "rgba(255, 226, 180, 0.7)");
    rim.addColorStop(1, "rgba(255, 226, 180, 0)");
    ctx.beginPath();
    for (var fx = 0; fx <= W; fx += 4) { if (fx === 0) ctx.moveTo(fx, fellY(fx)); else ctx.lineTo(fx, fellY(fx)); }
    ctx.strokeStyle = rim;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Putoavat lehdet: lepattavat ja kääntyilevät tuulessa
    for (var k = 0; k < leaves.length; k++) {
      var p = leaves[k];
      var y = wrap(p.y0 + p.v * t, H * 1.1) - H * 0.05;
      var x = wrap(p.x0 + p.drift * t + p.amp * Math.sin(t * p.f + p.ph), W);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.ph + t * p.spin);
      ctx.scale(Math.max(0.15, Math.abs(Math.cos(t * p.f * 1.6 + p.ph))), 1);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function drawSummer(t) {
    if (summerSky === "ruska") drawRuska(t);
    else drawMidnightSun(t);
  }

  function draw(now) {
    var t = (now - t0) / 1000;
    if (root.dataset.season === "summer") drawSummer(t);
    else drawWinter(t);
  }

  function loop(now) {
    if (!running) return;
    draw(now);
    requestAnimationFrame(loop);
  }
  function start() {
    if (running || reduceMotion.matches || !visible || document.hidden) return;
    running = true;
    requestAnimationFrame(loop);
  }
  function stop() { running = false; }

  new IntersectionObserver(function (e) {
    visible = e[0].isIntersecting;
    if (visible) start(); else stop();
  }).observe(canvas);
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  reduceMotion.addEventListener && reduceMotion.addEventListener("change", function () {
    if (reduceMotion.matches) { stop(); draw(performance.now()); } else start();
  });
  seasonListeners.push(function () { draw(performance.now()); });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  resize();
  start();
})();
