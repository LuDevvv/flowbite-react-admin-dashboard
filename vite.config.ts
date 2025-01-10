import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno según el modo (dev o production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@common": path.resolve(__dirname, "./src/components/common"),
        "@context": path.resolve(__dirname, "./src/context"),
        "@helpers": path.resolve(__dirname, "./src/helpers"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@lib": path.resolve(__dirname, "./src/lib"),
      },
    },
    plugins: [react()],
    define: {
      "process.env": env,
    },
    build: {
      emptyOutDir: true,
    },
  };
});
