import * as THREE from "three";

/**
 * Fábrica de sprites de texto mono minúsculos (os "numerozinhos" da linguagem
 * igloo). Um canvas 2D por label — barato (texturas ~64px, sem rede) e nítido
 * em qualquer DPR. O chamador é dono do dispose (material + textura).
 */
export function makeLabelSprite(
  text: string,
  color = "#c3d5f9",
  worldHeight = 0.34,
): THREE.Sprite {
  const pr = Math.min(
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    2,
  );
  const fs = 22;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = `500 ${fs}px "IBM Plex Mono", monospace`;
  const w = Math.ceil(ctx.measureText(text).width) + 8;
  const h = fs + 10;
  canvas.width = w * pr;
  canvas.height = h * pr;
  ctx.scale(pr, pr);
  ctx.font = `500 ${fs}px "IBM Plex Mono", monospace`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.fillText(text, w / 2, h / 2 + 1);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(worldHeight * (w / h), worldHeight, 1);
  return sprite;
}

/** libera material + textura de um sprite criado por makeLabelSprite */
export function disposeLabelSprite(s: THREE.Sprite): void {
  s.material.map?.dispose();
  s.material.dispose();
}
