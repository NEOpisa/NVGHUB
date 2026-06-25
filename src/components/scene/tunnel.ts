import tunnel from "tunnel-rat";

/**
 * Túnel único do site: qualquer componente DOM (fora do <Canvas>) pode injetar
 * nós R3F na cena global via <scene.In>, e o SceneCanvas os renderiza com
 * <scene.Out/>. É assim que "cada seção adiciona itens ao canvas" sem abrir um
 * segundo contexto WebGL. O conteúdo/texto continua no DOM (SEO preservado).
 */
export const scene = tunnel();
