<script lang="ts" setup>
import { ElForm } from "element-plus";
import { defineProps, ref } from "vue";
import edit from "@/views/configuration/supplierLevel/components/Edit/index.vue";
import UseUserSupplier from "@/store/modules/user_supplier"; // 供应商
import useConfigurationSupplierLevelStore from "@/store/modules/configuration_supplierLevel"; //供应商等级
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典


const userSupplier = UseUserSupplier(); // 供应商
const configurationSupplierLevelStore = useConfigurationSupplierLevelStore(); //供应商等级
const customerStore = useUserCustomerStore(); // 客户
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const validate = inject<any>("validateTopTabs"); //注入Ref
const EditRef = ref(); // 组件ref 新增/编辑
// 如果希望默认展示第一个 Tab
const props: any = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const formRef = ref(null);
const form = ref<any>({});
const typeList = [
  { label: "公司", value: "company" },
  { label: "个人", value: "personal" },
];
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
    { required: true, message: "请选择区域", trigger: "change" },
  ],
  supplierLevelId: [
    { required: true, message: "请选择供应商等级", trigger: "change" },
  ],
  type: [
    { required: true, message: "请选择供应商类型", trigger: "change" },
  ],
});
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(props.leftTab.supplierPhone)) {
    callback(new Error("请输入合法手机号"));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(props.leftTab.emailAddress)) {
    callback(new Error("请输入合法邮箱"));
  } else {
    callback();
  }
};
// 动态新增校验
const changeCountryId = (val: any) => {
  if (val) {
    props.leftTab.countryType = val === "343" ? 1 : 2;
    if (val === "343") {
      if (rules.emailAddress) {
        delete rules.emailAddress;
      }
      rules.supplierPhone = [
        { required: true, message: "请输入手机号码", trigger: "blur" },
        { validator: validatePhone, trigger: "blur" },
      ];
    } else {
      if (rules.supplierPhone) {
        delete rules.supplierPhone;
      }
      rules.emailAddress = [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { validator: validateEmail, trigger: "blur" },
      ];
    }
  }
};
// 所属区域全选
const selectAll = () => {
  props.leftTab.relevanceCountryIdList = [];
  if (data.checked) {
    data.countryList.map((item: any) => {
      props.leftTab.relevanceCountryIdList.push(item.id);
    });
  }
};
// 新增会员等级
const addSupplierLevel = () => {
  EditRef.value.showEdit();
}

// 反选
const changeRelevanceCountryIdList = () => {
  data.checked = Boolean(props.leftTab.relevanceCountryIdList.length === basicDictionaryStore.country.length);
};
// 需要用到的数据
const data = reactive<any>({
  checked: false, //所属区域的全选按钮
  relatedCustomers: [], // 关联客户
  payMethod: userSupplier.payMethod, // 付款方式
  countryList: [], // 区域
  supplierLevelList: [], // 供应商等级
});

const activeName = ref("basicSettings");

const getSupplierLevelList = async () => {
  data.supplierLevelList =
    await configurationSupplierLevelStore.getLevelNameList();
  changeCountryId(props.leftTab.subordinateCountryId);
}

onMounted(async () => {
  data.relatedCustomers = await customerStore.getCustomerList();
  data.countryList = await basicDictionaryStore.getCountry();
  await getSupplierLevelList()
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
        <ElForm ref="formRef" :rules="rules" :model="props.leftTab" label-width="100px"
          :validate-on-rule-change="false">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>基本信息</span>
              </div>
            </template>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="供应商类型" prop="type">
                  <el-select v-model="props.leftTab.type" value-key="" placeholder="" clearable filterable>
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商名称" prop="supplierAccord">
                  <el-input v-model="props.leftTab.supplierAccord" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商等级" prop="supplierLevelId">
                  <el-select clearable filterable v-model="props.leftTab.supplierLevelId">
                    <template #empty>
                      <div style="display: flex;justify-content: space-between;align-items:center;padding:0 1rem;">
                        暂无数据
                        <el-button type="primary" link size="small" @click="addSupplierLevel">
                          快捷新增
                          <SvgIcon name="ant-design:plus-outlined" color="#fff"
                            style="background-color: var(--el-color-primary);border-radius: 50%;padding: 2px;margin:0 2px" />
                        </el-button>
                      </div>
                    </template>
                    <el-option v-for="item in data.supplierLevelList" :key="item.tenantSupplierLevelId"
                      :value="item.tenantSupplierLevelId" :label="item.levelNameOrAdditionRatio"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="所属区域" prop="subordinateCountryId">
                  <el-select clearable filterable v-model="props.leftTab.subordinateCountryId"
                    @change="changeCountryId">
                    <el-option v-for="item in data.countryList" :key="item.id" :value="item.id"
                      :label="item.chineseName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商姓名">
                  <el-input clearable v-model="props.leftTab.supplierName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码" prop="supplierPhone">
                  <el-input clearable v-model="props.leftTab.supplierPhone" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="电子邮箱" prop="emailAddress">
                  <el-input clearable v-model="props.leftTab.emailAddress" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-if="props.leftTab.type === 'company'" label="公司名称">
                  <el-input clearable v-model="props.leftTab.companyName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-if="props.leftTab.type === 'company'" label="法人姓名" prop="">
                  <el-input clearable v-model="props.leftTab.legalPersonName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item v-if="props.leftTab.type === 'company'" label="公司税号" prop="">
                  <el-input clearable v-model="props.leftTab.taxID" />
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
              <el-col :span="3">
                <el-form-item label="调查系统">
                  <ElSwitch v-model="props.leftTab.surveySystem" inline-prompt :inactive-value="1" :active-value="2"
                    active-text="启用" inactive-text="禁用" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="B2B">
                  <ElSwitch v-model="props.leftTab.b2bStatus" inline-prompt :inactive-value="1" :active-value="2"
                    active-text="启用" inactive-text="禁用" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="B2C">
                  <ElSwitch v-model="props.leftTab.b2cStatus" inline-prompt :inactive-value="1" :active-value="2"
                    active-text="启用" inactive-text="禁用" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="供应商状态">
                  <ElSwitch v-model="props.leftTab.supplierStatus" inline-prompt :inactive-value="1" :active-value="2"
                    active-text="启用" inactive-text="禁用" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!--                     filterable
                    multiple
                    collapse-tags -->
              <el-col :span="8">
                <el-form-item label="地区">
                  <el-select @change="changeRelevanceCountryIdList" v-model="props.leftTab.relevanceCountryIdList"
                    clearable filterable multiple collapse-tags>
                    <template #header>
                      <el-checkbox v-model="data.checked" @change="selectAll"
                        style="display: flex; height: unset">全球</el-checkbox>
                    </template>
                    <el-option v-for="item in data.countryList" :key="item.id" :value="item.id"
                      :label="item.chineseName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
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
              </el-col> -->
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
                    <el-option v-for="item in data.payMethod" :key="item.value" :label="item.label"
                      :value="item.value"></el-option>
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
              <el-col :span="8" v-if="props.leftTab.payMethod === 1">
                <el-form-item label="银行名称">
                  <el-input v-model="props.leftTab.bankName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算周期">
                  <el-select v-model="props.leftTab.settlementCycle">
                    <el-option label="net 30" :value="30"></el-option>
                    <el-option label="net 60" :value="60"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </ElForm>
      </el-tab-pane>
    </el-tabs>
    <edit ref="EditRef" @queryData="getSupplierLevelList" />
  </div>
</template>

<style scoped lang="scss"></style>
