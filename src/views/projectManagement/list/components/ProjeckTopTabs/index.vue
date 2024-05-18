<script setup lang="ts">
defineOptions({
  name: "SurveyTopTabs",
});
// 配置富文本
import { UploadFilled } from "@element-plus/icons-vue";
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import { ref } from "vue";
const content = ref("# Fantastic-admin");
const fold = ref(true);
const form = ref<any>({
  checked1: false,
  select: [],
});
const options = ref([
  {
    value: '终端',
    label: '终端',
  },
  {
    value: '性别',
    label: '性别',
  },
  {
    value: '年龄',
    label: '年龄',
  },
])
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
];
const value = ref([4, 8]);
const activeName = ref("basicSettings");
function handleChange(v: string) {
  content.value = v;
}
function open(url: string) {
  window.open(url, "_blank");
}
const isHieght = () => {
  fold.value = !fold.value;
};
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基础设置" name="basicSettings">
      <ElForm label-width="100px" :model="form">
        <el-card body-style="" >
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="项目名称" prop="name">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目标识" prop="client_pid">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属客户" prop="client">
                <el-select placeholder="Select">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属国家" prop="currency">
                <el-cascader clearable filterable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="原价(美元)" prop="money">
                <el-input-number v-model="form.number" :min="1" :max="10" controls-position="right" size="large" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="配额" prop="quota">
                <el-input-number v-model="form.number" :min="1" :max="10" controls-position="right" size="large" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最小时长/分" prop="category">
                <el-input-number v-model="form.number" :min="1" :max="10" controls-position="right" size="large" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="IR" prop="location">
                <el-input-number v-model="form.number" :min="1" :max="10" controls-position="right" size="large" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="URL" prop="location">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.checked1">
              <el-form-item label="互斥ID" prop="location">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="填写互斥ID" prop="location">
                <el-checkbox style="top: -4px" v-model="form.checked1" size="large" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card >
          <template #header>
            <div style="display: flex; justify-content: space-between" class="card-header">
              <span>描述配额</span>
              <el-button type="primary" link size="default" @click="isHieght">{{
    fold ? "收起" : "展开"
  }}</el-button>
            </div>
          </template>
          <div v-if="fold">
            <el-form-item label="上传图片" prop="tips">
              <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple>
                <el-icon class="el-icon--upload">
                  <UploadFilled />
                </el-icon>
                <div class="el-upload__text">
                  在这里放下文件或点击 <em>上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="项目描述" prop="describes">
                  <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
                  <Editor class="editor" :value="content" :plugins="plugins" :locale="zhHans" @change="handleChange" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card >
          <template #header>
            <div class="card-header">
              <span>其他设置</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="3">
              <el-form-item label="置顶" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="在线" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="资料" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="B2B" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="定时发布" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="margin-left: -100px" prop="top">
                <el-date-picker type="datetime" placeholder="请选择时间" />
              </el-form-item>
            </el-col>
            <br />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-form-item label="备注" prop="platform">
                <el-input maxlength="200" show-word-limit style="width: 29rem" type="textarea" :rows="5" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </ElForm>
    </el-tab-pane>
    <el-tab-pane label="配置信息">
      <el-card >
        <template #header>
          <div class="card-header">配置信息</div>
        </template>
        <el-row :gutter="20">
          <!-- 等字典接口 -->
          <el-col :span="6">
            <el-form-item label="配置选择">
            <el-select v-model="form.select" multiple collapse-tags collapse-tags-tooltip placeholder="Select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          </el-col>


          <table>
            <tr>
              <th>序号</th>
              <th>配置</th>
              <th>选择</th>
            </tr>
            <tr>
              <td>1</td>
              <td>终端</td>
              <td>
                <el-form-item>
                  <el-checkbox-group>
                    <el-checkbox label="PC" value="Value A" />
                    <el-checkbox label="平板" value="Value B" />
                    <el-checkbox label="Mobile" value="Value C" />
                  </el-checkbox-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>性别</td>
              <td>
                <el-form-item>
                  <el-radio-group>
                    <el-radio value="1" size="large"> 男 </el-radio>
                    <el-radio value="2" size="large"> 女 </el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>年龄</td>
              <td>
                <el-form-item style="width: 30rem">
                  <el-slider v-model="value" range show-stops :max="100"></el-slider>
                </el-form-item>
              </td>
            </tr>
          </table>
          <!-- <div>
            <el-col :span="24">
              <el-form-item label="终端">
                <el-checkbox-group>
                  <el-checkbox label="PC" value="Value A" />
                  <el-checkbox label="平板" value="Value B" />
                  <el-checkbox label="Mobile" value="Value C" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="性别">
                <el-radio-group>
                  <el-radio value="1" size="large"> 男 </el-radio>
                  <el-radio value="2" size="large"> 女 </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </div> -->
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item style="width: 30rem" label="年龄">
              <el-slider v-model="value" range show-stops :max="100" />
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="安全信息">
      <el-card >
        <template #header>
          <div class="card-header">安全信息</div>
        </template>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="小时准入量" prop="money">
              <el-input-number v-model="form.number" :min="1" :max="10" controls-position="right" size="large" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="小时完成量" prop="money">
              <el-input-number v-model="form.number" :min="1" :max="10" controls-position="right" size="large" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="时差检测" prop="top">
              <el-switch />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="重复IP检测" prop="top">
              <el-switch />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="IP一致性检测" prop="top">
              <el-switch />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.editor) {
  width: 100%;
}

.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }
}

:deep {

  .el-input-number,
  .el-select,
  .el-select__wrapper,
  .el-input__wrapper,
  .el-cascader,
  .el-form-item__content{
    width: 100% !important;
    min-width: 10.5rem !important;
  }

  td .el-form-item {
    margin: 0;
  }

  .bytemd-body {
    height: calc(100% - 41px);
  }

  .el-input-number.is-controls-right[class*="large"] [class*="decrease"],
  .el-input-number.is-controls-right[class*="large"] [class*="increase"] {
    --el-input-number-controls-height: none;
  }

  .el-input__wrapper {
    height: 2rem;
    width: 10.75rem;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  /* 使边框合并 */
}

th,
td {
  padding: 10px;
  /* 单元格内部填充 */
  text-align: center;
  /* 文本左对齐 */
  border: 1px solid #e4e7ed;
  /* 给每个单元格添加边框 */
}

th {
  background-color: #efefef;
  /* 表头背景颜色 */
  line-height: 100%;
  font-weight: bold;
  /* 表头文字加粗 */
}

tr:hover {
  background-color: #f9f9f9;
  /* 鼠标悬停效果 */
}
</style>
