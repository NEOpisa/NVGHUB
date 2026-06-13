"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   SilkCanvas — seda de mel em WebGL puro (zero dependências).
   Um campo fbm com dupla distorção de domínio gera fios de seda
   que escorrem em luz dourada sobre o fundo escuro do hero.

   Progressive enhancement:
   - o canvas nasce com opacity 0 (CSS) e só aparece depois do primeiro
     frame desenhado (classe .live) — o buffer opaco de um WebGL recém
     criado pode compor BRANCO em alguns drivers, e isso piscava no load;
   - sem WebGL ou contexto perdido → canvas invisível e o gradiente CSS
     (.hero-veil) segura a cena sozinho;
   - prefers-reduced-motion → renderiza UM frame bonito e para;
   - fora da viewport ou aba oculta → o loop pausa.
   ============================================================ */

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_t;
uniform vec2 u_m;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++){
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_t * 0.05;
  vec2 m = u_m * 0.12;

  // coordenadas anisotrópicas: a seda corre na horizontal
  vec2 p = vec2(uv.x * 1.1, uv.y * 2.3) + m;
  vec2 q = vec2(
    fbm(p + vec2(t * 0.9, -t * 0.4)),
    fbm(p + vec2(-t * 0.6, t * 0.5) + 3.7)
  );
  float f = fbm(p + 2.2 * q + vec2(t, -t * 0.3));

  // brilho acetinado: bandas finas ao longo do campo distorcido
  float band = sin((uv.x * 1.4 + q.x * 2.5 - q.y * 1.5) * 6.2831 + t * 3.0 + f * 7.0);
  float sheen = pow(0.5 + 0.5 * band, 4.0);
  float lum = f * f * 1.4;

  vec3 deep   = vec3(0.085, 0.058, 0.040);
  vec3 honey  = vec3(0.93, 0.62, 0.27);
  vec3 candle = vec3(1.00, 0.86, 0.62);
  vec3 rose   = vec3(0.62, 0.30, 0.24);

  vec3 col = deep;
  col += honey * lum * 0.75;
  col += candle * sheen * lum * 0.9;
  col += rose * q.y * q.y * 0.22;

  // a luz mora à direita; a esquerda fica escura para o título
  float focus = smoothstep(-0.9, 0.8, uv.x);
  col *= mix(0.35, 1.15, focus);

  // vinheta para fundir com a página
  float vig = 1.0 - dot(uv * vec2(0.55, 0.8), uv * vec2(0.55, 0.8));
  col *= clamp(vig, 0.0, 1.0);

  // dithering: mata o banding do gradiente escuro
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export default function SilkCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // .hero-veil segura a cena

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");
    const uM = gl.getUniformLocation(prog, "u_m");

    // resolução interna reduzida: seda é suave, não precisa de DPR cheio
    const scale = Math.min(Math.max(window.devicePixelRatio * 0.6, 0.7), 1.25);
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const host = canvas.parentElement ?? canvas;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    host.addEventListener("pointermove", onMove, { passive: true });

    const draw = (t: number) => {
      resize();
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, t);
      gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // só revela o canvas com um frame válido já desenhado
      canvas.classList.add("live");
    };

    // Contexto perdido (troca de GPU, driver, aba suspensa): esconde o
    // canvas na hora — o gradiente CSS volta a segurar a cena.
    const onLost = (e: Event) => {
      e.preventDefault();
      canvas.classList.remove("live");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      draw(26); // um frame parado, escolhido num momento bonito do campo
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      return () => {
        canvas.removeEventListener("webglcontextlost", onLost);
      };
    }

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const loop = (now: number) => {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const setRunning = (run: boolean) => {
      cancelAnimationFrame(raf);
      if (run) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setRunning(visible && !document.hidden);
    });
    io.observe(canvas);
    const onVis = () => setRunning(visible && !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    setRunning(true);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="hero-silk" aria-hidden="true" />;
}
