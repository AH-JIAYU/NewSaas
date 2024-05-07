<script setup lang="ts">
defineOptions({
  name: "OtherFunctionsQueryIpIndex",
});
// 配置富文本
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";
const content = ref("# Fantastic-admin");
// 定义表单
const form = ref<any>({});
const activeName = ref("first");
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
];
function handleChange(v: string) {
  content.value = v;
}
function open(url: string) {
  window.open(url, "_blank");
}
const props = { multiple: true };

const options = [
  {
    value: 1,
    label: "Asia",
    children: [
      {
        value: 2,
        label: "China",
        children: [
          { value: 3, label: "Beijing" },
          { value: 4, label: "Shanghai" },
          { value: 5, label: "Hangzhou" },
        ],
      },
      {
        value: 6,
        label: "Japan",
        children: [
          { value: 7, label: "Tokyo" },
          { value: 8, label: "Osaka" },
          { value: 9, label: "Kyoto" },
        ],
      },
      {
        value: 10,
        label: "Korea",
        children: [
          { value: 11, label: "Seoul" },
          { value: 12, label: "Busan" },
          { value: 13, label: "Taegu" },
        ],
      },
    ],
  },
  {
    value: 14,
    label: "Europe",
    children: [
      {
        value: 15,
        label: "France",
        children: [
          { value: 16, label: "Paris" },
          { value: 17, label: "Marseille" },
          { value: 18, label: "Lyon" },
        ],
      },
      {
        value: 19,
        label: "UK",
        children: [
          { value: 20, label: "London" },
          { value: 21, label: "Birmingham" },
          { value: 22, label: "Manchester" },
        ],
      },
    ],
  },
  {
    value: 23,
    label: "North America",
    children: [
      {
        value: 24,
        label: "US",
        children: [
          { value: 25, label: "New York" },
          { value: 26, label: "Los Angeles" },
          { value: 27, label: "Washington" },
        ],
      },
      {
        value: 28,
        label: "Canada",
        children: [
          { value: 29, label: "Toronto" },
          { value: 30, label: "Montreal" },
          { value: 31, label: "Ottawa" },
        ],
      },
    ],
  },
];
// 开始
const ParsingEncryption = () => {};
// 查看
const check = () => {};
</script>

<template>
  <div>
    <PageMain>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="IP查询" name="first">
          <el-row :gutter="24">
            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
              <el-input
                v-model="form.a"
                placeholder="请粘贴IP (110.34.56.112)，每行一个"
                type="textarea"
                rows="30"
              />
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <div class="flex-c">
                <el-button
                  type="primary"
                  size="default"
                  @click="ParsingEncryption"
                >
                  <div
                    class="i-material-symbols-light:not-started-outline-rounded w-1.5em h-1.5em"
                  ></div>
                  开始
                </el-button>
              </div>
            </el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
              <el-input v-model="form.b" type="textarea" rows="30" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图片上传测试" name="second">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input
                v-model="form.b"
                placeholder="输入项目ID或项目名称"
                size="normal"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="default" @click="check"
                >查看</el-button
              >
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Tinymce测试" name="third">
          <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
          <Editor
            class="editor"
            :value="content"
            :plugins="plugins"
            :locale="zhHans"
            @change="handleChange"
          />
          <Viewer :value="content" />
        </el-tab-pane>
        <el-tab-pane label="测试" name="fourth">
          <el-row :gutter="20">
          <el-col :span="5">
           <el-form-item label="折叠展示Tag" size="normal">
            <el-cascader
              :options="options"
              :props="props"
              collapse-tags
              collapse-tags-tooltip
              clearable
            />
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="default" @click="">确定</el-button>
            <el-button type="primary" size="danger" @click="">确定2</el-button>
          </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.flex-c {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-button {
    margin-left: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.editor) {
  width: 100%;
}
</style>
