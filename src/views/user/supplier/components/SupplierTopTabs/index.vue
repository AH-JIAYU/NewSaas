<script lang="ts" setup>
import type { FormRules } from "element-plus";
import { ElForm } from "element-plus";

import { defineProps, ref } from "vue";
// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
});

const emit = defineEmits(["setClient"]);
const isShow = ref(false);
const isTrue = ref(true);
function showEdit() {
  isShow.value = true;
}
defineExpose({ showEdit });

// 使用 InstanceType 来获取 ElForm 实例的类型
const formRef = ref(null);
// 注入主组件中的提供者
const localToptTab = ref<any>(props.leftTab);
</script>

<template>
  <div>
    <ElForm ref="formRef" label-width="100px">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
          </div>
        </template>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item
              label="供应商名称"
              prop="name"
              style="float: left; width: 18.5rem"
            >
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="所属国家"
              prop="client_pid"
              style="float: left; width: 18.5rem"
            >
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="供应商等级"
              prop="client_pid"
              style="float: left; width: 18.5rem"
            >
              <el-select />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item
              label="供应商姓名"
              prop="client_pid"
              style="float: left; width: 18.5rem"
            >
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="手机号码"
              prop="name"
              style="float: left; width: 18.5rem"
            >
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="电子邮箱"
              prop="client_pid"
              style="float: left; width: 18.5rem"
            >
              <el-input clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>权限信息</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-form-item label="调查系统" prop="top">
            <el-switch v-model="isTrue" />
          </el-form-item>
          <el-form-item label="B2B" prop="top">
            <el-switch v-model="isTrue" />
          </el-form-item>
          <el-form-item label="B2C" prop="top">
            <el-switch v-model="isTrue" />
          </el-form-item>
          <el-form-item label="供应商状态" prop="top">
            <el-switch v-model="isTrue" />
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="关联国家" prop="top">
            <el-select />
          </el-form-item>
          <el-form-item label="关联客户" prop="top">
            <el-select />
          </el-form-item>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>财务信息</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="付款方式" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户名称" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账户" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算周期" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="付款方式" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户名称" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行名称" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算周期" prop="top">
              <el-select />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-row :gutter="20">
        <el-col :span="16" />
        <el-col :span="8">
          <el-form-item prop="platform">
            <el-button size="default" @click=""> 暂存 </el-button>
            <el-button type="primary" size="default" @click="">
              添加
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </ElForm>
  </div>
</template>
<style scoped lang="scss">
:deep {
  .el-card {
    margin: 10px 0 !important;
    box-shadow: none !important;
  }
}
</style>
