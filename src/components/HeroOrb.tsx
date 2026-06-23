"use client";

import { useEffect, useRef } from "react";

export default function HeroOrb() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let destroyed = false;

    import("three").then((THREE) => {
      if (destroyed) return;

      const W = canvas.offsetWidth  || 600;
      const H = canvas.offsetHeight || 600;

      const renderer = new THREE.WebGLRenderer({
        canvas, alpha: true, antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(W, H, false);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
      camera.position.z = 5;

      // Vertex shader — respiração suave
      const VERT = /* glsl */`
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPos    = position;
          float wave = sin(position.y * 3.0 + uTime * 0.8) * 0.025
                     + cos(position.x * 2.5 + uTime * 0.6) * 0.02;
          vec3 displaced = position + normal * wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `;

      // Fragment shader — gradiente roxa + brilho de borda
      const FRAG = /* glsl */`
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
          float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.8);

          // Core: roxo profundo → lavanda
          vec3 colorA = vec3(0.49, 0.14, 0.93);  // #7c23ed
          vec3 colorB = vec3(0.77, 0.71, 0.99);  // #c4b5fd
          vec3 col    = mix(colorA, colorB, fresnel);

          // Brilho adicional na borda
          float rim   = pow(fresnel, 1.2);
          col += vec3(rim * 0.35);

          // Pulse suave
          float pulse = 0.92 + sin(uTime * 0.55) * 0.08;

          gl_FragColor = vec4(col, (0.55 + fresnel * 0.45) * pulse);
        }
      `;

      const geo = new THREE.SphereGeometry(1.6, 48, 48);
      const uni = { uTime: { value: 0 } };
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG,
        uniforms: uni, transparent: true,
        depthWrite: false, side: THREE.FrontSide,
      });
      const sphere = new THREE.Mesh(geo, mat);
      scene.add(sphere);

      // Halo difuso atrás da esfera
      const haloV = /* glsl */`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
      const haloF = /* glsl */`
        varying vec2 vUv;
        uniform float uTime;
        void main(){
          float d=distance(vUv,vec2(.5));
          float a=smoothstep(.5,.15,d)*0.18*(0.9+sin(uTime*0.4)*0.1);
          gl_FragColor=vec4(0.49,0.23,0.93,a);
        }`;
      const haloUni = { uTime: { value: 0 } };
      const halo = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5),
        new THREE.ShaderMaterial({
          vertexShader: haloV, fragmentShader: haloF,
          uniforms: haloUni, transparent: true,
          depthWrite: false, blending: THREE.AdditiveBlending,
        })
      );
      halo.position.z = -0.5;
      scene.add(halo);

      const clock = new THREE.Clock();
      const FPS = 30;
      const MS  = 1000 / FPS;
      let last  = 0;

      const draw = (t: number) => {
        rafId = requestAnimationFrame(draw);
        if (t - last < MS) return;
        last = t;

        const elapsed = clock.getElapsedTime();
        uni.uTime.value      = elapsed;
        haloUni.uTime.value  = elapsed;
        sphere.rotation.y = elapsed * 0.12;
        sphere.rotation.x = Math.sin(elapsed * 0.18) * 0.06;

        renderer.render(scene, camera);
      };

      rafId = requestAnimationFrame(draw);

      return () => {
        cancelAnimationFrame(rafId);
        renderer.dispose();
        geo.dispose();
        mat.dispose();
      };
    });

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} aria-hidden="true" />;
}
