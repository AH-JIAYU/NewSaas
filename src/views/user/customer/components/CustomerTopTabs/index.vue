<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { defineProps, ref } from 'vue'

// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
})
const emit = defineEmits(['setClient'])
const activeName = ref('basicSettings')
const form = ref({

})
const isTrue = ref(true)
function showEdit() { }
defineExpose({ showEdit })
// 使用 InstanceType 来获取 ElForm 实例的类型
const formRef = ref(null)
// 注入主组件中的提供者
const localToptTab = ref<any>(props.leftTab)
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
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="客户名称" prop="customerAccord">
                  <el-input v-model="localToptTab.customerAccord" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户简称" prop="customerShortName">
                  <el-input v-model="localToptTab.customerShortName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="localToptTab.companyName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="customerName">
                  <el-input v-model="localToptTab.customerName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号码" prop="customerPhone">
                  <el-input v-model="localToptTab.customerPhone" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱" prop="emailAddress">
                  <el-input v-model="localToptTab.emailAddress" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人" prop="chargeName">
                  <!-- <el-select v-model="localToptTab.chargeName" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结算周期" prop="settlementCycle">
                  <!-- <el-select v-model="localToptTab.settlementCycle" /> -->
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
            <el-row :gutter="24">
              <el-col :span="3">
                <el-form-item label="客户状态" prop="top">
                  <el-switch v-model="localToptTab.customerStatus" :active-value="1" :inactive-value="2" inline-prompt active-text="开启" inactive-text="关闭" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="前置问卷" prop="top">
                  <el-switch v-model="localToptTab.antecedentQuestionnaire" :active-value="1" :inactive-value="2" inline-prompt active-text="开启" inactive-text="关闭" />
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="风险控制" prop="top">
                  <el-switch v-model="localToptTab.riskControl" :active-value="1" :inactive-value="2" inline-prompt active-text="开启" inactive-text="关闭" />
                </el-form-item>
              </el-col>
              <el-col v-if="isTrue" :span="12">
                <el-form-item label="营业限额/月" prop="top">
                  <el-input v-model.number="localToptTab.turnover" clearable />
                </el-form-item>
              </el-col>
              <el-col v-if="isTrue" :span="12">
                <el-form-item label="审核率Min值" prop="top">
                  <el-input v-model.number="localToptTab.rateAudit" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </ElForm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0 !important;
  }

  .el-row {
    width: 94% !important;
    margin: auto !important;
  }
}
</style>
