"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { intro } from "@/components/scene/introState";
import { buildLogoChunks, type Chunk } from "@/components/scene/logoGeometry";
import BlueprintLogo from "../blueprint/BlueprintLogo";
import { journey, rangeN } from "../journeyState";

/**
 * Estação HERO + palco da INTRO — linguagem BLUEPRINT:
 * 1. o contorno da marca se DESENHA em traços de luz (loading disfarçado);
 * 2. o metal MATERIALIZA de baixo pra cima (clipping plane subindo atrás da
 *    barra de scan) com flash ao completar;
 * 3. a marca migra para a composição do hero e entra no LOOP do site antigo
 *    (cacos respirando + flutuação + halo pulsando).
 * Ao rolar, a marca "desimprime" (clipping desce) e o blueprint reaparece.
 */

// posição da marca na composição do hero (paisagem / retrato)
const HERO_POS = { x: 3.1, y: 0.15, s: 0.92 };
// retrato: marca mais alta e menor p/ caber na banda superior (~40dvh) e
// liberar a metade de baixo para a copy sem sobreposição (#061)
const HERO_POS_PORTRAIT = { x: 0, y: 2.25, s: 0.44 };
// posição durante a intro: centro da tela
const INTRO_POS = { x: 0, y: 0.1, s: 0.62 };
// respiração dos cacos (drift do loop antigo)
const LOOP_AMT = 0.3;
const LOOP_SPEED = 0.55;
// bounds locais da marca em y (para o clipping da materialização)
const LOGO_MIN_Y = -2.5;
const LOGO_MAX_Y = 2.45;

const _wp = new THREE.Vector3();
const _chunkW = new THREE.Vector3();
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
// SHATTER por proximidade do ponteiro: raio (mundo) e força do estouro
const SHATTER_RADIUS = 1.6;
const SHATTER_AMT = 1.15;

export default function HeroLogo() {
  const root = useRef<THREE.Group>(null);
  const lookRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const realGroup = useRef<THREE.Group>(null);
  const build = useRef(0);
  const fillSm = useRef(0); // materialização suavizada
  const prevFill = useRef(0);
  const flashT = useRef(10); // tempo desde o flash de conclusão
  const started = useRef(false);
  const pos = useRef(
    intro.active ? { ...INTRO_POS, z: 0.8 } : { ...HERO_POS, z: 0 },
  );
  // deslocamento de QUEBRA por caco (persegue o alvo com mola)
  const shatter = useRef<Float32Array | null>(null);

  // plano de clipping da materialização (mantém y <= constant, em mundo)
  const clipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), -999),
    [],
  );

  // logo REAL em cacos (mesma construção do LogoItem antigo) + halo + juntas
  const { chunks, meshes, whiteMat, purpleMat, haloMat, seamMat, disposables } =
    useMemo(() => {
      const whiteMat = new THREE.MeshPhysicalMaterial({
        color: "#eef0ff",
        metalness: 1.0,
        roughness: 0.1,
        emissive: new THREE.Color("#6c5cff"),
        emissiveIntensity: 0.06,
        envMapIntensity: 1.6,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        // óxido de bismuto: filme fino iridescente sobre o metal
        iridescence: 0.9,
        iridescenceIOR: 1.32,
        iridescenceThicknessRange: [120, 680],
        clippingPlanes: [clipPlane],
      });
      const purpleMat = new THREE.MeshPhysicalMaterial({
        color: "#6c5cff",
        metalness: 0.92,
        roughness: 0.14,
        emissive: new THREE.Color("#9d8cff"),
        emissiveIntensity: 0.9,
        envMapIntensity: 1.8,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        iridescence: 0.7,
        iridescenceIOR: 1.32,
        iridescenceThicknessRange: [140, 620],
        clippingPlanes: [clipPlane],
      });
      const haloMat = new THREE.MeshBasicMaterial({
        color: "#9d8cff",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        clippingPlanes: [clipPlane],
      });
      // juntas luminosas sobre o metal (as "seams" do igloo)
      const seamMat = new THREE.LineBasicMaterial({
        color: "#cfc4ff",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        clippingPlanes: [clipPlane],
      });

      const built = buildLogoChunks(1, 1);
      const chunks: Chunk[] = [...built.white, ...built.purple];
      const disposables: THREE.BufferGeometry[] = [];
      const meshes = chunks.map((c, i) => {
        const mat = i < built.white.length ? whiteMat : purpleMat;
        const mesh = new THREE.Mesh(c.geometry, mat);
        mesh.position.copy(c.pivot);
        disposables.push(c.geometry);
        const edges = new THREE.EdgesGeometry(c.geometry, 24);
        mesh.add(new THREE.LineSegments(edges, seamMat));
        disposables.push(edges);
        if (i >= built.white.length) {
          const halo = new THREE.Mesh(c.geometry, haloMat);
          halo.scale.setScalar(1.04);
          mesh.add(halo);
        }
        return mesh;
      });
      return { chunks, meshes, whiteMat, purpleMat, haloMat, seamMat, disposables };
    }, [clipPlane]);

  useEffect(
    () => () => {
      disposables.forEach((g) => g.dispose());
      whiteMat.dispose();
      purpleMat.dispose();
      haloMat.dispose();
      seamMat.dispose();
    },
    [disposables, whiteMat, purpleMat, haloMat, seamMat],
  );

  // avisa o gate: o palco 3D está pronto (ele revela o fundo e solta o build)
  useEffect(() => {
    intro.canvasReady = true;
  }, []);

  // sem intro: começa a desenhar quando o site é liberado
  useEffect(() => {
    if (intro.active) return;
    if (document.body.classList.contains("site-loaded")) {
      started.current = true;
      return;
    }
    const obs = new MutationObserver(() => {
      if (document.body.classList.contains("site-loaded")) {
        obs.disconnect();
        started.current = true;
      }
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useFrame((state, dt) => {
    const g = root.current;
    if (!g) return;
    const sm = journey.smooth;
    g.visible = sm < 0.26;
    if (!g.visible) return;

    // build: persegue o gate com taxa limitada (o desenho tem ritmo próprio,
    // mas rápido — a intro inteira fecha em ~1s depois do palco montar)
    if (intro.active) {
      build.current = Math.min(intro.build, build.current + dt * 1.6);
    } else if (started.current && build.current < 1) {
      build.current = Math.min(1, build.current + dt * 1.4);
    }

    const t = state.clock.elapsedTime;
    const scatter = rangeN(sm, 0.055, 0.19);

    // materialização: sobe com o fim do build, DESCE com o scroll (desimprime)
    const fillTarget = Math.min(
      rangeN(build.current, 0.82, 1),
      clamp01(1 - scatter * 1.25),
    );
    fillSm.current = THREE.MathUtils.damp(fillSm.current, fillTarget, 6, dt);
    const fill = fillSm.current;

    // flash de conclusão (dispara quando o fill fecha)
    if (fill >= 0.995 && prevFill.current < 0.995) flashT.current = 0;
    prevFill.current = fill;
    flashT.current += dt;
    const flash = Math.exp(-flashT.current * 3.5) * 2.2;

    // clipping em espaço de MUNDO: acompanha posição/escala do grupo
    const rg = realGroup.current;
    if (rg) {
      rg.visible = fill > 0.002 || build.current > 0.55;
      rg.getWorldPosition(_wp);
      const s = pos.current.s;
      clipPlane.constant =
        _wp.y + (LOGO_MIN_Y + (LOGO_MAX_Y - LOGO_MIN_Y) * fill) * s;

      // LOOP do site antigo: brilho respira + cacos derivam pivô±dir
      const loopAmp = rangeN(build.current, 0.96, 1) * (1 - scatter);
      const breathe = 0.5 + 0.5 * Math.sin(t * LOOP_SPEED * 2);
      whiteMat.emissiveIntensity = 0.06 + breathe * 0.3 * loopAmp + flash * 0.4;
      purpleMat.emissiveIntensity = 0.8 + breathe * 1.3 * loopAmp + flash;
      haloMat.opacity = loopAmp * breathe * 0.35 + flash * 0.15;
      // juntas de luz do metal: acendem com a materialização e respiram
      seamMat.opacity = fill * (0.14 + breathe * 0.14) + flash * 0.25;

      // CONVERGÊNCIA da intro: os cacos voam de longe e se encaixam
      // enquanto o scan revela o metal (spread → 0 no fim do build)
      const spread = Math.pow(1 - rangeN(build.current, 0.66, 1), 1.6) * 6;

      // SHATTER no ponteiro: raycast contra os cacos; os próximos ao ponto
      // de impacto estouram para fora e voltam com mola ao sair
      if (!shatter.current || shatter.current.length !== meshes.length)
        shatter.current = new Float32Array(meshes.length);
      const sh = shatter.current;
      let hitPoint: THREE.Vector3 | null = null;
      if (fill > 0.9 && spread < 0.01 && scatter < 0.05) {
        state.raycaster.setFromCamera(state.pointer, state.camera);
        const hits = state.raycaster.intersectObjects(meshes, false);
        if (hits.length) hitPoint = hits[0].point;
      }
      for (let i = 0; i < meshes.length; i++) {
        let target = 0;
        if (hitPoint) {
          meshes[i].getWorldPosition(_chunkW);
          const d = _chunkW.distanceTo(hitPoint);
          const infl = clamp01(1 - d / SHATTER_RADIUS);
          target = infl * infl * SHATTER_AMT;
        }
        // ataque rápido (estoura na hora), retorno mais lento (mola)
        const rate = target > sh[i] ? 14 : 5.5;
        sh[i] = THREE.MathUtils.damp(sh[i], target, rate, dt);
      }

      for (let i = 0; i < meshes.length; i++) {
        const c = chunks[i];
        const drift =
          Math.sin(t * LOOP_SPEED * 2 + i * 1.9) *
          LOOP_AMT *
          (0.8 + (i % 3) * 0.15) *
          loopAmp;
        const off = drift + spread * (1 + (i % 4) * 0.35) + sh[i];
        meshes[i].position.set(
          c.pivot.x + c.dir.x * off,
          c.pivot.y + c.dir.y * off,
          c.pivot.z + c.dir.z * off,
        );
        // tomba em voo (intro) e ao quebrar (hover) — zera encaixado
        const tumble = spread * 0.35 + sh[i] * 0.5;
        meshes[i].rotation.set(
          c.dir.y * tumble,
          c.dir.x * tumble,
          c.dir.z * tumble * 0.6,
        );
      }
    }

    // flutuação do conjunto (Float do hero antigo), só com a marca montada
    const fg = floatRef.current;
    if (fg) {
      const amp = rangeN(build.current, 0.96, 1) * (1 - scatter);
      fg.position.y = Math.sin(t * 1.1) * 0.16 * amp;
      fg.rotation.z = Math.sin(t * 0.7) * 0.045 * amp;
      fg.rotation.x = Math.cos(t * 0.9) * 0.03 * amp;
    }

    // migração: centro (intro) → composição do hero (handoff/done)
    const portrait = state.viewport.aspect < 0.8;
    const heroTarget = portrait ? HERO_POS_PORTRAIT : HERO_POS;
    const inIntro = intro.active && intro.phase === "load";
    const target = inIntro
      ? { x: 0, y: INTRO_POS.y, s: portrait ? 0.4 : INTRO_POS.s, z: 0.8 }
      : { x: heroTarget.x, y: heroTarget.y, s: heroTarget.s, z: 0 };
    const k = Math.min(dt * (intro.phase === "handoff" ? 2.6 : 4), 1);
    pos.current.x += (target.x - pos.current.x) * k;
    pos.current.y += (target.y - pos.current.y) * k;
    pos.current.s += (target.s - pos.current.s) * k;
    pos.current.z += (target.z - pos.current.z) * k;

    const dep = rangeN(sm, 0.055, 0.19);
    g.position.set(pos.current.x, pos.current.y, pos.current.z + dep * 2.5);
    g.scale.setScalar(pos.current.s);

    // olhar: TURNTABLE 3D durante a intro (o volume se revela girando);
    // depois, segue o ponteiro + deriva suave
    const lg = lookRef.current;
    if (lg) {
      const b = build.current;
      let tgtY: number;
      let tgtX: number;
      if (inIntro) {
        // turntable largo: soma com a órbita da câmera pro máximo de volume
        tgtY = Math.sin(t * 0.26) * 0.85;
        tgtX = Math.sin(t * 0.19) * 0.3 - 0.08;
      } else {
        tgtY = (state.pointer.x * 0.7 + Math.sin(t * 0.3) * 0.18) * b + dep * 1.6;
        tgtX = (-state.pointer.y * 0.45 + Math.sin(t * 0.22) * 0.08) * b;
      }
      lg.rotation.y += (tgtY - lg.rotation.y) * 0.07;
      lg.rotation.x += (tgtX - lg.rotation.x) * 0.07;
      lg.rotation.z = Math.sin(t * 0.15) * 0.05 * b;
    }
  });

  return (
    <group ref={root}>
      <group ref={lookRef}>
        <group ref={floatRef}>
          <BlueprintLogo
            getBuild={() => build.current}
            getFill={() => fillSm.current}
            getFade={() =>
              // forte durante o desenho; some quando o metal fecha;
              // reaparece fantasmagórico enquanto a marca desimprime no scroll
              Math.max(
                1 - rangeN(build.current, 0.86, 1),
                rangeN(journey.smooth, 0.055, 0.19) * 0.6,
              ) * (1 - rangeN(journey.smooth, 0.16, 0.24))
            }
          />
          <group ref={realGroup} visible={false}>
            {meshes.map((m, i) => (
              <primitive key={i} object={m} />
            ))}
          </group>
        </group>
      </group>
      <Sparkles
        count={16}
        scale={[7, 6, 5]}
        size={2.2}
        speed={0.28}
        opacity={0.35}
        color="#9d8cff"
      />
      <pointLight position={[1.5, 1.5, 2.5]} intensity={22} color="#6c5cff" />
    </group>
  );
}
