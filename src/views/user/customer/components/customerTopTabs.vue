<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { ElForm } from 'element-plus'

import { defineProps, inject, ref } from 'vue'
// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
})

const emit = defineEmits(['setClient'])
const isShow = ref(false)
const isTrue = ref(true)
function showEdit() {
  isShow.value = true
}
defineExpose({ showEdit })

// 使用 InstanceType 来获取 ElForm 实例的类型
const formRef = ref(null)
// 注入主组件中的提供者
const localToptTab = ref<any>(props.leftTab)
</script>

<template>
  <div>
    <ElForm ref="formRef" label-width="100px" model="" rules="rules">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
          </div>
        </template>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name" style="float: left; width: 18.5rem;">
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户简称" prop="client_pid" style="float: left; width: 18.5rem;">
              <el-input clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="name" style="float: left; width: 18.5rem;">
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="client_pid" style="float: left; width: 18.5rem;">
              <el-input clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="手机号码" prop="name" style="float: left; width: 18.5rem;">
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="client_pid" style="float: left; width: 18.5rem;">
              <el-input clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="负责人" prop="money">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算周期" prop="quota">
              <el-select />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">
          权限信息
        </el-divider>
        <el-row :gutter="20">
          <el-form-item label="风险控制" prop="top">
            <el-switch v-model="isTrue" />
          </el-form-item>
        </el-row>
        <div v-if="isTrue">
          <el-row :gutter="20">
            <el-form-item label="营业限额/月" prop="top">
              <el-input clearable />
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="审核率Min值" prop="top">
              <el-input clearable />
            </el-form-item>
          </el-row>
        </div>

        <el-row :gutter="20">
          <el-form-item label="客户状态" prop="top">
            <el-switch />
          </el-form-item>
        </el-row>
        <el-divider content-position="left" />
        <el-row :gutter="20">
          <el-col :span="16" />
          <el-col :span="8">
            <el-form-item prop="platform">
              <el-button size="default" @click="">
                暂存
              </el-button>
              <el-button type="primary" size="default" @click="">
                添加
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </ElForm>
  </div>
</template>
