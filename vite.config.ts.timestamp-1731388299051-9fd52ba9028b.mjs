// vite.config.ts
import fs2 from "node:fs";
import path3 from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///E:/code/NewSaas/node_modules/.pnpm/vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import dayjs2 from "file:///E:/code/NewSaas/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";

// package.json
var package_default = {
  type: "module",
  version: "4.7.0",
  engines: {
    node: "^18.0.0 || ^20.0.0"
  },
  scripts: {
    dev: "vite",
    build: "vue-tsc && vite build",
    "build:test": "vue-tsc && vite build --mode test",
    serve: "http-server ./dist -o",
    "serve:test": "http-server ./dist-test -o",
    svgo: "svgo -f src/assets/icons",
    new: "plop",
    "generate:icons": "esno ./scripts/generate.icons.ts",
    lint: "npm-run-all -s lint:tsc lint:eslint lint:stylelint",
    "lint:tsc": "vue-tsc",
    "lint:eslint": "eslint . --cache --fix",
    "lint:stylelint": 'stylelint "src/**/*.{css,scss,vue}" --cache --fix',
    postinstall: "simple-git-hooks",
    preinstall: "npx only-allow pnpm",
    commit: "git cz",
    release: "bumpp"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@headlessui/vue": "^1.7.19",
    "@imengyu/vue3-context-menu": "^1.3.9",
    "@kangc/v-md-editor": "^2.3.15",
    "@tinymce/tinymce-vue": "^5.1.1",
    "@vueuse/core": "^10.9.0",
    "@vueuse/integrations": "^10.9.0",
    axios: "^1.6.8",
    bytemd: "^1.21.0",
    clipboard: "^2.0.11",
    dayjs: "^1.11.10",
    defu: "^6.1.4",
    echarts: "^5.5.0",
    "element-plus": "^2.6.3",
    eruda: "^3.0.1",
    "floating-vue": "5.2.2",
    grapesjs: "^0.21.7",
    "grapesjs-advance-components": "^1.0.7",
    "grapesjs-blocks-basic": "^1.0.2",
    "grapesjs-parser-postcss": "^1.0.3",
    "grapesjs-preset-webpage": "^1.0.3",
    "hotkeys-js": "^3.13.7",
    "lodash-es": "^4.17.21",
    "medium-zoom": "^1.1.0",
    mitt: "^3.0.1",
    mockjs: "^1.1.0",
    nprogress: "^0.2.0",
    overlayscrollbars: "^2.6.1",
    "overlayscrollbars-vue": "^0.5.8",
    "path-browserify": "^1.0.1",
    "path-to-regexp": "^6.2.1",
    pinia: "^2.1.7",
    "pinyin-pro": "^3.19.6",
    qs: "^6.12.0",
    scule: "^1.3.0",
    sortablejs: "^1.15.2",
    spinkit: "^2.0.1",
    "survey-core": "^1.9.131",
    "survey-creator-core": "^1.9.131",
    "survey-creator-vue": "^1.9.131",
    "survey-vue3-ui": "^1.9.131",
    "timeago.js": "^4.0.2",
    tinymce: "^7.0.1",
    "v-wave": "^2.0.0",
    vconsole: "^3.15.1",
    vue: "^3.4.21",
    "vue-clipboard3": "^2.0.0",
    "vue-i18n": "^9.10.2",
    "vue-jsonp": "^2.0.0",
    "vue-m-message": "^4.0.2",
    "vue-meta": "3.0.0-alpha.2",
    "vue-router": "^4.3.0",
    vuedraggable: "^4.1.0"
  },
  devDependencies: {
    "@antfu/eslint-config": "2.11.6",
    "@bytemd/plugin-gfm": "^1.21.0",
    "@bytemd/vue-next": "^1.21.0",
    "@iconify/json": "^2.2.196",
    "@iconify/vue": "^4.1.1",
    "@intlify/unplugin-vue-i18n": "^4.0.0",
    "@stylistic/stylelint-config": "^1.0.1",
    "@types/lodash-es": "^4.17.12",
    "@types/mockjs": "^1.0.10",
    "@types/nprogress": "^0.2.3",
    "@types/path-browserify": "^1.0.2",
    "@types/qs": "^6.9.14",
    "@types/sortablejs": "^1.15.8",
    "@unocss/eslint-plugin": "^0.58.8",
    "@vitejs/plugin-legacy": "^5.3.2",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    archiver: "^7.0.1",
    autoprefixer: "^10.4.19",
    boxen: "^7.1.1",
    bumpp: "^9.4.0",
    "cz-git": "^1.9.1",
    eslint: "^8.57.0",
    esno: "^4.7.0",
    "fs-extra": "^11.2.0",
    "http-server": "^14.1.1",
    inquirer: "^9.2.17",
    "lint-staged": "^15.2.2",
    "npm-run-all": "^4.1.5",
    picocolors: "^1.0.0",
    plop: "^4.0.1",
    prettier: "^3.3.3",
    sass: "^1.72.0",
    "simple-git-hooks": "^2.11.1",
    stylelint: "^16.3.1",
    "stylelint-config-recess-order": "^5.0.0",
    "stylelint-config-standard-scss": "^13.0.0",
    "stylelint-config-standard-vue": "^1.0.0",
    "stylelint-scss": "^6.2.1",
    svgo: "^3.2.0",
    terser: "^5.30.0",
    typescript: "^5.4.3",
    unocss: "^0.58.8",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-turbo-console": "^1.5.1",
    "unplugin-vue-components": "^0.26.0",
    vite: "^5.2.7",
    "vite-plugin-banner": "^0.7.1",
    "vite-plugin-compression2": "^1.0.0",
    "vite-plugin-fake-server": "^2.1.1",
    "vite-plugin-pages": "^0.32.1",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-devtools": "^7.0.25",
    "vite-plugin-vue-meta-layouts": "^0.4.2",
    "vue-tsc": "^2.0.7"
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite/plugins/index.ts
import vue from "file:///E:/code/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3__vue@3.4.36_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/code/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3__vue@3.4.36_typescript@5.5.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueLegacy from "file:///E:/code/NewSaas/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.1_terser@5.31.3_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3_/node_modules/@vitejs/plugin-legacy/dist/index.mjs";

// vite/plugins/app-info.ts
import boxen from "file:///E:/code/NewSaas/node_modules/.pnpm/boxen@7.1.1/node_modules/boxen/index.js";
import picocolors from "file:///E:/code/NewSaas/node_modules/.pnpm/picocolors@1.0.1/node_modules/picocolors/picocolors.js";
function appInfo() {
  return {
    name: "appInfo",
    apply: "serve",
    async buildStart() {
      const { bold, green, magenta, bgGreen, underline } = picocolors;
      console.log(
        boxen(
          `${bold(green(`\u7531 ${bgGreen("Fantastic-admin")} \u9A71\u52A8`))}

${underline("https://fantastic-admin.gitee.io")}

\u5F53\u524D\u4F7F\u7528\uFF1A${magenta("\u4E13\u4E1A\u7248")}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            textAlignment: "center"
          }
        )
      );
    }
  };
}

// vite/plugins/devtools.ts
import VueDevTools from "file:///E:/code/NewSaas/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.7_@nuxt+kit@3.12.4_rollup@4.20.0__rollup@4.20.0_vite@5.3.5_@type_fer4fidzryagxj6w2xql4qlr5e/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
function createDevtools(env) {
  const { VITE_OPEN_DEVTOOLS } = env;
  return VITE_OPEN_DEVTOOLS === "true" && VueDevTools();
}

// vite/plugins/auto-import.ts
import autoImport from "file:///E:/code/NewSaas/node_modules/.pnpm/unplugin-auto-import@0.17.8_@nuxt+kit@3.12.4_rollup@4.20.0__@vueuse+core@10.11.0_vue@3.4.36_t_3sbwzp35oweyd366wn4krnjiki/node_modules/unplugin-auto-import/dist/vite.js";
function createAutoImport() {
  return autoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia"
    ],
    dts: "./src/types/auto-imports.d.ts",
    dirs: [
      "./src/utils/composables/**"
    ]
  });
}

// vite/plugins/components.ts
import components from "file:///E:/code/NewSaas/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.25.3_@nuxt+kit@3.12.4_rollup@4.20.0__rollup@4._zdvm6ynm5kp34kyqudedrhwane/node_modules/unplugin-vue-components/dist/vite.js";
function createComponents() {
  return components({
    dirs: [
      "src/components",
      "src/layouts/ui-kit"
    ],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./src/types/components.d.ts"
  });
}

// vite/plugins/unocss.ts
import Unocss from "file:///E:/code/NewSaas/node_modules/.pnpm/unocss@0.58.9_postcss@5.2.18_rollup@4.20.0_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3_/node_modules/unocss/dist/vite.mjs";
function createUnocss() {
  return Unocss();
}

// vite/plugins/svg-icon.ts
import path from "node:path";
import process from "node:process";
import { createSvgIconsPlugin } from "file:///E:/code/NewSaas/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/i18n.ts
import path2 from "node:path";
import vueI18n from "file:///E:/code/NewSaas/node_modules/.pnpm/@intlify+unplugin-vue-i18n@4.0.0_rollup@4.20.0_vue-i18n@9.13.1_vue@3.4.36_typescript@5.5.4__/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname = "E:\\code\\NewSaas\\vite\\plugins";
function createI18n() {
  return vueI18n({
    include: path2.resolve(__vite_injected_original_dirname, "../../src/locales/lang/**")
  });
}

// vite/plugins/mock.ts
import { vitePluginFakeServer } from "file:///E:/code/NewSaas/node_modules/.pnpm/vite-plugin-fake-server@2.1.1/node_modules/vite-plugin-fake-server/dist/index.mjs";
function createMock(env, isBuild) {
  const { VITE_BUILD_MOCK } = env;
  return vitePluginFakeServer({
    logger: !isBuild,
    include: "src/mock",
    infixName: false,
    enableProd: isBuild && VITE_BUILD_MOCK === "true"
  });
}

// vite/plugins/layouts.ts
import Layouts from "file:///E:/code/NewSaas/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.4.3_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3__v_qgrzm44a44f6nzo53tc7fdgium/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createLayouts() {
  return Layouts({
    defaultLayout: "index"
  });
}

// vite/plugins/pages.ts
import Pages from "file:///E:/code/NewSaas/node_modules/.pnpm/vite-plugin-pages@0.32.3_@vue+compiler-sfc@3.4.36_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_t_m3wc7p2nnlkehrzigy6cqsruvu/node_modules/vite-plugin-pages/dist/index.js";
function createPages() {
  return Pages({
    dirs: "src/views",
    exclude: [
      "**/components/**/*.vue"
    ]
  });
}

// vite/plugins/compression.ts
import { compression } from "file:///E:/code/NewSaas/node_modules/.pnpm/vite-plugin-compression2@1.1.3_rollup@4.20.0/node_modules/vite-plugin-compression2/dist/index.mjs";
function createCompression(env, isBuild) {
  const plugin = [];
  if (isBuild) {
    const { VITE_BUILD_COMPRESS } = env;
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression()
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          exclude: [/\.(br)$/, /\.(gz)$/],
          algorithm: "brotliCompress"
        })
      );
    }
  }
  return plugin;
}

// vite/plugins/archiver.ts
import fs from "node:fs";
import dayjs from "file:///E:/code/NewSaas/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";
import archiver from "file:///E:/code/NewSaas/node_modules/.pnpm/archiver@7.0.1/node_modules/archiver/index.js";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function createArchiver(env) {
  const { VITE_BUILD_ARCHIVE } = env;
  let outDir;
  return {
    name: "vite-plugin-archiver",
    apply: "build",
    configResolved(resolvedConfig) {
      outDir = resolvedConfig.build.outDir;
    },
    async closeBundle() {
      if (["zip", "tar"].includes(VITE_BUILD_ARCHIVE)) {
        await sleep(1e3);
        const archive = archiver(VITE_BUILD_ARCHIVE, {
          ...VITE_BUILD_ARCHIVE === "zip" && { zlib: { level: 9 } },
          ...VITE_BUILD_ARCHIVE === "tar" && { gzip: true, gzipOptions: { level: 9 } }
        });
        const output = fs.createWriteStream(`${outDir}.${dayjs().format("YYYY-MM-DD-HH-mm-ss")}.${VITE_BUILD_ARCHIVE === "zip" ? "zip" : "tar.gz"}`);
        archive.pipe(output);
        archive.directory(outDir, false);
        archive.finalize();
      }
    }
  };
}

// vite/plugins/console.ts
import TurboConsole from "file:///E:/code/NewSaas/node_modules/.pnpm/unplugin-turbo-console@1.10.1_@babel+parser@7.25.3_@nuxt+kit@3.12.4_rollup@4.20.0__@nuxt+sche_oipom4fdcettnw24cocetprygu/node_modules/unplugin-turbo-console/dist/vite.mjs";
function createConsole() {
  return TurboConsole();
}

// vite/plugins/banner.ts
import banner from "file:///E:/code/NewSaas/node_modules/.pnpm/vite-plugin-banner@0.7.1/node_modules/vite-plugin-banner/dist/index.mjs";
function createBanner() {
  return banner(`
/**
 * \u7531 Fantastic-admin \u63D0\u4F9B\u6280\u672F\u652F\u6301
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */
`);
}

// vite/plugins/index.ts
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [
    appInfo(),
    vue(),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: [
        "es.array.at",
        "es.array.find-last"
      ]
    })
  ];
  vitePlugins.push(createDevtools(viteEnv));
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createComponents());
  vitePlugins.push(createUnocss());
  vitePlugins.push(createSvgIcon(isBuild));
  vitePlugins.push(createI18n());
  vitePlugins.push(createMock(viteEnv, isBuild));
  vitePlugins.push(createLayouts());
  vitePlugins.push(createPages());
  vitePlugins.push(...createCompression(viteEnv, isBuild));
  vitePlugins.push(createArchiver(viteEnv));
  vitePlugins.push(createConsole());
  vitePlugins.push(createBanner());
  return vitePlugins;
}

// vite.config.ts
var __vite_injected_original_dirname2 = "E:\\code\\NewSaas";
var vite_config_default = async ({ mode, command }) => {
  const env = loadEnv(mode, process2.cwd());
  const scssResources = [];
  fs2.readdirSync("src/assets/styles/resources").forEach((dirname) => {
    if (fs2.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`);
    }
  });
  return defineConfig({
    base: "/",
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      open: true,
      port: 9e3,
      proxy: {
        "/proxy": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY === "true",
          rewrite: (path4) => path4.replace(/\/proxy/, "")
        }
      }
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      outDir: mode === "production" ? "dist" : `dist-${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true"
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          version: package_default.version,
          dependencies: package_default.dependencies,
          devDependencies: package_default.devDependencies
        },
        lastBuildTime: dayjs2().format("YYYY-MM-DD HH:mm:ss")
      })
    },
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: {
        "@": path3.resolve(__vite_injected_original_dirname2, "src"),
        "#": path3.resolve(__vite_injected_original_dirname2, "src/types")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join("")
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUvcGx1Z2lucy9pbmRleC50cyIsICJ2aXRlL3BsdWdpbnMvYXBwLWluZm8udHMiLCAidml0ZS9wbHVnaW5zL2RldnRvb2xzLnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50cyIsICJ2aXRlL3BsdWdpbnMvY29tcG9uZW50cy50cyIsICJ2aXRlL3BsdWdpbnMvdW5vY3NzLnRzIiwgInZpdGUvcGx1Z2lucy9zdmctaWNvbi50cyIsICJ2aXRlL3BsdWdpbnMvaTE4bi50cyIsICJ2aXRlL3BsdWdpbnMvbW9jay50cyIsICJ2aXRlL3BsdWdpbnMvbGF5b3V0cy50cyIsICJ2aXRlL3BsdWdpbnMvcGFnZXMudHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9hcmNoaXZlci50cyIsICJ2aXRlL3BsdWdpbnMvY29uc29sZS50cyIsICJ2aXRlL3BsdWdpbnMvYmFubmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXE5ld1NhYXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xyXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgLy8gXHU1MTY4XHU1QzQwIHNjc3MgXHU4RDQ0XHU2RTkwXHJcbiAgY29uc3Qgc2Nzc1Jlc291cmNlcyA9IFtdXHJcbiAgZnMucmVhZGRpclN5bmMoJ3NyYy9hc3NldHMvc3R5bGVzL3Jlc291cmNlcycpLmZvckVhY2goKGRpcm5hbWUpID0+IHtcclxuICAgIGlmIChmcy5zdGF0U3luYyhgc3JjL2Fzc2V0cy9zdHlsZXMvcmVzb3VyY2VzLyR7ZGlybmFtZX1gKS5pc0ZpbGUoKSkge1xyXG4gICAgICBzY3NzUmVzb3VyY2VzLnB1c2goYEB1c2UgXCJzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfVwiIGFzICo7YClcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy8nLFxyXG4gICAgLy8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1vcHRpb25zXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgcG9ydDogOTAwMCxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL3Byb3h5Jzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfQVBJX0JBU0VVUkwsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IGNvbW1hbmQgPT09ICdzZXJ2ZScgJiYgZW52LlZJVEVfT1BFTl9QUk9YWSA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL1xcL3Byb3h5LywgJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1mc3NlcnZlLXJvb3RcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJ2Rpc3QnIDogYGRpc3QtJHttb2RlfWAsXHJcbiAgICAgIHNvdXJjZW1hcDogZW52LlZJVEVfQlVJTERfU09VUkNFTUFQID09PSAndHJ1ZScsXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIF9fU1lTVEVNX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHBrZzoge1xyXG4gICAgICAgICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXHJcbiAgICAgICAgICBkZXBlbmRlbmNpZXM6IHBrZy5kZXBlbmRlbmNpZXMsXHJcbiAgICAgICAgICBkZXZEZXBlbmRlbmNpZXM6IHBrZy5kZXZEZXBlbmRlbmNpZXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAgICcjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy90eXBlcycpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IHNjc3NSZXNvdXJjZXMuam9pbignJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG4iLCAie1xyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjQuNy4wXCIsXHJcbiAgXCJlbmdpbmVzXCI6IHtcclxuICAgIFwibm9kZVwiOiBcIl4xOC4wLjAgfHwgXjIwLjAuMFwiXHJcbiAgfSxcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkXCIsXHJcbiAgICBcImJ1aWxkOnRlc3RcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHRlc3RcIixcclxuICAgIFwic2VydmVcIjogXCJodHRwLXNlcnZlciAuL2Rpc3QgLW9cIixcclxuICAgIFwic2VydmU6dGVzdFwiOiBcImh0dHAtc2VydmVyIC4vZGlzdC10ZXN0IC1vXCIsXHJcbiAgICBcInN2Z29cIjogXCJzdmdvIC1mIHNyYy9hc3NldHMvaWNvbnNcIixcclxuICAgIFwibmV3XCI6IFwicGxvcFwiLFxyXG4gICAgXCJnZW5lcmF0ZTppY29uc1wiOiBcImVzbm8gLi9zY3JpcHRzL2dlbmVyYXRlLmljb25zLnRzXCIsXHJcbiAgICBcImxpbnRcIjogXCJucG0tcnVuLWFsbCAtcyBsaW50OnRzYyBsaW50OmVzbGludCBsaW50OnN0eWxlbGludFwiLFxyXG4gICAgXCJsaW50OnRzY1wiOiBcInZ1ZS10c2NcIixcclxuICAgIFwibGludDplc2xpbnRcIjogXCJlc2xpbnQgLiAtLWNhY2hlIC0tZml4XCIsXHJcbiAgICBcImxpbnQ6c3R5bGVsaW50XCI6IFwic3R5bGVsaW50IFxcXCJzcmMvKiovKi57Y3NzLHNjc3MsdnVlfVxcXCIgLS1jYWNoZSAtLWZpeFwiLFxyXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcInNpbXBsZS1naXQtaG9va3NcIixcclxuICAgIFwicHJlaW5zdGFsbFwiOiBcIm5weCBvbmx5LWFsbG93IHBucG1cIixcclxuICAgIFwiY29tbWl0XCI6IFwiZ2l0IGN6XCIsXHJcbiAgICBcInJlbGVhc2VcIjogXCJidW1wcFwiXHJcbiAgfSxcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCI6IFwiXjIuMy4xXCIsXHJcbiAgICBcIkBoZWFkbGVzc3VpL3Z1ZVwiOiBcIl4xLjcuMTlcIixcclxuICAgIFwiQGltZW5neXUvdnVlMy1jb250ZXh0LW1lbnVcIjogXCJeMS4zLjlcIixcclxuICAgIFwiQGthbmdjL3YtbWQtZWRpdG9yXCI6IFwiXjIuMy4xNVwiLFxyXG4gICAgXCJAdGlueW1jZS90aW55bWNlLXZ1ZVwiOiBcIl41LjEuMVwiLFxyXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuOS4wXCIsXHJcbiAgICBcIkB2dWV1c2UvaW50ZWdyYXRpb25zXCI6IFwiXjEwLjkuMFwiLFxyXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuOFwiLFxyXG4gICAgXCJieXRlbWRcIjogXCJeMS4yMS4wXCIsXHJcbiAgICBcImNsaXBib2FyZFwiOiBcIl4yLjAuMTFcIixcclxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMFwiLFxyXG4gICAgXCJkZWZ1XCI6IFwiXjYuMS40XCIsXHJcbiAgICBcImVjaGFydHNcIjogXCJeNS41LjBcIixcclxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuNi4zXCIsXHJcbiAgICBcImVydWRhXCI6IFwiXjMuMC4xXCIsXHJcbiAgICBcImZsb2F0aW5nLXZ1ZVwiOiBcIjUuMi4yXCIsXHJcbiAgICBcImdyYXBlc2pzXCI6IFwiXjAuMjEuN1wiLFxyXG4gICAgXCJncmFwZXNqcy1hZHZhbmNlLWNvbXBvbmVudHNcIjogXCJeMS4wLjdcIixcclxuICAgIFwiZ3JhcGVzanMtYmxvY2tzLWJhc2ljXCI6IFwiXjEuMC4yXCIsXHJcbiAgICBcImdyYXBlc2pzLXBhcnNlci1wb3N0Y3NzXCI6IFwiXjEuMC4zXCIsXHJcbiAgICBcImdyYXBlc2pzLXByZXNldC13ZWJwYWdlXCI6IFwiXjEuMC4zXCIsXHJcbiAgICBcImhvdGtleXMtanNcIjogXCJeMy4xMy43XCIsXHJcbiAgICBcImxvZGFzaC1lc1wiOiBcIl40LjE3LjIxXCIsXHJcbiAgICBcIm1lZGl1bS16b29tXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcclxuICAgIFwibW9ja2pzXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxyXG4gICAgXCJvdmVybGF5c2Nyb2xsYmFyc1wiOiBcIl4yLjYuMVwiLFxyXG4gICAgXCJvdmVybGF5c2Nyb2xsYmFycy12dWVcIjogXCJeMC41LjhcIixcclxuICAgIFwicGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4xXCIsXHJcbiAgICBcInBhdGgtdG8tcmVnZXhwXCI6IFwiXjYuMi4xXCIsXHJcbiAgICBcInBpbmlhXCI6IFwiXjIuMS43XCIsXHJcbiAgICBcInBpbnlpbi1wcm9cIjogXCJeMy4xOS42XCIsXHJcbiAgICBcInFzXCI6IFwiXjYuMTIuMFwiLFxyXG4gICAgXCJzY3VsZVwiOiBcIl4xLjMuMFwiLFxyXG4gICAgXCJzb3J0YWJsZWpzXCI6IFwiXjEuMTUuMlwiLFxyXG4gICAgXCJzcGlua2l0XCI6IFwiXjIuMC4xXCIsXHJcbiAgICBcInN1cnZleS1jb3JlXCI6IFwiXjEuOS4xMzFcIixcclxuICAgIFwic3VydmV5LWNyZWF0b3ItY29yZVwiOiBcIl4xLjkuMTMxXCIsXHJcbiAgICBcInN1cnZleS1jcmVhdG9yLXZ1ZVwiOiBcIl4xLjkuMTMxXCIsXHJcbiAgICBcInN1cnZleS12dWUzLXVpXCI6IFwiXjEuOS4xMzFcIixcclxuICAgIFwidGltZWFnby5qc1wiOiBcIl40LjAuMlwiLFxyXG4gICAgXCJ0aW55bWNlXCI6IFwiXjcuMC4xXCIsXHJcbiAgICBcInYtd2F2ZVwiOiBcIl4yLjAuMFwiLFxyXG4gICAgXCJ2Y29uc29sZVwiOiBcIl4zLjE1LjFcIixcclxuICAgIFwidnVlXCI6IFwiXjMuNC4yMVwiLFxyXG4gICAgXCJ2dWUtY2xpcGJvYXJkM1wiOiBcIl4yLjAuMFwiLFxyXG4gICAgXCJ2dWUtaTE4blwiOiBcIl45LjEwLjJcIixcclxuICAgIFwidnVlLWpzb25wXCI6IFwiXjIuMC4wXCIsXHJcbiAgICBcInZ1ZS1tLW1lc3NhZ2VcIjogXCJeNC4wLjJcIixcclxuICAgIFwidnVlLW1ldGFcIjogXCIzLjAuMC1hbHBoYS4yXCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjBcIixcclxuICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiXjQuMS4wXCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGFudGZ1L2VzbGludC1jb25maWdcIjogXCIyLjExLjZcIixcclxuICAgIFwiQGJ5dGVtZC9wbHVnaW4tZ2ZtXCI6IFwiXjEuMjEuMFwiLFxyXG4gICAgXCJAYnl0ZW1kL3Z1ZS1uZXh0XCI6IFwiXjEuMjEuMFwiLFxyXG4gICAgXCJAaWNvbmlmeS9qc29uXCI6IFwiXjIuMi4xOTZcIixcclxuICAgIFwiQGljb25pZnkvdnVlXCI6IFwiXjQuMS4xXCIsXHJcbiAgICBcIkBpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuXCI6IFwiXjQuMC4wXCIsXHJcbiAgICBcIkBzdHlsaXN0aWMvc3R5bGVsaW50LWNvbmZpZ1wiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJAdHlwZXMvbG9kYXNoLWVzXCI6IFwiXjQuMTcuMTJcIixcclxuICAgIFwiQHR5cGVzL21vY2tqc1wiOiBcIl4xLjAuMTBcIixcclxuICAgIFwiQHR5cGVzL25wcm9ncmVzc1wiOiBcIl4wLjIuM1wiLFxyXG4gICAgXCJAdHlwZXMvcGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4yXCIsXHJcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTRcIixcclxuICAgIFwiQHR5cGVzL3NvcnRhYmxlanNcIjogXCJeMS4xNS44XCIsXHJcbiAgICBcIkB1bm9jc3MvZXNsaW50LXBsdWdpblwiOiBcIl4wLjU4LjhcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tbGVnYWN5XCI6IFwiXjUuMy4yXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjMuMS4wXCIsXHJcbiAgICBcImFyY2hpdmVyXCI6IFwiXjcuMC4xXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXHJcbiAgICBcImJveGVuXCI6IFwiXjcuMS4xXCIsXHJcbiAgICBcImJ1bXBwXCI6IFwiXjkuNC4wXCIsXHJcbiAgICBcImN6LWdpdFwiOiBcIl4xLjkuMVwiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXHJcbiAgICBcImVzbm9cIjogXCJeNC43LjBcIixcclxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXHJcbiAgICBcImh0dHAtc2VydmVyXCI6IFwiXjE0LjEuMVwiLFxyXG4gICAgXCJpbnF1aXJlclwiOiBcIl45LjIuMTdcIixcclxuICAgIFwibGludC1zdGFnZWRcIjogXCJeMTUuMi4yXCIsXHJcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXHJcbiAgICBcInBpY29jb2xvcnNcIjogXCJeMS4wLjBcIixcclxuICAgIFwicGxvcFwiOiBcIl40LjAuMVwiLFxyXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjMuM1wiLFxyXG4gICAgXCJzYXNzXCI6IFwiXjEuNzIuMFwiLFxyXG4gICAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IFwiXjIuMTEuMVwiLFxyXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuMy4xXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjZXNzLW9yZGVyXCI6IFwiXjUuMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMy4wLjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC12dWVcIjogXCJeMS4wLjBcIixcclxuICAgIFwic3R5bGVsaW50LXNjc3NcIjogXCJeNi4yLjFcIixcclxuICAgIFwic3Znb1wiOiBcIl4zLjIuMFwiLFxyXG4gICAgXCJ0ZXJzZXJcIjogXCJeNS4zMC4wXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjNcIixcclxuICAgIFwidW5vY3NzXCI6IFwiXjAuNTguOFwiLFxyXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE3LjVcIixcclxuICAgIFwidW5wbHVnaW4tdHVyYm8tY29uc29sZVwiOiBcIl4xLjUuMVwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI2LjBcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjIuN1wiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1iYW5uZXJcIjogXCJeMC43LjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb24yXCI6IFwiXjEuMC4wXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWZha2Utc2VydmVyXCI6IFwiXjIuMS4xXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXBhZ2VzXCI6IFwiXjAuMzIuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI6IFwiXjcuMC4yNVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtbWV0YS1sYXlvdXRzXCI6IFwiXjAuNC4yXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjdcIlxyXG4gIH0sXHJcbiAgXCJjb25maWdcIjoge1xyXG4gICAgXCJjb21taXRpemVuXCI6IHtcclxuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9pbmRleC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHZ1ZUxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXHJcbmltcG9ydCBhcHBJbmZvIGZyb20gJy4vYXBwLWluZm8nXHJcblxyXG5pbXBvcnQgY3JlYXRlRGV2dG9vbHMgZnJvbSAnLi9kZXZ0b29scydcclxuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcclxuaW1wb3J0IGNyZWF0ZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJ1xyXG5pbXBvcnQgY3JlYXRlVW5vY3NzIGZyb20gJy4vdW5vY3NzJ1xyXG5pbXBvcnQgY3JlYXRlU3ZnSWNvbiBmcm9tICcuL3N2Zy1pY29uJ1xyXG5pbXBvcnQgY3JlYXRlSTE4biBmcm9tICcuL2kxOG4nXHJcbmltcG9ydCBjcmVhdGVNb2NrIGZyb20gJy4vbW9jaydcclxuaW1wb3J0IGNyZWF0ZUxheW91dHMgZnJvbSAnLi9sYXlvdXRzJ1xyXG5pbXBvcnQgY3JlYXRlUGFnZXMgZnJvbSAnLi9wYWdlcydcclxuaW1wb3J0IGNyZWF0ZUNvbXByZXNzaW9uIGZyb20gJy4vY29tcHJlc3Npb24nXHJcbmltcG9ydCBjcmVhdGVBcmNoaXZlciBmcm9tICcuL2FyY2hpdmVyJ1xyXG5pbXBvcnQgY3JlYXRlQ29uc29sZSBmcm9tICcuL2NvbnNvbGUnXHJcbmltcG9ydCBjcmVhdGVCYW5uZXIgZnJvbSAnLi9iYW5uZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52LCBpc0J1aWxkID0gZmFsc2UpIHtcclxuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW1xyXG4gICAgYXBwSW5mbygpLFxyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHZ1ZUxlZ2FjeSh7XHJcbiAgICAgIHJlbmRlckxlZ2FjeUNodW5rczogZmFsc2UsXHJcbiAgICAgIG1vZGVyblBvbHlmaWxsczogW1xyXG4gICAgICAgICdlcy5hcnJheS5hdCcsXHJcbiAgICAgICAgJ2VzLmFycmF5LmZpbmQtbGFzdCcsXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICBdXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVEZXZ0b29scyh2aXRlRW52KSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUF1dG9JbXBvcnQoKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbXBvbmVudHMoKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVVub2NzcygpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUkxOG4oKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZU1vY2sodml0ZUVudiwgaXNCdWlsZCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVMYXlvdXRzKCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVQYWdlcygpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goLi4uY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudiwgaXNCdWlsZCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVBcmNoaXZlcih2aXRlRW52KSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbnNvbGUoKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUJhbm5lcigpKVxyXG4gIHJldHVybiB2aXRlUGx1Z2luc1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhcHAtaW5mby50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9hcHAtaW5mby50c1wiO2ltcG9ydCBib3hlbiBmcm9tICdib3hlbidcclxuaW1wb3J0IHBpY29jb2xvcnMgZnJvbSAncGljb2NvbG9ycydcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwSW5mbygpOiBQbHVnaW4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnYXBwSW5mbycsXHJcbiAgICBhcHBseTogJ3NlcnZlJyxcclxuICAgIGFzeW5jIGJ1aWxkU3RhcnQoKSB7XHJcbiAgICAgIGNvbnN0IHsgYm9sZCwgZ3JlZW4sIG1hZ2VudGEsIGJnR3JlZW4sIHVuZGVybGluZSB9ID0gcGljb2NvbG9yc1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBib3hlbihcclxuICAgICAgICAgIGAke2JvbGQoZ3JlZW4oYFx1NzUzMSAke2JnR3JlZW4oJ0ZhbnRhc3RpYy1hZG1pbicpfSBcdTlBNzFcdTUyQThgKSl9XFxuXFxuJHt1bmRlcmxpbmUoJ2h0dHBzOi8vZmFudGFzdGljLWFkbWluLmdpdGVlLmlvJyl9XFxuXFxuXHU1RjUzXHU1MjREXHU0RjdGXHU3NTI4XHVGRjFBJHttYWdlbnRhKCdcdTRFMTNcdTRFMUFcdTcyNDgnKX1gLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxLFxyXG4gICAgICAgICAgICBtYXJnaW46IDEsXHJcbiAgICAgICAgICAgIGJvcmRlclN0eWxlOiAnZG91YmxlJyxcclxuICAgICAgICAgICAgdGV4dEFsaWdubWVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICksXHJcbiAgICAgIClcclxuICAgIH0sXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxkZXZ0b29scy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9kZXZ0b29scy50c1wiO2ltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEZXZ0b29scyhlbnYpIHtcclxuICBjb25zdCB7IFZJVEVfT1BFTl9ERVZUT09MUyB9ID0gZW52XHJcbiAgcmV0dXJuIFZJVEVfT1BFTl9ERVZUT09MUyA9PT0gJ3RydWUnICYmIFZ1ZURldlRvb2xzKClcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXV0by1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXV0b0ltcG9ydCgpIHtcclxuICByZXR1cm4gYXV0b0ltcG9ydCh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICd2dWUnLFxyXG4gICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICdwaW5pYScsXHJcbiAgICBdLFxyXG4gICAgZHRzOiAnLi9zcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgZGlyczogW1xyXG4gICAgICAnLi9zcmMvdXRpbHMvY29tcG9zYWJsZXMvKionLFxyXG4gICAgXSxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wb25lbnRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL05ld1NhYXMvdml0ZS9wbHVnaW5zL2NvbXBvbmVudHMudHNcIjtpbXBvcnQgY29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50cygpIHtcclxuICByZXR1cm4gY29tcG9uZW50cyh7XHJcbiAgICBkaXJzOiBbXHJcbiAgICAgICdzcmMvY29tcG9uZW50cycsXHJcbiAgICAgICdzcmMvbGF5b3V0cy91aS1raXQnLFxyXG4gICAgXSxcclxuICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwudHN4JC9dLFxyXG4gICAgZHRzOiAnLi9zcmMvdHlwZXMvY29tcG9uZW50cy5kLnRzJyxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFx1bm9jc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlL3BsdWdpbnMvdW5vY3NzLnRzXCI7aW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVub2NzcygpIHtcclxuICByZXR1cm4gVW5vY3NzKClcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc3ZnLWljb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlL3BsdWdpbnMvc3ZnLWljb24udHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdmdJY29uKGlzQnVpbGQpIHtcclxuICByZXR1cm4gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMvJyldLFxyXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZCxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpMThuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL05ld1NhYXMvdml0ZS9wbHVnaW5zL2kxOG4udHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCB2dWVJMThuIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVJMThuKCkge1xyXG4gIHJldHVybiB2dWVJMThuKHtcclxuICAgIGluY2x1ZGU6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9zcmMvbG9jYWxlcy9sYW5nLyoqJyksXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcbW9jay50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9tb2NrLnRzXCI7aW1wb3J0IHsgdml0ZVBsdWdpbkZha2VTZXJ2ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1mYWtlLXNlcnZlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1vY2soZW52LCBpc0J1aWxkKSB7XHJcbiAgY29uc3QgeyBWSVRFX0JVSUxEX01PQ0sgfSA9IGVudlxyXG4gIHJldHVybiB2aXRlUGx1Z2luRmFrZVNlcnZlcih7XHJcbiAgICBsb2dnZXI6ICFpc0J1aWxkLFxyXG4gICAgaW5jbHVkZTogJ3NyYy9tb2NrJyxcclxuICAgIGluZml4TmFtZTogZmFsc2UsXHJcbiAgICBlbmFibGVQcm9kOiBpc0J1aWxkICYmIFZJVEVfQlVJTERfTU9DSyA9PT0gJ3RydWUnLFxyXG4gIH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGxheW91dHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlL3BsdWdpbnMvbGF5b3V0cy50c1wiO2ltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1tZXRhLWxheW91dHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVMYXlvdXRzKCkge1xyXG4gIHJldHVybiBMYXlvdXRzKHtcclxuICAgIGRlZmF1bHRMYXlvdXQ6ICdpbmRleCcsXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxccGFnZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlL3BsdWdpbnMvcGFnZXMudHNcIjtpbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQYWdlcygpIHtcclxuICByZXR1cm4gUGFnZXMoe1xyXG4gICAgZGlyczogJ3NyYy92aWV3cycsXHJcbiAgICBleGNsdWRlOiBbXHJcbiAgICAgICcqKi9jb21wb25lbnRzLyoqLyoudnVlJyxcclxuICAgIF0sXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcHJlc3Npb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24udHNcIjtpbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMidcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcHJlc3Npb24oZW52LCBpc0J1aWxkKSB7XHJcbiAgY29uc3QgcGx1Z2luOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPSBbXVxyXG4gIGlmIChpc0J1aWxkKSB7XHJcbiAgICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgfSA9IGVudlxyXG4gICAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdCgnLCcpXHJcbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcclxuICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgY29tcHJlc3Npb24oKSxcclxuICAgICAgKVxyXG4gICAgfVxyXG4gICAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcclxuICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgY29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgZXhjbHVkZTogWy9cXC4oYnIpJC8sIC9cXC4oZ3opJC9dLFxyXG4gICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBwbHVnaW5cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXJjaGl2ZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvTmV3U2Fhcy92aXRlL3BsdWdpbnMvYXJjaGl2ZXIudHNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcclxuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgYXJjaGl2ZXIgZnJvbSAnYXJjaGl2ZXInXHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcclxuXHJcbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUFyY2hpdmVyKGVudik6IFBsdWdpbiB7XHJcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0FSQ0hJVkUgfSA9IGVudlxyXG4gIGxldCBvdXREaXI6IHN0cmluZ1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4tYXJjaGl2ZXInLFxyXG4gICAgYXBwbHk6ICdidWlsZCcsXHJcbiAgICBjb25maWdSZXNvbHZlZChyZXNvbHZlZENvbmZpZykge1xyXG4gICAgICBvdXREaXIgPSByZXNvbHZlZENvbmZpZy5idWlsZC5vdXREaXJcclxuICAgIH0sXHJcbiAgICBhc3luYyBjbG9zZUJ1bmRsZSgpIHtcclxuICAgICAgaWYgKFsnemlwJywgJ3RhciddLmluY2x1ZGVzKFZJVEVfQlVJTERfQVJDSElWRSkpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgxMDAwKVxyXG4gICAgICAgIGNvbnN0IGFyY2hpdmUgPSBhcmNoaXZlcihWSVRFX0JVSUxEX0FSQ0hJVkUsIHtcclxuICAgICAgICAgIC4uLihWSVRFX0JVSUxEX0FSQ0hJVkUgPT09ICd6aXAnICYmIHsgemxpYjogeyBsZXZlbDogOSB9IH0pLFxyXG4gICAgICAgICAgLi4uKFZJVEVfQlVJTERfQVJDSElWRSA9PT0gJ3RhcicgJiYgeyBnemlwOiB0cnVlLCBnemlwT3B0aW9uczogeyBsZXZlbDogOSB9IH0pLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oYCR7b3V0RGlyfS4ke2RheWpzKCkuZm9ybWF0KCdZWVlZLU1NLURELUhILW1tLXNzJyl9LiR7VklURV9CVUlMRF9BUkNISVZFID09PSAnemlwJyA/ICd6aXAnIDogJ3Rhci5neid9YClcclxuICAgICAgICBhcmNoaXZlLnBpcGUob3V0cHV0KVxyXG4gICAgICAgIGFyY2hpdmUuZGlyZWN0b3J5KG91dERpciwgZmFsc2UpXHJcbiAgICAgICAgYXJjaGl2ZS5maW5hbGl6ZSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb25zb2xlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL05ld1NhYXMvdml0ZS9wbHVnaW5zL2NvbnNvbGUudHNcIjtpbXBvcnQgVHVyYm9Db25zb2xlIGZyb20gJ3VucGx1Z2luLXR1cmJvLWNvbnNvbGUvdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnNvbGUoKSB7XHJcbiAgcmV0dXJuIFR1cmJvQ29uc29sZSgpXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGJhbm5lci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9iYW5uZXIudHNcIjtpbXBvcnQgYmFubmVyIGZyb20gJ3ZpdGUtcGx1Z2luLWJhbm5lcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJhbm5lcigpIHtcclxuICByZXR1cm4gYmFubmVyKGBcclxuLyoqXHJcbiAqIFx1NzUzMSBGYW50YXN0aWMtYWRtaW4gXHU2M0QwXHU0RjlCXHU2MjgwXHU2NzJGXHU2NTJGXHU2MzAxXHJcbiAqIFBvd2VyZWQgYnkgRmFudGFzdGljLWFkbWluXHJcbiAqIEdpdGVlICBodHRwczovL2ZhbnRhc3RpYy1hZG1pbi5naXRlZS5pb1xyXG4gKiBHaXRodWIgaHR0cHM6Ly9mYW50YXN0aWMtYWRtaW4uZ2l0aHViLmlvXHJcbiAqL1xyXG5gKVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcU8sT0FBT0EsU0FBUTtBQUNwUCxPQUFP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TTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1IsUUFBUSxJQUFJO0FBQUEsVUFDWixjQUFjLFlBQVksV0FBVyxJQUFJLG9CQUFvQjtBQUFBLFVBQzdELFNBQVMsQ0FBQUMsVUFBUUEsTUFBSyxRQUFRLFdBQVcsRUFBRTtBQUFBLFFBQzdDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUSxTQUFTLGVBQWUsU0FBUyxRQUFRLElBQUk7QUFBQSxNQUNyRCxXQUFXLElBQUkseUJBQXlCO0FBQUEsSUFDMUM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGlCQUFpQixLQUFLLFVBQVU7QUFBQSxRQUM5QixLQUFLO0FBQUEsVUFDSCxTQUFTLGdCQUFJO0FBQUEsVUFDYixjQUFjLGdCQUFJO0FBQUEsVUFDbEIsaUJBQWlCLGdCQUFJO0FBQUEsUUFDdkI7QUFBQSxRQUNBLGVBQWVDLE9BQU0sRUFBRSxPQUFPLHFCQUFxQjtBQUFBLE1BQ3JELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTLGtCQUFrQixLQUFLLFlBQVksT0FBTztBQUFBLElBQ25ELFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUtELE1BQUssUUFBUUUsbUNBQVcsS0FBSztBQUFBLFFBQ2xDLEtBQUtGLE1BQUssUUFBUUUsbUNBQVcsV0FBVztBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCLGNBQWMsS0FBSyxFQUFFO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJmcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZGF5anMiLCAicGF0aCIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInByb2Nlc3MiLCAiZnMiLCAicGF0aCIsICJkYXlqcyIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
