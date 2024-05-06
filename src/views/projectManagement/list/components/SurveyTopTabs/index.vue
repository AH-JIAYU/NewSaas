<script setup lang="ts">
defineOptions({
  name: 'SurveyTopTabs',
})
import { UploadFilled } from '@element-plus/icons-vue'
import { Editor, Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import { ref } from 'vue'

const value = ref([4, 8])
const content = ref('# Fantastic-admin')
const activeName = ref('basicSettings')
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
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基础设置" name="basicSettings">
      <ElForm label-width="100px" model="" rules="rules">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="项目名称" prop="name" style="float: left; width: 18.5rem;">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目标识" prop="client_pid" style="float: left; width: 18.5rem;">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属客户" prop="client" style="float: left; width: 15.5rem;">
                <el-select placeholder="Select">
                  <el-option />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属国家" prop="currency" style="float: left; width: 15.5rem;">
                <el-cascader
                  clearable
                  filterable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left" />
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="原价(美元)" prop="money">
                <el-input type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="配额" prop="quota">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="限量/h" prop="ir">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="准入量" prop="loi">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="IR" prop="location">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最小时长/分" prop="category">
                <el-cascader
                  clearable
                  filterable
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="互斥ID" prop="location">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="URL" prop="location">
                <el-input clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider content-position="left" />
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
              <el-form-item prop="top">
                <el-date-picker
                  type="datetime"
                  placeholder="请选择时间"
                  shortcuts=""
                />
              </el-form-item>
            </el-col>
            <br>
          </el-row>
          <el-divider content-position="left" />
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item label="备注" prop="platform">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>描述配额</span>
            </div>
          </template>
          <el-form-item label="上传图片" prop="tips">
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
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
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="项目描述" prop="describes">
                <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
                <Editor class="editor" :value="content" :plugins="plugins" :locale="zhHans" @change="handleChange" />
                <Viewer :value="content" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </ElForm>
    </el-tab-pane>
    <el-tab-pane label="配置信息">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-checkbox-group size="small">
              <el-checkbox-button />
            </el-checkbox-group>
          </div>
        </template>
        <el-row :gutter="20">
          <div>
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
                  <el-radio value="1" size="large">
                    男
                  </el-radio>
                  <el-radio value="2" size="large">
                    女
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="年龄">
              <el-slider v-model="value" range show-stops :max="100" />
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
</style>
