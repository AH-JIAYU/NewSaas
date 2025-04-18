<script lang="ts" setup>
import { provide, reactive, ref } from "vue";
import LeftTabs from "../SupplierLeftTabs/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { cloneDeep } from "lodash-es";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/user_supplier";
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import useUserSupplierStore from "@/store/modules/user_supplier"; // 供应商
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
const stagedDataStore = useStagedDataStore(); // 暂存
const supplierStore = useUserSupplierStore(); // 供应商
const customerStore = useUserCustomerStore(); // 客户

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const title = ref<string>("");
const LeftTabsRef = ref<any>(); // Ref
// 校验结果，用于在leftTabs中的tabs中给予提示
const validateAll = ref<any>([]);
const validateTopTabs = ref<any>([]);
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
    leftTabsData = stagedDataStore.usersupplier || [
      cloneDeep(supplierStore.initialTopTabsData),
    ];
  } else {
    title.value = "编辑";
    const { data } = await obtainLoading(
      api.detail({
        tenantSupplierId: row.tenantSupplierId,
      })
    );
    data.countryType = data.subordinateCountryId === "343" ? 1 : 2;
    initializeLeftTabsData(data);
  }
  validateAll.value = [];
  drawerisible.value = true;
  supplierStore.TenantSupplierList = null;
}
// 清空现有数据
function initializeLeftTabsData(data: any) {
  leftTabsData.length = 0;
  // 新增主数据作为第一个 Tab
  leftTabsData.push({
    ...data,
  });
}
// 判断供应商名称是否重复
function hasDuplicateCustomer(customers: any) {
  const seen = new Set();
  for (const customer of customers) {
    if (seen.has(customer.supplierAccord)) {
      return true; // 如果已经存在，则表示有重复
    }
    seen.add(customer.supplierAccord);
  }
  return false; // 如果没有重复，则返回false
}
// 暂存
function staging() {
  stagedDataStore.usersupplier = cloneDeep(leftTabsData);
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
    stagedDataStore.usersupplier = null;
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
  //删除财务信息，payMethod，accountName，collectionAccount，bankName，
  leftTabsData.forEach((item: any) => {
    delete item.payMethod;
    delete item.accountName;
    delete item.collectionAccount;
    delete item.bankName;
  });

  await validate();
  if (validateAll.value.every((item: any) => item === "fulfilled")) {
    // // 客户名称是否重复
    if (!hasDuplicateCustomer(leftTabsData)) {
      if (title.value === "新增") {
        const dataList = {
          addTenantSupplierInfoList: leftTabsData,
        };
        const { status } = await submitLoading(api.create(dataList));
        status === 1 && console.log("传入的客户", dataList);
        ElMessage.success({
          message: "新增成功",
          center: true,
        });
      } else {
        // // 更新接口
        delete leftTabsData[0].getTenantCustomerOperationInfosList;
        console.log(leftTabsData[0].updateTenantSupplierCustomerInfoList);

        const { status } = await submitLoading(api.edit(leftTabsData[0]));

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
        message: "供应商名称重复",
        center: true,
      });
    }
  } else {
    // 跳转到第一个未通过校验的组件
    LeftTabsRef.value.activeLeftTab = validateAll.value.indexOf("rejected");
    ElMessage.warning({
      message: "请完善表单",
      center: true,
    });
  }
}
onMounted(async () => {
  await customerStore.getCustomerList();
  let id: any = [];
  const res = await api.getCustomerCooperation({ customerId: id });
});
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
      title=""
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
          <el-button @click="close"> 取消 </el-button>
          <el-button v-if="title === '新增'" type="warning" @click="staging">
            暂存
          </el-button>
          <el-button type="primary" @click="save"> 确定 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style scoped lang="scss">
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
