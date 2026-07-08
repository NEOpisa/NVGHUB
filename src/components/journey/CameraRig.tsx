"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { intro } from "@/components/scene/introState";
import { journey, rangeN } from "./journeyState";
import { sampleCamera, WORLD } from "./path";

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _introPos = new THREE.Vector3();
const _introLook = new THREE.Vector3(0, 0.1, 0.8);

/**
 * Move a câmera pelo trajeto conforme o scroll. Durante a INTRO, assume uma
 * coreografia própria: órbita lenta ao redor da marca em construção com
 * dolly-in conforme o desenho avança (o 3D da logo se revela por paralaxe).
 * No handoff, funde de volta ao trajeto do scroll sem corte.
 * DEVE ser o primeiro filho do Canvas: seu useFrame roda antes dos demais e
 * publica journey.smooth/camZ como fonte única de verdade do frame.
 */
export default function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  const introAmt = useRef(intro.active ? 1 : 0);
  const mobK = useRef(0); // 0 = desktop · 1 = retrato (mobile)

  useFrame((state, dt) => {
    journey.smooth = THREE.MathUtils.damp(
      journey.smooth,
      journey.progress,
      5,
      dt,
    );
    const sm = journey.smooth;
    let fov = sampleCamera(sm, _pos, _look);

    // retrato + capítulo SOLUÇÕES: as estações vão pro centro (ServicesRing)
    // — a mira e a posição da câmera acompanham, e o FOV abre um pouco pra
    // compensar o corredor estreito (senão o ícone ativo parece longe demais)
    const cam0 = state.camera as THREE.PerspectiveCamera;
    const portrait = cam0.aspect < 0.8 ? 1 : 0;
    mobK.current = THREE.MathUtils.damp(mobK.current, portrait, 6, dt);
    const svcK =
      mobK.current *
      Math.min(rangeN(sm, 0.46, 0.52), 1 - rangeN(sm, 0.72, 0.78));
    if (svcK > 0.002) {
      const xF = THREE.MathUtils.lerp(1, WORLD.svcMobileX, svcK);
      _pos.x *= xF;
      _look.x *= xF;
      // mira sobe só metade da elevação das estações: o ícone ativo fica
      // acima do centro da tela, longe do card de texto ancorado embaixo
      _look.y += svcK * WORLD.svcMobileLift * 0.5;
      const comp = THREE.MathUtils.clamp(1.05 / cam0.aspect, 1, 1.25);
      fov *= THREE.MathUtils.lerp(1, comp, svcK);
    }

    // parallax sutil de mouse por cima da trajetória
    const k = Math.min(dt * 3, 1);
    mouse.current.x += (state.pointer.x - mouse.current.x) * k;
    mouse.current.y += (state.pointer.y - mouse.current.y) * k;

    // coreografia da intro: órbita + dolly-in, fundida ao trajeto no handoff
    const wantIntro = intro.active && intro.phase === "load" ? 1 : 0;
    introAmt.current = THREE.MathUtils.damp(introAmt.current, wantIntro, 1.6, dt);
    const ia = introAmt.current;
    if (ia > 0.002) {
      const t = state.clock.elapsedTime;
      // órbita AMPLA (±54°) + arco vertical: o volume da marca se revela
      // por paralaxe de verdade, não só de frente
      const ang = Math.sin(t * 0.24) * 0.95;
      const r = 10.4 - intro.build * 3.0; // dolly-in forte conforme desenha
      _introPos.set(
        Math.sin(ang) * r,
        0.4 + Math.sin(t * 0.31) * 0.4,
        Math.cos(ang) * r + 0.8,
      );
      _pos.lerp(_introPos, ia);
      _look.lerp(_introLook, ia);
    }

    const cam = state.camera as THREE.PerspectiveCamera;
    cam.position.set(
      _pos.x + mouse.current.x * 0.35,
      _pos.y + mouse.current.y * 0.22,
      _pos.z,
    );
    cam.up.set(0, 1, 0);
    cam.lookAt(_look);
    cam.rotation.z += mouse.current.x * -0.015; // banking sutil

    const wantFov = fov + ia * (48 - fov) * 0.5; // intro levemente mais tele
    if (Math.abs(cam.fov - wantFov) > 0.05) {
      cam.fov = wantFov;
      cam.updateProjectionMatrix();
    }
    journey.camZ = cam.position.z;
  });

  return null;
}
