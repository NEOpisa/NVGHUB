import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";

const _vec = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _target = new THREE.Vector3();

type Options = {
  /** Plano Z onde o item vive (a âncora projeta o centro do DOM nesse plano). */
  z?: number;
  /** Suavização do seguimento (0–1). Menor = mais "preguiçoso". */
  lerp?: number;
  /** Quando false, para de seguir (ex.: seção fora de vista). */
  enabled?: boolean;
};

/**
 * Ancora um objeto 3D ao centro de um elemento DOM, projetando o retângulo da
 * tela no plano Z do objeto a cada frame. É o elo DOM↔WebGL feito na mão: o
 * texto/layout vive no DOM e o item 3D acompanha onde ele está na página.
 *
 * O SceneCanvas é fixo e cobre a viewport inteira, então as coordenadas de tela
 * do elemento batem com as do canvas.
 */
export function useDomAnchor(
  objRef: RefObject<THREE.Object3D | null>,
  domRef: RefObject<HTMLElement | null>,
  { z = 0, lerp = 0.12, enabled = true }: Options = {}
) {
  const { camera, size } = useThree();

  useFrame(() => {
    const obj = objRef.current;
    const el = domRef.current;
    if (!obj || !el || !enabled) return;

    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    // px de tela → NDC
    const ndcX = (cx / size.width) * 2 - 1;
    const ndcY = -((cy / size.height) * 2 - 1);

    // desprojeta o ponto e cruza com o plano z=`z` para achar x,y no mundo
    _vec.set(ndcX, ndcY, 0.5).unproject(camera);
    _dir.copy(_vec).sub(camera.position).normalize();
    const dist = (z - camera.position.z) / _dir.z;
    _target.copy(camera.position).add(_dir.multiplyScalar(dist));

    obj.position.x += (_target.x - obj.position.x) * lerp;
    obj.position.y += (_target.y - obj.position.y) * lerp;
  });
}
