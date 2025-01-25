<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { provide, reactive, ref } from "vue";
import LeftTabs from "../CustomerLeftTabs/index.vue";
import api from "@/api/modules/user_customer";
import { cloneDeep } from "lodash-es";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import { useI18n } from "vue-i18n";

const stagedDataStore = useStagedDataStore(); // 暂存
const customerStore = useUserCustomerStore(); // 客户
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const title = ref<string>("");
const { t } = useI18n();
const LeftTabsRef = ref<any>(); // Ref
// 校验结果，用于在leftTabs中的tabs中给予提示
const validateAll = ref<any>([]);
// 子组件ref集合
const validateTopTabs = ref<any>([]);
// 提供的方法
function pushData(data: any) {
  validateTopTabs.value.push(data);
}
// 提供一个方法，孙组件可以使用这个方法来触发验证
provide("validateTopTabs", pushData);

let leftTabsData = reactive<any>([]); // 明确指定类型为 LeftTab[]

// 显隐
async function showEdit(row: any) {
  if (!row) {
    title.value = "新增";
    leftTabsData = stagedDataStore.userCustomer || [
      { ...customerStore.initialTopTabsData },
    ];
  } else {
    title.value = "编辑";
    const { data } = await obtainLoading(
      api.detail({
        tenantCustomerId: row.tenantCustomerId,
      }),
    );
    initializeLeftTabsData(data);
  }
  validateAll.value = [];
  drawerisible.value = true;
}
// 清空现有数据
function initializeLeftTabsData(data: any) {
  leftTabsData.length = 0;
  // 新增主数据作为第一个 Tab
  leftTabsData.push({
    ...data,
  });
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
  stagedDataStore.userCustomer = cloneDeep(leftTabsData);
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
}
// 关闭
function close() {
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
  if (title.value === "新增") {
    stagedDataStore.userCustomer = null;
  }
}
// 校验所有组件
async function validate() {
  const arr: any = [];
  validateTopTabs.value.forEach((element: any) => {
    arr.push(element.validate());
  });
  const validateResult = await Promise.allSettled(arr);
  validateAll.value = validateResult.map((item) => item.status);
}
// 确定
async function save() {
  // 校验
  await validate();
  if (validateAll.value.every((item: any) => item === "fulfilled")) {
    // 客户名称是否重复

    for (const item of leftTabsData) {
      let rateAudit = item.rateAudit;
      let turnover = item.turnover;
      // 正则匹配正整数
      const regex = /^[1-9]\d*$/;
      // 如果不符合正则，弹出警告并跳过当前项
      if (item.riskControl == 2) {
        if (!item.turnover && !item.rateAudit) {
          ElMessage.warning({
            message: "风险控制必填一项，且是正整数",
            center: true,
          });
          return;
        }
        if (item.turnover && !regex.test(turnover)) {
          ElMessage.warning({
            message: "营业限额必须是大于0的正整数",
            center: true,
          });
          return;
        }
        if (item.rateAudit && !regex.test(rateAudit)) {
          ElMessage.warning({
            message: "审核率必须是大于0的正整数",
            center: true,
          });
          return;
        }
      }
    }

    //   if ((!item.turnover && !item.rateAudit) && item.riskControl == 2) {
    //     ElMessage.warning({
    //       message: "风险控制必填一项，且是正整数",
    //       center: true,
    //     });
    //     return;
    //   }
    //   if (item.turnover || item.rateAudit) {

    //   } else {
    //     if (item.riskControl ==2 && !regex.test(turnover)) {
    //       ElMessage.warning({
    //         message: "营业限额必须是大于0的正整数",
    //         center: true,
    //       });
    //       return;
    //     }
    //     if (!regex.test(rateAudit)) {
    //       ElMessage.warning({
    //         message: "审核率必须是大于0的正整数",
    //         center: true,
    //       });
    //       return;
    //     }
    //   }
    // }

    if (!hasDuplicateCustomer(leftTabsData)) {
      if (title.value === "新增") {
        const dataList = {
          tenantCustomerInfoList: leftTabsData,
        };
        if (leftTabsData.turnover) {
          if (leftTabsData.turnover.length) {
            leftTabsData.turnover.forEach((item: any) => {
              item.turnover = item.turnover == 0 ? null : item.turnover;
            });
          }
        }
        const { status } = await submitLoading(api.create(dataList));
        status === 1 &&
          ElMessage.success({
            message: t("customerEdit.addSuccess"),
            center: true,
          });
      } else {
        // 更新接口
        if (leftTabsData[0].riskControl === 1) {
          leftTabsData[0].turnover = null;
          leftTabsData[0].rateAudit = null;
        }
        leftTabsData[0].turnover =
          leftTabsData[0].turnover == 0 ? null : leftTabsData[0].turnover;
        const { status } = await submitLoading(api.edit(leftTabsData[0]));
        status === 1 &&
          ElMessage.success({
            message: t("customerEdit.changeSuccess"),
            center: true,
          });
      }
      // 数据改变重新请求
      customerStore.customer = null;
      emit("fetch-data");

      close();
    } else {
      ElMessage.warning({
        message: t("customerEdit.sameName"),
        center: true,
      });
    }
  } else {
    // 跳转到第一个未通过校验的组件
    LeftTabsRef.value.activeLeftTab = validateAll.value.indexOf("rejected");
    ElMessage.warning({
      message: t("customerEdit.perfect"),
      center: true,
    });
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
      :class="title === '新增' ? 'hide-drawer-header' : 'edit-drawer'"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
    >
      <LeftTabs
        @validate="validate"
        ref="LeftTabsRef"
        :title="title"
        :left-tabs-data="leftTabsData"
        :validate-top-tabs="validateTopTabs"
        :validate-all="validateAll"
      />
      <template #footer>
        <div class="flex-c">
          <el-button @click="close"> {{ t("projectEdit.cancel") }} </el-button>
          <el-button v-if="title === '新增'" type="warning" @click="staging">
            {{ t("projectEdit.temporaryStorage") }}
          </el-button>
          <el-button type="primary" @click="save">
            {{ t("projectEdit.confirm") }}
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style scoped>
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
