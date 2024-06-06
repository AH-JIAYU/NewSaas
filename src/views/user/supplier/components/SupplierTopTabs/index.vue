<script lang="ts" setup>
import { ElForm } from "element-plus";
import { defineProps, ref } from "vue";
import UseUserSupplier from "@/store/modules/user_supplier"; // 供应商
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典-国家
const userSupplier = UseUserSupplier(); // 供应商
const customerStore = useUserCustomerStore(); // 客户
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典-国家
const validate = inject<any>("validateTopTabs"); //注入Ref
// 如果希望默认展示第一个 Tab
const props: any = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const formRef = ref(null);
const form = ref<any>({});
// 校验
const rules = reactive<any>({
  supplierAccord: [
    { required: true, message: "请输入供应商名称", trigger: "blur" },
    { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
  ],
  memberLevelId: [
    { required: true, message: "请选择会员等级", trigger: "change" },
  ],
  subordinateCountryId: [
    { required: true, message: "请选择国家", trigger: "change" },
  ],
  supplierLevelId: [
    { required: true, message: "请选择供应商等级", trigger: "change" },
  ],
});
// 需要用到的数据
const data = reactive<any>({
  relatedCustomers: [], // 关联客户
  payMethod: userSupplier.payMethod, // 付款方式
  countryList: [], // 国家
});

const activeName = ref("basicSettings");

onMounted(async () => {
  data.relatedCustomers = await customerStore.getCustomerList();
  data.countryList = await basicDictionaryStore.getCountry();
});
nextTick(() => {
  // 表单验证方法
  validate(formRef.value);
});
</script>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础设置" name="basicSettings">
        <ElForm
          ref="formRef"
          :rules="rules"
          :model="props.leftTab"
          label-width="100px"
        >
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
                <el-form-item label="所属国家" prop="subordinateCountryId">
                  <el-select
                    clearable
                    filterable
                    v-model="props.leftTab.subordinateCountryId"
                  >
                    <el-option
                      v-for="item in data.countryList"
                      :key="item.id"
                      :value="item.id"
                      :label="item.chineseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商等级" prop="supplierLevelId">
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
              <!--                     filterable
                    multiple
                    collapse-tags -->
              <el-col :span="8">
                <el-form-item label="关联国家">
                  <el-select
                    clearable
                    v-model="props.leftTab.relevanceCountryId"
                  >
                    <el-option
                      v-for="item in data.countryList"
                      :key="item.id"
                      :value="item.id"
                      :label="item.chineseName"
                    ></el-option>
                  </el-select>
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
@/store/modules/user_supplier
