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
        <el-divider content-position="left"> |基本信息 </el-divider>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item
              label="会员名称"
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
          <el-col :span="8"> </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item
              label="会员姓名"
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
          <el-col :span="8">
            <el-form-item
              style="float: left; width: 18.5rem"
              label="B2B"
              prop="top"
            >
              <el-switch v-model="isTrue" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              style="float: left; width: 18.5rem"
              label="B2C"
              prop="top"
            >
              <el-switch v-model="isTrue" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              style="float: left; width: 18.5rem"
              label="会员状态"
              prop="top"
            >
              <el-switch v-model="isTrue" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="center" />
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              style="float: left; width: 18.5rem"
              label="角色"
              prop="top"
            >
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              style="float: left; width: 18.5rem"
              label="提成比例(%)"
              prop="top"
            >
              <el-select />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="免审" prop="top">
              <el-switch v-model="isTrue" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              style="float: left; width: 18.5rem"
              label="会员组"
              prop="top"
            >
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
