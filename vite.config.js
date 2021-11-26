import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
// import commonjs from "@rollup/plugin-commonjs";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
// import { nodeResolve } from "@rollup/plugin-node-resolve";
import WindiCSS from "vite-plugin-windicss";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    alias(),
    WindiCSS({
      transformCSS: "pre",
    }),
    vueI18n({
      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, "src/locales/**"),
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["robotjs", "@nut-tree/nut-js", "simple-signal-client"])],
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
