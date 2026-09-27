import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // Uso intencional de <img>: logo é um PNG decorativo de ~2KB (aria-hidden)
      // e não precisa da sobrecarga do componente <Image>.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores(["templates/**", "public/templates/**", ".next/**", "next-env.d.ts"]),
]);

export default eslintConfig;
