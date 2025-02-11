<script lang="ts" setup>
import { ElForm } from "element-plus";
import { defineProps, ref } from "vue";
import edit from "@/views/configuration/supplierLevel/components/Edit/index.vue";
import UseUserSupplier from "@/store/modules/user_supplier"; // 供应商
import useConfigurationSupplierLevelStore from "@/store/modules/configuration_supplierLevel"; //供应商等级
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import api from "@/api/modules/user_supplier";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserStore from "@/store/modules/user"; // 用户汇率
import { useI18n } from "vue-i18n"; // 国际化

// 用户信息
const userStore = useUserStore();
const { t } = useI18n(); // 国际化
const userSupplier = UseUserSupplier(); // 供应商
const configurationSupplierLevelStore = useConfigurationSupplierLevelStore(); //供应商等级
const customerStore = useUserCustomerStore(); // 客户
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const validate = inject<any>("validateTopTabs"); //注入Ref
const EditRef = ref(); // 组件ref 新增/编辑
const listLoading = ref(false); // 加载
// 如果希望默认展示第一个 Tab
const props: any = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const formRef = ref(null);
const form = ref<any>({});
const typeList = [
  { label: t("supplier.new.company"), value: "company" },
  { label: t("supplier.new.personal"), value: "personal" },
];
const currencyList = [
  { label: computed(() => t("supplier.new.USD")), value: "USD" },
  { label: computed(() => t("supplier.new.CNY")), value: "CNY" },
];
// 校验
const rules = reactive<any>({
  supplierAccord: [
    {
      required: true,
      message: computed(() => t("supplier.new.enterSuppllierName")),
      trigger: "blur",
    },
    {
      min: 2,
      max: 50,
      message: computed(() => t("supplier.new.2to50")),
      trigger: "blur",
    },
  ],
  memberLevelId: [
    {
      required: true,
      message: computed(() => t("supplier.new.memberLevelSelect")),
      trigger: "change",
    },
  ],
  subordinateCountryId: [
    {
      required: true,
      message: computed(() => t("supplier.new.areaSelect")),
      trigger: "change",
    },
  ],
  supplierLevelId: [
    {
      required: true,
      message: computed(() => t("supplier.new.supplierLevelSelect")),
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: computed(() => t("supplier.new.supplierTypeSelect")),
      trigger: "change",
    },
  ],
});
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(props.leftTab.supplierPhone)) {
    callback(new Error(t("supplier.new.legalPhoneNumber")));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(props.leftTab.emailAddress)) {
    callback(new Error(t("supplier.new.legalEmail")));
  } else {
    callback();
  }
};

// 动态新增校验
const changeCountryId = (val: any) => {
  if (val) {
    props.leftTab.countryType = val === "343" ? 1 : 2;
    if (val === "343") {
      if (!props.leftTab.tenantSupplierId) {
        props.leftTab.currencyType =
          userStore.currencyType === 1 ? "USD" : "CNY";
      }
      if (rules.emailAddress) {
        delete rules.emailAddress;
      }
      rules.supplierPhone = [
        {
          required: true,
          message: computed(() => t("supplier.new.enterPhoneNumber")),
          trigger: "blur",
        },
        { validator: validatePhone, trigger: "blur" },
      ];
    } else {
      if (!props.leftTab.tenantSupplierId) {
        props.leftTab.currencyType =
          userStore.currencyType === 1 ? "USD" : "CNY";
      }
      if (rules.supplierPhone) {
        delete rules.supplierPhone;
      }
      rules.emailAddress = [
        {
          required: true,
          message: computed(() => t("supplier.new.enterEmail")),
          trigger: "blur",
        },
        { validator: validateEmail, trigger: "blur" },
      ];
    }
  }
};

// 如果没有国家制空
if (!props.leftTab.relevanceCountryIdList) {
  props.leftTab.relevanceCountryIdList = [];
} else {
  console.log(props.leftTab.relevanceCountryIdList);
}

// 初始化客户授权列表
if (!props.leftTab.relevanceCustomerIdList) {
  props.leftTab.relevanceCustomerIdList = [];
} else {
  console.log(props.leftTab.relevanceCustomerIdList);
}

// 所属区域全选
const selectAll = () => {
  props.leftTab.relevanceCountryIdList = [];
  if (data.checked) {
    data.countryList.map((item: any) => {
      props.leftTab.relevanceCountryIdList.push(item.id);
      console.log(item.id)
    });
  }
};

// 授权客户全选
const selectAllCustomer = () => {
  props.leftTab.relevanceCustomerIdList = [];
  if (data.checkedCustomer) {
    data.relatedCustomers.map((item: any) => {
      props.leftTab.relevanceCustomerIdList.push(item.tenantCustomerId);
      console.log(item.tenantCustomerId);
    });
  }
};
// 新增会员等级
const addSupplierLevel = () => {
  EditRef.value.showEdit();
};

// 反选
const changeRelevanceCountryIdList = () => {
  data.checked = Boolean(
    props.leftTab.relevanceCountryIdList.length ===
    basicDictionaryStore.country.length,
  );
};
// 授权客户反选
const changeRelevanceCustomerIdList = () => {
  data.checkedCustomer = Boolean(
    props.leftTab.relevanceCustomerIdList.length ===
    data.relatedCustomers.length,
  );
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
};
const dataList = ref<any>([]);
const userList = ref<any>([]);
const filterMethod = (query: string, item: any) => {
  // 如果 item.initial 存在，且 query 为空，则直接返回 true，表示不过滤
  if (!query) return true;
  // 对 query 和 item.initial 进行忽略大小写的比较
  return item.label && item.label.toLowerCase().includes(query.toLowerCase());
};

// 区域
const generateData = (val: any) => {
  val.forEach((city: any) => {
    dataList.value.push({
      label: city.chineseName,
      key: city.id,
      initial: city.code,
    });
  });
};

// 客户
const generateUserData = (val: any) => {
  val.forEach((user: any) => {
    userList.value.push({
      label: user.customerAccord,
      key: user.tenantCustomerId,
    });
  });
};



// 查询
const queryForm = reactive<any>({
  customerShortName: "",
  customerStatus: 2,
  antecedentQuestionnaire: null,
});

onMounted(async () => {
  // 异步数据加载
  data.relatedCustomers = await customerStore.getCustomerList();
  data.countryList = await basicDictionaryStore.getCountry();
  await getSupplierLevelList();
  // 更新 dataList
  generateData(data.countryList);
  // 更新userList
  generateUserData(data.relatedCustomers);
});
nextTick(() => {
  // 表单验证方法
  validate(formRef.value);
});
// console.log("data.relatedCustomers", data.relatedCustomers);

</script>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="t('supplier.new.basicSettings')" name="basicSettings">
        <ElForm ref="formRef" :rules="rules" :model="props.leftTab" label-width="100px"
          :validate-on-rule-change="false">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ t("supplier.new.basicInformation") }}</span>
              </div>
            </template>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.supplierType')" prop="type">
                  <el-select v-model="props.leftTab.type" value-key="" placeholder="" clearable filterable>
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.supplierAccord')" prop="supplierAccord">
                  <el-input v-model="props.leftTab.supplierAccord" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.supplierLevel')" prop="supplierLevelId">
                  <el-select clearable filterable v-model="props.leftTab.supplierLevelId">
                    <template #empty>
                      <div style="
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          padding: 0 1rem;
                        ">
                        {{ t("supplier.new.nodata") }}
                        <el-button type="primary" link size="small" @click="addSupplierLevel">
                          {{ t("supplier.new.quickAdd") }}
                          <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
                        </el-button>
                      </div>
                    </template>
                    <el-option v-for="item in data.supplierLevelList" :key="item.tenantSupplierLevelId"
                      :value="item.tenantSupplierLevelId" :label="item.levelNameOrAdditionRatio"></el-option>
                    <el-button size="small" class="buttonClass" @click="addSupplierLevel">
                      {{ t("supplier.new.quickAdd") }}
                      <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
                    </el-button>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.area')" prop="subordinateCountryId">
                  <el-select clearable filterable v-model="props.leftTab.subordinateCountryId"
                    @change="changeCountryId">
                    <el-option v-for="item in data.countryList" :key="item.id" :value="item.id"
                      :label="item.chineseName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.supplierName')">
                  <el-input clearable v-model="props.leftTab.supplierName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.supplierPhone')" prop="supplierPhone">
                  <el-input clearable v-model="props.leftTab.supplierPhone" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.emailAddress')" prop="emailAddress">
                  <el-input clearable v-model="props.leftTab.emailAddress" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="t('supplier.new.settlementCycle')">
                  <el-select v-model="props.leftTab.settlementCycle">
                    <el-option label="net 30" :value="30"></el-option>
                    <el-option label="net 60" :value="60"></el-option>
                    <el-option label="net 90" :value="90"></el-option>
                    <el-option label="net 180" :value="180"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="结算币种" prop="">
                  <el-select v-model="props.leftTab.currencyType" value-key="" :disabled="!!props.leftTab.tenantSupplierId" style="width: 22.4375rem" placeholder="请选择币种"
                    clearable filterable @change="">
                    <el-option v-for="item in currencyList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item v-if="props.leftTab.type === 'company'" :label="t('supplier.new.companyName')">
                  <el-input clearable v-model="props.leftTab.companyName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item v-if="props.leftTab.type === 'company'" :label="t('supplier.new.legalPersonName')"
                  prop="">
                  <el-input clearable v-model="props.leftTab.legalPersonName" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item v-if="props.leftTab.type === 'company'" :label="t('supplier.new.taxID')" prop="">
                  <el-input clearable v-model="props.leftTab.taxID" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ t("supplier.new.permissionInformation") }}</span>
              </div>
            </template>
            <el-row :gutter="10">
              <el-col :span="3">
                <el-form-item :label="t('supplier.new.surveySystem')">
                  <ElSwitch v-model="props.leftTab.surveySystem" inline-prompt :inactive-value="1" :active-value="2"
                    :active-text="t('common.enable')" :inactive-text="t('common.disable')" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="B2B">
                  <ElSwitch v-model="props.leftTab.b2bStatus" inline-prompt :inactive-value="1" :active-value="2"
                    :active-text="t('common.enable')" :inactive-text="t('common.disable')" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="B2C">
                  <ElSwitch v-model="props.leftTab.b2cStatus" inline-prompt :inactive-value="1" :active-value="2"
                    :active-text="t('common.enable')" :inactive-text="t('common.disable')" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item :label="t('supplier.new.surveyStatus')">
                  <ElSwitch v-model="props.leftTab.supplierStatus" inline-prompt :inactive-value="1" :active-value="2"
                    :active-text="t('common.enable')" :inactive-text="t('common.disable')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!--                     filterable
                    multiple
                    collapse-tags -->
              <el-col :span="8">
                <el-form-item>
                  <template #label>
                    <div>
                      <el-tooltip class="tooltips" placement="top">
                        <template #content>
                          <div>
                            {{ t("supplier.new.tips1") }}<br />
                            {{ t("supplier.new.example") }}
                          </div>
                        </template>
                        <SvgIcon class="SvgIcon2" name="i-ri:question-line" />
                      </el-tooltip>
                      {{ t("supplier.new.authorizationArea") }}
                    </div>
                  </template>
                  <!-- <el-select @change="changeRelevanceCountryIdList" v-model="props.leftTab.relevanceCountryIdList"
                    clearable filterable multiple collapse-tags>
                    <template #header>
                      <el-checkbox v-model="data.checked" @change="selectAll"
                        style="display: flex; height: unset">全球</el-checkbox>
                    </template>
                    <el-option v-for="item in data.countryList" :key="item.id" :value="item.id"
                      :label="item.chineseName"></el-option>
                  </el-select> -->
                  <el-transfer v-model="props.leftTab.relevanceCountryIdList" filterable :filter-method="filterMethod"
                    :filter-placeholder="t('supplier.new.enterQueryCountry')" :data="dataList" :titles="[
                      t('supplier.new.unselectedCountry'),
                      t('supplier.new.selectedCountries'),
                    ]" />
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
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item>
                  <template #label>
                    <div>
                      <el-tooltip class="tooltips" placement="top">
                        <template #content>
                          <div>
                            为供应商设定筛选条件，更精准匹配合适项目<br />
                            例：仅选中【客户1】，该供应商只能做【客户1】的项目
                          </div>
                        </template>
                        <SvgIcon class="SvgIcon2" name="i-ri:question-line" />
                      </el-tooltip>
                      授权客户
                    </div>
                  </template>
                  <el-transfer v-model="props.leftTab.relevanceCustomerIdList" filterable :filter-method="filterMethod"
                    filter-placeholder="输入查询客户" :data="userList" :titles="['已选择客户', '未选择客户']" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <!-- <el-card class="box-card">
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
          <!-- <el-col :span="8" v-if="props.leftTab.payMethod === 1">
                <el-form-item label="银行名称">
                  <el-input v-model="props.leftTab.bankName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算周期">
                  <el-select v-model="props.leftTab.settlementCycle">
                    <el-option label="net 30" :value="30"></el-option>
                    <el-option label="net 60" :value="60"></el-option>
                    <el-option label="net 90" :value="90"></el-option>
                    <el-option label="net 180" :value="180"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card> -->
        </ElForm>
      </el-tab-pane>
    </el-tabs>
    <edit ref="EditRef" @queryData="getSupplierLevelList" />
  </div>
</template>

<style scoped lang="scss">
.buttonClass {
  text-align: center;
  width: 100%;
  margin: 0.75rem;
  height: 2rem;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 500;
  font-size: 0.875rem;
  color: #409eff;
  line-height: 16px;
  background: #f4f8ff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #e9eef3;
}

/* 使按钮在下拉框展开时自适应宽度 */
.el-select-dropdown .buttonClass {
  width: calc(100% - 24px);
  /* 减去两边的 padding */
}

.el-transfer {
  display: flex;
}

:deep {
  .el-transfer__buttons {
    display: flex;
    align-items: center;
  }
}
</style>
