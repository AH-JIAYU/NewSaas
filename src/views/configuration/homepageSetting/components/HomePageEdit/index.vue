<template>
  <el-drawer v-if="state.dialogFormVisible" v-model="state.dialogFormVisible" :title="state.title" size="80%"
    @opened="onDialogOpened" @close="close">
    <div ref="formRef"></div>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button v-if="state.title === '编辑'" type="primary" @click="save">确 定</el-button>
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
import {updataText ,customBlock} from "@/utils/homePage";
import api from "@/api/modules/configuration_homepageSetting";
const emits = defineEmits(["fetch-data"]);

const state = reactive<any>({
  title: "",
  dialogFormVisible: false,
  form: {},
});

const editorRef = ref<any>(null);
const formRef = ref<any>(null);

const showEdit = (row: any, title: any = "编辑") => {
  state.title = title;
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
    //   blockManager: {
    //   appendTo: 'basic',
    //   blocks: [
    //     {
    //       id: 'image',
    //       label: 'Image',
    //       media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    //           <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
    //       </svg>`,
    //       // Use `image` component
    //       content: { type: 'image' },
    //       // The component `image` is activatable (shows the Asset Manager).
    //       // We want to activate it once dropped in the canvas.
    //       activate: true,
    //       // select: true, // Default with `activate: true`
    //     }
    //   ],
    // }
  });
  // 通过事件改变框架的文本内容为中文
  editorRef.value.on('block:custom', (props: any) => {
    updataText(props.blocks)
  });
  // 批量添加自定义块
  customBlock.forEach((item:any)=>{
      editorRef.value.Blocks.add(item.id,  item);
  })
};

const save = async () => {
  if (state.title === "编辑") {
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
  }
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
