<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { provide, reactive, ref } from "vue";
import LeftTabs from "../CustomerLeftTabs/index.vue";
import api from "@/api/modules/user_customer";
import useStagedData from "@/store/modules/stagedData";
import { cloneDeep } from "lodash-es";
const StagedData = useStagedData(); // 暂存

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const title = ref<string>("");
// const { surveyconfig } = useAclStore()
const validateTopTabs = ref<any>([]);
function pushData(data: any) {
  validateTopTabs.value.push(data);
}
// 提供一个方法，孙组件可以使用这个方法来触发验证
provide("validateTopTabs", pushData);

let leftTabsData = reactive<any>([]); // 明确指定类型为 LeftTab[]
const initLeftData = [
  {
    customerAccord: "客户名称", //客户名称
    customerShortName: "", //客户简称
    companyName: "", //公司名称
    customerName: "", //客户姓名
    customerPhone: "", //手机号码
    emailAddress: "", //电子邮箱
    chargeName: "", //负责人
    settlementCycle: null, //结算周期
    customerStatus: null, //客户状态
    antecedentQuestionnaire: null, //前置问卷
    riskControl: null, //风险控制
    turnover: null, //营业限额
    rateAudit: null, //审核Min值
    // currency: surveyconfig.currency,
    // platform: {},
    // screen: {},
    // security: {},
  },
];
async function showEdit(row: any) {
  if (!row) {
    title.value = "添加";
    leftTabsData = StagedData.userCustomer || cloneDeep(initLeftData);
  } else {
    title.value = "编辑";
    // initializeLeftTabsData(row);
    const { data } = await api.detail({
      tenantCustomerId: row.tenantCustomerId,
    });
    initializeLeftTabsData(data);
  }
  drawerisible.value = true;
}

function initializeLeftTabsData(data: any) {
  // 清空现有数据
  leftTabsData.length = 0;
  // 添加主数据作为第一个 Tab
  leftTabsData.push({
    ...data,
  });

  // 如果存在 children，为每个 child 创建一个 Tab
  if (data.children && data.children.length) {
    data.children.forEach((child: any) => {
      leftTabsData.push({
        ...child,
      });
    });
  }
}
// 判断客户名称是否重复
function hasDuplicateCustomer(customers: any) {
  const seen = new Set();
  for (const customer of customers) {
    if (seen.has(customer.customerAccord)) {
      return true; // 如果已经存在，则表示有重复
    }
    seen.add(customer.customerAccord);
  }
  return false; // 如果没有重复，则返回false
}
// 暂存
function staging() {
  StagedData.userCustomer = cloneDeep(leftTabsData);
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
}
function close() {
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
  if (title.value === "添加") {
    StagedData.userCustomer = null;
  }
}

async function save() {
  const arr: any = [];
  validateTopTabs.value.forEach((element: any) => {
    arr.push(element.validate());
  });
  try {
    // 实现全部校验  validateTopTabs为数组，每个元素为子组件的ref
    const ispass = (await Promise.all(arr)).every((item: any) => item);
    if (ispass) {
      // 客户名称是否重复
      if (!hasDuplicateCustomer(leftTabsData)) {
        if (title.value === "添加") {
          const dataList = {
            tenantCustomerInfoList: leftTabsData,
          };
          const { status } = await api.create(dataList);
          status === 1 &&
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
        } else {
          // // 更新接口
          const { status } = await api.edit(leftTabsData[0]);
          status === 1 &&
            ElMessage.success({
              message: "修改成功",
              center: true,
            });
        }
        emit("fetch-data");
        close();
      } else {
        ElMessage.warning({
          message: "客户名称重复",
          center: true,
        });
      }
    }
  } catch (error) {
    console.error("Form validation failed:", error);
  }
}
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-drawer
      v-model="drawerisible"
      class="hide-drawer-header"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
    >
      <LeftTabs
        :title="title"
        :left-tabs-data="leftTabsData"
        :validate-top-tabs="validateTopTabs"
      />
      <template #footer>
        <el-button @click="close"> 取消 </el-button>
        <el-button v-if="title === '添加'" type="warning" @click="staging">
          暂存
        </el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </template>
    </el-drawer>
  </div>
</template>
