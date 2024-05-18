<script setup lang="ts">
defineOptions({
  name: "Edit",
});
import { ref } from "vue";
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";

const content = ref("# Fantastic-admin");
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
];

function handleChange(v: string) {
  content.value = v;
}

// 弹框开关变量
const dialogTableVisible = ref(false);
// 提交数据
function onSubmit() {}
// 获取数据
const showEdit = async (row:any) => {
  dialogTableVisible.value = true;
};
// 弹框关闭事件
function closeHandler() {
  dialogTableVisible.value = false;
}
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="编辑"
      size="60%"
      :before-close="closeHandler"
    >
      <el-form ref="form" label-width="80px" :inline="false">
        <el-form-item label="标题">
          <el-input placeholder="" clearable @change=""></el-input>
        </el-form-item>
        <el-form-item label="标题(EN)">
          <el-input placeholder="" clearable @change=""></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
          <Editor
            class="editor"
            :value="content"
            :plugins="plugins"
            :locale="zhHans"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="内容(EN)">
          <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
          <Editor
            class="editor"
            :value="content"
            :plugins="plugins"
            :locale="zhHans"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
          <el-button type="" @click="dialogTableVisible = false"> 取消 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}
:deep{
  .bytemd-body {
    height: calc(100% - 41px);
  }
}
:deep(.editor) {
  width: 100%;
}
</style>
