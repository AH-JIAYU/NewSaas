<script lang="ts" setup>
import { provide, reactive, ref } from "vue";
import LeftTabs from "../SupplierLeftTabs/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { cloneDeep } from "lodash-es";
import api from "@/api/modules/user_supplier";
import useStagedData from "@/store/modules/stagedData";
const StagedData = useStagedData(); // 暂存
import UseUserSupplier from "@/store/modules/userSupplier";
const userSupplier = UseUserSupplier();

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

async function showEdit(row: any) {
  if (!row) {
    title.value = "添加";
    leftTabsData = StagedData.usersupplier || [
      cloneDeep(userSupplier.initialTopTabsData),
    ];
  } else {
    title.value = "编辑";
    const { data } = await api.detail({
      tenantSupplierId: row.tenantSupplierId,
    });

    initializeLeftTabsData(data);
  }
  drawerisible.value = true;
}
// 清空现有数据
function initializeLeftTabsData(data: any) {
  leftTabsData.length = 0;
  // 添加主数据作为第一个 Tab
  leftTabsData.push({
    ...data,
  });
}
// 判断供应商名称是否重复
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
  StagedData.usersupplier = cloneDeep(leftTabsData);
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
}
function close() {
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
  if (title.value === "添加") {
    StagedData.usersupplier = null;
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
            addTenantSupplierInfoList: leftTabsData,
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
    // $baseMessage('请完善信息', 'error', 'hey')
    console.error("Form validation failed:", error);
  }
}
onMounted(async () => {
  userSupplier.customer = [];
  await userSupplier.getCustomerList();
});
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
      title=""
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
