<script lang="ts" setup>
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
const activeName = ref("basicSettings");
function showEdit() {
  isShow.value = true;
}
defineExpose({ showEdit });

// 使用 InstanceType 来获取 ElForm 实例的类型
const formRef = ref(null);
const form = ref<any>({});
// 注入主组件中的提供者
const localToptTab = ref<any>(props.leftTab);
</script>

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础设置" name="basicSettings">
        <ElForm ref="formRef" label-width="100px">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>基本信息</span>
              </div>
            </template>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="供应商名称" prop="supplierAccord">
                  <el-input v-model="localToptTab.supplierAccord" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属国家" prop="">
                  <el-input
                    clearable
                    v-model="localToptTab.subordinateCountryId"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商等级" prop="">
                  <el-input v-model="localToptTab.supplierLevelId"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="供应商姓名" prop="">
                  <el-input clearable v-model="localToptTab.supplierName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码" prop="name">
                  <el-input clearable v-model="localToptTab.supplierPhone" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮箱" prop="">
                  <el-input clearable v-model="localToptTab.emailAddress" />
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
            <el-row :gutter="10">
              <el-form-item label="调查系统">
                <ElSwitch
                  v-model="localToptTab.surveySystem"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              <el-form-item label="B2B">
                <ElSwitch
                  v-model="localToptTab.b2bStatus"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              <el-form-item label="B2C">
                <ElSwitch
                  v-model="localToptTab.b2cStatus"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              <el-form-item label="供应商状态">
                <ElSwitch
                  v-model="localToptTab.supplierStatus"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="关联国家">
                  <el-input v-model="localToptTab.relevanceCountryId" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关联客户">
                  <el-select v-model="localToptTab.relevanceCustomerId" />
                </el-form-item>
              </el-col>
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
                <el-form-item label="付款方式">
                  <el-select v-model="form.payMethod">
                    <el-option label="银行卡" value="bankCard"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账户名称">
                  <el-input v-model="localToptTab.accountName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款账号">
                  <el-input v-model="localToptTab.collectionAccount" />
                </el-form-item>
              </el-col>
              <!-- 当付款方式为银行卡支付时显示 银行名称 -->
              <el-col :span="8" v-if="form.payment === 'bankCard'">
                <el-form-item label="银行名称">
                  <el-input v-model="localToptTab.bankName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算周期">
                  <el-input v-model="localToptTab.settlementCycle" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </ElForm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
