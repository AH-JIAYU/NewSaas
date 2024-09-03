// vite.config.ts
import fs2 from "node:fs";
import path3 from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite@5.3.5_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import dayjs2 from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";

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
import vue from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.3.5_vue@3.4.36/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.3.5_vue@3.4.36/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueLegacy from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.1_terser@5.31.3_vite@5.3.5/node_modules/@vitejs/plugin-legacy/dist/index.mjs";

// vite/plugins/app-info.ts
import boxen from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/boxen@7.1.1/node_modules/boxen/index.js";
import picocolors from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/picocolors@1.0.1/node_modules/picocolors/picocolors.js";
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
import VueDevTools from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.7_vite@5.3.5_vue@3.4.36/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
function createDevtools(env) {
  const { VITE_OPEN_DEVTOOLS } = env;
  return VITE_OPEN_DEVTOOLS === "true" && VueDevTools();
}

// vite/plugins/auto-import.ts
import autoImport from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@10.11.0/node_modules/unplugin-auto-import/dist/vite.js";
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
import components from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.36/node_modules/unplugin-vue-components/dist/vite.js";
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
import Unocss from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.41_vite@5.3.5/node_modules/unocss/dist/vite.mjs";
function createUnocss() {
  return Unocss();
}

// vite/plugins/svg-icon.ts
import path from "node:path";
import process from "node:process";
import { createSvgIconsPlugin } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.5/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/i18n.ts
import path2 from "node:path";
import vueI18n from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/@intlify+unplugin-vue-i18n@4.0.0_vue-i18n@9.13.1/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
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
import Layouts from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.4.3_vite@5.3.5_vue-router@4.4.3/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createLayouts() {
  return Layouts({
    defaultLayout: "index"
  });
}

// vite/plugins/pages.ts
import Pages from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-pages@0.32.3_@vue+compiler-sfc@3.4.36_vite@5.3.5_vue-router@4.4.3/node_modules/vite-plugin-pages/dist/index.js";
function createPages() {
  return Pages({
    dirs: "src/views",
    exclude: [
      "**/components/**/*.vue"
    ]
  });
}

// vite/plugins/compression.ts
import { compression } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/vite-plugin-compression2@1.1.3/node_modules/vite-plugin-compression2/dist/index.mjs";
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
import dayjs from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";
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
import TurboConsole from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--1/Desktop/gitup/NewSaas/node_modules/.pnpm/unplugin-turbo-console@1.10.1_vite@5.3.5_vue@3.4.36/node_modules/unplugin-turbo-console/dist/vite.mjs";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUvcGx1Z2lucy9pbmRleC50cyIsICJ2aXRlL3BsdWdpbnMvYXBwLWluZm8udHMiLCAidml0ZS9wbHVnaW5zL2RldnRvb2xzLnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50cyIsICJ2aXRlL3BsdWdpbnMvY29tcG9uZW50cy50cyIsICJ2aXRlL3BsdWdpbnMvdW5vY3NzLnRzIiwgInZpdGUvcGx1Z2lucy9zdmctaWNvbi50cyIsICJ2aXRlL3BsdWdpbnMvaTE4bi50cyIsICJ2aXRlL3BsdWdpbnMvbW9jay50cyIsICJ2aXRlL3BsdWdpbnMvbGF5b3V0cy50cyIsICJ2aXRlL3BsdWdpbnMvcGFnZXMudHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9hcmNoaXZlci50cyIsICJ2aXRlL3BsdWdpbnMvY29uc29sZS50cyIsICJ2aXRlL3BsdWdpbnMvYmFubmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xyXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgLy8gXHU1MTY4XHU1QzQwIHNjc3MgXHU4RDQ0XHU2RTkwXHJcbiAgY29uc3Qgc2Nzc1Jlc291cmNlcyA9IFtdXHJcbiAgZnMucmVhZGRpclN5bmMoJ3NyYy9hc3NldHMvc3R5bGVzL3Jlc291cmNlcycpLmZvckVhY2goKGRpcm5hbWUpID0+IHtcclxuICAgIGlmIChmcy5zdGF0U3luYyhgc3JjL2Fzc2V0cy9zdHlsZXMvcmVzb3VyY2VzLyR7ZGlybmFtZX1gKS5pc0ZpbGUoKSkge1xyXG4gICAgICBzY3NzUmVzb3VyY2VzLnB1c2goYEB1c2UgXCJzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfVwiIGFzICo7YClcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIC8vIFx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1OTAwOVx1OTg3OSBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNzZXJ2ZXItb3B0aW9uc1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHBvcnQ6IDkwMDAsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9wcm94eSc6IHtcclxuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQVBQX0FQSV9CQVNFVVJMLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiBjb21tYW5kID09PSAnc2VydmUnICYmIGVudi5WSVRFX09QRU5fUFJPWFkgPT09ICd0cnVlJyxcclxuICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9cXC9wcm94eS8sICcnKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFx1Njc4NFx1NUVGQVx1OTAwOVx1OTg3OSBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNzZXJ2ZXItZnNzZXJ2ZS1yb290XHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/ICdkaXN0JyA6IGBkaXN0LSR7bW9kZX1gLFxyXG4gICAgICBzb3VyY2VtYXA6IGVudi5WSVRFX0JVSUxEX1NPVVJDRU1BUCA9PT0gJ3RydWUnLFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX1NZU1RFTV9JTkZPX186IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBwa2c6IHtcclxuICAgICAgICAgIHZlcnNpb246IHBrZy52ZXJzaW9uLFxyXG4gICAgICAgICAgZGVwZW5kZW5jaWVzOiBwa2cuZGVwZW5kZW5jaWVzLFxyXG4gICAgICAgICAgZGV2RGVwZW5kZW5jaWVzOiBwa2cuZGV2RGVwZW5kZW5jaWVzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFzdEJ1aWxkVGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgfSksXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnMoZW52LCBjb21tYW5kID09PSAnYnVpbGQnKSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgICAnIyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZXMnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBzY3NzUmVzb3VyY2VzLmpvaW4oJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcbn1cclxuIiwgIntcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjQuNy4wXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiXjE4LjAuMCB8fCBeMjAuMC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZDp0ZXN0XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXG4gICAgXCJzZXJ2ZVwiOiBcImh0dHAtc2VydmVyIC4vZGlzdCAtb1wiLFxuICAgIFwic2VydmU6dGVzdFwiOiBcImh0dHAtc2VydmVyIC4vZGlzdC10ZXN0IC1vXCIsXG4gICAgXCJzdmdvXCI6IFwic3ZnbyAtZiBzcmMvYXNzZXRzL2ljb25zXCIsXG4gICAgXCJuZXdcIjogXCJwbG9wXCIsXG4gICAgXCJnZW5lcmF0ZTppY29uc1wiOiBcImVzbm8gLi9zY3JpcHRzL2dlbmVyYXRlLmljb25zLnRzXCIsXG4gICAgXCJsaW50XCI6IFwibnBtLXJ1bi1hbGwgLXMgbGludDp0c2MgbGludDplc2xpbnQgbGludDpzdHlsZWxpbnRcIixcbiAgICBcImxpbnQ6dHNjXCI6IFwidnVlLXRzY1wiLFxuICAgIFwibGludDplc2xpbnRcIjogXCJlc2xpbnQgLiAtLWNhY2hlIC0tZml4XCIsXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCBcXFwic3JjLyoqLyoue2NzcyxzY3NzLHZ1ZX1cXFwiIC0tY2FjaGUgLS1maXhcIixcbiAgICBcInBvc3RpbnN0YWxsXCI6IFwic2ltcGxlLWdpdC1ob29rc1wiLFxuICAgIFwicHJlaW5zdGFsbFwiOiBcIm5weCBvbmx5LWFsbG93IHBucG1cIixcbiAgICBcImNvbW1pdFwiOiBcImdpdCBjelwiLFxuICAgIFwicmVsZWFzZVwiOiBcImJ1bXBwXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIjogXCJeMi4zLjFcIixcbiAgICBcIkBoZWFkbGVzc3VpL3Z1ZVwiOiBcIl4xLjcuMTlcIixcbiAgICBcIkBpbWVuZ3l1L3Z1ZTMtY29udGV4dC1tZW51XCI6IFwiXjEuMy45XCIsXG4gICAgXCJAa2FuZ2Mvdi1tZC1lZGl0b3JcIjogXCJeMi4zLjE1XCIsXG4gICAgXCJAdGlueW1jZS90aW55bWNlLXZ1ZVwiOiBcIl41LjEuMVwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjkuMFwiLFxuICAgIFwiQHZ1ZXVzZS9pbnRlZ3JhdGlvbnNcIjogXCJeMTAuOS4wXCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuOFwiLFxuICAgIFwiYnl0ZW1kXCI6IFwiXjEuMjEuMFwiLFxuICAgIFwiY2xpcGJvYXJkXCI6IFwiXjIuMC4xMVwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMFwiLFxuICAgIFwiZGVmdVwiOiBcIl42LjEuNFwiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjUuMFwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuNi4zXCIsXG4gICAgXCJlcnVkYVwiOiBcIl4zLjAuMVwiLFxuICAgIFwiZmxvYXRpbmctdnVlXCI6IFwiNS4yLjJcIixcbiAgICBcImdyYXBlc2pzXCI6IFwiXjAuMjEuN1wiLFxuICAgIFwiZ3JhcGVzanMtYWR2YW5jZS1jb21wb25lbnRzXCI6IFwiXjEuMC43XCIsXG4gICAgXCJncmFwZXNqcy1ibG9ja3MtYmFzaWNcIjogXCJeMS4wLjJcIixcbiAgICBcImdyYXBlc2pzLXBhcnNlci1wb3N0Y3NzXCI6IFwiXjEuMC4zXCIsXG4gICAgXCJncmFwZXNqcy1wcmVzZXQtd2VicGFnZVwiOiBcIl4xLjAuM1wiLFxuICAgIFwiaG90a2V5cy1qc1wiOiBcIl4zLjEzLjdcIixcbiAgICBcImxvZGFzaC1lc1wiOiBcIl40LjE3LjIxXCIsXG4gICAgXCJtZWRpdW0tem9vbVwiOiBcIl4xLjEuMFwiLFxuICAgIFwibWl0dFwiOiBcIl4zLjAuMVwiLFxuICAgIFwibW9ja2pzXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJucHJvZ3Jlc3NcIjogXCJeMC4yLjBcIixcbiAgICBcIm92ZXJsYXlzY3JvbGxiYXJzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJvdmVybGF5c2Nyb2xsYmFycy12dWVcIjogXCJeMC41LjhcIixcbiAgICBcInBhdGgtYnJvd3NlcmlmeVwiOiBcIl4xLjAuMVwiLFxuICAgIFwicGF0aC10by1yZWdleHBcIjogXCJeNi4yLjFcIixcbiAgICBcInBpbmlhXCI6IFwiXjIuMS43XCIsXG4gICAgXCJwaW55aW4tcHJvXCI6IFwiXjMuMTkuNlwiLFxuICAgIFwicXNcIjogXCJeNi4xMi4wXCIsXG4gICAgXCJzY3VsZVwiOiBcIl4xLjMuMFwiLFxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjJcIixcbiAgICBcInNwaW5raXRcIjogXCJeMi4wLjFcIixcbiAgICBcInN1cnZleS1jb3JlXCI6IFwiXjEuOS4xMzFcIixcbiAgICBcInN1cnZleS1jcmVhdG9yLWNvcmVcIjogXCJeMS45LjEzMVwiLFxuICAgIFwic3VydmV5LWNyZWF0b3ItdnVlXCI6IFwiXjEuOS4xMzFcIixcbiAgICBcInN1cnZleS12dWUzLXVpXCI6IFwiXjEuOS4xMzFcIixcbiAgICBcInRpbWVhZ28uanNcIjogXCJeNC4wLjJcIixcbiAgICBcInRpbnltY2VcIjogXCJeNy4wLjFcIixcbiAgICBcInYtd2F2ZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwidmNvbnNvbGVcIjogXCJeMy4xNS4xXCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjIxXCIsXG4gICAgXCJ2dWUtY2xpcGJvYXJkM1wiOiBcIl4yLjAuMFwiLFxuICAgIFwidnVlLWkxOG5cIjogXCJeOS4xMC4yXCIsXG4gICAgXCJ2dWUtanNvbnBcIjogXCJeMi4wLjBcIixcbiAgICBcInZ1ZS1tLW1lc3NhZ2VcIjogXCJeNC4wLjJcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjBcIixcbiAgICBcInZ1ZWRyYWdnYWJsZVwiOiBcIl40LjEuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiMi4xMS42XCIsXG4gICAgXCJAYnl0ZW1kL3BsdWdpbi1nZm1cIjogXCJeMS4yMS4wXCIsXG4gICAgXCJAYnl0ZW1kL3Z1ZS1uZXh0XCI6IFwiXjEuMjEuMFwiLFxuICAgIFwiQGljb25pZnkvanNvblwiOiBcIl4yLjIuMTk2XCIsXG4gICAgXCJAaWNvbmlmeS92dWVcIjogXCJeNC4xLjFcIixcbiAgICBcIkBpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJAc3R5bGlzdGljL3N0eWxlbGludC1jb25maWdcIjogXCJeMS4wLjFcIixcbiAgICBcIkB0eXBlcy9sb2Rhc2gtZXNcIjogXCJeNC4xNy4xMlwiLFxuICAgIFwiQHR5cGVzL21vY2tqc1wiOiBcIl4xLjAuMTBcIixcbiAgICBcIkB0eXBlcy9ucHJvZ3Jlc3NcIjogXCJeMC4yLjNcIixcbiAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjJcIixcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTRcIixcbiAgICBcIkB0eXBlcy9zb3J0YWJsZWpzXCI6IFwiXjEuMTUuOFwiLFxuICAgIFwiQHVub2Nzcy9lc2xpbnQtcGx1Z2luXCI6IFwiXjAuNTguOFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tbGVnYWN5XCI6IFwiXjUuMy4yXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjRcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4xLjBcIixcbiAgICBcImFyY2hpdmVyXCI6IFwiXjcuMC4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuICAgIFwiYm94ZW5cIjogXCJeNy4xLjFcIixcbiAgICBcImJ1bXBwXCI6IFwiXjkuNC4wXCIsXG4gICAgXCJjei1naXRcIjogXCJeMS45LjFcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcbiAgICBcImVzbm9cIjogXCJeNC43LjBcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxuICAgIFwiaHR0cC1zZXJ2ZXJcIjogXCJeMTQuMS4xXCIsXG4gICAgXCJpbnF1aXJlclwiOiBcIl45LjIuMTdcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuMlwiLFxuICAgIFwibnBtLXJ1bi1hbGxcIjogXCJeNC4xLjVcIixcbiAgICBcInBpY29jb2xvcnNcIjogXCJeMS4wLjBcIixcbiAgICBcInBsb3BcIjogXCJeNC4wLjFcIixcbiAgICBcInNhc3NcIjogXCJeMS43Mi4wXCIsXG4gICAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IFwiXjIuMTEuMVwiLFxuICAgIFwic3R5bGVsaW50XCI6IFwiXjE2LjMuMVwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNlc3Mtb3JkZXJcIjogXCJeNS4wLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMy4wLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtdnVlXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJzdHlsZWxpbnQtc2Nzc1wiOiBcIl42LjIuMVwiLFxuICAgIFwic3Znb1wiOiBcIl4zLjIuMFwiLFxuICAgIFwidGVyc2VyXCI6IFwiXjUuMzAuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuM1wiLFxuICAgIFwidW5vY3NzXCI6IFwiXjAuNTguOFwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy41XCIsXG4gICAgXCJ1bnBsdWdpbi10dXJiby1jb25zb2xlXCI6IFwiXjEuNS4xXCIsXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI2LjBcIixcbiAgICBcInZpdGVcIjogXCJeNS4yLjdcIixcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjcuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb24yXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1mYWtlLXNlcnZlclwiOiBcIl4yLjEuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tcGFnZXNcIjogXCJeMC4zMi4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiOiBcIl43LjAuMjVcIixcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1tZXRhLWxheW91dHNcIjogXCJeMC40LjJcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjdcIlxuICB9LFxuICBcImNvbmZpZ1wiOiB7XG4gICAgXCJjb21taXRpemVuXCI6IHtcbiAgICAgIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9jei1naXRcIlxuICAgIH1cbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgdnVlTGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcclxuaW1wb3J0IGFwcEluZm8gZnJvbSAnLi9hcHAtaW5mbydcclxuXHJcbmltcG9ydCBjcmVhdGVEZXZ0b29scyBmcm9tICcuL2RldnRvb2xzJ1xyXG5pbXBvcnQgY3JlYXRlQXV0b0ltcG9ydCBmcm9tICcuL2F1dG8taW1wb3J0J1xyXG5pbXBvcnQgY3JlYXRlQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMnXHJcbmltcG9ydCBjcmVhdGVVbm9jc3MgZnJvbSAnLi91bm9jc3MnXHJcbmltcG9ydCBjcmVhdGVTdmdJY29uIGZyb20gJy4vc3ZnLWljb24nXHJcbmltcG9ydCBjcmVhdGVJMThuIGZyb20gJy4vaTE4bidcclxuaW1wb3J0IGNyZWF0ZU1vY2sgZnJvbSAnLi9tb2NrJ1xyXG5pbXBvcnQgY3JlYXRlTGF5b3V0cyBmcm9tICcuL2xheW91dHMnXHJcbmltcG9ydCBjcmVhdGVQYWdlcyBmcm9tICcuL3BhZ2VzJ1xyXG5pbXBvcnQgY3JlYXRlQ29tcHJlc3Npb24gZnJvbSAnLi9jb21wcmVzc2lvbidcclxuaW1wb3J0IGNyZWF0ZUFyY2hpdmVyIGZyb20gJy4vYXJjaGl2ZXInXHJcbmltcG9ydCBjcmVhdGVDb25zb2xlIGZyb20gJy4vY29uc29sZSdcclxuaW1wb3J0IGNyZWF0ZUJhbm5lciBmcm9tICcuL2Jhbm5lcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzQnVpbGQgPSBmYWxzZSkge1xyXG4gIGNvbnN0IHZpdGVQbHVnaW5zOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPSBbXHJcbiAgICBhcHBJbmZvKCksXHJcbiAgICB2dWUoKSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgdnVlTGVnYWN5KHtcclxuICAgICAgcmVuZGVyTGVnYWN5Q2h1bmtzOiBmYWxzZSxcclxuICAgICAgbW9kZXJuUG9seWZpbGxzOiBbXHJcbiAgICAgICAgJ2VzLmFycmF5LmF0JyxcclxuICAgICAgICAnZXMuYXJyYXkuZmluZC1sYXN0JyxcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG4gIF1cclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZURldnRvb2xzKHZpdGVFbnYpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQXV0b0ltcG9ydCgpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQ29tcG9uZW50cygpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlVW5vY3NzKCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVTdmdJY29uKGlzQnVpbGQpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlSTE4bigpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlTW9jayh2aXRlRW52LCBpc0J1aWxkKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUxheW91dHMoKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVBhZ2VzKCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaCguLi5jcmVhdGVDb21wcmVzc2lvbih2aXRlRW52LCBpc0J1aWxkKSlcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUFyY2hpdmVyKHZpdGVFbnYpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQ29uc29sZSgpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQmFubmVyKCkpXHJcbiAgcmV0dXJuIHZpdGVQbHVnaW5zXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXBwLWluZm8udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL2FwcC1pbmZvLnRzXCI7aW1wb3J0IGJveGVuIGZyb20gJ2JveGVuJ1xyXG5pbXBvcnQgcGljb2NvbG9ycyBmcm9tICdwaWNvY29sb3JzJ1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBJbmZvKCk6IFBsdWdpbiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdhcHBJbmZvJyxcclxuICAgIGFwcGx5OiAnc2VydmUnLFxyXG4gICAgYXN5bmMgYnVpbGRTdGFydCgpIHtcclxuICAgICAgY29uc3QgeyBib2xkLCBncmVlbiwgbWFnZW50YSwgYmdHcmVlbiwgdW5kZXJsaW5lIH0gPSBwaWNvY29sb3JzXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIGJveGVuKFxyXG4gICAgICAgICAgYCR7Ym9sZChncmVlbihgXHU3NTMxICR7YmdHcmVlbignRmFudGFzdGljLWFkbWluJyl9IFx1OUE3MVx1NTJBOGApKX1cXG5cXG4ke3VuZGVybGluZSgnaHR0cHM6Ly9mYW50YXN0aWMtYWRtaW4uZ2l0ZWUuaW8nKX1cXG5cXG5cdTVGNTNcdTUyNERcdTRGN0ZcdTc1MjhcdUZGMUEke21hZ2VudGEoJ1x1NEUxM1x1NEUxQVx1NzI0OCcpfWAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEsXHJcbiAgICAgICAgICAgIG1hcmdpbjogMSxcclxuICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdkb3VibGUnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ25tZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgKSxcclxuICAgICAgKVxyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcZGV2dG9vbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL2RldnRvb2xzLnRzXCI7aW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZURldnRvb2xzKGVudikge1xyXG4gIGNvbnN0IHsgVklURV9PUEVOX0RFVlRPT0xTIH0gPSBlbnZcclxuICByZXR1cm4gVklURV9PUEVOX0RFVlRPT0xTID09PSAndHJ1ZScgJiYgVnVlRGV2VG9vbHMoKVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGF1dG8taW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50c1wiO2ltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUF1dG9JbXBvcnQoKSB7XG4gIHJldHVybiBhdXRvSW1wb3J0KHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAndnVlJyxcbiAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICdwaW5pYScsXG4gICAgXSxcbiAgICBkdHM6ICcuL3NyYy90eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgZGlyczogW1xuICAgICAgJy4vc3JjL3V0aWxzL2NvbXBvc2FibGVzLyoqJyxcbiAgICBdLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcG9uZW50cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvY29tcG9uZW50cy50c1wiO2ltcG9ydCBjb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnRzKCkge1xyXG4gIHJldHVybiBjb21wb25lbnRzKHtcclxuICAgIGRpcnM6IFtcclxuICAgICAgJ3NyYy9jb21wb25lbnRzJyxcclxuICAgICAgJ3NyYy9sYXlvdXRzL3VpLWtpdCcsXHJcbiAgICBdLFxyXG4gICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC50c3gkL10sXHJcbiAgICBkdHM6ICcuL3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLFxyXG4gIH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcdW5vY3NzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy91bm9jc3MudHNcIjtpbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVW5vY3NzKCkge1xyXG4gIHJldHVybiBVbm9jc3MoKVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9zdmctaWNvbi50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkge1xyXG4gIHJldHVybiBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucy8nKV0sXHJcbiAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkLFxyXG4gIH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaTE4bi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvaTE4bi50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUkxOG4oKSB7XHJcbiAgcmV0dXJuIHZ1ZUkxOG4oe1xyXG4gICAgaW5jbHVkZTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYy9sb2NhbGVzL2xhbmcvKionKSxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXG1vY2sudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL21vY2sudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luRmFrZVNlcnZlciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWZha2Utc2VydmVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTW9jayhlbnYsIGlzQnVpbGQpIHtcclxuICBjb25zdCB7IFZJVEVfQlVJTERfTU9DSyB9ID0gZW52XHJcbiAgcmV0dXJuIHZpdGVQbHVnaW5GYWtlU2VydmVyKHtcclxuICAgIGxvZ2dlcjogIWlzQnVpbGQsXHJcbiAgICBpbmNsdWRlOiAnc3JjL21vY2snLFxyXG4gICAgaW5maXhOYW1lOiBmYWxzZSxcclxuICAgIGVuYWJsZVByb2Q6IGlzQnVpbGQgJiYgVklURV9CVUlMRF9NT0NLID09PSAndHJ1ZScsXHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxsYXlvdXRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9sYXlvdXRzLnRzXCI7aW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1ldGEtbGF5b3V0cydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUxheW91dHMoKSB7XHJcbiAgcmV0dXJuIExheW91dHMoe1xyXG4gICAgZGVmYXVsdExheW91dDogJ2luZGV4JyxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHBhZ2VzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9wYWdlcy50c1wiO2ltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVBhZ2VzKCkge1xyXG4gIHJldHVybiBQYWdlcyh7XHJcbiAgICBkaXJzOiAnc3JjL3ZpZXdzJyxcclxuICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgJyoqL2NvbXBvbmVudHMvKiovKi52dWUnLFxyXG4gICAgXSxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbXByZXNzaW9uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9jb21wcmVzc2lvbi50c1wiO2ltcG9ydCB7IGNvbXByZXNzaW9uIH0gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24yJ1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wcmVzc2lvbihlbnYsIGlzQnVpbGQpIHtcclxuICBjb25zdCBwbHVnaW46IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtdXHJcbiAgaWYgKGlzQnVpbGQpIHtcclxuICAgIGNvbnN0IHsgVklURV9CVUlMRF9DT01QUkVTUyB9ID0gZW52XHJcbiAgICBjb25zdCBjb21wcmVzc0xpc3QgPSBWSVRFX0JVSUxEX0NPTVBSRVNTLnNwbGl0KCcsJylcclxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xyXG4gICAgICBwbHVnaW4ucHVzaChcclxuICAgICAgICBjb21wcmVzc2lvbigpLFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xyXG4gICAgICBwbHVnaW4ucHVzaChcclxuICAgICAgICBjb21wcmVzc2lvbih7XHJcbiAgICAgICAgICBleGNsdWRlOiBbL1xcLihicikkLywgL1xcLihneikkL10sXHJcbiAgICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHBsdWdpblxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGFyY2hpdmVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTEvRGVza3RvcC9naXR1cC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9hcmNoaXZlci50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXHJcbmltcG9ydCBhcmNoaXZlciBmcm9tICdhcmNoaXZlcidcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5cclxuZnVuY3Rpb24gc2xlZXAobXMpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXJjaGl2ZXIoZW52KTogUGx1Z2luIHtcclxuICBjb25zdCB7IFZJVEVfQlVJTERfQVJDSElWRSB9ID0gZW52XHJcbiAgbGV0IG91dERpcjogc3RyaW5nXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICd2aXRlLXBsdWdpbi1hcmNoaXZlcicsXHJcbiAgICBhcHBseTogJ2J1aWxkJyxcclxuICAgIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XHJcbiAgICAgIG91dERpciA9IHJlc29sdmVkQ29uZmlnLmJ1aWxkLm91dERpclxyXG4gICAgfSxcclxuICAgIGFzeW5jIGNsb3NlQnVuZGxlKCkge1xyXG4gICAgICBpZiAoWyd6aXAnLCAndGFyJ10uaW5jbHVkZXMoVklURV9CVUlMRF9BUkNISVZFKSkge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKDEwMDApXHJcbiAgICAgICAgY29uc3QgYXJjaGl2ZSA9IGFyY2hpdmVyKFZJVEVfQlVJTERfQVJDSElWRSwge1xyXG4gICAgICAgICAgLi4uKFZJVEVfQlVJTERfQVJDSElWRSA9PT0gJ3ppcCcgJiYgeyB6bGliOiB7IGxldmVsOiA5IH0gfSksXHJcbiAgICAgICAgICAuLi4oVklURV9CVUlMRF9BUkNISVZFID09PSAndGFyJyAmJiB7IGd6aXA6IHRydWUsIGd6aXBPcHRpb25zOiB7IGxldmVsOiA5IH0gfSksXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCBvdXRwdXQgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShgJHtvdXREaXJ9LiR7ZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQtSEgtbW0tc3MnKX0uJHtWSVRFX0JVSUxEX0FSQ0hJVkUgPT09ICd6aXAnID8gJ3ppcCcgOiAndGFyLmd6J31gKVxyXG4gICAgICAgIGFyY2hpdmUucGlwZShvdXRwdXQpXHJcbiAgICAgICAgYXJjaGl2ZS5kaXJlY3Rvcnkob3V0RGlyLCBmYWxzZSlcclxuICAgICAgICBhcmNoaXZlLmZpbmFsaXplKClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0xXFxcXERlc2t0b3BcXFxcZ2l0dXBcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29uc29sZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0xL0Rlc2t0b3AvZ2l0dXAvTmV3U2Fhcy92aXRlL3BsdWdpbnMvY29uc29sZS50c1wiO2ltcG9ydCBUdXJib0NvbnNvbGUgZnJvbSAndW5wbHVnaW4tdHVyYm8tY29uc29sZS92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29uc29sZSgpIHtcclxuICByZXR1cm4gVHVyYm9Db25zb2xlKClcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tMVxcXFxEZXNrdG9wXFxcXGdpdHVwXFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTFcXFxcRGVza3RvcFxcXFxnaXR1cFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxiYW5uZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMS9EZXNrdG9wL2dpdHVwL05ld1NhYXMvdml0ZS9wbHVnaW5zL2Jhbm5lci50c1wiO2ltcG9ydCBiYW5uZXIgZnJvbSAndml0ZS1wbHVnaW4tYmFubmVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQmFubmVyKCkge1xyXG4gIHJldHVybiBiYW5uZXIoYFxyXG4vKipcclxuICogXHU3NTMxIEZhbnRhc3RpYy1hZG1pbiBcdTYzRDBcdTRGOUJcdTYyODBcdTY3MkZcdTY1MkZcdTYzMDFcclxuICogUG93ZXJlZCBieSBGYW50YXN0aWMtYWRtaW5cclxuICogR2l0ZWUgIGh0dHBzOi8vZmFudGFzdGljLWFkbWluLmdpdGVlLmlvXHJcbiAqIEdpdGh1YiBodHRwczovL2ZhbnRhc3RpYy1hZG1pbi5naXRodWIuaW9cclxuICovXHJcbmApXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixPQUFPQSxTQUFRO0FBQzFXLE9BQU9DLFdBQVU7QUFDakIsT0FBT0MsY0FBYTtBQUNwQixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPQyxZQUFXOzs7QUNKbEI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxjQUFjO0FB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LFFBQVEsSUFBSTtBQUFBLE1BQ3JELFdBQVcsSUFBSSx5QkFBeUI7QUFBQSxJQUMxQztBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04saUJBQWlCLEtBQUssVUFBVTtBQUFBLFFBQzlCLEtBQUs7QUFBQSxVQUNILFNBQVMsZ0JBQUk7QUFBQSxVQUNiLGNBQWMsZ0JBQUk7QUFBQSxVQUNsQixpQkFBaUIsZ0JBQUk7QUFBQSxRQUN2QjtBQUFBLFFBQ0EsZUFBZUMsT0FBTSxFQUFFLE9BQU8scUJBQXFCO0FBQUEsTUFDckQsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVMsa0JBQWtCLEtBQUssWUFBWSxPQUFPO0FBQUEsSUFDbkQsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBS0QsTUFBSyxRQUFRRSxtQ0FBVyxLQUFLO0FBQUEsUUFDbEMsS0FBS0YsTUFBSyxRQUFRRSxtQ0FBVyxXQUFXO0FBQUEsTUFDMUM7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0IsY0FBYyxLQUFLLEVBQUU7QUFBQSxRQUN2QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbImZzIiwgInBhdGgiLCAicHJvY2VzcyIsICJkYXlqcyIsICJwYXRoIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicHJvY2VzcyIsICJmcyIsICJwYXRoIiwgImRheWpzIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
