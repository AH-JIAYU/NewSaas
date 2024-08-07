<template>
  <el-drawer
    v-if="state.dialogFormVisible"
    v-model="state.dialogFormVisible"
    :title="state.title"
    size="80%"
    @opened="onDialogOpened"
    @close="close"
  >
    <div ref="formRef"></div>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import grapesjs from "grapesjs";
import plugin from "grapesjs-preset-webpage";
import basic from "grapesjs-blocks-basic";
// @ts-ignore
import advance from "grapesjs-advance-components";
import parserPostCSS from "grapesjs-parser-postcss";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs/dist/grapes.min.js";
// @ts-ignore
import zh from "grapesjs/locale/zh";
import api from "@/api/modules/configuration_homepageSetting";
const emits = defineEmits(["fetch-data"]);

const state = reactive<any>({
  title: "",
  dialogFormVisible: false,
  form: {},
});

const editorRef = ref<any>(null);
const formRef = ref<any>(null);

const showEdit = (row: any) => {
  state.title = "编辑";
  state.form = row;
  state.dialogFormVisible = true;
};

const onDialogOpened = async () => {
  await nextTick();
  editorRef.value = grapesjs.init({
    container: formRef.value,
    height: "900px",
    width: "100%",
    plugins: [plugin, basic, advance, parserPostCSS],
    i18n: {
      locale: "zh",
      messages: { zh },
    },

    projectData: JSON.parse(state.form.rawData || "{}"),

    storageManager: false,

    deviceManager: {
      devices: [
        { id: "desktop", name: "Desktop", width: "" },
        {
          id: "tablet",
          name: "Tablet",
          width: "768px",
          widthMedia: "992px",
        },
        {
          id: "mobilePortrait",
          name: "Mobile portrait",
          width: "320px",
          widthMedia: "575px",
        },
      ],
    },
  });
};

const save = async () => {
  const html = editorRef.value.getHtml();
  const css = editorRef.value.getCss();
  const rawData = JSON.stringify(editorRef.value.getProjectData());
  state.form = { ...state.form, html, css, rawData };
  const { status } = await api.edit(state.form);
  status === 1 &&
    ElMessage.success({
      message: "编辑成功",
      center: true,
    });
  emits("fetch-data");
  close();
};

const close = () => {
  if (editorRef.value) {
    editorRef.value.destroy();
    editorRef.value = null;
  }
  state.form = {};
  state.dialogFormVisible = false;
};
defineExpose({
  showEdit,
});
</script>

<style>
.gjs-layer-name {
  height: 20px;
}
</style>
@/api/modules/configuration_homepageSetting
