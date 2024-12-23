<script setup lang="ts">
import tinymce from "tinymce/tinymce";
// 使用该方法需要引入下面的数据
//import "tinymce/models/dom"; // 特别注意 tinymce 6.0.0 版本之后必须引入，否则不显示
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue"; // 引入组件
import "tinymce/icons/default";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink"; //锚点
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/code"; //查看源码
import "tinymce/plugins/codesample"; //插入代码
import "tinymce/plugins/directionality"; //
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/help"; //帮助
import "tinymce/plugins/image"; //图片
import "tinymce/plugins/importcss"; //图片工具
import "tinymce/plugins/insertdatetime"; //时间插入
import "tinymce/plugins/media"; //媒体插入
import "tinymce/plugins/nonbreaking"; //
import "tinymce/plugins/pagebreak"; //分页

import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/quickbars"; //快捷菜单
import "tinymce/plugins/save"; //保存
import "tinymce/plugins/searchreplace"; //查询替换

import "tinymce/plugins/wordcount"; //数字统计
import "tinymce/plugins/paste"; //粘贴
// 引入富文本编辑器主题的js和css
import "tinymce/themes/silver/theme.min.js";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
defineOptions({
  name: "UEditor",
});
// 表单筛选配置项  表单绑定值
const props: any = defineProps({
  tinymceHtml: String,
});
const tinymceHtml = ref<string>("");
const init = {
  //初始化数据
  selector: "#tinymce",
  height: 500, // 限制高度
  browser_spellcheck: false, // 禁用拼写检查
  width: "100%",
  menubar: false, // 显示菜单栏

  branding: false, // 禁用 TinyMCE 品牌标识
  paste_data_images: true, // 启用粘贴图片
  language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径
  language: "zh_CN", //语言
  // 这里设置样式，避免下拉框被遮挡
  content_css: "tinymce/skins/ui/oxide/skin.min.css",
  skin_url: "/tinymce/skins/ui/oxide",
  zIndex: 9999, // 确保下拉框的 z-index 足够高
  paste_as_text: false, // 粘贴时以纯文本形式处理

  plugins:
    "lists advlist importcss image code table advlist fullscreen link lists paste ", // 富文本插件
  fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
  font_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
  toolbar: [
    "formats undo redo  | fontselect fontsizeselect fontfamily fontsize fontname bold italic underline strikethrough  h2 h3 |ltr rtl forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist |  image | codesample | fullscreen | preview ",
  ],

  image_advtab: true, // 图像设置面板
  file_picker_types: "image", // 只允许选择图片
  toolbar_mode: "sliding", // 滑动工具栏模式
  elementpath: false, //禁用编辑器底部的状态栏
  statusbar: false, // 隐藏编辑器底部的状态栏
  setup(editor: any) {
    // 编辑器内容变更时的回调
    editor.on("change", () => {
      console.log(editor.getContent(), "text");
      tinymceHtml.value = editor.getContent(); // 更新 Vue 数据
      emits("changeEditorValue", editor.getContent());
    });
  },
  images_upload_handler: (blobInfo: any, success: any, failure: any) => {
    // 自定义图片上传处理
    // const formData = new FormData();
    // formData.append('file', blobInfo.blob());
    // fetch('/upload', {  // 替换为你自己的图片上传接口
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => success(data.location))  // 上传成功后返回图片 URL
    // .catch(error => failure('上传失败'));  // 上传失败时返回错误信息
  },
};
const emits = defineEmits<{
  (event: "changeEditorValue", val: string): void; // 富文本内容
}>();

onMounted(() => {
  tinymce.init({}); // 初始化富文本
});
</script>

<template>
  <Editor id="tinymce" v-model="tinymceHtml" :init="init" />
</template>

<style scoped lang="scss">
/* 自定义 CSS */
.tox-promotion {
  display: none !important;
}
</style>
