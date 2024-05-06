<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import { ref, watch } from "vue";

const content = ref("# Fantastic-admin");
// 详情弹框变量
const dialogTableVisible = ref(false);
// 富文本编辑器
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

const list = [
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
];
const gridData = [
  { a: 1, b: "最小时长20更为30", id: 1 },
  { a: 1, b: "置顶开更为关", id: 1 },
];
function details() {
  dialogTableVisible.value = true;
}
// 弹框开关变量
const isShow = ref(false);
// 提交数据
function onSubmit() {}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  isShow.value = false;
}
defineExpose({ isShow });
</script>

<template>
  <div>
    <el-drawer
      v-model="isShow"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
      title="项目详情"
    >
      <el-dialog
        v-model="dialogTableVisible"
        style="height: 20.5rem"
        title="详情"
        width="800"
      >
        <el-divider content-position="left" />

        <el-text class="mx-1"> 操作人: 迪迦 </el-text>
        <el-text class="mx-1"> 操时间: 2024-05-21 13:14:21 </el-text>
        <el-table style="margin-top: 10px" border :data="gridData">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="150"
          />
          <el-table-column align="center" property="b" label="操作内容" />
        </el-table>
      </el-dialog>
      <template #header>
        <el-row :gutter="20">
          <el-col :span="2" />
          <el-col :span="20">
            <el-steps
              style="max-width: 100%"
              :active="1"
              finish-status="success"
              simple
            >
              <el-step title="已开始" />
              <el-step title="已确认" />
              <el-step title="已开票" />
              <el-step title="已完结" />
            </el-steps>
          </el-col>
          <el-col :span="2" />
        </el-row>
      </template>

      <!-- <el-row :gutter="20">
        <el-col :span="4">
          <div class="one">
            <div class="i-lets-icons:transfer-right-light h-10em w-10em" />
            <span class="started">已开始</span>
          </div>
        </el-col>
        <el-col :span="6" />
        <el-col :span="6" />
        <el-col :span="6" />
      </el-row> -->
      <ElForm label-width="100px" model="" rules="rules">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <!-- <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目ID" prop="client" style="float: left; width: 20rem;">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="name" style="float: left; width: 20rem;">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目标识" prop="client_pid" style="float: left; width: 20rem;">
                <el-select placeholder="Select">
                  <el-option />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="所属渠道" prop="client" style="float: left; width: 20rem;">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属国家" prop="name" style="float: left; width: 20rem;">
                <el-select placeholder="Select">
                  <el-option />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row> -->
          <table>
            <tr>
              <th>项目ID</th>
              <td>项目ID</td>
              <th>项目名称</th>
              <td>项目名称</td>
              <th>项目标识</th>
              <td>项目标识</td>
            </tr>
            <tr>
              <th>所属渠道</th>
              <td></td>
              <th>所属国家</th>
              <td></td>
              <th></th>
              <td></td>
            </tr>
          </table>
          <el-divider content-position="left" />
          <table>
            <tr>
              <th>原价(美元)</th>
              <td></td>
              <th>原价(人民币)</th>
              <td></td>
              <th>项目标识</th>
              <td>项目标识</td>
            </tr>
            <tr>
              <th>所属渠道</th>
              <td></td>
              <th>所属国家</th>
              <td></td>
              <th></th>
              <td></td>
            </tr>
          </table>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="原价(美元)"
                prop="client"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="原价(人民币)"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="配额"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="限量/h"
                prop="client"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="准入量"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="IR"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="最小时长"
                prop="client"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="互斥ID"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="URL"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="置顶"
                prop="client"
                style="float: left; width: 20rem"
              >
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="资料"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="B2B"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="信用"
                prop="client"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="定时发布"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="备注"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-divider content-position="left"> 配置信息 </el-divider>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                label="终端"
                prop="client"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="性别"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="年龄"
                prop="name"
                style="float: left; width: 20rem"
              >
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-divider content-position="left"> 描述及配额 </el-divider>
          <el-button style="margin: 25px" type="primary" text>
            UIUGF.JPF下载
          </el-button>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item prop="describes">
                <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
                <Editor
                  class="editor"
                  :value="content"
                  :plugins="plugins"
                  :locale="zhHans"
                  @change="handleChange"
                />
                <Viewer :value="content" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left"> 操作日志 </el-divider>
          <el-table :data="list" border style="width: 100%">
            <el-table-column
              align="center"
              type="index"
              width="80"
              label="序号"
            />
            <el-table-column align="center" prop="a" label="操作时间" />
            <el-table-column align="center" prop="b" label="操作人" />
            <el-table-column align="center" prop="c" label="操作事项" />
            <el-table-column align="center" prop="d" label="详情">
              <el-button text type="primary" size="default" @click="details">
                详情
              </el-button>
            </el-table-column>
          </el-table>
        </el-card>
      </ElForm>

      <template #footer>
        <el-button @click="closeHandler"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.el-step__title {
  text-align: center;
}

.one {
  position: relative;
}

.started {
  position: absolute;
  top: 49%;
  left: 7%;
  z-index: 9999;
  content: "已开通";
  transform: translate(-50%, -50%);
}

:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.editor) {
  width: 100%;
}
table {
  width: 100%; /* 表格宽度设置为100% */
  border-collapse: collapse; /* 合并边框 */
}
th,
td {
  padding: 10px; /* 单元格内边距 */
  border: 1px solid #ccc; /* 边框 */
  text-align: center;
}
th {
  width: 15%;
  font-weight: normal;
}
tr {
  width: 30%;
}
</style>
