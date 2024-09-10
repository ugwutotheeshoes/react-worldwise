import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode,process.cwd(),'');
  return{
    define:{
      'process.env':env
    },
  plugins: [react(), eslintPlugin()],
  server: {
    hmr: {
      overlay: false,
    },
  },
}
});


