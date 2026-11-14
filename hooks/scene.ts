// Hive Night palette: near-black teal, emerald #10b981, blue #3b82f6.
// A hexagon floor that a slow band of light sweeps across, cells that light up like agents working and send a
// ripple out, little "bees" that fly between cells on the edges, two big slow glows and comets on the rims.
// The middle stays calm for the chat. Gradients, CSS and SMIL only: no filters, no script.
// Motion stops under reduced motion.

const W = 48.5 // pointy-top hexagon, radius 28
const HEX = `M24.25 0 L48.5 14 L48.5 42 L24.25 56 L0 42 L0 14 Z M24.25 56 V84`

function soft(id: string, color: string, peak: number): string {
  return `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${peak}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`
}

/** Centre of the hex cell at column c, row r on the floor pattern. */
function cell(c: number, r: number): [number, number] {
  return [c * W + (r % 2 ? 0 : W / 2), r * 42 + 28]
}

function hexPoints(x: number, y: number, s = 1): string {
  const pts: Array<[number, number]> = [[0, -28], [24.25, -14], [24.25, 14], [0, 28], [-24.25, 14], [-24.25, -14]]
  return pts.map(([dx, dy]) => `${(x + dx * s).toFixed(1)},${(y + dy * s).toFixed(1)}`).join(' ')
}

// Working cells: column, row, colour, delay (s), cycle (s). Kept to the edges and corners.
const CELLS: Array<[number, number, 'g' | 'b', number, number]> = [
  [2, 2, 'g', 0, 14], [3, 3, 'b', -5, 17], [1, 5, 'g', -11, 13], [4, 1, 'g', -3, 19], [6, 2, 'b', -8, 16], [2, 8, 'b', -6, 18],
  [29, 3, 'b', -3, 15], [31, 2, 'g', -9, 12], [30, 6, 'g', -14, 17], [32, 5, 'b', -7, 14], [27, 1, 'g', -1, 20], [31, 9, 'g', -12, 16],
  [2, 19, 'b', -7, 15], [5, 21, 'g', -13, 13], [1, 17, 'g', -2, 18], [7, 22, 'b', -10, 17], [3, 15, 'g', -4, 21],
  [28, 20, 'g', -6, 14], [31, 18, 'b', -12, 12], [30, 22, 'g', -9, 16], [26, 22, 'b', -1, 19], [32, 15, 'g', -5, 15], [24, 21, 'g', -11, 18],
]

// Bees: a small glow that flies a loop between cells near one corner. Path, colour, seconds.
const BEES: Array<[string, 'g' | 'b', number]> = [
  ['M110 130 C 200 60, 300 160, 220 230 S 60 260, 110 130', 'g', 11],
  ['M1430 120 C 1520 200, 1400 300, 1330 220 S 1360 60, 1430 120', 'b', 13],
  ['M140 860 C 260 800, 330 920, 230 950 S 40 940, 140 860', 'b', 12],
  ['M1440 860 C 1360 780, 1250 880, 1330 940 S 1540 930, 1440 860', 'g', 10],
  ['M300 90 C 420 40, 520 110, 450 170 S 260 160, 300 90', 'b', 15],
  ['M1260 930 C 1140 880, 1100 960, 1180 985 S 1330 990, 1260 930', 'g', 14],
]

export function hiveNightSvg(): string {
  const cells = CELLS.map(([c, r, k, d, t]) => {
    const [x, y] = cell(c, r)
    const style = `animation-delay:${d}s;animation-duration:${t}s`
    return `<g class="cell ${k}" style="${style}"><polygon points="${hexPoints(x, y, 0.82)}"/></g>` +
      `<polygon class="ring ${k}" style="${style}" points="${hexPoints(x, y, 0.82)}"/>`
  }).join('')

  const bees = BEES.map(([path, k, t], i) =>
    `<g class="bee ${k}"><circle r="9" fill="url(#bee${k})"/><circle r="2.2" class="core"/>` +
    `<animateMotion dur="${t}s" begin="-${i * 2}s" repeatCount="indefinite" path="${path}" rotate="auto"/></g>`,
  ).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<style>
.glow{animation:drift 60s ease-in-out infinite alternate}
.glow.b{animation-duration:78s;animation-direction:alternate-reverse}
.breathe{animation:breathe 24s ease-in-out infinite alternate}
.sweep{animation:sweep 26s ease-in-out infinite}
.sweep.b{animation-duration:34s;animation-delay:-17s;animation-direction:reverse}
.cell{opacity:0;animation:work 15s ease-in-out infinite}
.cell polygon{stroke-width:1.5}
.cell.g polygon{fill:#10b981;fill-opacity:.2;stroke:#34d399;stroke-opacity:.7}
.cell.b polygon{fill:#3b82f6;fill-opacity:.2;stroke:#60a5fa;stroke-opacity:.7}
.ring{fill:none;stroke-width:1.2;opacity:0;transform-box:fill-box;transform-origin:center;animation:ripple 15s ease-out infinite}
.ring.g{stroke:#34d399}.ring.b{stroke:#60a5fa}
.bee .core{fill:#eafff7}.bee.b .core{fill:#e6f0ff}
.comet{animation:run 18s linear infinite}
.comet.l{animation-name:runl;animation-duration:24s}
@keyframes drift{from{transform:translate(-60px,-30px)}to{transform:translate(70px,40px)}}
@keyframes breathe{from{opacity:.55}to{opacity:1}}
@keyframes sweep{from{transform:translateX(-900px)}to{transform:translateX(2100px)}}
@keyframes work{0%,100%{opacity:0}10%{opacity:1}35%{opacity:1}50%{opacity:0}}
@keyframes ripple{0%,8%{opacity:0;transform:scale(1)}10%{opacity:.75;transform:scale(1)}40%{opacity:0;transform:scale(2.6)}100%{opacity:0;transform:scale(2.6)}}
@keyframes run{from{transform:translateX(-500px)}to{transform:translateX(2100px)}}
@keyframes runl{from{transform:translateX(2100px)}to{transform:translateX(-500px)}}
@media (prefers-reduced-motion: reduce){*{animation:none!important}.cell{opacity:.8}.bee{display:none}}
</style>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#04110f"/><stop offset=".5" stop-color="#030a0c"/><stop offset="1" stop-color="#050b16"/></linearGradient>
<pattern id="hex" width="${W}" height="84" patternUnits="userSpaceOnUse"><path d="${HEX}" fill="none" stroke="#10b981" stroke-opacity=".09" stroke-width="1"/></pattern>
<pattern id="hexlit" width="${W}" height="84" patternUnits="userSpaceOnUse"><path d="${HEX}" fill="none" stroke="#5eead4" stroke-opacity=".5" stroke-width="1.2"/></pattern>
<linearGradient id="band" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="sweepmask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
<g class="sweep"><rect x="0" y="-300" width="520" height="1600" fill="url(#band)" transform="rotate(18 260 500)"/></g>
<g class="sweep b"><rect x="0" y="-300" width="380" height="1600" fill="url(#band)" opacity=".6" transform="rotate(-24 190 500)"/></g>
</mask>
<radialGradient id="calm" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#030a0c" stop-opacity=".85"/><stop offset=".7" stop-color="#030a0c" stop-opacity=".35"/><stop offset="1" stop-color="#030a0c" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".8"><stop offset=".6" stop-color="#020607" stop-opacity="0"/><stop offset="1" stop-color="#020607" stop-opacity=".8"/></radialGradient>
${soft('emerald', '#10b981', 0.22)}${soft('blue', '#3b82f6', 0.2)}${soft('teal', '#14b8a6', 0.12)}${soft('beeg', '#34d399', 0.65)}${soft('beeb', '#60a5fa', 0.65)}
<linearGradient id="tg" x1="0" x2="1"><stop offset="0" stop-color="#10b981" stop-opacity="0"/><stop offset="1" stop-color="#34d399" stop-opacity=".9"/></linearGradient>
<linearGradient id="tb" x1="0" x2="1"><stop offset="0" stop-color="#60a5fa" stop-opacity=".9"/><stop offset="1" stop-color="#3b82f6" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="1000" fill="url(#bg)"/>
<g class="glow"><ellipse cx="180" cy="120" rx="620" ry="420" fill="url(#emerald)"/></g>
<g class="glow b"><ellipse cx="1450" cy="900" rx="640" ry="440" fill="url(#blue)"/></g>
<ellipse class="breathe" cx="1420" cy="90" rx="420" ry="260" fill="url(#teal)"/>
<rect width="1600" height="1000" fill="url(#hex)"/>
<rect width="1600" height="1000" fill="url(#hexlit)" mask="url(#sweepmask)"/>
${cells}
${bees}
<g class="comet" style="animation-delay:-4s"><rect x="0" y="27" width="260" height="1.5" fill="url(#tg)"/><rect x="254" y="24" width="8" height="8" rx="2" fill="#34d399"/></g>
<g class="comet l" style="animation-delay:-10s"><rect x="0" y="965" width="300" height="1.5" fill="url(#tb)"/><rect x="-6" y="962" width="8" height="8" rx="2" fill="#60a5fa"/></g>
<g class="comet" style="animation-delay:-13s"><rect x="0" y="909" width="200" height="1" fill="url(#tg)" opacity=".7"/></g>
<rect width="1600" height="1000" fill="url(#calm)"/>
<rect width="1600" height="1000" fill="url(#vig)"/>
</svg>`
}
