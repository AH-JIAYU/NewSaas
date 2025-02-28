<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" v-model="tinymceHtml" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <!-- <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" /> -->
    </div>
  </div>
</template>


<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
} from "vue";
import { ElMessage } from "element-plus";
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";
import apiQinliu from "@/api/modules/file";
// const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
let tinymceCDN = window.location.origin  + '/public/tinymce/tinymce.min.js';

const tinymceHtml = ref<any>("");

// Props
const props = defineProps({
  tinymceHtml: {
    type: String,
  },
  id: {
    type: String,
    default: () =>
      "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""),
  },
  value: {
    type: String,
    default: "",
  },
  toolbar: {
    type: Array,
    default: () => [],
  },
  menubar: {
    type: String,
    default: "file edit insert view format table",
  },
  height: {
    type: [Number, String],
    default: 360,
  },
  width: {
    type: [Number, String],
    default: "auto",
  },
});
if (props) {
  tinymceHtml.value = props.tinymceHtml;
}
// Refs
const tinymceId = props.id;
const fullscreen = ref(false);
const hasChange = ref(false);
const hasInit = ref(false);
const languageTypeList = {
  en: "en",
  zh: "zh_CN",
  es: "es_MX",
  ja: "ja",
};

// Computed properties
const containerWidth = computed(() => {
  const width: any = props.width;
  return /^[\d]+(\.[\d]+)?$/.test(width) ? `${width}px` : width;
});

// Emits
const emits = defineEmits<{
  (event: "changeEditorValue", val: string): void;
}>();

// Init TinyMCE editor
// @ts-nocheck
const initTinymce = () => {
  // @ts-ignore
  window.tinymce.init({
    selector: `#${tinymceId}`,
    language: languageTypeList["zh"],
    height: props.height,
    body_class: "panel-body ",
    object_resizing: false,
    branding: false, // 禁用 TinyMCE 品牌标识
    paste_data_images: true, // 启用粘贴图片
    toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
    menubar: props.menubar,
    plugins: plugins,
    end_container_on_empty_block: true,
    powerpaste_word_import: "clean",
    code_dialog_height: 450,
    code_dialog_width: 1000,
    advlist_bullet_styles: "square",
    advlist_number_styles: "default",
    imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
    default_link_target: "_blank",
    link_title: false,
    nonbreaking_force_tab: true,
    fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
    font_formats:
      "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
    init_instance_callback(editor: any) {
      if (props.value) {
        editor.setContent(props.value);
      }
      hasInit.value = true;

      // Update Vue data when editor content changes
      editor.on("change", () => {
        const content = editor.getContent();
        tinymceHtml.value = content;
        emits("changeEditorValue", content); // Emit the updated content
      });
    },
    images_upload_handler: (
      blobInfo: any,
      success: any,
      failure: any,
      progress: any
    ) => {
      const file = blobInfo.blob(); // 得到图片的file对象；
      // 限制上传文件的大小为200M
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > MAX_SIZE) {
        ElMessage({
          message: "上传文件大小不得超过200M 当前文件" + 10 + "MB ",
          type: "error",
          duration: 5 * 1000,
        });
        return false;
      } else {
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append("file", file);
        apiQinliu
          .upload(formData)
          .then((res: any) => {
            if (res && res.data?.qiNiuUrl) {
              //根据图片名，
              apiQinliu.detail({fileName:res.data?.qiNiuUrl}).then((res1:any) => {
                if (res1 && res1.data?.fileUrl){
                  success(res1.data.fileUrl); // 返回上传成功的图片 URL
                }
              })

            } else {
              failure("上传失败"); // 上传失败时的提示
            }
          })
          .catch((error: any) => {
            failure("上传失败: " + error.error);
          });
      }
    },
    setup(editor: any) {
      editor.on("FullscreenStateChanged", (e: any) => {
        fullscreen.value = e.state;
      });
    },
    // convert_urls: false,
  });
};

// Initialize TinyMCE after CDN is loaded
const init = () => {
  load(tinymceCDN, (err: any) => {
    if (err) {
      return;
    }
    initTinymce();
  });
};

// Watch for `props.value` changes and sync with TinyMCE
watch(
  () => props.value,
  (newVal) => {
    if (newVal !== tinymceHtml.value && hasInit.value) {
      // @ts-ignore
      const tinymce = window.tinymce.get(tinymceId);
      if (tinymce) {
        tinymce.setContent(newVal);
      }
    }
  }
);

// Lifecycle hooks
onMounted(() => {
  init();
});

onActivated(() => {
  if (!hasInit.value) {
    initTinymce();
  }
});
</script>


<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
