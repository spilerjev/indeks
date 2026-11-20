/* indeks. — knjižnica SVG grafov za razlage (polje `fig` pri vprašanju).
   Barve niso zapečene: razredi (.cS, .a1 ...) so definirani v CSS predloge (.ix-fig) in sledijo svetli/temni temi.
   Oznake: "P_{W}" -> P s podpisanim W. Številke v slovenskem zapisu (decimalna vejica, pike za tisočice). */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// "P_{W}+T" -> P<tspan sub>W</tspan><tspan>+T</tspan>
function rich(s) {
  const m = /_\{([^}]*)\}/.exec(s);
  if (!m) return esc(s);
  const before = s.slice(0, m.index), sub = m[1], after = s.slice(m.index + m[0].length);
  return esc(before) + `<tspan dy="3" font-size="74%">${esc(sub)}</tspan>` + (after ? `<tspan dy="-3">${rich(after)}</tspan>` : '');
}
const plain = (s) => String(s).replace(/_\{([^}]*)\}/g, '$1');

function num(x) {
  const r = Math.round(x * 1000) / 1000;
  const neg = r < 0;
  let [i, d] = String(Math.abs(r)).split('.');
  if (i.length > 3) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '−' : '') + i + (d ? ',' + d : '');
}
const sgn = (x) => (x > 0 ? '+' : '') + num(x);
const r1 = (x) => Math.round(x * 10) / 10;

class Fig {
  constructor(o = {}) {
    this.qmin = o.qmin || 0; this.qmax = o.qmax; this.pmin = o.pmin || 0; this.pmax = o.pmax;
    this.W = o.w || 360; this.H = o.h || 236;
    this.ml = o.ml != null ? o.ml : 42; this.mr = o.mr != null ? o.mr : 64; this.mt = o.mt != null ? o.mt : 16; this.mb = o.mb != null ? o.mb : 30;
    this.xl = o.xl == null ? 'Q' : o.xl; this.yl = o.yl == null ? 'P' : o.yl;
    this.noAxes = !!o.noAxes;
    this.bg = []; this.mid = []; this.fg = []; this.xt = []; this.yt = []; this.leg = []; this.title = o.title || '';
  }
  X(q) { return r1(this.ml + (q - this.qmin) / (this.qmax - this.qmin) * (this.W - this.ml - this.mr)); }
  Y(p) { return r1(this.mt + (1 - (p - this.pmin) / (this.pmax - this.pmin)) * (this.H - this.mt - this.mb)); }
  inP(p) { return p >= this.pmin - 1e-9 && p <= this.pmax + 1e-9; }
  // ploskev (poligon v podatkovnih koordinatah)
  area(pts, cls, label, at) {
    if (!pts.length) return this;
    this.bg.push(`<polygon class="${cls}" points="${pts.map(([q, p]) => this.X(q) + ',' + this.Y(p)).join(' ')}"/>`);
    if (label) {
      const c = at || [pts.reduce((s, x) => s + x[0], 0) / pts.length, pts.reduce((s, x) => s + x[1], 0) / pts.length];
      this.fg.push(`<text class="tl" x="${this.X(c[0])}" y="${this.Y(c[1]) + 4}" text-anchor="middle">${rich(label)}</text>`);
    }
    return this;
  }
  rect(q0, p0, q1, p1, cls, label, at) { return this.area([[q0, p0], [q1, p0], [q1, p1], [q0, p1]], cls, label, at); }
  // krivulja p = f(q), samo del znotraj okvira
  fn(f, q0, q1, cls, n = 80) {
    const runs = []; let cur = [];
    for (let k = 0; k <= n; k++) {
      const q = q0 + (q1 - q0) * k / n, p = f(q);
      if (isFinite(p) && this.inP(p)) cur.push([q, p]); else if (cur.length) { runs.push(cur); cur = []; }
    }
    if (cur.length) runs.push(cur);
    runs.forEach((r) => { if (r.length > 1) this.mid.push(`<polyline class="${cls}" points="${r.map(([q, p]) => this.X(q) + ',' + this.Y(p)).join(' ')}"/>`); });
    return this;
  }
  // krivulja v parametrični obliki ali točke
  path(pts, cls) { this.mid.push(`<polyline class="${cls}" points="${pts.map(([q, p]) => this.X(q) + ',' + this.Y(p)).join(' ')}"/>`); return this; }
  seg(q0, p0, q1, p1, cls) { return this.path([[q0, p0], [q1, p1]], cls); }
  arrow(q0, p0, q1, p1, cls = 'ar') {
    this.fg.push(`<line class="${cls}" x1="${this.X(q0)}" y1="${this.Y(p0)}" x2="${this.X(q1)}" y2="${this.Y(p1)}" marker-end="url(#ixArr)"/>`); return this;
  }
  hline(p, q0, q1, cls = 'pl') { return this.seg(q0, p, q1, p, cls); }
  vline(q, p0, p1, cls = 'pl') { return this.seg(q, p0, q, p1, cls); }
  guideH(p, q) { this.bg.push(`<line class="gd" x1="${this.X(this.qmin)}" y1="${this.Y(p)}" x2="${this.X(q)}" y2="${this.Y(p)}"/>`); return this; }
  guideV(q, p) { this.bg.push(`<line class="gd" x1="${this.X(q)}" y1="${this.Y(p)}" x2="${this.X(q)}" y2="${this.Y(this.pmin)}"/>`); return this; }
  dot(q, p, cls = 'dt') { this.fg.push(`<circle class="${cls}" cx="${this.X(q)}" cy="${this.Y(p)}" r="2.6"/>`); return this; }
  // oznaka oglišča/točke
  pt(q, p, label, dx = 0, dy = 0, cls = 'tv') {
    this.dot(q, p);
    this.fg.push(`<text class="${cls}" x="${this.X(q) + dx}" y="${this.Y(p) + dy}" text-anchor="middle">${rich(label)}</text>`); return this;
  }
  text(q, p, label, o = {}) {
    this.fg.push(`<text class="${o.cls || 't'}" x="${this.X(q) + (o.dx || 0)}" y="${this.Y(p) + (o.dy || 0)}" text-anchor="${o.anchor || 'middle'}">${rich(label)}</text>`); return this;
  }
  // oznaka na desnem koncu krivulje / črte (v desnem robu)
  tag(q, p, label, cls = 'tc', dy = 4) {
    this.fg.push(`<text class="${cls}" x="${this.X(q) + 5}" y="${this.Y(p) + dy}" text-anchor="start">${rich(label)}</text>`); return this;
  }
  xtick(q, label) { this.xt.push({ x: this.X(q), label: String(label) }); return this; }
  ytick(p, label) { this.yt.push({ y: this.Y(p), label: String(label) }); return this; }
  legend(cls, text) { this.leg.push({ cls, text }); return this; }

  svg() {
    const W = this.W, x0 = this.X(this.qmin), y0 = this.Y(this.pmin), xEnd = W - this.mr + 14, yTop = this.mt - 6;
    const out = [];
    out.push(`<defs><marker id="ixArr" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="arh"/></marker></defs>`);
    out.push(...this.bg, ...this.mid);
    if (!this.noAxes) {
      out.push(`<line class="ax" x1="${x0}" y1="${y0}" x2="${xEnd}" y2="${y0}" marker-end="url(#ixArr)"/>`);
      out.push(`<line class="ax" x1="${x0}" y1="${y0}" x2="${x0}" y2="${yTop}" marker-end="url(#ixArr)"/>`);
      if (this.pmin > 0) out.push(`<path class="ax" d="M${x0 - 5},${y0 - 9} l10,-4 M${x0 - 5},${y0 - 14} l10,-4"/>`);
      out.push(`<text class="t" x="${xEnd}" y="${y0 + 15}" text-anchor="end">${rich(this.xl)}</text>`);
      out.push(`<text class="t" x="${x0 - 6}" y="${yTop + 4}" text-anchor="end">${rich(this.yl)}</text>`);
    }
    // x oznake: izogni se prekrivanju (2. vrsta)
    let extra = 0;
    const xs = this.xt.slice().sort((a, b) => a.x - b.x); const lastEnd = [-1e9, -1e9];
    xs.forEach((t) => {
      const w = plain(t.label).length * 6.2 + 6; let row = 0;
      if (t.x - w / 2 < lastEnd[0]) row = 1;
      if (row === 1 && t.x - w / 2 < lastEnd[1]) row = 0;
      lastEnd[row] = t.x + w / 2; if (row) extra = 12;
      out.push(`<line class="ax" x1="${t.x}" y1="${y0}" x2="${t.x}" y2="${y0 + 3}"/><text class="t" x="${t.x}" y="${y0 + 14 + row * 12}" text-anchor="middle">${rich(t.label)}</text>`);
    });
    // y oznake: najmanj 11 px narazen
    const ys = this.yt.slice().sort((a, b) => a.y - b.y);
    for (let k = 1; k < ys.length; k++) if (ys[k].y - ys[k - 1].y < 11) ys[k].yy = (ys[k - 1].yy || ys[k - 1].y) + 11;
    ys.forEach((t) => {
      const ty = (t.yy || t.y) + 4;
      out.push(`<line class="ax" x1="${x0 - 3}" y1="${t.y}" x2="${x0}" y2="${t.y}"/><text class="t" x="${x0 - 6}" y="${ty}" text-anchor="end">${rich(t.label)}</text>`);
    });
    out.push(...this.fg);
    // legenda
    let ly = this.H + extra + 4;
    this.leg.forEach((l) => {
      ly += 17;
      if (l.cls) out.push(`<rect class="${l.cls}" x="10" y="${ly - 10}" width="13" height="11" rx="2"/>`);
      out.push(`<text class="lg" x="${l.cls ? 29 : 10}" y="${ly}">${rich(l.text)}</text>`);
    });
    const H = ly + (this.leg.length ? 8 : extra);
    return `<svg viewBox="0 0 ${W} ${r1(H)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(plain(this.title || 'graf'))}">${out.join('')}</svg>`;
  }
}

/* ---------- trg: linearni Q = a + bP ---------- */
const Q = (f, P) => f[0] + f[1] * P;           // količina pri ceni
const P = (f, q) => (q - f[0]) / f[1];          // inverzna funkcija
const eq = (qd, qs) => { const p = (qs[0] - qd[0]) / (qd[1] - qs[1]); return { p, q: Q(qd, p) }; };

// samodejni razpon osi
function frame(prices, qty, o = {}) {
  const hi = Math.max(...prices), lo = Math.min(...prices), span = Math.max(hi - lo, hi * 0.08);
  let pmin = o.pmin != null ? o.pmin : Math.max(0, lo - 1.1 * span);
  if (o.pmin == null && pmin < hi * 0.45) pmin = 0;
  const pmax = o.pmax != null ? o.pmax : hi + 0.75 * span;
  const qmax = o.qmax != null ? o.qmax : Math.max(...qty) * 1.14;
  return { pmin, pmax, qmax };
}
function curves(f, qd, qs, o = {}) {
  f.fn((q) => P(qd, q), 0, f.qmax, 'cD').fn((q) => P(qs, q), 0, f.qmax, 'cS');
  // D: oznaka ob zgornjem levem začetku; S: ob zgornjem desnem koncu (desni rob je za oznake cen)
  const pTop = f.pmin + (f.pmax - f.pmin) * 0.94;
  let qD = Q(qd, pTop), pD = pTop; if (qD < 0) { qD = 0; pD = P(qd, 0); }
  f.text(qD, pD, o.dName || 'D', { cls: 'tD', anchor: 'end', dx: -5, dy: 4 });
  let qS = Q(qs, pTop), pS = pTop; if (qS > f.qmax) { qS = f.qmax * 0.98; pS = P(qs, qS); }
  f.text(qS, pS, o.sName || 'S', { cls: 'tS', anchor: 'start', dx: 6, dy: 4 });
}
const lbl = (n, name) => (n == null ? name : num(n));

/* Prosta trgovina: uvoznica (P_W < P*) ali izvoznica (P_W > P*); oglišča A–E po prosojnicah 20–21. */
function trade(o) {
  const { qd, qs, pw } = o, a = eq(qd, qs), imp = pw < a.p, sym = !!o.symbolic, u = o.unit ? ' ' + o.unit : '';
  const qS = Q(qs, pw), qD = Q(qd, pw);
  const fr = frame([a.p, pw, ...(o.extraP || [])], [qS, qD, a.q], o);
  const f = new Fig({ ...fr, title: imp ? 'Prosta trgovina, država uvoznica' : 'Prosta trgovina, država izvoznica' });
  const nP = o.nP || 'P*', nW = o.nW || 'P_{W}';
  if (imp) {
    // A=(0,P*), B=(0,PW), C=S pri PW, D=D pri PW, E=avtarkija
    f.area([[0, a.p], [0, pw], [qS, pw], [a.q, a.p]], 'a2 hz');
    f.area([[qS, pw], [qD, pw], [a.q, a.p]], 'a1', 'CDE', [(qS + qD + a.q) / 3, (2 * pw + a.p) / 3 + (a.p - pw) * 0.02]);
    f.hline(pw, 0, f.qmax * 0.96).tag(f.qmax * 0.96, pw, nW, 'tc');
    f.guideH(a.p, a.q).guideV(a.q, a.p).guideV(qS, pw).guideV(qD, pw);
    curves(f, qd, qs);
    f.pt(0, a.p, 'A', 9, -5).pt(0, pw, 'B', 9, 14).pt(qS, pw, 'C', -4, 14).pt(qD, pw, 'D', 6, 14).pt(a.q, a.p, 'E', 0, -8);
    f.ytick(a.p, sym ? nP : num(a.p)).ytick(pw, sym ? nW : num(pw));
    f.xtick(qS, sym ? 'q_{1}' : num(qS)).xtick(a.q, sym ? 'q*' : num(a.q)).xtick(qD, sym ? 'q_{2}' : num(qD));
    const cs = (a.p - pw) * (a.q + qD) / 2, ps = (a.p - pw) * (a.q + qS) / 2, nb = cs - ps;
    f.legend('sw12', `ABDE = rast potrošnikovega presežka${sym ? '' : ' = ' + sgn(cs) + u}`);
    f.legend('a2 hz', `ABCE = padec proizvajalčevega presežka${sym ? '' : ' = −' + num(ps) + u}`);
    f.legend('a1', `CDE = neto korist države${sym ? '' : ' = ' + sgn(nb) + u}`);
    f.legend(null, `uvoz = CD = ${sym ? 'q_{2} − q_{1}' : num(qD) + ' − ' + num(qS) + ' = ' + num(qD - qS)}`);
  } else {
    // A=(0,PW), B=D pri PW, C=S pri PW, D=(0,P*), E=avtarkija
    f.area([[0, pw], [qD, pw], [a.q, a.p], [0, a.p]], 'a2 hz');
    f.area([[qD, pw], [qS, pw], [a.q, a.p]], 'a1', 'BEC', [(qD + qS + a.q) / 3, (2 * pw + a.p) / 3]);
    f.hline(pw, 0, f.qmax * 0.96).tag(f.qmax * 0.96, pw, nW, 'tc');
    f.guideH(a.p, a.q).guideV(a.q, a.p).guideV(qS, pw).guideV(qD, pw);
    curves(f, qd, qs);
    f.pt(0, pw, 'A', 9, -5).pt(qD, pw, 'B', -4, -7).pt(qS, pw, 'C', 4, -7).pt(0, a.p, 'D', 9, 14).pt(a.q, a.p, 'E', 0, 15);
    f.ytick(a.p, sym ? nP : num(a.p)).ytick(pw, sym ? nW : num(pw));
    f.xtick(qD, sym ? 'q_{D}' : num(qD)).xtick(a.q, sym ? 'q*' : num(a.q)).xtick(qS, sym ? 'q_{S}' : num(qS));
    const cs = (pw - a.p) * (a.q + qD) / 2, ps = (pw - a.p) * (a.q + qS) / 2;
    f.legend('a2 hz', `ABED = padec potrošnikovega presežka${sym ? '' : ' = −' + num(cs) + u}`);
    f.legend('sw12', `ACED = rast proizvajalčevega presežka${sym ? '' : ' = ' + sgn(ps) + u}`);
    f.legend('a1', `BEC = neto korist države${sym ? '' : ' = ' + sgn(ps - cs) + u}`);
    f.legend(null, `izvoz = BC = ${sym ? 'q_{S} − q_{D}' : num(qS) + ' − ' + num(qD) + ' = ' + num(qS - qD)}`);
  }
  return f.svg();
}

/* Carina: majhna država (ploskve A, B, C, D) ali velika (+ E, cena na meji pade na pb). */
function tariff(o) {
  const { qd, qs, pw, pt } = o, pb = o.pb != null ? o.pb : pw, large = pb < pw, sym = !!o.symbolic, u = o.unit ? ' ' + o.unit : '';
  const a = eq(qd, qs), q1 = Q(qs, pw), q2 = Q(qs, pt), q3 = Q(qd, pt), q4 = Q(qd, pw);
  const fr = frame([pt, pw, pb, a.p], [q4, q1, a.q], o);
  const f = new Fig({ ...fr, title: large ? 'Carina velike države' : 'Carina majhne države' });
  const neutral = !!o.neutral;
  f.area([[0, pw], [q1, pw], [q2, pt], [0, pt]], neutral ? 'a0' : 'a2', 'A', [Math.min(q1, q2) * 0.45, (pw + pt) / 2]);
  f.area([[q1, pw], [q2, pw], [q2, pt]], neutral ? 'a0' : 'a5', 'B', [q2 - (q2 - q1) * 0.3, pw + (pt - pw) * 0.3]);
  f.rect(q2, pw, q3, pt, neutral ? 'a0' : 'a3', 'C');
  f.area([[q3, pt], [q3, pw], [q4, pw]], neutral ? 'a0' : 'a5', 'D', [q3 + (q4 - q3) * 0.3, pw + (pt - pw) * 0.3]);
  if (large) f.rect(q2, pb, q3, pw, neutral ? 'a0' : 'a4', 'E');
  f.hline(pt, 0, f.qmax * 0.96).tag(f.qmax * 0.96, pt, o.nT || (large ? 'P′+T' : 'P_{FT}+T'));
  f.hline(pw, 0, f.qmax * 0.96, 'pl dsh').tag(f.qmax * 0.96, pw, o.nW || 'P_{FT}');
  if (large) f.hline(pb, 0, f.qmax * 0.96, 'pl dsh').tag(f.qmax * 0.96, pb, 'P′');
  [q1, q4].forEach((q) => f.guideV(q, pw)); [q2, q3].forEach((q) => f.guideV(q, pt));
  curves(f, qd, qs);
  f.ytick(pt, sym ? (large ? 'P′+T' : 'P_{FT}+T') : num(pt)).ytick(pw, sym ? 'P_{FT}' : num(pw));
  if (large) f.ytick(pb, sym ? 'P′' : num(pb));
  [[q1, 'q_{1}'], [q2, 'q_{2}'], [q3, 'q_{3}'], [q4, 'q_{4}']].forEach(([q, n]) => f.xtick(q, sym ? n : num(q)));
  if (!neutral) {
    const A = (pt - pw) * (q1 + q2) / 2, B = (pt - pw) * (q2 - q1) / 2, C = (pt - pw) * (q3 - q2), D = (pt - pw) * (q4 - q3) / 2, E = (pw - pb) * (q3 - q2);
    const v = (x) => (sym ? '' : ' = ' + num(x) + u);
    f.legend('a2', `A: k proizvajalcem (ΔPrP = +A)${v(A)}`);
    f.legend('a5', `B: proizvodna izguba, D: potrošna izguba${sym ? '' : ' (' + num(B) + ' + ' + num(D) + ')'}`);
    f.legend('a3', `C: carinski prihodek od domačih potrošnikov${v(C)}`);
    if (large) f.legend('a4', `E: carino plačajo tuji izvozniki${v(E)}`);
    f.legend(null, `ΔPP = −(A + B + C + D)${sym ? '' : ' = −' + num(A + B + C + D) + u}`);
    f.legend(null, large ? `ΔW = E − (B + D)${sym ? '' : ' = ' + sgn(E - B - D) + u}` : `ΔW = −(B + D)${sym ? '' : ' = −' + num(B + D) + u}`);
  } else {
    f.legend(null, 'q₁, q₂ = domača proizvodnja; q₃, q₄ = domača potrošnja');
  }
  return f.svg();
}

/* Preferencialna liberalizacija majhne države: cena pade s p0 (pred, s carino) na p1 (cena partnerice).
   pw = cena na meji pred integracijo, če je partnerica manj učinkovita (ploskev G). */
function pref(o) {
  const { qd, qs, p0, p1 } = o, pw = o.pw, worse = pw != null && pw < p1, sym = !!o.symbolic, u = o.unit ? ' ' + o.unit : '';
  const q1 = Q(qs, p1), q2 = Q(qs, p0), q3 = Q(qd, p0), q4 = Q(qd, p1), a = eq(qd, qs);
  const fr = frame([p0, p1, ...(worse ? [pw] : []), a.p], [q4, q1, a.q], o);
  const f = new Fig({ ...fr, title: worse ? 'Integracija z manj učinkovito partnerico' : 'Integracija z učinkovitejšo partnerico' });
  f.area([[0, p1], [q1, p1], [q2, p0], [0, p0]], 'a2', 'A', [Math.min(q1, q2) * 0.45, (p0 + p1) / 2]);
  f.area([[q1, p1], [q2, p1], [q2, p0]], 'a1', 'B', [q2 - (q2 - q1) * 0.3, p1 + (p0 - p1) * 0.3]);
  f.rect(q2, p1, q3, p0, 'a3', 'C');
  f.area([[q3, p0], [q3, p1], [q4, p1]], 'a1', 'D', [q3 + (q4 - q3) * 0.3, p1 + (p0 - p1) * 0.3]);
  if (worse) f.rect(q2, pw, q3, p1, 'a5', 'G');
  const nm = o.names || {};
  const n0 = nm.p0 || (worse ? 'P_{W}+T' : 'P_{P}+T'), n1 = nm.p1 || 'P_{P}', nw = nm.pw || 'P_{W}';
  f.hline(p0, 0, f.qmax * 0.96).tag(f.qmax * 0.96, p0, n0);
  f.hline(p1, 0, f.qmax * 0.96).tag(f.qmax * 0.96, p1, n1);
  if (worse) f.hline(pw, 0, f.qmax * 0.96, 'pl dsh').tag(f.qmax * 0.96, pw, nw);
  [q1, q4].forEach((q) => f.guideV(q, p1)); [q2, q3].forEach((q) => f.guideV(q, p0));
  curves(f, qd, qs);
  f.ytick(p0, sym ? n0 : num(p0)).ytick(p1, sym ? n1 : num(p1)); if (worse) f.ytick(pw, sym ? nw : num(pw));
  [[q1, 'q_{1}'], [q2, 'q_{2}'], [q3, 'q_{3}'], [q4, 'q_{4}']].forEach(([q, n]) => f.xtick(q, sym ? n : num(q)));
  const d = p0 - p1, A = d * (q1 + q2) / 2, B = d * (q2 - q1) / 2, C = d * (q3 - q2), D = d * (q4 - q3) / 2, G = worse ? (p1 - pw) * (q3 - q2) : 0;
  const v = (x) => (sym ? '' : ' = ' + num(x) + u);
  f.legend('a2', `A: od proizvajalcev k potrošnikom (ΔPrP = −A)${v(A)}`);
  f.legend('a1', `B + D: ustvarjanje trgovine${sym ? '' : ' = ' + num(B) + ' + ' + num(D) + ' = ' + num(B + D) + u}`);
  f.legend('a3', `C: izgubljen carinski prihodek → potrošnikom${v(C)}`);
  if (worse) f.legend('a5', `G: preusmerjanje (višja cena na meji)${v(G)}`);
  f.legend(null, worse ? `ΔW = (B + D) − G${sym ? '' : ' = ' + sgn(B + D - G) + u}` : `ΔW = B + D${sym ? '' : ' = ' + sgn(B + D) + u}`);
  return f.svg();
}

/* Osnovni trg: potrošnikov in proizvajalčev presežek. */
function surplus(o) {
  const { qd, qs } = o, a = eq(qd, qs), sym = !!o.symbolic, u = o.unit ? ' ' + o.unit : '';
  const pD = P(qd, 0), pS = P(qs, 0);
  const f = new Fig({ pmin: 0, pmax: pD * 1.12, qmax: Math.max(Q(qd, 0), a.q) * 1.1, title: 'Potrošnikov in proizvajalčev presežek' });
  f.area([[0, pD], [0, a.p], [a.q, a.p]], 'a1', sym ? 'CS' : 'CS', [a.q * 0.3, a.p + (pD - a.p) * 0.3]);
  f.area([[0, a.p], [0, Math.max(pS, 0)], [a.q, a.p]], 'a2', 'PS', [a.q * 0.3, a.p - (a.p - Math.max(pS, 0)) * 0.3]);
  f.guideH(a.p, a.q).guideV(a.q, a.p); curves(f, qd, qs); f.dot(a.q, a.p);
  f.ytick(pD, sym ? 'a' : num(pD)).ytick(a.p, sym ? 'P*' : num(a.p)); if (pS > 0) f.ytick(pS, sym ? 'c' : num(pS));
  f.xtick(a.q, sym ? 'Q*' : num(a.q));
  f.legend('a1', `CS = ½ · (${sym ? 'a − P*' : num(pD) + ' − ' + num(a.p)}) · ${sym ? 'Q*' : num(a.q)}${sym ? '' : ' = ' + num((pD - a.p) * a.q / 2) + u}`);
  f.legend('a2', `PS = ½ · (${sym ? 'P* − c' : num(a.p) + ' − ' + num(pS)}) · ${sym ? 'Q*' : num(a.q)}${sym ? '' : ' = ' + num((a.p - pS) * a.q / 2) + u}`);
  return f.svg();
}

module.exports = { Fig, num, sgn, rich, Q, P, eq, frame, curves, trade, tariff, pref, surplus };
