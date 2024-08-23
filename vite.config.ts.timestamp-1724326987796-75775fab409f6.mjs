// vite.config.ts
import fs2 from "node:fs";
import path3 from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite@5.3.5_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import dayjs2 from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";

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
import vue from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.3.5_vue@3.4.36/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.3.5_vue@3.4.36/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueLegacy from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.1_terser@5.31.3_vite@5.3.5/node_modules/@vitejs/plugin-legacy/dist/index.mjs";

// vite/plugins/app-info.ts
import boxen from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/boxen@7.1.1/node_modules/boxen/index.js";
import picocolors from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/picocolors@1.0.1/node_modules/picocolors/picocolors.js";
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
import VueDevTools from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.7_vite@5.3.5_vue@3.4.36/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
function createDevtools(env) {
  const { VITE_OPEN_DEVTOOLS } = env;
  return VITE_OPEN_DEVTOOLS === "true" && VueDevTools();
}

// vite/plugins/auto-import.ts
import autoImport from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@10.11.0/node_modules/unplugin-auto-import/dist/vite.js";
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
import components from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.36/node_modules/unplugin-vue-components/dist/vite.js";
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
import Unocss from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.41_vite@5.3.5/node_modules/unocss/dist/vite.mjs";
function createUnocss() {
  return Unocss();
}

// vite/plugins/svg-icon.ts
import path from "node:path";
import process from "node:process";
import { createSvgIconsPlugin } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.5/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/i18n.ts
import path2 from "node:path";
import vueI18n from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@intlify+unplugin-vue-i18n@4.0.0_vue-i18n@9.13.1/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\\u5609\u79B9\u6280\u672F\u90E8--3\\Desktop\\newProject\\NewSaas\\vite\\plugins";
function createI18n() {
  return vueI18n({
    include: path2.resolve(__vite_injected_original_dirname, "../../src/locales/lang/**")
  });
}

// vite/plugins/mock.ts
import { vitePluginFakeServer } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-fake-server@2.1.1/node_modules/vite-plugin-fake-server/dist/index.mjs";
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
import Layouts from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.4.3_vite@5.3.5_vue-router@4.4.3/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createLayouts() {
  return Layouts({
    defaultLayout: "index"
  });
}

// vite/plugins/pages.ts
import Pages from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-pages@0.32.3_@vue+compiler-sfc@3.4.36_vite@5.3.5_vue-router@4.4.3/node_modules/vite-plugin-pages/dist/index.js";
function createPages() {
  return Pages({
    dirs: "src/views",
    exclude: [
      "**/components/**/*.vue"
    ]
  });
}

// vite/plugins/compression.ts
import { compression } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-compression2@1.1.3/node_modules/vite-plugin-compression2/dist/index.mjs";
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
import dayjs from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";
import archiver from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/archiver@7.0.1/node_modules/archiver/index.js";
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
import TurboConsole from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unplugin-turbo-console@1.10.1_vite@5.3.5_vue@3.4.36/node_modules/unplugin-turbo-console/dist/vite.mjs";
function createConsole() {
  return TurboConsole();
}

// vite/plugins/banner.ts
import banner from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-banner@0.7.1/node_modules/vite-plugin-banner/dist/index.mjs";
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
var __vite_injected_original_dirname2 = "C:\\Users\\\u5609\u79B9\u6280\u672F\u90E8--3\\Desktop\\newProject\\NewSaas";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUvcGx1Z2lucy9pbmRleC50cyIsICJ2aXRlL3BsdWdpbnMvYXBwLWluZm8udHMiLCAidml0ZS9wbHVnaW5zL2RldnRvb2xzLnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50cyIsICJ2aXRlL3BsdWdpbnMvY29tcG9uZW50cy50cyIsICJ2aXRlL3BsdWdpbnMvdW5vY3NzLnRzIiwgInZpdGUvcGx1Z2lucy9zdmctaWNvbi50cyIsICJ2aXRlL3BsdWdpbnMvaTE4bi50cyIsICJ2aXRlL3BsdWdpbnMvbW9jay50cyIsICJ2aXRlL3BsdWdpbnMvbGF5b3V0cy50cyIsICJ2aXRlL3BsdWdpbnMvcGFnZXMudHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9hcmNoaXZlci50cyIsICJ2aXRlL3BsdWdpbnMvY29uc29sZS50cyIsICJ2aXRlL3BsdWdpbnMvYmFubmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuICAvLyBcdTUxNjhcdTVDNDAgc2NzcyBcdThENDRcdTZFOTBcbiAgY29uc3Qgc2Nzc1Jlc291cmNlcyA9IFtdXG4gIGZzLnJlYWRkaXJTeW5jKCdzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMnKS5mb3JFYWNoKChkaXJuYW1lKSA9PiB7XG4gICAgaWYgKGZzLnN0YXRTeW5jKGBzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfWApLmlzRmlsZSgpKSB7XG4gICAgICBzY3NzUmVzb3VyY2VzLnB1c2goYEB1c2UgXCJzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfVwiIGFzICo7YClcbiAgICB9XG4gIH0pXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6ICcuLycsXG4gICAgLy8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1vcHRpb25zXG4gICAgc2VydmVyOiB7XG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgcG9ydDogOTAwMCxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvcHJveHknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfQVBJX0JBU0VVUkwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiBjb21tYW5kID09PSAnc2VydmUnICYmIGVudi5WSVRFX09QRU5fUFJPWFkgPT09ICd0cnVlJyxcbiAgICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXFwvcHJveHkvLCAnJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1mc3NlcnZlLXJvb3RcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBtb2RlID09PSAncHJvZHVjdGlvbicgPyAnZGlzdCcgOiBgZGlzdC0ke21vZGV9YCxcbiAgICAgIHNvdXJjZW1hcDogZW52LlZJVEVfQlVJTERfU09VUkNFTUFQID09PSAndHJ1ZScsXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fU1lTVEVNX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBwa2c6IHtcbiAgICAgICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcbiAgICAgICAgICBkZXBlbmRlbmNpZXM6IHBrZy5kZXBlbmRlbmNpZXMsXG4gICAgICAgICAgZGV2RGVwZW5kZW5jaWVzOiBwa2cuZGV2RGVwZW5kZW5jaWVzLFxuICAgICAgICB9LFxuICAgICAgICBsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxuICAgICAgfSksXG4gICAgfSxcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgICAnIyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZXMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBzY3NzUmVzb3VyY2VzLmpvaW4oJycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KVxufVxuIiwgIntcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcInZlcnNpb25cIjogXCI0LjcuMFwiLFxyXG4gIFwiZW5naW5lc1wiOiB7XHJcbiAgICBcIm5vZGVcIjogXCJeMTguMC4wIHx8IF4yMC4wLjBcIlxyXG4gIH0sXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxyXG4gICAgXCJidWlsZFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZFwiLFxyXG4gICAgXCJidWlsZDp0ZXN0XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXHJcbiAgICBcInNlcnZlXCI6IFwiaHR0cC1zZXJ2ZXIgLi9kaXN0IC1vXCIsXHJcbiAgICBcInNlcnZlOnRlc3RcIjogXCJodHRwLXNlcnZlciAuL2Rpc3QtdGVzdCAtb1wiLFxyXG4gICAgXCJzdmdvXCI6IFwic3ZnbyAtZiBzcmMvYXNzZXRzL2ljb25zXCIsXHJcbiAgICBcIm5ld1wiOiBcInBsb3BcIixcclxuICAgIFwiZ2VuZXJhdGU6aWNvbnNcIjogXCJlc25vIC4vc2NyaXB0cy9nZW5lcmF0ZS5pY29ucy50c1wiLFxyXG4gICAgXCJsaW50XCI6IFwibnBtLXJ1bi1hbGwgLXMgbGludDp0c2MgbGludDplc2xpbnQgbGludDpzdHlsZWxpbnRcIixcclxuICAgIFwibGludDp0c2NcIjogXCJ2dWUtdHNjXCIsXHJcbiAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IC4gLS1jYWNoZSAtLWZpeFwiLFxyXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCBcXFwic3JjLyoqLyoue2NzcyxzY3NzLHZ1ZX1cXFwiIC0tY2FjaGUgLS1maXhcIixcclxuICAgIFwicG9zdGluc3RhbGxcIjogXCJzaW1wbGUtZ2l0LWhvb2tzXCIsXHJcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXHJcbiAgICBcImNvbW1pdFwiOiBcImdpdCBjelwiLFxyXG4gICAgXCJyZWxlYXNlXCI6IFwiYnVtcHBcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiOiBcIl4yLjMuMVwiLFxyXG4gICAgXCJAaGVhZGxlc3N1aS92dWVcIjogXCJeMS43LjE5XCIsXHJcbiAgICBcIkBpbWVuZ3l1L3Z1ZTMtY29udGV4dC1tZW51XCI6IFwiXjEuMy45XCIsXHJcbiAgICBcIkBrYW5nYy92LW1kLWVkaXRvclwiOiBcIl4yLjMuMTVcIixcclxuICAgIFwiQHRpbnltY2UvdGlueW1jZS12dWVcIjogXCJeNS4xLjFcIixcclxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjkuMFwiLFxyXG4gICAgXCJAdnVldXNlL2ludGVncmF0aW9uc1wiOiBcIl4xMC45LjBcIixcclxuICAgIFwiYXhpb3NcIjogXCJeMS42LjhcIixcclxuICAgIFwiYnl0ZW1kXCI6IFwiXjEuMjEuMFwiLFxyXG4gICAgXCJjbGlwYm9hcmRcIjogXCJeMi4wLjExXCIsXHJcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuMTBcIixcclxuICAgIFwiZGVmdVwiOiBcIl42LjEuNFwiLFxyXG4gICAgXCJlY2hhcnRzXCI6IFwiXjUuNS4wXCIsXHJcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjYuM1wiLFxyXG4gICAgXCJlcnVkYVwiOiBcIl4zLjAuMVwiLFxyXG4gICAgXCJmbG9hdGluZy12dWVcIjogXCI1LjIuMlwiLFxyXG4gICAgXCJncmFwZXNqc1wiOiBcIl4wLjIxLjdcIixcclxuICAgIFwiZ3JhcGVzanMtYWR2YW5jZS1jb21wb25lbnRzXCI6IFwiXjEuMC43XCIsXHJcbiAgICBcImdyYXBlc2pzLWJsb2Nrcy1iYXNpY1wiOiBcIl4xLjAuMlwiLFxyXG4gICAgXCJncmFwZXNqcy1wYXJzZXItcG9zdGNzc1wiOiBcIl4xLjAuM1wiLFxyXG4gICAgXCJncmFwZXNqcy1wcmVzZXQtd2VicGFnZVwiOiBcIl4xLjAuM1wiLFxyXG4gICAgXCJob3RrZXlzLWpzXCI6IFwiXjMuMTMuN1wiLFxyXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxyXG4gICAgXCJtZWRpdW0tem9vbVwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJtaXR0XCI6IFwiXjMuMC4xXCIsXHJcbiAgICBcIm1vY2tqc1wiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJucHJvZ3Jlc3NcIjogXCJeMC4yLjBcIixcclxuICAgIFwib3ZlcmxheXNjcm9sbGJhcnNcIjogXCJeMi42LjFcIixcclxuICAgIFwib3ZlcmxheXNjcm9sbGJhcnMtdnVlXCI6IFwiXjAuNS44XCIsXHJcbiAgICBcInBhdGgtYnJvd3NlcmlmeVwiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJwYXRoLXRvLXJlZ2V4cFwiOiBcIl42LjIuMVwiLFxyXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxyXG4gICAgXCJwaW55aW4tcHJvXCI6IFwiXjMuMTkuNlwiLFxyXG4gICAgXCJxc1wiOiBcIl42LjEyLjBcIixcclxuICAgIFwic2N1bGVcIjogXCJeMS4zLjBcIixcclxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjJcIixcclxuICAgIFwic3BpbmtpdFwiOiBcIl4yLjAuMVwiLFxyXG4gICAgXCJzdXJ2ZXktY29yZVwiOiBcIl4xLjkuMTMxXCIsXHJcbiAgICBcInN1cnZleS1jcmVhdG9yLWNvcmVcIjogXCJeMS45LjEzMVwiLFxyXG4gICAgXCJzdXJ2ZXktY3JlYXRvci12dWVcIjogXCJeMS45LjEzMVwiLFxyXG4gICAgXCJzdXJ2ZXktdnVlMy11aVwiOiBcIl4xLjkuMTMxXCIsXHJcbiAgICBcInRpbWVhZ28uanNcIjogXCJeNC4wLjJcIixcclxuICAgIFwidGlueW1jZVwiOiBcIl43LjAuMVwiLFxyXG4gICAgXCJ2LXdhdmVcIjogXCJeMi4wLjBcIixcclxuICAgIFwidmNvbnNvbGVcIjogXCJeMy4xNS4xXCIsXHJcbiAgICBcInZ1ZVwiOiBcIl4zLjQuMjFcIixcclxuICAgIFwidnVlLWNsaXBib2FyZDNcIjogXCJeMi4wLjBcIixcclxuICAgIFwidnVlLWkxOG5cIjogXCJeOS4xMC4yXCIsXHJcbiAgICBcInZ1ZS1qc29ucFwiOiBcIl4yLjAuMFwiLFxyXG4gICAgXCJ2dWUtbS1tZXNzYWdlXCI6IFwiXjQuMC4yXCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjBcIixcclxuICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiXjQuMS4wXCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGFudGZ1L2VzbGludC1jb25maWdcIjogXCIyLjExLjZcIixcclxuICAgIFwiQGJ5dGVtZC9wbHVnaW4tZ2ZtXCI6IFwiXjEuMjEuMFwiLFxyXG4gICAgXCJAYnl0ZW1kL3Z1ZS1uZXh0XCI6IFwiXjEuMjEuMFwiLFxyXG4gICAgXCJAaWNvbmlmeS9qc29uXCI6IFwiXjIuMi4xOTZcIixcclxuICAgIFwiQGljb25pZnkvdnVlXCI6IFwiXjQuMS4xXCIsXHJcbiAgICBcIkBpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuXCI6IFwiXjQuMC4wXCIsXHJcbiAgICBcIkBzdHlsaXN0aWMvc3R5bGVsaW50LWNvbmZpZ1wiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJAdHlwZXMvbG9kYXNoLWVzXCI6IFwiXjQuMTcuMTJcIixcclxuICAgIFwiQHR5cGVzL21vY2tqc1wiOiBcIl4xLjAuMTBcIixcclxuICAgIFwiQHR5cGVzL25wcm9ncmVzc1wiOiBcIl4wLjIuM1wiLFxyXG4gICAgXCJAdHlwZXMvcGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4yXCIsXHJcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTRcIixcclxuICAgIFwiQHR5cGVzL3NvcnRhYmxlanNcIjogXCJeMS4xNS44XCIsXHJcbiAgICBcIkB1bm9jc3MvZXNsaW50LXBsdWdpblwiOiBcIl4wLjU4LjhcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tbGVnYWN5XCI6IFwiXjUuMy4yXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjMuMS4wXCIsXHJcbiAgICBcImFyY2hpdmVyXCI6IFwiXjcuMC4xXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXHJcbiAgICBcImJveGVuXCI6IFwiXjcuMS4xXCIsXHJcbiAgICBcImJ1bXBwXCI6IFwiXjkuNC4wXCIsXHJcbiAgICBcImN6LWdpdFwiOiBcIl4xLjkuMVwiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXHJcbiAgICBcImVzbm9cIjogXCJeNC43LjBcIixcclxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXHJcbiAgICBcImh0dHAtc2VydmVyXCI6IFwiXjE0LjEuMVwiLFxyXG4gICAgXCJpbnF1aXJlclwiOiBcIl45LjIuMTdcIixcclxuICAgIFwibGludC1zdGFnZWRcIjogXCJeMTUuMi4yXCIsXHJcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXHJcbiAgICBcInBpY29jb2xvcnNcIjogXCJeMS4wLjBcIixcclxuICAgIFwicGxvcFwiOiBcIl40LjAuMVwiLFxyXG4gICAgXCJzYXNzXCI6IFwiXjEuNzIuMFwiLFxyXG4gICAgXCJzaW1wbGUtZ2l0LWhvb2tzXCI6IFwiXjIuMTEuMVwiLFxyXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuMy4xXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjZXNzLW9yZGVyXCI6IFwiXjUuMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMy4wLjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC12dWVcIjogXCJeMS4wLjBcIixcclxuICAgIFwic3R5bGVsaW50LXNjc3NcIjogXCJeNi4yLjFcIixcclxuICAgIFwic3Znb1wiOiBcIl4zLjIuMFwiLFxyXG4gICAgXCJ0ZXJzZXJcIjogXCJeNS4zMC4wXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjNcIixcclxuICAgIFwidW5vY3NzXCI6IFwiXjAuNTguOFwiLFxyXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE3LjVcIixcclxuICAgIFwidW5wbHVnaW4tdHVyYm8tY29uc29sZVwiOiBcIl4xLjUuMVwiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI2LjBcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjIuN1wiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1iYW5uZXJcIjogXCJeMC43LjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb24yXCI6IFwiXjEuMC4wXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWZha2Utc2VydmVyXCI6IFwiXjIuMS4xXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXBhZ2VzXCI6IFwiXjAuMzIuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI6IFwiXjcuMC4yNVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtbWV0YS1sYXlvdXRzXCI6IFwiXjAuNC4yXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjdcIlxyXG4gIH0sXHJcbiAgXCJjb25maWdcIjoge1xyXG4gICAgXCJjb21taXRpemVuXCI6IHtcclxuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9pbmRleC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHZ1ZUxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXG5pbXBvcnQgYXBwSW5mbyBmcm9tICcuL2FwcC1pbmZvJ1xuXG5pbXBvcnQgY3JlYXRlRGV2dG9vbHMgZnJvbSAnLi9kZXZ0b29scydcbmltcG9ydCBjcmVhdGVBdXRvSW1wb3J0IGZyb20gJy4vYXV0by1pbXBvcnQnXG5pbXBvcnQgY3JlYXRlQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMnXG5pbXBvcnQgY3JlYXRlVW5vY3NzIGZyb20gJy4vdW5vY3NzJ1xuaW1wb3J0IGNyZWF0ZVN2Z0ljb24gZnJvbSAnLi9zdmctaWNvbidcbmltcG9ydCBjcmVhdGVJMThuIGZyb20gJy4vaTE4bidcbmltcG9ydCBjcmVhdGVNb2NrIGZyb20gJy4vbW9jaydcbmltcG9ydCBjcmVhdGVMYXlvdXRzIGZyb20gJy4vbGF5b3V0cydcbmltcG9ydCBjcmVhdGVQYWdlcyBmcm9tICcuL3BhZ2VzJ1xuaW1wb3J0IGNyZWF0ZUNvbXByZXNzaW9uIGZyb20gJy4vY29tcHJlc3Npb24nXG5pbXBvcnQgY3JlYXRlQXJjaGl2ZXIgZnJvbSAnLi9hcmNoaXZlcidcbmltcG9ydCBjcmVhdGVDb25zb2xlIGZyb20gJy4vY29uc29sZSdcbmltcG9ydCBjcmVhdGVCYW5uZXIgZnJvbSAnLi9iYW5uZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzQnVpbGQgPSBmYWxzZSkge1xuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW1xuICAgIGFwcEluZm8oKSxcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICB2dWVMZWdhY3koe1xuICAgICAgcmVuZGVyTGVnYWN5Q2h1bmtzOiBmYWxzZSxcbiAgICAgIG1vZGVyblBvbHlmaWxsczogW1xuICAgICAgICAnZXMuYXJyYXkuYXQnLFxuICAgICAgICAnZXMuYXJyYXkuZmluZC1sYXN0JyxcbiAgICAgIF0sXG4gICAgfSksXG4gIF1cbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVEZXZ0b29scyh2aXRlRW52KSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVBdXRvSW1wb3J0KCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQ29tcG9uZW50cygpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVVub2NzcygpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlSTE4bigpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZU1vY2sodml0ZUVudiwgaXNCdWlsZCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlTGF5b3V0cygpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVBhZ2VzKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goLi4uY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudiwgaXNCdWlsZCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQXJjaGl2ZXIodml0ZUVudikpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQ29uc29sZSgpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUJhbm5lcigpKVxuICByZXR1cm4gdml0ZVBsdWdpbnNcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhcHAtaW5mby50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9hcHAtaW5mby50c1wiO2ltcG9ydCBib3hlbiBmcm9tICdib3hlbidcbmltcG9ydCBwaWNvY29sb3JzIGZyb20gJ3BpY29jb2xvcnMnXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcEluZm8oKTogUGx1Z2luIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnYXBwSW5mbycsXG4gICAgYXBwbHk6ICdzZXJ2ZScsXG4gICAgYXN5bmMgYnVpbGRTdGFydCgpIHtcbiAgICAgIGNvbnN0IHsgYm9sZCwgZ3JlZW4sIG1hZ2VudGEsIGJnR3JlZW4sIHVuZGVybGluZSB9ID0gcGljb2NvbG9yc1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBib3hlbihcbiAgICAgICAgICBgJHtib2xkKGdyZWVuKGBcdTc1MzEgJHtiZ0dyZWVuKCdGYW50YXN0aWMtYWRtaW4nKX0gXHU5QTcxXHU1MkE4YCkpfVxcblxcbiR7dW5kZXJsaW5lKCdodHRwczovL2ZhbnRhc3RpYy1hZG1pbi5naXRlZS5pbycpfVxcblxcblx1NUY1M1x1NTI0RFx1NEY3Rlx1NzUyOFx1RkYxQSR7bWFnZW50YSgnXHU0RTEzXHU0RTFBXHU3MjQ4Jyl9YCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYWRkaW5nOiAxLFxuICAgICAgICAgICAgbWFyZ2luOiAxLFxuICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdkb3VibGUnLFxuICAgICAgICAgICAgdGV4dEFsaWdubWVudDogJ2NlbnRlcicsXG4gICAgICAgICAgfSxcbiAgICAgICAgKSxcbiAgICAgIClcbiAgICB9LFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcZGV2dG9vbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvZGV2dG9vbHMudHNcIjtpbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEZXZ0b29scyhlbnYpIHtcbiAgY29uc3QgeyBWSVRFX09QRU5fREVWVE9PTFMgfSA9IGVudlxuICByZXR1cm4gVklURV9PUEVOX0RFVlRPT0xTID09PSAndHJ1ZScgJiYgVnVlRGV2VG9vbHMoKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGF1dG8taW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2F1dG8taW1wb3J0LnRzXCI7aW1wb3J0IGF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXV0b0ltcG9ydCgpIHtcbiAgcmV0dXJuIGF1dG9JbXBvcnQoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICd2dWUnLFxuICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgJ3BpbmlhJyxcbiAgICBdLFxuICAgIGR0czogJy4vc3JjL3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICBkaXJzOiBbXG4gICAgICAnLi9zcmMvdXRpbHMvY29tcG9zYWJsZXMvKionLFxuICAgIF0sXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcG9uZW50cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzXCI7aW1wb3J0IGNvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50cygpIHtcbiAgcmV0dXJuIGNvbXBvbmVudHMoe1xuICAgIGRpcnM6IFtcbiAgICAgICdzcmMvY29tcG9uZW50cycsXG4gICAgICAnc3JjL2xheW91dHMvdWkta2l0JyxcbiAgICBdLFxuICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwudHN4JC9dLFxuICAgIGR0czogJy4vc3JjL3R5cGVzL2NvbXBvbmVudHMuZC50cycsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcdW5vY3NzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL3Vub2Nzcy50c1wiO2ltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVub2NzcygpIHtcbiAgcmV0dXJuIFVub2NzcygpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc3ZnLWljb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvc3ZnLWljb24udHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSB7XG4gIHJldHVybiBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMvJyldLFxuICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGkxOG4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvaTE4bi50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB2dWVJMThuIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUkxOG4oKSB7XG4gIHJldHVybiB2dWVJMThuKHtcbiAgICBpbmNsdWRlOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjL2xvY2FsZXMvbGFuZy8qKicpLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXG1vY2sudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvbW9jay50c1wiO2ltcG9ydCB7IHZpdGVQbHVnaW5GYWtlU2VydmVyIH0gZnJvbSAndml0ZS1wbHVnaW4tZmFrZS1zZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1vY2soZW52LCBpc0J1aWxkKSB7XG4gIGNvbnN0IHsgVklURV9CVUlMRF9NT0NLIH0gPSBlbnZcbiAgcmV0dXJuIHZpdGVQbHVnaW5GYWtlU2VydmVyKHtcbiAgICBsb2dnZXI6ICFpc0J1aWxkLFxuICAgIGluY2x1ZGU6ICdzcmMvbW9jaycsXG4gICAgaW5maXhOYW1lOiBmYWxzZSxcbiAgICBlbmFibGVQcm9kOiBpc0J1aWxkICYmIFZJVEVfQlVJTERfTU9DSyA9PT0gJ3RydWUnLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGxheW91dHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvbGF5b3V0cy50c1wiO2ltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1tZXRhLWxheW91dHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUxheW91dHMoKSB7XG4gIHJldHVybiBMYXlvdXRzKHtcbiAgICBkZWZhdWx0TGF5b3V0OiAnaW5kZXgnLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHBhZ2VzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL3BhZ2VzLnRzXCI7aW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQYWdlcygpIHtcbiAgcmV0dXJuIFBhZ2VzKHtcbiAgICBkaXJzOiAnc3JjL3ZpZXdzJyxcbiAgICBleGNsdWRlOiBbXG4gICAgICAnKiovY29tcG9uZW50cy8qKi8qLnZ1ZScsXG4gICAgXSxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9jb21wcmVzc2lvbi50c1wiO2ltcG9ydCB7IGNvbXByZXNzaW9uIH0gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24yJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wcmVzc2lvbihlbnYsIGlzQnVpbGQpIHtcbiAgY29uc3QgcGx1Z2luOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPSBbXVxuICBpZiAoaXNCdWlsZCkge1xuICAgIGNvbnN0IHsgVklURV9CVUlMRF9DT01QUkVTUyB9ID0gZW52XG4gICAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdCgnLCcpXG4gICAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnZ3ppcCcpKSB7XG4gICAgICBwbHVnaW4ucHVzaChcbiAgICAgICAgY29tcHJlc3Npb24oKSxcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcbiAgICAgIHBsdWdpbi5wdXNoKFxuICAgICAgICBjb21wcmVzc2lvbih7XG4gICAgICAgICAgZXhjbHVkZTogWy9cXC4oYnIpJC8sIC9cXC4oZ3opJC9dLFxuICAgICAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgfVxuICB9XG4gIHJldHVybiBwbHVnaW5cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhcmNoaXZlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9hcmNoaXZlci50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IGFyY2hpdmVyIGZyb20gJ2FyY2hpdmVyJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuXG5mdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXJjaGl2ZXIoZW52KTogUGx1Z2luIHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0FSQ0hJVkUgfSA9IGVudlxuICBsZXQgb3V0RGlyOiBzdHJpbmdcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4tYXJjaGl2ZXInLFxuICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XG4gICAgICBvdXREaXIgPSByZXNvbHZlZENvbmZpZy5idWlsZC5vdXREaXJcbiAgICB9LFxuICAgIGFzeW5jIGNsb3NlQnVuZGxlKCkge1xuICAgICAgaWYgKFsnemlwJywgJ3RhciddLmluY2x1ZGVzKFZJVEVfQlVJTERfQVJDSElWRSkpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwMClcbiAgICAgICAgY29uc3QgYXJjaGl2ZSA9IGFyY2hpdmVyKFZJVEVfQlVJTERfQVJDSElWRSwge1xuICAgICAgICAgIC4uLihWSVRFX0JVSUxEX0FSQ0hJVkUgPT09ICd6aXAnICYmIHsgemxpYjogeyBsZXZlbDogOSB9IH0pLFxuICAgICAgICAgIC4uLihWSVRFX0JVSUxEX0FSQ0hJVkUgPT09ICd0YXInICYmIHsgZ3ppcDogdHJ1ZSwgZ3ppcE9wdGlvbnM6IHsgbGV2ZWw6IDkgfSB9KSxcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oYCR7b3V0RGlyfS4ke2RheWpzKCkuZm9ybWF0KCdZWVlZLU1NLURELUhILW1tLXNzJyl9LiR7VklURV9CVUlMRF9BUkNISVZFID09PSAnemlwJyA/ICd6aXAnIDogJ3Rhci5neid9YClcbiAgICAgICAgYXJjaGl2ZS5waXBlKG91dHB1dClcbiAgICAgICAgYXJjaGl2ZS5kaXJlY3Rvcnkob3V0RGlyLCBmYWxzZSlcbiAgICAgICAgYXJjaGl2ZS5maW5hbGl6ZSgpXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbnNvbGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvY29uc29sZS50c1wiO2ltcG9ydCBUdXJib0NvbnNvbGUgZnJvbSAndW5wbHVnaW4tdHVyYm8tY29uc29sZS92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb25zb2xlKCkge1xuICByZXR1cm4gVHVyYm9Db25zb2xlKClcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxiYW5uZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvYmFubmVyLnRzXCI7aW1wb3J0IGJhbm5lciBmcm9tICd2aXRlLXBsdWdpbi1iYW5uZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJhbm5lcigpIHtcbiAgcmV0dXJuIGJhbm5lcihgXG4vKipcbiAqIFx1NzUzMSBGYW50YXN0aWMtYWRtaW4gXHU2M0QwXHU0RjlCXHU2MjgwXHU2NzJGXHU2NTJGXHU2MzAxXG4gKiBQb3dlcmVkIGJ5IEZhbnRhc3RpYy1hZG1pblxuICogR2l0ZWUgIGh0dHBzOi8vZmFudGFzdGljLWFkbWluLmdpdGVlLmlvXG4gKiBHaXRodWIgaHR0cHM6Ly9mYW50YXN0aWMtYWRtaW4uZ2l0aHViLmlvXG4gKi9cbmApXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBXLE9BQU9BLFNBQVE7QUFDelgsT0FBT0MsV0FBVTtBQUNqQixPQUFPQyxjQUFhO0FBQ3BCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU9DLFlBQVc7OztBQ0psQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULGNBQWM7QUFBQSxJQUNkLE9BQVM7QUFBQSxJQUNULGNBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxJQUNQLGtCQUFrQjtBQUFBLElBQ2xCLE1BQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWU7QUFBQSxJQUNmLFlBQWM7QUFBQSxJQUNkLFFBQVU7QUFBQSxJQUNWLFNBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsMkJBQTJCO0FBQUEsSUFDM0IsbUJBQW1CO0FBQUEsSUFDbkIsOEJBQThCO0FBQUEsSUFDOUIsc0JBQXNCO0FBQUEsSUFDdEIsd0JBQXdCO0FBQUEsSUFDeEIsZ0JBQWdCO0FBQUEsSUFDaEIsd0JBQXdCO0FBQUEsSUFDeEIsT0FBUztBQUFBLElBQ1QsUUFBVTtBQUFBLElBQ1YsV0FBYTtBQUFBLElBQ2IsT0FBUztBQUFBLElBQ1QsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLElBQ1gsZ0JBQWdCO0FBQUEsSUFDaEIsT0FBUztBQUFBLElBQ1QsZ0JBQWdCO0FBQUEsSUFDaEIsVUFBWTtBQUFBLElBQ1osK0JBQStCO0FBQUEsSUFDL0IseUJBQXlCO0FBQUEsSUFDekIsMkJBQTJCO0FBQUEsSUFDM0IsMkJBQTJCO0FBQUEsSUFDM0IsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsTUFBUTtBQUFBLElBQ1IsUUFBVTtBQUFBLElBQ1YsV0FBYTtBQUFBLElBQ2IsbUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFDbEIsT0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsSUFBTTtBQUFBLElBQ04sT0FBUztBQUFBLElBQ1QsWUFBYztBQUFBLElBQ2QsU0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2YsdUJBQXVCO0FBQUEsSUFDdkIsc0JBQXNCO0FBQUEsSUFDdEIsa0JBQWtCO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBQ2QsU0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsVUFBWTtBQUFBLElBQ1osS0FBTztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsSUFDbEIsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsY0FBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsOEJBQThCO0FBQUEsSUFDOUIsK0JBQStCO0FBQUEsSUFDL0Isb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsMEJBQTBCO0FBQUEsSUFDMUIsYUFBYTtBQUFBLElBQ2IscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsMEJBQTBCO0FBQUEsSUFDMUIsVUFBWTtBQUFBLElBQ1osY0FBZ0I7QUFBQSxJQUNoQixPQUFTO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixRQUFVO0FBQUEsSUFDVixNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixVQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsSUFDZixZQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUixNQUFRO0FBQUEsSUFDUixvQkFBb0I7QUFBQSxJQUNwQixXQUFhO0FBQUEsSUFDYixpQ0FBaUM7QUFBQSxJQUNqQyxrQ0FBa0M7QUFBQSxJQUNsQyxpQ0FBaUM7QUFBQSxJQUNqQyxrQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsSUFDUixRQUFVO0FBQUEsSUFDVixZQUFjO0FBQUEsSUFDZCxRQUFVO0FBQUEsSUFDVix3QkFBd0I7QUFBQSxJQUN4QiwwQkFBMEI7QUFBQSxJQUMxQiwyQkFBMkI7QUFBQSxJQUMzQixNQUFRO0FBQUEsSUFDUixzQkFBc0I7QUFBQSxJQUN0Qiw0QkFBNEI7QUFBQSxJQUM1QiwyQkFBMkI7QUFBQSxJQUMzQixxQkFBcUI7QUFBQSxJQUNyQix5QkFBeUI7QUFBQSxJQUN6Qiw0QkFBNEI7QUFBQSxJQUM1QixnQ0FBZ0M7QUFBQSxJQUNoQyxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsWUFBYztBQUFBLE1BQ1osTUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0Y7OztBQzFJQSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZUFBZTs7O0FDSHlYLE9BQU8sV0FBVztBQUNqYSxPQUFPLGdCQUFnQjtBQUdSLFNBQVIsVUFBbUM7QUFDeEMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsTUFBTSxhQUFhO0FBQ2pCLFlBQU0sRUFBRSxNQUFNLE9BQU8sU0FBUyxTQUFTLFVBQVUsSUFBSTtBQUVyRCxjQUFRO0FBQUEsUUFDTjtBQUFBLFVBQ0UsR0FBRyxLQUFLLE1BQU0sVUFBSyxRQUFRLGlCQUFpQixDQUFDLGVBQUssQ0FBQyxDQUFDO0FBQUE7QUFBQSxFQUFPLFVBQVUsa0NBQWtDLENBQUM7QUFBQTtBQUFBLGdDQUFZLFFBQVEsb0JBQUssQ0FBQztBQUFBLFVBQ2xJO0FBQUEsWUFDRSxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsWUFDUixhQUFhO0FBQUEsWUFDYixlQUFlO0FBQUEsVUFDakI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBQ3hCK1ksT0FBTyxpQkFBaUI7QUFFeFosU0FBUixlQUFnQyxLQUFLO0FBQzFDLFFBQU0sRUFBRSxtQkFBbUIsSUFBSTtBQUMvQixTQUFPLHVCQUF1QixVQUFVLFlBQVk7QUFDdEQ7OztBQ0xxWixPQUFPLGdCQUFnQjtBQUU3WixTQUFSLG1CQUFvQztBQUN6QyxTQUFPLFdBQVc7QUFBQSxJQUNoQixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLE1BQ0o7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBQ2RtWixPQUFPLGdCQUFnQjtBQUUzWixTQUFSLG1CQUFvQztBQUN6QyxTQUFPLFdBQVc7QUFBQSxJQUNoQixNQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsVUFBVSxjQUFjLFFBQVE7QUFBQSxJQUMxQyxLQUFLO0FBQUEsRUFDUCxDQUFDO0FBQ0g7OztBQ1gyWSxPQUFPLFlBQVk7QUFFL1ksU0FBUixlQUFnQztBQUNyQyxTQUFPLE9BQU87QUFDaEI7OztBQ0orWSxPQUFPLFVBQVU7QUFDaGEsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsNEJBQTRCO0FBRXRCLFNBQVIsY0FBK0IsU0FBUztBQUM3QyxTQUFPLHFCQUFxQjtBQUFBLElBQzFCLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsbUJBQW1CLENBQUM7QUFBQSxJQUMzRCxVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsRUFDZixDQUFDO0FBQ0g7OztBQ1Z1WSxPQUFPQyxXQUFVO0FBQ3haLE9BQU8sYUFBYTtBQURwQixJQUFNLG1DQUFtQztBQUcxQixTQUFSLGFBQThCO0FBQ25DLFNBQU8sUUFBUTtBQUFBLElBQ2IsU0FBU0MsTUFBSyxRQUFRLGtDQUFXLDJCQUEyQjtBQUFBLEVBQzlELENBQUM7QUFDSDs7O0FDUHVZLFNBQVMsNEJBQTRCO0FBRTdaLFNBQVIsV0FBNEIsS0FBSyxTQUFTO0FBQy9DLFFBQU0sRUFBRSxnQkFBZ0IsSUFBSTtBQUM1QixTQUFPLHFCQUFxQjtBQUFBLElBQzFCLFFBQVEsQ0FBQztBQUFBLElBQ1QsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsWUFBWSxXQUFXLG9CQUFvQjtBQUFBLEVBQzdDLENBQUM7QUFDSDs7O0FDVjZZLE9BQU8sYUFBYTtBQUVsWixTQUFSLGdCQUFpQztBQUN0QyxTQUFPLFFBQVE7QUFBQSxJQUNiLGVBQWU7QUFBQSxFQUNqQixDQUFDO0FBQ0g7OztBQ055WSxPQUFPLFdBQVc7QUFFNVksU0FBUixjQUErQjtBQUNwQyxTQUFPLE1BQU07QUFBQSxJQUNYLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOzs7QUNUcVosU0FBUyxtQkFBbUI7QUFHbGEsU0FBUixrQkFBbUMsS0FBSyxTQUFTO0FBQ3RELFFBQU0sU0FBNEMsQ0FBQztBQUNuRCxNQUFJLFNBQVM7QUFDWCxVQUFNLEVBQUUsb0JBQW9CLElBQUk7QUFDaEMsVUFBTSxlQUFlLG9CQUFvQixNQUFNLEdBQUc7QUFDbEQsUUFBSSxhQUFhLFNBQVMsTUFBTSxHQUFHO0FBQ2pDLGFBQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUNBLFFBQUksYUFBYSxTQUFTLFFBQVEsR0FBRztBQUNuQyxhQUFPO0FBQUEsUUFDTCxZQUFZO0FBQUEsVUFDVixTQUFTLENBQUMsV0FBVyxTQUFTO0FBQUEsVUFDOUIsV0FBVztBQUFBLFFBQ2IsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDs7O0FDdkIrWSxPQUFPLFFBQVE7QUFDOVosT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUdyQixTQUFTLE1BQU0sSUFBSTtBQUNqQixTQUFPLElBQUksUUFBUSxhQUFXLFdBQVcsU0FBUyxFQUFFLENBQUM7QUFDdkQ7QUFFZSxTQUFSLGVBQWdDLEtBQWE7QUFDbEQsUUFBTSxFQUFFLG1CQUFtQixJQUFJO0FBQy9CLE1BQUk7QUFDSixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxlQUFlLGdCQUFnQjtBQUM3QixlQUFTLGVBQWUsTUFBTTtBQUFBLElBQ2hDO0FBQUEsSUFDQSxNQUFNLGNBQWM7QUFDbEIsVUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLFNBQVMsa0JBQWtCLEdBQUc7QUFDL0MsY0FBTSxNQUFNLEdBQUk7QUFDaEIsY0FBTSxVQUFVLFNBQVMsb0JBQW9CO0FBQUEsVUFDM0MsR0FBSSx1QkFBdUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRTtBQUFBLFVBQ3pELEdBQUksdUJBQXVCLFNBQVMsRUFBRSxNQUFNLE1BQU0sYUFBYSxFQUFFLE9BQU8sRUFBRSxFQUFFO0FBQUEsUUFDOUUsQ0FBQztBQUNELGNBQU0sU0FBUyxHQUFHLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxNQUFNLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLHVCQUF1QixRQUFRLFFBQVEsUUFBUSxFQUFFO0FBQzNJLGdCQUFRLEtBQUssTUFBTTtBQUNuQixnQkFBUSxVQUFVLFFBQVEsS0FBSztBQUMvQixnQkFBUSxTQUFTO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUNoQzZZLE9BQU8sa0JBQWtCO0FBRXZaLFNBQVIsZ0JBQWlDO0FBQ3RDLFNBQU8sYUFBYTtBQUN0Qjs7O0FDSjJZLE9BQU8sWUFBWTtBQUUvWSxTQUFSLGVBQWdDO0FBQ3JDLFNBQU8sT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBT2Y7QUFDRDs7O0FkU2UsU0FBUixrQkFBbUMsU0FBUyxVQUFVLE9BQU87QUFDbEUsUUFBTSxjQUFpRDtBQUFBLElBQ3JELFFBQVE7QUFBQSxJQUNSLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxNQUNSLG9CQUFvQjtBQUFBLE1BQ3BCLGlCQUFpQjtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxjQUFZLEtBQUssZUFBZSxPQUFPLENBQUM7QUFDeEMsY0FBWSxLQUFLLGlCQUFpQixDQUFDO0FBQ25DLGNBQVksS0FBSyxpQkFBaUIsQ0FBQztBQUNuQyxjQUFZLEtBQUssYUFBYSxDQUFDO0FBQy9CLGNBQVksS0FBSyxjQUFjLE9BQU8sQ0FBQztBQUN2QyxjQUFZLEtBQUssV0FBVyxDQUFDO0FBQzdCLGNBQVksS0FBSyxXQUFXLFNBQVMsT0FBTyxDQUFDO0FBQzdDLGNBQVksS0FBSyxjQUFjLENBQUM7QUFDaEMsY0FBWSxLQUFLLFlBQVksQ0FBQztBQUM5QixjQUFZLEtBQUssR0FBRyxrQkFBa0IsU0FBUyxPQUFPLENBQUM7QUFDdkQsY0FBWSxLQUFLLGVBQWUsT0FBTyxDQUFDO0FBQ3hDLGNBQVksS0FBSyxjQUFjLENBQUM7QUFDaEMsY0FBWSxLQUFLLGFBQWEsQ0FBQztBQUMvQixTQUFPO0FBQ1Q7OztBRi9DQSxJQUFNQyxvQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxPQUFPLEVBQUUsTUFBTSxRQUFRLE1BQU07QUFDMUMsUUFBTSxNQUFNLFFBQVEsTUFBTUMsU0FBUSxJQUFJLENBQUM7QUFFdkMsUUFBTSxnQkFBZ0IsQ0FBQztBQUN2QixFQUFBQyxJQUFHLFlBQVksNkJBQTZCLEVBQUUsUUFBUSxDQUFDLFlBQVk7QUFDakUsUUFBSUEsSUFBRyxTQUFTLCtCQUErQixPQUFPLEVBQUUsRUFBRSxPQUFPLEdBQUc7QUFDbEUsb0JBQWMsS0FBSyxxQ0FBcUMsT0FBTyxTQUFTO0FBQUEsSUFDMUU7QUFBQSxFQUNGLENBQUM7QUFDRCxTQUFPLGFBQWE7QUFBQSxJQUNsQixNQUFNO0FBQUE7QUFBQSxJQUVOLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFVBQVU7QUFBQSxVQUNSLFFBQVEsSUFBSTtBQUFBLFVBQ1osY0FBYyxZQUFZLFdBQVcsSUFBSSxvQkFBb0I7QUFBQSxVQUM3RCxTQUFTLENBQUFDLFVBQVFBLE1BQUssUUFBUSxXQUFXLEVBQUU7QUFBQSxRQUM3QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFFBQVEsU0FBUyxlQUFlLFNBQVMsUUFBUSxJQUFJO0FBQUEsTUFDckQsV0FBVyxJQUFJLHlCQUF5QjtBQUFBLElBQzFDO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixpQkFBaUIsS0FBSyxVQUFVO0FBQUEsUUFDOUIsS0FBSztBQUFBLFVBQ0gsU0FBUyxnQkFBSTtBQUFBLFVBQ2IsY0FBYyxnQkFBSTtBQUFBLFVBQ2xCLGlCQUFpQixnQkFBSTtBQUFBLFFBQ3ZCO0FBQUEsUUFDQSxlQUFlQyxPQUFNLEVBQUUsT0FBTyxxQkFBcUI7QUFBQSxNQUNyRCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxrQkFBa0IsS0FBSyxZQUFZLE9BQU87QUFBQSxJQUNuRCxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLRCxNQUFLLFFBQVFFLG1DQUFXLEtBQUs7QUFBQSxRQUNsQyxLQUFLRixNQUFLLFFBQVFFLG1DQUFXLFdBQVc7QUFBQSxNQUMxQztBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQixjQUFjLEtBQUssRUFBRTtBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiZnMiLCAicGF0aCIsICJwcm9jZXNzIiwgImRheWpzIiwgInBhdGgiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwcm9jZXNzIiwgImZzIiwgInBhdGgiLCAiZGF5anMiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiXQp9Cg==
