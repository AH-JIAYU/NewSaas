<script lang="ts" setup>
import { ElForm } from "element-plus";
import { defineProps, ref } from "vue";
import UseUserSupplier from "@/store/modules/userSupplier";
const userSupplier = UseUserSupplier();
// 如果希望默认展示第一个 Tab
const props: any = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const emit = defineEmits(["setClient"]);
const formRef = ref(null);
const form = ref<any>({});
const isShow = ref(false);
const data = reactive<any>({
  relatedCustomers: [], // 关联客户
  payMethod: userSupplier.payMethod, // 付款方式
});
const activeName = ref("basicSettings");
function showEdit() {
  isShow.value = true;
}
onMounted(async () => {
  data.relatedCustomers = await userSupplier.getCustomerList();
});
defineExpose({ showEdit });
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
                  <el-input v-model="props.leftTab.supplierAccord" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属国家">
                  <el-input
                    clearable
                    v-model="props.leftTab.subordinateCountryId"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商等级">
                  <el-input v-model="props.leftTab.supplierLevelId"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="供应商姓名">
                  <el-input clearable v-model="props.leftTab.supplierName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input clearable v-model="props.leftTab.supplierPhone" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input clearable v-model="props.leftTab.emailAddress" />
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
                  v-model="props.leftTab.surveySystem"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              <el-form-item label="B2B">
                <ElSwitch
                  v-model="props.leftTab.b2bStatus"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              <el-form-item label="B2C">
                <ElSwitch
                  v-model="props.leftTab.b2cStatus"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              <el-form-item label="供应商状态">
                <ElSwitch
                  v-model="props.leftTab.supplierStatus"
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
                  <el-input v-model="props.leftTab.relevanceCountryId" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关联客户">
                  <el-select v-model="props.leftTab.relevanceCustomerId">
                    <el-option
                      v-for="item in data.relatedCustomers"
                      :key="item.tenantCustomerId"
                      :value="item.tenantCustomerId"
                      :label="item.customerAccord"
                    ></el-option>
                  </el-select>
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
                  <el-select v-model="props.leftTab.payMethod">
                    <el-option
                      v-for="item in data.payMethod"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账户名称">
                  <el-input v-model="props.leftTab.accountName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款账号">
                  <el-input v-model="props.leftTab.collectionAccount" />
                </el-form-item>
              </el-col>
              <!-- 当付款方式为银行卡支付时显示 银行名称 -->
              <el-col :span="8" v-if="form.payMethod === 1">
                <el-form-item label="银行名称">
                  <el-input v-model="props.leftTab.bankName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算周期">
                  <el-input v-model="props.leftTab.settlementCycle" />
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
