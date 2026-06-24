import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ["templates/**", "public/templates/**", ".next/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Uso intencional de <img>: logo é um PNG decorativo de ~2KB (aria-hidden)
      // e o projeto roda com images.unoptimized, então <Image> não traria ganho.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
