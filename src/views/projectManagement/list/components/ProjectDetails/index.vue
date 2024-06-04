<script setup lang="ts">
import { CircleCheck, Position, Select } from '@element-plus/icons-vue'
// 富文本编辑器配置
import gfm from '@bytemd/plugin-gfm'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import { ref } from 'vue'
import logDetails from '../LogDetails/index.vue'

defineOptions({
  name: 'ProjectDetails',
})

const content = ref('# Fantastic-admin')
const logDetailsRef = ref()
const active = ref(1)
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
]
function handleChange(v: string) {
  content.value = v
}
function open(url: string) {
  window.open(url, '_blank')
}
const list = [
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
]
// 详情
function details(row: any) {
  logDetailsRef.value.showEdit(row)
}
// 弹框开关变量
const dialogTableVisible = ref(false)
// 提交数据
function onSubmit() { }
function showEdit() {
  dialogTableVisible.value = true
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  dialogTableVisible.value = false
}
// 暴露方法
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible" append-to-body :close-on-click-modal="false" destroy-on-close draggable
      size="55%" title="项目详情"
    >
      <template #header>
        <el-row :gutter="20">
          <el-col :span="2" />
          <el-col :span="20">
            <el-steps style="max-width:  100%" finish-status="success" align-center :active="active">
              <el-step title="已开始" description="2021-09-09 11:11:11" :icon="Select" />
              <el-step title="已确认" description="2021-09-09 11:11:11" :icon="active >= 2 ? CircleCheck : Position" />
              <el-step title="已开票" description="2021-09-09 11:11:11" :icon="active >= 3 ? CircleCheck : Position" />
              <el-step title="已完结" description="2021-09-09 11:11:11" :icon="active >= 4 ? CircleCheck : Position" />
            </el-steps>
          </el-col>
          <el-col :span="2" />
        </el-row>
      </template>
      <ElForm label-width="100px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目ID" prop="client" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="name" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目标识" prop="client_pid" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <!-- </el-row>
          <el-row :gutter="10"> -->
            <el-col :span="8">
              <el-form-item label="所属客户" prop="client" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属国家" prop="name" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原价" prop="name" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配额" prop="name" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最小时长" prop="name" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IR" prop="name" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="URL" prop="name" style="float: left; width: 18rem;">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
                <el-button type="primary" style="margin-left: auto;">
                  复制
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>其他设置</span>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="置顶" prop="client" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="在线" prop="name" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资料" prop="name" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="B2B" prop="client" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="定时发布" prop="name" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注" prop="name" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>配置信息</span>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="终端" prop="client" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop="name" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄" prop="name" style="float: left; width: 18rem">
                <el-text class="mx-1">
                  xxxxxx
                </el-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>安全信息</span>
            </div>
          </template>
          <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="小时准入量" prop="name" style="float: left; width: 18rem">
                  <el-text class="mx-1">
                    xxxxxx
                  </el-text>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小时完成量" prop="name" style="float: left; width: 18rem">
                  <el-text class="mx-1">
                    xxxxxx
                  </el-text>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="时差检测" prop="name" style="float: left; width: 18rem">
                  <el-text class="mx-1">
                    xxxxxx
                  </el-text>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="重复IP检测" prop="name" style="float: left; width: 18rem">
                  <el-text class="mx-1">
                    xxxxxx
                  </el-text>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="IP一致性检测" prop="name" style="float: left; width: 18rem">
                  <el-text class="mx-1">
                    开
                  </el-text>
                </el-form-item>
              </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>描述及配额</span>
            </div>
          </template>
          <el-button style="padding: 0;" type="primary" text>
            UIUGF.JPF下载
          </el-button>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item prop="describes">
                <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
                <Editor class="editor" :value="content" :plugins="plugins" :locale="zhHans" @change="handleChange" />
                <Viewer :value="content" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>操作日志</span>
            </div>
          </template>
          <el-table :data="list" border style="width: 100%">
            <el-table-column align="center" type="index" width="80" label="序号" />
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
        <el-button @click="closeHandler">
          取消
        </el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
      </template>
    </el-drawer>
    <logDetails ref="logDetailsRef" />
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

:deep(.el-card) {
  margin: 10px 0;
}

:deep(.editor) {
  width: 100%;
}

table {
  width: 100%;
  /* 表格宽度设置为100% */
  border-collapse: collapse;
  /* 合并边框 */
}

th,
td {
  padding: 10px;
  /* 单元格内边距 */
  border: 1px solid #ccc;
  /* 边框 */
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
