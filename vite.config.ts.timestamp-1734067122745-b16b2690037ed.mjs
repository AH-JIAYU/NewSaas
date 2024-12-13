// vite.config.ts
import fs2 from "node:fs";
import path3 from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
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
    test: "vite --mode test",
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
import vue from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3__vue@3.4.36_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3__vue@3.4.36_typescript@5.5.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueLegacy from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.1_terser@5.31.3_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3_/node_modules/@vitejs/plugin-legacy/dist/index.mjs";

// vite/plugins/app-info.ts
import picocolors from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/picocolors@1.0.1/node_modules/picocolors/picocolors.js";
function appInfo() {
  return {
    name: "appInfo",
    apply: "serve",
    async buildStart() {
      const { bold, green, magenta, bgGreen, underline } = picocolors;
    }
  };
}

// vite/plugins/devtools.ts
import VueDevTools from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.7_@nuxt+kit@3.12.4_rollup@4.20.0__rollup@4.20.0_vite@5.3.5_@type_fer4fidzryagxj6w2xql4qlr5e/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
function createDevtools(env) {
  const { VITE_OPEN_DEVTOOLS } = env;
  return VITE_OPEN_DEVTOOLS === "true" && VueDevTools();
}

// vite/plugins/auto-import.ts
import autoImport from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unplugin-auto-import@0.17.8_@nuxt+kit@3.12.4_rollup@4.20.0__@vueuse+core@10.11.0_vue@3.4.36_t_3sbwzp35oweyd366wn4krnjiki/node_modules/unplugin-auto-import/dist/vite.js";
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
import components from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.25.3_@nuxt+kit@3.12.4_rollup@4.20.0__rollup@4._zdvm6ynm5kp34kyqudedrhwane/node_modules/unplugin-vue-components/dist/vite.js";
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
import Unocss from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unocss@0.58.9_postcss@5.2.18_rollup@4.20.0_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3_/node_modules/unocss/dist/vite.mjs";
function createUnocss() {
  return Unocss();
}

// vite/plugins/svg-icon.ts
import path from "node:path";
import process from "node:process";
import { createSvgIconsPlugin } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/i18n.ts
import path2 from "node:path";
import vueI18n from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/@intlify+unplugin-vue-i18n@4.0.0_rollup@4.20.0_vue-i18n@9.13.1_vue@3.4.36_typescript@5.5.4__/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
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
import Layouts from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.4.3_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_terser@5.31.3__v_qgrzm44a44f6nzo53tc7fdgium/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createLayouts() {
  return Layouts({
    defaultLayout: "index"
  });
}

// vite/plugins/pages.ts
import Pages from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-pages@0.32.3_@vue+compiler-sfc@3.4.36_vite@5.3.5_@types+node@22.1.0_sass@1.77.8_t_m3wc7p2nnlkehrzigy6cqsruvu/node_modules/vite-plugin-pages/dist/index.js";
function createPages() {
  return Pages({
    dirs: "src/views",
    exclude: [
      "**/components/**/*.vue"
    ]
  });
}

// vite/plugins/compression.ts
import { compression } from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/vite-plugin-compression2@1.1.3_rollup@4.20.0/node_modules/vite-plugin-compression2/dist/index.mjs";
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
import TurboConsole from "file:///C:/Users/%E5%98%89%E7%A6%B9%E6%8A%80%E6%9C%AF%E9%83%A8--3/Desktop/newProject/NewSaas/node_modules/.pnpm/unplugin-turbo-console@1.10.1_@babel+parser@7.25.3_@nuxt+kit@3.12.4_rollup@4.20.0__@nuxt+sche_oipom4fdcettnw24cocetprygu/node_modules/unplugin-turbo-console/dist/vite.mjs";
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
    base: "/",
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      // host:true,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUvcGx1Z2lucy9pbmRleC50cyIsICJ2aXRlL3BsdWdpbnMvYXBwLWluZm8udHMiLCAidml0ZS9wbHVnaW5zL2RldnRvb2xzLnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50cyIsICJ2aXRlL3BsdWdpbnMvY29tcG9uZW50cy50cyIsICJ2aXRlL3BsdWdpbnMvdW5vY3NzLnRzIiwgInZpdGUvcGx1Z2lucy9zdmctaWNvbi50cyIsICJ2aXRlL3BsdWdpbnMvaTE4bi50cyIsICJ2aXRlL3BsdWdpbnMvbW9jay50cyIsICJ2aXRlL3BsdWdpbnMvbGF5b3V0cy50cyIsICJ2aXRlL3BsdWdpbnMvcGFnZXMudHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9hcmNoaXZlci50cyIsICJ2aXRlL3BsdWdpbnMvY29uc29sZS50cyIsICJ2aXRlL3BsdWdpbnMvYmFubmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xyXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgLy8gXHU1MTY4XHU1QzQwIHNjc3MgXHU4RDQ0XHU2RTkwXHJcbiAgY29uc3Qgc2Nzc1Jlc291cmNlcyA9IFtdXHJcbiAgZnMucmVhZGRpclN5bmMoJ3NyYy9hc3NldHMvc3R5bGVzL3Jlc291cmNlcycpLmZvckVhY2goKGRpcm5hbWUpID0+IHtcclxuICAgIGlmIChmcy5zdGF0U3luYyhgc3JjL2Fzc2V0cy9zdHlsZXMvcmVzb3VyY2VzLyR7ZGlybmFtZX1gKS5pc0ZpbGUoKSkge1xyXG4gICAgICBzY3NzUmVzb3VyY2VzLnB1c2goYEB1c2UgXCJzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfVwiIGFzICo7YClcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy8nLFxyXG4gICAgLy8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1vcHRpb25zXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgLy8gaG9zdDp0cnVlLFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICBwb3J0OiA5MDAwLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgICcvcHJveHknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9BUElfQkFTRVVSTCxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogY29tbWFuZCA9PT0gJ3NlcnZlJyAmJiBlbnYuVklURV9PUEVOX1BST1hZID09PSAndHJ1ZScsXHJcbiAgICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXFwvcHJveHkvLCAnJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTY3ODRcdTVFRkFcdTkwMDlcdTk4NzkgaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy8jc2VydmVyLWZzc2VydmUtcm9vdFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiBtb2RlID09PSAncHJvZHVjdGlvbicgPyAnZGlzdCcgOiBgZGlzdC0ke21vZGV9YCxcclxuICAgICAgc291cmNlbWFwOiBlbnYuVklURV9CVUlMRF9TT1VSQ0VNQVAgPT09ICd0cnVlJyxcclxuICAgIH0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgX19TWVNURU1fSU5GT19fOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgcGtnOiB7XHJcbiAgICAgICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcclxuICAgICAgICAgIGRlcGVuZGVuY2llczogcGtnLmRlcGVuZGVuY2llcyxcclxuICAgICAgICAgIGRldkRlcGVuZGVuY2llczogcGtnLmRldkRlcGVuZGVuY2llcyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhc3RCdWlsZFRpbWU6IGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKGVudiwgY29tbWFuZCA9PT0gJ2J1aWxkJyksXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgICAgJyMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3R5cGVzJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogc2Nzc1Jlc291cmNlcy5qb2luKCcnKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcbiIsICJ7XHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiNC43LjBcIixcclxuICBcImVuZ2luZXNcIjoge1xyXG4gICAgXCJub2RlXCI6IFwiXjE4LjAuMCB8fCBeMjAuMC4wXCJcclxuICB9LFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwidGVzdFwiOiBcInZpdGUgLS1tb2RlIHRlc3RcIixcclxuICAgIFwiYnVpbGRcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGRcIixcclxuICAgIFwiYnVpbGQ6dGVzdFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgdGVzdFwiLFxyXG4gICAgXCJzZXJ2ZVwiOiBcImh0dHAtc2VydmVyIC4vZGlzdCAtb1wiLFxyXG4gICAgXCJzZXJ2ZTp0ZXN0XCI6IFwiaHR0cC1zZXJ2ZXIgLi9kaXN0LXRlc3QgLW9cIixcclxuICAgIFwic3Znb1wiOiBcInN2Z28gLWYgc3JjL2Fzc2V0cy9pY29uc1wiLFxyXG4gICAgXCJuZXdcIjogXCJwbG9wXCIsXHJcbiAgICBcImdlbmVyYXRlOmljb25zXCI6IFwiZXNubyAuL3NjcmlwdHMvZ2VuZXJhdGUuaWNvbnMudHNcIixcclxuICAgIFwibGludFwiOiBcIm5wbS1ydW4tYWxsIC1zIGxpbnQ6dHNjIGxpbnQ6ZXNsaW50IGxpbnQ6c3R5bGVsaW50XCIsXHJcbiAgICBcImxpbnQ6dHNjXCI6IFwidnVlLXRzY1wiLFxyXG4gICAgXCJsaW50OmVzbGludFwiOiBcImVzbGludCAuIC0tY2FjaGUgLS1maXhcIixcclxuICAgIFwibGludDpzdHlsZWxpbnRcIjogXCJzdHlsZWxpbnQgXFxcInNyYy8qKi8qLntjc3Msc2Nzcyx2dWV9XFxcIiAtLWNhY2hlIC0tZml4XCIsXHJcbiAgICBcInBvc3RpbnN0YWxsXCI6IFwic2ltcGxlLWdpdC1ob29rc1wiLFxyXG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiLFxyXG4gICAgXCJjb21taXRcIjogXCJnaXQgY3pcIixcclxuICAgIFwicmVsZWFzZVwiOiBcImJ1bXBwXCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIjogXCJeMi4zLjFcIixcclxuICAgIFwiQGhlYWRsZXNzdWkvdnVlXCI6IFwiXjEuNy4xOVwiLFxyXG4gICAgXCJAaW1lbmd5dS92dWUzLWNvbnRleHQtbWVudVwiOiBcIl4xLjMuOVwiLFxyXG4gICAgXCJAa2FuZ2Mvdi1tZC1lZGl0b3JcIjogXCJeMi4zLjE1XCIsXHJcbiAgICBcIkB0aW55bWNlL3RpbnltY2UtdnVlXCI6IFwiXjUuMS4xXCIsXHJcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC45LjBcIixcclxuICAgIFwiQHZ1ZXVzZS9pbnRlZ3JhdGlvbnNcIjogXCJeMTAuOS4wXCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNi44XCIsXHJcbiAgICBcImJ5dGVtZFwiOiBcIl4xLjIxLjBcIixcclxuICAgIFwiY2xpcGJvYXJkXCI6IFwiXjIuMC4xMVwiLFxyXG4gICAgXCJkYXlqc1wiOiBcIl4xLjExLjEwXCIsXHJcbiAgICBcImRlZnVcIjogXCJeNi4xLjRcIixcclxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjUuMFwiLFxyXG4gICAgXCJlbGVtZW50LXBsdXNcIjogXCJeMi42LjNcIixcclxuICAgIFwiZXJ1ZGFcIjogXCJeMy4wLjFcIixcclxuICAgIFwiZmxvYXRpbmctdnVlXCI6IFwiNS4yLjJcIixcclxuICAgIFwiZ3JhcGVzanNcIjogXCJeMC4yMS43XCIsXHJcbiAgICBcImdyYXBlc2pzLWFkdmFuY2UtY29tcG9uZW50c1wiOiBcIl4xLjAuN1wiLFxyXG4gICAgXCJncmFwZXNqcy1ibG9ja3MtYmFzaWNcIjogXCJeMS4wLjJcIixcclxuICAgIFwiZ3JhcGVzanMtcGFyc2VyLXBvc3Rjc3NcIjogXCJeMS4wLjNcIixcclxuICAgIFwiZ3JhcGVzanMtcHJlc2V0LXdlYnBhZ2VcIjogXCJeMS4wLjNcIixcclxuICAgIFwiaG90a2V5cy1qc1wiOiBcIl4zLjEzLjdcIixcclxuICAgIFwibG9kYXNoLWVzXCI6IFwiXjQuMTcuMjFcIixcclxuICAgIFwibWVkaXVtLXpvb21cIjogXCJeMS4xLjBcIixcclxuICAgIFwibWl0dFwiOiBcIl4zLjAuMVwiLFxyXG4gICAgXCJtb2NranNcIjogXCJeMS4xLjBcIixcclxuICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXHJcbiAgICBcIm92ZXJsYXlzY3JvbGxiYXJzXCI6IFwiXjIuNi4xXCIsXHJcbiAgICBcIm92ZXJsYXlzY3JvbGxiYXJzLXZ1ZVwiOiBcIl4wLjUuOFwiLFxyXG4gICAgXCJwYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjFcIixcclxuICAgIFwicGF0aC10by1yZWdleHBcIjogXCJeNi4yLjFcIixcclxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcclxuICAgIFwicGlueWluLXByb1wiOiBcIl4zLjE5LjZcIixcclxuICAgIFwicXNcIjogXCJeNi4xMi4wXCIsXHJcbiAgICBcInNjdWxlXCI6IFwiXjEuMy4wXCIsXHJcbiAgICBcInNvcnRhYmxlanNcIjogXCJeMS4xNS4yXCIsXHJcbiAgICBcInNwaW5raXRcIjogXCJeMi4wLjFcIixcclxuICAgIFwic3VydmV5LWNvcmVcIjogXCJeMS45LjEzMVwiLFxyXG4gICAgXCJzdXJ2ZXktY3JlYXRvci1jb3JlXCI6IFwiXjEuOS4xMzFcIixcclxuICAgIFwic3VydmV5LWNyZWF0b3ItdnVlXCI6IFwiXjEuOS4xMzFcIixcclxuICAgIFwic3VydmV5LXZ1ZTMtdWlcIjogXCJeMS45LjEzMVwiLFxyXG4gICAgXCJ0aW1lYWdvLmpzXCI6IFwiXjQuMC4yXCIsXHJcbiAgICBcInRpbnltY2VcIjogXCJeNy4wLjFcIixcclxuICAgIFwidi13YXZlXCI6IFwiXjIuMC4wXCIsXHJcbiAgICBcInZjb25zb2xlXCI6IFwiXjMuMTUuMVwiLFxyXG4gICAgXCJ2dWVcIjogXCJeMy40LjIxXCIsXHJcbiAgICBcInZ1ZS1jbGlwYm9hcmQzXCI6IFwiXjIuMC4wXCIsXHJcbiAgICBcInZ1ZS1pMThuXCI6IFwiXjkuMTAuMlwiLFxyXG4gICAgXCJ2dWUtanNvbnBcIjogXCJeMi4wLjBcIixcclxuICAgIFwidnVlLW0tbWVzc2FnZVwiOiBcIl40LjAuMlwiLFxyXG4gICAgXCJ2dWUtbWV0YVwiOiBcIjMuMC4wLWFscGhhLjJcIixcclxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjMuMFwiLFxyXG4gICAgXCJ2dWVkcmFnZ2FibGVcIjogXCJeNC4xLjBcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAYW50ZnUvZXNsaW50LWNvbmZpZ1wiOiBcIjIuMTEuNlwiLFxyXG4gICAgXCJAYnl0ZW1kL3BsdWdpbi1nZm1cIjogXCJeMS4yMS4wXCIsXHJcbiAgICBcIkBieXRlbWQvdnVlLW5leHRcIjogXCJeMS4yMS4wXCIsXHJcbiAgICBcIkBpY29uaWZ5L2pzb25cIjogXCJeMi4yLjE5NlwiLFxyXG4gICAgXCJAaWNvbmlmeS92dWVcIjogXCJeNC4xLjFcIixcclxuICAgIFwiQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG5cIjogXCJeNC4wLjBcIixcclxuICAgIFwiQHN0eWxpc3RpYy9zdHlsZWxpbnQtY29uZmlnXCI6IFwiXjEuMC4xXCIsXHJcbiAgICBcIkB0eXBlcy9sb2Rhc2gtZXNcIjogXCJeNC4xNy4xMlwiLFxyXG4gICAgXCJAdHlwZXMvbW9ja2pzXCI6IFwiXjEuMC4xMFwiLFxyXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXHJcbiAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjJcIixcclxuICAgIFwiQHR5cGVzL3FzXCI6IFwiXjYuOS4xNFwiLFxyXG4gICAgXCJAdHlwZXMvc29ydGFibGVqc1wiOiBcIl4xLjE1LjhcIixcclxuICAgIFwiQHVub2Nzcy9lc2xpbnQtcGx1Z2luXCI6IFwiXjAuNTguOFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1sZWdhY3lcIjogXCJeNS4zLjJcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC40XCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4xLjBcIixcclxuICAgIFwiYXJjaGl2ZXJcIjogXCJeNy4wLjFcIixcclxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcclxuICAgIFwiYm94ZW5cIjogXCJeNy4xLjFcIixcclxuICAgIFwiYnVtcHBcIjogXCJeOS40LjBcIixcclxuICAgIFwiY3otZ2l0XCI6IFwiXjEuOS4xXCIsXHJcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcclxuICAgIFwiZXNub1wiOiBcIl40LjcuMFwiLFxyXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xMS4yLjBcIixcclxuICAgIFwiaHR0cC1zZXJ2ZXJcIjogXCJeMTQuMS4xXCIsXHJcbiAgICBcImlucXVpcmVyXCI6IFwiXjkuMi4xN1wiLFxyXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjJcIixcclxuICAgIFwibnBtLXJ1bi1hbGxcIjogXCJeNC4xLjVcIixcclxuICAgIFwicGljb2NvbG9yc1wiOiBcIl4xLjAuMFwiLFxyXG4gICAgXCJwbG9wXCI6IFwiXjQuMC4xXCIsXHJcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMy4zXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS43Mi4wXCIsXHJcbiAgICBcInNpbXBsZS1naXQtaG9va3NcIjogXCJeMi4xMS4xXCIsXHJcbiAgICBcInN0eWxlbGludFwiOiBcIl4xNi4zLjFcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNlc3Mtb3JkZXJcIjogXCJeNS4wLjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC1zY3NzXCI6IFwiXjEzLjAuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkLXZ1ZVwiOiBcIl4xLjAuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtc2Nzc1wiOiBcIl42LjIuMVwiLFxyXG4gICAgXCJzdmdvXCI6IFwiXjMuMi4wXCIsXHJcbiAgICBcInRlcnNlclwiOiBcIl41LjMwLjBcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuM1wiLFxyXG4gICAgXCJ1bm9jc3NcIjogXCJeMC41OC44XCIsXHJcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTcuNVwiLFxyXG4gICAgXCJ1bnBsdWdpbi10dXJiby1jb25zb2xlXCI6IFwiXjEuNS4xXCIsXHJcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjYuMFwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi43XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjcuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjJcIjogXCJeMS4wLjBcIixcclxuICAgIFwidml0ZS1wbHVnaW4tZmFrZS1zZXJ2ZXJcIjogXCJeMi4xLjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tcGFnZXNcIjogXCJeMC4zMi4xXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiOiBcIl4yLjAuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcIjogXCJeNy4wLjI1XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1tZXRhLWxheW91dHNcIjogXCJeMC40LjJcIixcclxuICAgIFwidnVlLXRzY1wiOiBcIl4yLjAuN1wiXHJcbiAgfSxcclxuICBcImNvbmZpZ1wiOiB7XHJcbiAgICBcImNvbW1pdGl6ZW5cIjoge1xyXG4gICAgICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvY3otZ2l0XCJcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgdnVlTGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcbmltcG9ydCBhcHBJbmZvIGZyb20gJy4vYXBwLWluZm8nXG5cbmltcG9ydCBjcmVhdGVEZXZ0b29scyBmcm9tICcuL2RldnRvb2xzJ1xuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcbmltcG9ydCBjcmVhdGVDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cydcbmltcG9ydCBjcmVhdGVVbm9jc3MgZnJvbSAnLi91bm9jc3MnXG5pbXBvcnQgY3JlYXRlU3ZnSWNvbiBmcm9tICcuL3N2Zy1pY29uJ1xuaW1wb3J0IGNyZWF0ZUkxOG4gZnJvbSAnLi9pMThuJ1xuaW1wb3J0IGNyZWF0ZU1vY2sgZnJvbSAnLi9tb2NrJ1xuaW1wb3J0IGNyZWF0ZUxheW91dHMgZnJvbSAnLi9sYXlvdXRzJ1xuaW1wb3J0IGNyZWF0ZVBhZ2VzIGZyb20gJy4vcGFnZXMnXG5pbXBvcnQgY3JlYXRlQ29tcHJlc3Npb24gZnJvbSAnLi9jb21wcmVzc2lvbidcbmltcG9ydCBjcmVhdGVBcmNoaXZlciBmcm9tICcuL2FyY2hpdmVyJ1xuaW1wb3J0IGNyZWF0ZUNvbnNvbGUgZnJvbSAnLi9jb25zb2xlJ1xuaW1wb3J0IGNyZWF0ZUJhbm5lciBmcm9tICcuL2Jhbm5lcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudiwgaXNCdWlsZCA9IGZhbHNlKSB7XG4gIGNvbnN0IHZpdGVQbHVnaW5zOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPSBbXG4gICAgYXBwSW5mbygpLFxuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLFxuICAgIHZ1ZUxlZ2FjeSh7XG4gICAgICByZW5kZXJMZWdhY3lDaHVua3M6IGZhbHNlLFxuICAgICAgbW9kZXJuUG9seWZpbGxzOiBbXG4gICAgICAgICdlcy5hcnJheS5hdCcsXG4gICAgICAgICdlcy5hcnJheS5maW5kLWxhc3QnLFxuICAgICAgXSxcbiAgICB9KSxcbiAgXVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZURldnRvb2xzKHZpdGVFbnYpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUF1dG9JbXBvcnQoKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVDb21wb25lbnRzKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlVW5vY3NzKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVJMThuKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlTW9jayh2aXRlRW52LCBpc0J1aWxkKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVMYXlvdXRzKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlUGFnZXMoKSlcbiAgdml0ZVBsdWdpbnMucHVzaCguLi5jcmVhdGVDb21wcmVzc2lvbih2aXRlRW52LCBpc0J1aWxkKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVBcmNoaXZlcih2aXRlRW52KSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVDb25zb2xlKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQmFubmVyKCkpXG4gIHJldHVybiB2aXRlUGx1Z2luc1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGFwcC1pbmZvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2FwcC1pbmZvLnRzXCI7aW1wb3J0IGJveGVuIGZyb20gJ2JveGVuJ1xyXG5pbXBvcnQgcGljb2NvbG9ycyBmcm9tICdwaWNvY29sb3JzJ1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBJbmZvKCk6IFBsdWdpbiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdhcHBJbmZvJyxcclxuICAgIGFwcGx5OiAnc2VydmUnLFxyXG4gICAgYXN5bmMgYnVpbGRTdGFydCgpIHtcclxuICAgICAgY29uc3QgeyBib2xkLCBncmVlbiwgbWFnZW50YSwgYmdHcmVlbiwgdW5kZXJsaW5lIH0gPSBwaWNvY29sb3JzXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFxyXG4gICAgICAvLyAgIGJveGVuKFxyXG4gICAgICAvLyAgICAgYCR7Ym9sZChncmVlbihgXHU3NTMxICR7YmdHcmVlbignRmFudGFzdGljLWFkbWluJyl9IFx1OUE3MVx1NTJBOGApKX1cXG5cXG4ke3VuZGVybGluZSgnaHR0cHM6Ly9mYW50YXN0aWMtYWRtaW4uZ2l0ZWUuaW8nKX1cXG5cXG5cdTVGNTNcdTUyNERcdTRGN0ZcdTc1MjhcdUZGMUEke21hZ2VudGEoJ1x1NEUxM1x1NEUxQVx1NzI0OCcpfWAsXHJcbiAgICAgIC8vICAgICB7XHJcbiAgICAgIC8vICAgICAgIHBhZGRpbmc6IDEsXHJcbiAgICAgIC8vICAgICAgIG1hcmdpbjogMSxcclxuICAgICAgLy8gICAgICAgYm9yZGVyU3R5bGU6ICdkb3VibGUnLFxyXG4gICAgICAvLyAgICAgICB0ZXh0QWxpZ25tZW50OiAnY2VudGVyJyxcclxuICAgICAgLy8gICAgIH0sXHJcbiAgICAgIC8vICAgKSxcclxuICAgICAgLy8gKVxyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGRldnRvb2xzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2RldnRvb2xzLnRzXCI7aW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRGV2dG9vbHMoZW52KSB7XG4gIGNvbnN0IHsgVklURV9PUEVOX0RFVlRPT0xTIH0gPSBlbnZcbiAgcmV0dXJuIFZJVEVfT1BFTl9ERVZUT09MUyA9PT0gJ3RydWUnICYmIFZ1ZURldlRvb2xzKClcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhdXRvLWltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50c1wiO2ltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUF1dG9JbXBvcnQoKSB7XG4gIHJldHVybiBhdXRvSW1wb3J0KHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAndnVlJyxcbiAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICdwaW5pYScsXG4gICAgXSxcbiAgICBkdHM6ICcuL3NyYy90eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgZGlyczogW1xuICAgICAgJy4vc3JjL3V0aWxzL2NvbXBvc2FibGVzLyoqJyxcbiAgICBdLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGNvbXBvbmVudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvY29tcG9uZW50cy50c1wiO2ltcG9ydCBjb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudHMoKSB7XG4gIHJldHVybiBjb21wb25lbnRzKHtcbiAgICBkaXJzOiBbXG4gICAgICAnc3JjL2NvbXBvbmVudHMnLFxuICAgICAgJ3NyYy9sYXlvdXRzL3VpLWtpdCcsXG4gICAgXSxcbiAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLnRzeCQvXSxcbiAgICBkdHM6ICcuL3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHVub2Nzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy91bm9jc3MudHNcIjtpbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVbm9jc3MoKSB7XG4gIHJldHVybiBVbm9jc3MoKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTU2MDlcdTc5QjlcdTYyODBcdTY3MkZcdTkwRTgtLTNcXFxcRGVza3RvcFxcXFxuZXdQcm9qZWN0XFxcXE5ld1NhYXNcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL3N2Zy1pY29uLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkge1xuICByZXR1cm4gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zLycpXSxcbiAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZCxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpMThuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2kxOG4udHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgdnVlSTE4biBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVJMThuKCkge1xuICByZXR1cm4gdnVlSTE4bih7XG4gICAgaW5jbHVkZTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYy9sb2NhbGVzL2xhbmcvKionKSxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxtb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL21vY2sudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luRmFrZVNlcnZlciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWZha2Utc2VydmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNb2NrKGVudiwgaXNCdWlsZCkge1xuICBjb25zdCB7IFZJVEVfQlVJTERfTU9DSyB9ID0gZW52XG4gIHJldHVybiB2aXRlUGx1Z2luRmFrZVNlcnZlcih7XG4gICAgbG9nZ2VyOiAhaXNCdWlsZCxcbiAgICBpbmNsdWRlOiAnc3JjL21vY2snLFxuICAgIGluZml4TmFtZTogZmFsc2UsXG4gICAgZW5hYmxlUHJvZDogaXNCdWlsZCAmJiBWSVRFX0JVSUxEX01PQ0sgPT09ICd0cnVlJyxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxsYXlvdXRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2xheW91dHMudHNcIjtpbXBvcnQgTGF5b3V0cyBmcm9tICd2aXRlLXBsdWdpbi12dWUtbWV0YS1sYXlvdXRzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVMYXlvdXRzKCkge1xuICByZXR1cm4gTGF5b3V0cyh7XG4gICAgZGVmYXVsdExheW91dDogJ2luZGV4JyxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxwYWdlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUU1JTk4JTg5JUU3JUE2JUI5JUU2JThBJTgwJUU2JTlDJUFGJUU5JTgzJUE4LS0zL0Rlc2t0b3AvbmV3UHJvamVjdC9OZXdTYWFzL3ZpdGUvcGx1Z2lucy9wYWdlcy50c1wiO2ltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUGFnZXMoKSB7XG4gIHJldHVybiBQYWdlcyh7XG4gICAgZGlyczogJ3NyYy92aWV3cycsXG4gICAgZXhjbHVkZTogW1xuICAgICAgJyoqL2NvbXBvbmVudHMvKiovKi52dWUnLFxuICAgIF0sXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcHJlc3Npb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24udHNcIjtpbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMidcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcHJlc3Npb24oZW52LCBpc0J1aWxkKSB7XG4gIGNvbnN0IHBsdWdpbjogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW11cbiAgaWYgKGlzQnVpbGQpIHtcbiAgICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgfSA9IGVudlxuICAgIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoJywnKVxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xuICAgICAgcGx1Z2luLnB1c2goXG4gICAgICAgIGNvbXByZXNzaW9uKCksXG4gICAgICApXG4gICAgfVxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2Jyb3RsaScpKSB7XG4gICAgICBwbHVnaW4ucHVzaChcbiAgICAgICAgY29tcHJlc3Npb24oe1xuICAgICAgICAgIGV4Y2x1ZGU6IFsvXFwuKGJyKSQvLCAvXFwuKGd6KSQvXSxcbiAgICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcGx1Z2luXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXJjaGl2ZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFNSU5OCU4OSVFNyVBNiVCOSVFNiU4QSU4MCVFNiU5QyVBRiVFOSU4MyVBOC0tMy9EZXNrdG9wL25ld1Byb2plY3QvTmV3U2Fhcy92aXRlL3BsdWdpbnMvYXJjaGl2ZXIudHNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcbmltcG9ydCBhcmNoaXZlciBmcm9tICdhcmNoaXZlcidcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcblxuZnVuY3Rpb24gc2xlZXAobXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUFyY2hpdmVyKGVudik6IFBsdWdpbiB7XG4gIGNvbnN0IHsgVklURV9CVUlMRF9BUkNISVZFIH0gPSBlbnZcbiAgbGV0IG91dERpcjogc3RyaW5nXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZpdGUtcGx1Z2luLWFyY2hpdmVyJyxcbiAgICBhcHBseTogJ2J1aWxkJyxcbiAgICBjb25maWdSZXNvbHZlZChyZXNvbHZlZENvbmZpZykge1xuICAgICAgb3V0RGlyID0gcmVzb2x2ZWRDb25maWcuYnVpbGQub3V0RGlyXG4gICAgfSxcbiAgICBhc3luYyBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGlmIChbJ3ppcCcsICd0YXInXS5pbmNsdWRlcyhWSVRFX0JVSUxEX0FSQ0hJVkUpKSB7XG4gICAgICAgIGF3YWl0IHNsZWVwKDEwMDApXG4gICAgICAgIGNvbnN0IGFyY2hpdmUgPSBhcmNoaXZlcihWSVRFX0JVSUxEX0FSQ0hJVkUsIHtcbiAgICAgICAgICAuLi4oVklURV9CVUlMRF9BUkNISVZFID09PSAnemlwJyAmJiB7IHpsaWI6IHsgbGV2ZWw6IDkgfSB9KSxcbiAgICAgICAgICAuLi4oVklURV9CVUlMRF9BUkNISVZFID09PSAndGFyJyAmJiB7IGd6aXA6IHRydWUsIGd6aXBPcHRpb25zOiB7IGxldmVsOiA5IH0gfSksXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IG91dHB1dCA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGAke291dERpcn0uJHtkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERC1ISC1tbS1zcycpfS4ke1ZJVEVfQlVJTERfQVJDSElWRSA9PT0gJ3ppcCcgPyAnemlwJyA6ICd0YXIuZ3onfWApXG4gICAgICAgIGFyY2hpdmUucGlwZShvdXRwdXQpXG4gICAgICAgIGFyY2hpdmUuZGlyZWN0b3J5KG91dERpciwgZmFsc2UpXG4gICAgICAgIGFyY2hpdmUuZmluYWxpemUoKVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU1NjA5XHU3OUI5XHU2MjgwXHU2NzJGXHU5MEU4LS0zXFxcXERlc2t0b3BcXFxcbmV3UHJvamVjdFxcXFxOZXdTYWFzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb25zb2xlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2NvbnNvbGUudHNcIjtpbXBvcnQgVHVyYm9Db25zb2xlIGZyb20gJ3VucGx1Z2luLXR1cmJvLWNvbnNvbGUvdml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29uc29sZSgpIHtcbiAgcmV0dXJuIFR1cmJvQ29uc29sZSgpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1NTYwOVx1NzlCOVx1NjI4MFx1NjcyRlx1OTBFOC0tM1xcXFxEZXNrdG9wXFxcXG5ld1Byb2plY3RcXFxcTmV3U2Fhc1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYmFubmVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTUlOTglODklRTclQTYlQjklRTYlOEElODAlRTYlOUMlQUYlRTklODMlQTgtLTMvRGVza3RvcC9uZXdQcm9qZWN0L05ld1NhYXMvdml0ZS9wbHVnaW5zL2Jhbm5lci50c1wiO2ltcG9ydCBiYW5uZXIgZnJvbSAndml0ZS1wbHVnaW4tYmFubmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVCYW5uZXIoKSB7XG4gIHJldHVybiBiYW5uZXIoYFxuLyoqXG4gKiBcdTc1MzEgRmFudGFzdGljLWFkbWluIFx1NjNEMFx1NEY5Qlx1NjI4MFx1NjcyRlx1NjUyRlx1NjMwMVxuICogUG93ZXJlZCBieSBGYW50YXN0aWMtYWRtaW5cbiAqIEdpdGVlICBodHRwczovL2ZhbnRhc3RpYy1hZG1pbi5naXRlZS5pb1xuICog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QUFXLEVBQUU7QUFBQSxRQUM3QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFFBQVEsU0FBUyxlQUFlLFNBQVMsUUFBUSxJQUFJO0FBQUEsTUFDckQsV0FBVyxJQUFJLHlCQUF5QjtBQUFBLElBQzFDO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixpQkFBaUIsS0FBSyxVQUFVO0FBQUEsUUFDOUIsS0FBSztBQUFBLFVBQ0gsU0FBUyxnQkFBSTtBQUFBLFVBQ2IsY0FBYyxnQkFBSTtBQUFBLFVBQ2xCLGlCQUFpQixnQkFBSTtBQUFBLFFBQ3ZCO0FBQUEsUUFDQSxlQUFlQyxPQUFNLEVBQUUsT0FBTyxxQkFBcUI7QUFBQSxNQUNyRCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxrQkFBa0IsS0FBSyxZQUFZLE9BQU87QUFBQSxJQUNuRCxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLRCxNQUFLLFFBQVFFLG1DQUFXLEtBQUs7QUFBQSxRQUNsQyxLQUFLRixNQUFLLFFBQVFFLG1DQUFXLFdBQVc7QUFBQSxNQUMxQztBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQixjQUFjLEtBQUssRUFBRTtBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiZnMiLCAicGF0aCIsICJwcm9jZXNzIiwgImRheWpzIiwgInBhdGgiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwcm9jZXNzIiwgImZzIiwgInBhdGgiLCAiZGF5anMiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiXQp9Cg==
