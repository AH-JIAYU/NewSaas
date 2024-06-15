// vite.config.ts
import fs2 from "node:fs";
import path3 from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite@5.2.7_sass@1.72.0_terser@5.30.0/node_modules/vite/dist/node/index.js";
import dayjs2 from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";

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
    dayjs: "^1.11.10",
    defu: "^6.1.4",
    echarts: "^5.5.0",
    "element-plus": "^2.6.3",
    eruda: "^3.0.1",
    "floating-vue": "5.2.2",
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
    "vue-i18n": "^9.10.2",
    "vue-m-message": "^4.0.2",
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
import vue from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.7_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.7_vue@3.4.21/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueLegacy from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@vitejs+plugin-legacy@5.3.2_terser@5.30.0_vite@5.2.7/node_modules/@vitejs/plugin-legacy/dist/index.mjs";

// vite/plugins/app-info.ts
import boxen from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/boxen@7.1.1/node_modules/boxen/index.js";
import picocolors from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js";
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
import VueDevTools from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-vue-devtools@7.0.25_vite@5.2.7_vue@3.4.21/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
function createDevtools(env) {
  const { VITE_OPEN_DEVTOOLS } = env;
  return VITE_OPEN_DEVTOOLS === "true" && VueDevTools();
}

// vite/plugins/auto-import.ts
import autoImport from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
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
import components from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
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
import Unocss from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unocss@0.58.8_postcss@8.4.38_vite@5.2.7/node_modules/unocss/dist/vite.mjs";
function createUnocss() {
  return Unocss();
}

// vite/plugins/svg-icon.ts
import path from "node:path";
import process from "node:process";
import { createSvgIconsPlugin } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.7/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/i18n.ts
import path2 from "node:path";
import vueI18n from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@intlify+unplugin-vue-i18n@4.0.0_vue-i18n@9.10.2/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\\u5609\u79B9\u6280\u672F\u90E8--1\\Desktop\\gitup\\NewSaas\\vite\\plugins";
function createI18n() {
  return vueI18n({
    include: path2.resolve(__vite_injected_original_dirname, "../../src/locales/lang/**")
  });
}

// vite/plugins/mock.ts
import { vitePluginFakeServer } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-fake-server@2.1.1/node_modules/vite-plugin-fake-server/dist/index.mjs";
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
import Layouts from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.4.2_vite@5.2.7_vue-router@4.3.0/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createLayouts() {
  return Layouts({
    defaultLayout: "index"
  });
}

// vite/plugins/pages.ts
import Pages from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-pages@0.32.1_@vue+compiler-sfc@3.4.21_vite@5.2.7/node_modules/vite-plugin-pages/dist/index.js";
function createPages() {
  return Pages({
    dirs: "src/views",
    exclude: [
      "**/components/**/*.vue"
    ]
  });
}

// vite/plugins/compression.ts
import { compression } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-compression2@1.0.0/node_modules/vite-plugin-compression2/dist/index.mjs";
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
import dayjs from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import archiver from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/archiver@7.0.1/node_modules/archiver/index.js";
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
import TurboConsole from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unplugin-turbo-console@1.5.1_vite@5.2.7_vue@3.4.21/node_modules/unplugin-turbo-console/dist/vite.js";
function createConsole() {
  return TurboConsole();
}

// vite/plugins/banner.ts
import banner from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-banner@0.7.1/node_modules/vite-plugin-banner/dist/index.mjs";
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
var __vite_injected_original_dirname2 = "C:\\Users\\\u5609\u79B9\u6280\u672F\u90E8--1\\Desktop\\gitup\\NewSaas";
var vite_config_default = async ({ mode, command }) => {
  const env = loadEnv(mode, process2.cwd());
  const scssResources = [];
  fs2.readdirSync("src/assets/styles/resources").forEach((dirname) => {
    if (fs2.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`);
    }
  });
  return defineConfig({
    base: "./",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUvcGx1Z2lucy9pbmRleC50cyIsICJ2aXRlL3BsdWdpbnMvYXBwLWluZm8udHMiLCAidml0ZS9wbHVnaW5zL2RldnRvb2xzLnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50cyIsICJ2aXRlL3BsdWdpbnMvY29tcG9uZW50cy50cyIsICJ2aXRlL3BsdWdpbnMvdW5vY3NzLnRzIiwgInZpdGUvcGx1Z2lucy9zdmctaWNvbi50cyIsICJ2aXRlL3BsdWdpbnMvaTE4bi50cyIsICJ2aXRlL3BsdWdpbnMvbW9jay50cyIsICJ2aXRlL3BsdWdpbnMvbGF5b3V0cy50cyIsICJ2aXRlL3BsdWdpbnMvcGFnZXMudHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9hcmNoaXZlci50cyIsICJ2aXRlL3BsdWdpbnMvY29uc29sZS50cyIsICJ2aXRlL3BsdWdpbnMvYmFubmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xyXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgLy8gXHU1MTY4XHU1QzQwIHNjc3MgXHU4RDQ0XHU2RTkwXHJcbiAgY29uc3Qgc2Nzc1Jlc291cmNlcyA9IFtdXHJcbiAgZnMucmVhZGRpclN5bmMoJ3NyYy9hc3NldHMvc3R5bGVzL3Jlc291cmNlcycpLmZvckVhY2goKGRpcm5hbWUpID0+IHtcclxuICAgIGlmIChmcy5zdGF0U3luYyhgc3JjL2Fzc2V0cy9zdHlsZXMvcmVzb3VyY2VzLyR7ZGlybmFtZX1gKS5pc0ZpbGUoKSkge1xyXG4gICAgICBzY3NzUmVzb3VyY2VzLnB1c2goYEB1c2UgXCJzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfVwiIGFzICo7YClcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIC8vIFx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1OTAwOVx1OTg3OSBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNzZXJ2ZXItb3B0aW9uc1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHBvcnQ6IDkwMDAsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9wcm94eSc6IHtcclxuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQVBQX0FQSV9CQVNFVVJMLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiBjb21tYW5kID09PSAnc2VydmUnICYmIGVudi5WSVRFX09QRU5fUFJPWFkgPT09ICd0cnVlJyxcclxuICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9cXC9wcm94eS8sICcnKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFx1Njc4NFx1NUVGQVx1OTAwOVx1OTg3OSBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNzZXJ2ZXItZnNzZXJ2ZS1yb290XHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/ICdkaXN0JyA6IGBkaXN0LSR7bW9kZX1gLFxyXG4gICAgICBzb3VyY2VtYXA6IGVudi5WSVRFX0JVSUxEX1NPVVJDRU1BUCA9PT0gJ3RydWUnLFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX1NZU1RFTV9JTkZPX186IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBwa2c6IHtcclxuICAgICAgICAgIHZlcnNpb246IHBrZy52ZXJzaW9uLFxyXG4gICAgICAgICAgZGVwZW5kZW5jaWVzOiBwa2cuZGVwZW5kZW5jaWVzLFxyXG4gICAgICAgICAgZGV2RGVwZW5kZW5jaWVzOiBwa2cuZGV2RGVwZW5kZW5jaWVzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFzdEJ1aWxkVGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgfSksXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnMoZW52LCBjb21tYW5kID09PSAnYnVpbGQnKSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgICAnIyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZXMnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBzY3NzUmVzb3VyY2VzLmpvaW4oJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcbn1cclxuIiwgIntcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjQuNy4wXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiXjE4LjAuMCB8fCBeMjAuMC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZDp0ZXN0XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXG4gICAgXCJzZXJ2ZVwiOiBcImh0dHAtc2VydmVyIC4vZGlzdCAtb1wiLFxuICAgIFwic2VydmU6dGVzdFwiOiBcImh0dHAtc2VydmVyIC4vZGlzdC10ZXN0IC1vXCIsXG4gICAgXCJzdmdvXCI6IFwic3ZnbyAtZiBzcmMvYXNzZXRzL2ljb25zXCIsXG4gICAgXCJuZXdcIjogXCJwbG9wXCIsXG4gICAgXCJnZW5lcmF0ZTppY29uc1wiOiBcImVzbm8gLi9zY3JpcHRzL2dlbmVyYXRlLmljb25zLnRzXCIsXG4gICAgXCJsaW50XCI6IFwibnBtLXJ1bi1hbGwgLXMgbGludDp0c2MgbGludDplc2xpbnQgbGludDpzdHlsZWxpbnRcIixcbiAgICBcImxpbnQ6dHNjXCI6IFwidnVlLXRzY1wiLFxuICAgIFwibGludDplc2xpbnRcIjogXCJlc2xpbnQgLiAtLWNhY2hlIC0tZml4XCIsXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCBcXFwic3JjLyoqLyoue2NzcyxzY3NzLHZ1ZX1cXFwiIC0tY2FjaGUgLS1maXhcIixcbiAgICBcInBvc3RpbnN0YWxsXCI6IFwic2ltcGxlLWdpdC1ob29rc1wiLFxuICAgIFwicHJlaW5zdGFsbFwiOiBcIm5weCBvbmx5LWFsbG93IHBucG1cIixcbiAgICBcImNvbW1pdFwiOiBcImdpdCBjelwiLFxuICAgIFwicmVsZWFzZVwiOiBcImJ1bXBwXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIjogXCJeMi4zLjFcIixcbiAgICBcIkBoZWFkbGVzc3VpL3Z1ZVwiOiBcIl4xLjcuMTlcIixcbiAgICBcIkBpbWVuZ3l1L3Z1ZTMtY29udGV4dC1tZW51XCI6IFwiXjEuMy45XCIsXG4gICAgXCJAa2FuZ2Mvdi1tZC1lZGl0b3JcIjogXCJeMi4zLjE1XCIsXG4gICAgXCJAdGlueW1jZS90aW55bWNlLXZ1ZVwiOiBcIl41LjEuMVwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjkuMFwiLFxuICAgIFwiQHZ1ZXVzZS9pbnRlZ3JhdGlvbnNcIjogXCJeMTAuOS4wXCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuOFwiLFxuICAgIFwiYnl0ZW1kXCI6IFwiXjEuMjEuMFwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMFwiLFxuICAgIFwiZGVmdVwiOiBcIl42LjEuNFwiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjUuMFwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuNi4zXCIsXG4gICAgXCJlcnVkYVwiOiBcIl4zLjAuMVwiLFxuICAgIFwiZmxvYXRpbmctdnVlXCI6IFwiNS4yLjJcIixcbiAgICBcImhvdGtleXMtanNcIjogXCJeMy4xMy43XCIsXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibWVkaXVtLXpvb21cIjogXCJeMS4xLjBcIixcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcbiAgICBcIm1vY2tqc1wiOiBcIl4xLjEuMFwiLFxuICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJvdmVybGF5c2Nyb2xsYmFyc1wiOiBcIl4yLjYuMVwiLFxuICAgIFwib3ZlcmxheXNjcm9sbGJhcnMtdnVlXCI6IFwiXjAuNS44XCIsXG4gICAgXCJwYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjFcIixcbiAgICBcInBhdGgtdG8tcmVnZXhwXCI6IFwiXjYuMi4xXCIsXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxuICAgIFwicGlueWluLXByb1wiOiBcIl4zLjE5LjZcIixcbiAgICBcInFzXCI6IFwiXjYuMTIuMFwiLFxuICAgIFwic2N1bGVcIjogXCJeMS4zLjBcIixcbiAgICBcInNvcnRhYmxlanNcIjogXCJeMS4xNS4yXCIsXG4gICAgXCJzcGlua2l0XCI6IFwiXjIuMC4xXCIsXG4gICAgXCJzdXJ2ZXktY29yZVwiOiBcIl4xLjkuMTMxXCIsXG4gICAgXCJzdXJ2ZXktY3JlYXRvci1jb3JlXCI6IFwiXjEuOS4xMzFcIixcbiAgICBcInN1cnZleS1jcmVhdG9yLXZ1ZVwiOiBcIl4xLjkuMTMxXCIsXG4gICAgXCJzdXJ2ZXktdnVlMy11aVwiOiBcIl4xLjkuMTMxXCIsXG4gICAgXCJ0aW1lYWdvLmpzXCI6IFwiXjQuMC4yXCIsXG4gICAgXCJ0aW55bWNlXCI6IFwiXjcuMC4xXCIsXG4gICAgXCJ2LXdhdmVcIjogXCJeMi4wLjBcIixcbiAgICBcInZjb25zb2xlXCI6IFwiXjMuMTUuMVwiLFxuICAgIFwidnVlXCI6IFwiXjMuNC4yMVwiLFxuICAgIFwidnVlLWkxOG5cIjogXCJeOS4xMC4yXCIsXG4gICAgXCJ2dWUtbS1tZXNzYWdlXCI6IFwiXjQuMC4yXCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMy4wXCIsXG4gICAgXCJ2dWVkcmFnZ2FibGVcIjogXCJeNC4xLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW50ZnUvZXNsaW50LWNvbmZpZ1wiOiBcIjIuMTEuNlwiLFxuICAgIFwiQGJ5dGVtZC9wbHVnaW4tZ2ZtXCI6IFwiXjEuMjEuMFwiLFxuICAgIFwiQGJ5dGVtZC92dWUtbmV4dFwiOiBcIl4xLjIxLjBcIixcbiAgICBcIkBpY29uaWZ5L2pzb25cIjogXCJeMi4yLjE5NlwiLFxuICAgIFwiQGljb25pZnkvdnVlXCI6IFwiXjQuMS4xXCIsXG4gICAgXCJAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4blwiOiBcIl40LjAuMFwiLFxuICAgIFwiQHN0eWxpc3RpYy9zdHlsZWxpbnQtY29uZmlnXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJAdHlwZXMvbG9kYXNoLWVzXCI6IFwiXjQuMTcuMTJcIixcbiAgICBcIkB0eXBlcy9tb2NranNcIjogXCJeMS4wLjEwXCIsXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXG4gICAgXCJAdHlwZXMvcGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4yXCIsXG4gICAgXCJAdHlwZXMvcXNcIjogXCJeNi45LjE0XCIsXG4gICAgXCJAdHlwZXMvc29ydGFibGVqc1wiOiBcIl4xLjE1LjhcIixcbiAgICBcIkB1bm9jc3MvZXNsaW50LXBsdWdpblwiOiBcIl4wLjU4LjhcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLWxlZ2FjeVwiOiBcIl41LjMuMlwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC40XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjMuMS4wXCIsXG4gICAgXCJhcmNoaXZlclwiOiBcIl43LjAuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcbiAgICBcImJveGVuXCI6IFwiXjcuMS4xXCIsXG4gICAgXCJidW1wcFwiOiBcIl45LjQuMFwiLFxuICAgIFwiY3otZ2l0XCI6IFwiXjEuOS4xXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXG4gICAgXCJlc25vXCI6IFwiXjQuNy4wXCIsXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xMS4yLjBcIixcbiAgICBcImh0dHAtc2VydmVyXCI6IFwiXjE0LjEuMVwiLFxuICAgIFwiaW5xdWlyZXJcIjogXCJeOS4yLjE3XCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjJcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXG4gICAgXCJwaWNvY29sb3JzXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJwbG9wXCI6IFwiXjQuMC4xXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzIuMFwiLFxuICAgIFwic2ltcGxlLWdpdC1ob29rc1wiOiBcIl4yLjExLjFcIixcbiAgICBcInN0eWxlbGludFwiOiBcIl4xNi4zLjFcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjZXNzLW9yZGVyXCI6IFwiXjUuMC4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkLXNjc3NcIjogXCJeMTMuMC4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkLXZ1ZVwiOiBcIl4xLjAuMFwiLFxuICAgIFwic3R5bGVsaW50LXNjc3NcIjogXCJeNi4yLjFcIixcbiAgICBcInN2Z29cIjogXCJeMy4yLjBcIixcbiAgICBcInRlcnNlclwiOiBcIl41LjMwLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjNcIixcbiAgICBcInVub2Nzc1wiOiBcIl4wLjU4LjhcIixcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTcuNVwiLFxuICAgIFwidW5wbHVnaW4tdHVyYm8tY29uc29sZVwiOiBcIl4xLjUuMVwiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNi4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi43XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1iYW5uZXJcIjogXCJeMC43LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMlwiOiBcIl4xLjAuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZmFrZS1zZXJ2ZXJcIjogXCJeMi4xLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXBhZ2VzXCI6IFwiXjAuMzIuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcIjogXCJeNy4wLjI1XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtbWV0YS1sYXlvdXRzXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMC43XCJcbiAgfSxcbiAgXCJjb25maWdcIjoge1xuICAgIFwiY29tbWl0aXplblwiOiB7XG4gICAgICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvY3otZ2l0XCJcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9pbmRleC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHZ1ZUxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXHJcbmltcG9ydCBhcHBJbmZvIGZyb20gJy4vYXBwLWluZm8nXHJcblxyXG5pbXBvcnQgY3JlYXRlRGV2dG9vbHMgZnJvbSAnLi9kZXZ0b29scydcclxuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcclxuaW1wb3J0IGNyZWF0ZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJ1xyXG5pbXBvcnQgY3JlYXRlVW5vY3NzIGZyb20gJy4vdW5vY3NzJ1xyXG5pbXBvcnQgY3JlYXRlU3ZnSWNvbiBmcm9tICcuL3N2Zy1pY29uJ1xyXG5pbXBvcnQgY3JlYXRlSTE4biBmcm9tICcuL2kxOG4nXHJcbmltcG9ydCBjcmVhdGVNb2NrIGZyb20gJy4vbW9jaydcclxuaW1wb3J0IGNyZWF0ZUxheW91dHMgZnJvbSAnLi9sYXlvdXRzJ1xyXG5pbXBvcnQgY3JlYXRlUGFnZXMgZnJvbSAnLi9wYWdlcydcclxuaW1wb3J0IGNyZWF0ZUNvbXByZXNzaW9uIGZyb20gJy4vY29tcHJlc3Npb24nXHJcbmltcG9ydCBjcmVhdGVBcmNoaXZlciBmcm9tICcuL2FyY2hpdmVyJ1xyXG5pbXBvcnQgY3JlYXRlQ29uc29sZSBmcm9tICcuL2NvbnNvbGUnXHJcbmltcG9ydCBjcmVhdGVCYW5uZXIgZnJvbSAnLi9iYW5uZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52LCBpc0J1aWxkID0gZmFsc2UpIHtcclxuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW1xyXG4gICAgYXBwSW5mbygpLFxyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHZ1ZUxlZ2FjeSh7XHJcbiAgICAgIHJlbmRlckxlZ2FjeUNodW5rczogZmFsc2UsXHJcbiAgICAgIG1vZGVyblBvbHlmaWxsczogW1xyXG4gICAgICAgICdlcy5hcnJheS5hdCcsXHJcbiAgICAgICAgJ2VzLmFycmF5LmZpbmQtbGFzdCcsXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICBdXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVEZXZ0b29scyh2aXRlRW52KSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUF1dG9JbXBvcnQoKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbXBvbmVudHMoKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVVub2NzcygpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUkxOG4oKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZU1vY2sodml0ZUVudiwgaXNCdWlsZCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVMYXlvdXRzKCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVQYWdlcygpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goLi4uY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudiwgaXNCdWlsZCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVBcmNoaXZlcih2aXRlRW52KSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbnNvbGUoKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUJhbm5lcigpKVxyXG4gIHJldHVybiB2aXRlUGx1Z2luc1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGFwcC1pbmZvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9hcHAtaW5mby50c1wiO2ltcG9ydCBib3hlbiBmcm9tICdib3hlbidcclxuaW1wb3J0IHBpY29jb2xvcnMgZnJvbSAncGljb2NvbG9ycydcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwSW5mbygpOiBQbHVnaW4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnYXBwSW5mbycsXHJcbiAgICBhcHBseTogJ3NlcnZlJyxcclxuICAgIGFzeW5jIGJ1aWxkU3RhcnQoKSB7XHJcbiAgICAgIGNvbnN0IHsgYm9sZCwgZ3JlZW4sIG1hZ2VudGEsIGJnR3JlZW4sIHVuZGVybGluZSB9ID0gcGljb2NvbG9yc1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBib3hlbihcclxuICAgICAgICAgIGAke2JvbGQoZ3JlZW4oYFx1NzUzMSAke2JnR3JlZW4oJ0ZhbnRhc3RpYy1hZG1pbicpfSBcdTlBNzFcdTUyQThgKSl9XFxuXFxuJHt1bmRlcmxpbmUoJ2h0dHBzOi8vZmFudGFzdGljLWFkbWluLmdpdGVlLmlvJyl9XFxuXFxuXHU1RjUzXHU1MjREXHU0RjdGXHU3NTI4XHVGRjFBJHttYWdlbnRhKCdcdTRFMTNcdTRFMUFcdTcyNDgnKX1gLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxLFxyXG4gICAgICAgICAgICBtYXJnaW46IDEsXHJcbiAgICAgICAgICAgIGJvcmRlclN0eWxlOiAnZG91YmxlJyxcclxuICAgICAgICAgICAgdGV4dEFsaWdubWVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICksXHJcbiAgICAgIClcclxuICAgIH0sXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGRldnRvb2xzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9kZXZ0b29scy50c1wiO2ltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEZXZ0b29scyhlbnYpIHtcclxuICBjb25zdCB7IFZJVEVfT1BFTl9ERVZUT09MUyB9ID0gZW52XHJcbiAgcmV0dXJuIFZJVEVfT1BFTl9ERVZUT09MUyA9PT0gJ3RydWUnICYmIFZ1ZURldlRvb2xzKClcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhdXRvLWltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBdXRvSW1wb3J0KCkge1xuICByZXR1cm4gYXV0b0ltcG9ydCh7XG4gICAgaW1wb3J0czogW1xuICAgICAgJ3Z1ZScsXG4gICAgICAndnVlLXJvdXRlcicsXG4gICAgICAncGluaWEnLFxuICAgIF0sXG4gICAgZHRzOiAnLi9zcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgIGRpcnM6IFtcbiAgICAgICcuL3NyYy91dGlscy9jb21wb3NhYmxlcy8qKicsXG4gICAgXSxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbXBvbmVudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL2NvbXBvbmVudHMudHNcIjtpbXBvcnQgY29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50cygpIHtcclxuICByZXR1cm4gY29tcG9uZW50cyh7XHJcbiAgICBkaXJzOiBbXHJcbiAgICAgICdzcmMvY29tcG9uZW50cycsXHJcbiAgICAgICdzcmMvbGF5b3V0cy91aS1raXQnLFxyXG4gICAgXSxcclxuICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwudHN4JC9dLFxyXG4gICAgZHRzOiAnLi9zcmMvdHlwZXMvY29tcG9uZW50cy5kLnRzJyxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHVub2Nzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvdW5vY3NzLnRzXCI7aW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVub2NzcygpIHtcclxuICByZXR1cm4gVW5vY3NzKClcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzdmctaWNvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvc3ZnLWljb24udHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdmdJY29uKGlzQnVpbGQpIHtcclxuICByZXR1cm4gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMvJyldLFxyXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZCxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGkxOG4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL2kxOG4udHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCB2dWVJMThuIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVJMThuKCkge1xyXG4gIHJldHVybiB2dWVJMThuKHtcclxuICAgIGluY2x1ZGU6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9zcmMvbG9jYWxlcy9sYW5nLyoqJyksXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxtb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9tb2NrLnRzXCI7aW1wb3J0IHsgdml0ZVBsdWdpbkZha2VTZXJ2ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1mYWtlLXNlcnZlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1vY2soZW52LCBpc0J1aWxkKSB7XHJcbiAgY29uc3QgeyBWSVRFX0JVSUxEX01PQ0sgfSA9IGVudlxyXG4gIHJldHVybiB2aXRlUGx1Z2luRmFrZVNlcnZlcih7XHJcbiAgICBsb2dnZXI6ICFpc0J1aWxkLFxyXG4gICAgaW5jbHVkZTogJ3NyYy9tb2NrJyxcclxuICAgIGluZml4TmFtZTogZmFsc2UsXHJcbiAgICBlbmFibGVQcm9kOiBpc0J1aWxkICYmIFZJVEVfQlVJTERfTU9DSyA9PT0gJ3RydWUnLFxyXG4gIH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcbGF5b3V0cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvbGF5b3V0cy50c1wiO2ltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1tZXRhLWxheW91dHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVMYXlvdXRzKCkge1xyXG4gIHJldHVybiBMYXlvdXRzKHtcclxuICAgIGRlZmF1bHRMYXlvdXQ6ICdpbmRleCcsXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxwYWdlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvcGFnZXMudHNcIjtpbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQYWdlcygpIHtcclxuICByZXR1cm4gUGFnZXMoe1xyXG4gICAgZGlyczogJ3NyYy92aWV3cycsXHJcbiAgICBleGNsdWRlOiBbXHJcbiAgICAgICcqKi9jb21wb25lbnRzLyoqLyoudnVlJyxcclxuICAgIF0sXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24udHNcIjtpbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMidcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcHJlc3Npb24oZW52LCBpc0J1aWxkKSB7XHJcbiAgY29uc3QgcGx1Z2luOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPSBbXVxyXG4gIGlmIChpc0J1aWxkKSB7XHJcbiAgICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgfSA9IGVudlxyXG4gICAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdCgnLCcpXHJcbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcclxuICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgY29tcHJlc3Npb24oKSxcclxuICAgICAgKVxyXG4gICAgfVxyXG4gICAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcclxuICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgY29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgZXhjbHVkZTogWy9cXC4oYnIpJC8sIC9cXC4oZ3opJC9dLFxyXG4gICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBwbHVnaW5cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhcmNoaXZlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvYXJjaGl2ZXIudHNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcclxuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgYXJjaGl2ZXIgZnJvbSAnYXJjaGl2ZXInXHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcclxuXHJcbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUFyY2hpdmVyKGVudik6IFBsdWdpbiB7XHJcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0FSQ0hJVkUgfSA9IGVudlxyXG4gIGxldCBvdXREaXI6IHN0cmluZ1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4tYXJjaGl2ZXInLFxyXG4gICAgYXBwbHk6ICdidWlsZCcsXHJcbiAgICBjb25maWdSZXNvbHZlZChyZXNvbHZlZENvbmZpZykge1xyXG4gICAgICBvdXREaXIgPSByZXNvbHZlZENvbmZpZy5idWlsZC5vdXREaXJcclxuICAgIH0sXHJcbiAgICBhc3luYyBjbG9zZUJ1bmRsZSgpIHtcclxuICAgICAgaWYgKFsnemlwJywgJ3RhciddLmluY2x1ZGVzKFZJVEVfQlVJTERfQVJDSElWRSkpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgxMDAwKVxyXG4gICAgICAgIGNvbnN0IGFyY2hpdmUgPSBhcmNoaXZlcihWSVRFX0JVSUxEX0FSQ0hJVkUsIHtcclxuICAgICAgICAgIC4uLihWSVRFX0JVSUxEX0FSQ0hJVkUgPT09ICd6aXAnICYmIHsgemxpYjogeyBsZXZlbDogOSB9IH0pLFxyXG4gICAgICAgICAgLi4uKFZJVEVfQlVJTERfQVJDSElWRSA9PT0gJ3RhcicgJiYgeyBnemlwOiB0cnVlLCBnemlwT3B0aW9uczogeyBsZXZlbDogOSB9IH0pLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oYCR7b3V0RGlyfS4ke2RheWpzKCkuZm9ybWF0KCdZWVlZLU1NLURELUhILW1tLXNzJyl9LiR7VklURV9CVUlMRF9BUkNISVZFID09PSAnemlwJyA/ICd6aXAnIDogJ3Rhci5neid9YClcclxuICAgICAgICBhcmNoaXZlLnBpcGUob3V0cHV0KVxyXG4gICAgICAgIGFyY2hpdmUuZGlyZWN0b3J5KG91dERpciwgZmFsc2UpXHJcbiAgICAgICAgYXJjaGl2ZS5maW5hbGl6ZSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbnNvbGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL2NvbnNvbGUudHNcIjtpbXBvcnQgVHVyYm9Db25zb2xlIGZyb20gJ3VucGx1Z2luLXR1cmJvLWNvbnNvbGUvdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnNvbGUoKSB7XHJcbiAgcmV0dXJuIFR1cmJvQ29uc29sZSgpXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYmFubmVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9iYW5uZXIudHNcIjtpbXBvcnQgYmFubmVyIGZyb20gJ3ZpdGUtcGx1Z2luLWJhbm5lcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJhbm5lcigpIHtcclxuICByZXR1cm4gYmFubmVyKGBcclxuLyoqXHJcbiAqIFx1NzUzMSBGYW50YXN0aWMtYWRtaW4gXHU2M0QwXHU0RjlCXHU2MjgwXHU2NzJGXHU2NTJGXHU2MzAxXHJcbiAqIFBvd2VyZWQgYnkgRmFudGFzdGljLWFkbWluXHJcbiAqIEdpdGVlICBodHRwczovL2ZhbnRhc3RpYy1hZG1pbi5naXRlZS5pb1xyXG4gKiBHaXRodWIgaHR0cHM6Ly9mYW50YXN0aWMtYWRtaW4uZ2l0aHViLmlvXHJcbiAqL1xyXG5gKVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlYsT0FBT0EsU0FBUTtBQUMxVyxPQUFPQyxXQUFVO0FBQ2pCLE9BQU9DLGNBQWE7QUFDcEIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBT0MsWUFBVzs7O0FDSmxCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsSUFDVCxNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsT0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsSUFDbEIsTUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLElBQ1osZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsYUFBZTtBQUFBLElBQ2YsWUFBYztBQUFBLElBQ2QsUUFBVTtBQUFBLElBQ1YsU0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCwyQkFBMkI7QUFBQSxJQUMzQixtQkFBbUI7QUFBQSxJQUNuQiw4QkFBOEI7QUFBQSxJQUM5QixzQkFBc0I7QUFBQSxJQUN0Qix3QkFBd0I7QUFBQSxJ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QUcsWUFBWSw2QkFBNkIsRUFBRSxRQUFRLENBQUMsWUFBWTtBQUNqRSxRQUFJQSxJQUFHLFNBQVMsK0JBQStCLE9BQU8sRUFBRSxFQUFFLE9BQU8sR0FBRztBQUNsRSxvQkFBYyxLQUFLLHFDQUFxQyxPQUFPLFNBQVM7QUFBQSxJQUMxRTtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sYUFBYTtBQUFBLElBQ2xCLE1BQU07QUFBQTtBQUFBLElBRU4sUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1IsUUFBUSxJQUFJO0FBQUEsVUFDWixjQUFjLFlBQVksV0FBVyxJQUFJLG9CQUFvQjtBQUFBLFVBQzdELFNBQVMsQ0FBQUMsVUFBUUEsTUFBSyxRQUFRLFdBQVcsRUFBRTtBQUFBLFFBQzdDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUSxTQUFTLGVBQWUsU0FBUyxRQUFRLElBQUk7QUFBQSxNQUNyRCxXQUFXLElBQUkseUJBQXlCO0FBQUEsSUFDMUM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGlCQUFpQixLQUFLLFVBQVU7QUFBQSxRQUM5QixLQUFLO0FBQUEsVUFDSCxTQUFTLGdCQUFJO0FBQUEsVUFDYixjQUFjLGdCQUFJO0FBQUEsVUFDbEIsaUJBQWlCLGdCQUFJO0FBQUEsUUFDdkI7QUFBQSxRQUNBLGVBQWVDLE9BQU0sRUFBRSxPQUFPLHFCQUFxQjtBQUFBLE1BQ3JELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTLGtCQUFrQixLQUFLLFlBQVksT0FBTztBQUFBLElBQ25ELFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUtELE1BQUssUUFBUUUsbUNBQVcsS0FBSztBQUFBLFFBQ2xDLEtBQUtGLE1BQUssUUFBUUUsbUNBQVcsV0FBVztBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCLGNBQWMsS0FBSyxFQUFFO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJmcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZGF5anMiLCAicGF0aCIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInByb2Nlc3MiLCAiZnMiLCAicGF0aCIsICJkYXlqcyIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
