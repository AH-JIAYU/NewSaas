<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/group_team";
import apiDep from "@/api/modules/department";
import useDepartmentStore from "@/store/modules/department";
import useTenantStaffStore from "@/store/modules/configuration_manager";

defineOptions({
  name: "Edit",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// tree ref
const treeRef = ref<any>();
const tableRef = ref<any>();
// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 更新数据
const emits = defineEmits(["success"]);
// title
const title = ref("");
// 获取当前时间
const defaultTime = ref();
// loading
const loading = ref(false);
// 客户列表
const customerList = ref<any>([]);
// formRef
const formRef = ref();
// 弹框开关变量
const dialogTableVisible = ref(false);
// 组成员
const dataList = ref<any>([]);
// 组长
const groupLeaderList = ref<any>([]);
const department = ref<any>();
const dictionaryItem = ref<any>({
  loading: false,
  tableAutoHeight: false, // 表格是否自适应高度
  border: true, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  // 搜索
  search: {
    chineseName: "",
  },
  // 列表数据
  dataList: [],
  selectionDataList: [],
  row: "",
  dialog: {
    visible: false,
    id: "" as string | number,
    parentId: "",
    level: 1,
  },
});
const dictionary = ref({
  search: {
    chineseName: "",
  },
  tree: [],
  currentNode: undefined,
  currentData: undefined,
  dialog: {
    visible: false,
    parentId: "",
    id: "",
  },
  row: "",
  loading: false,
});
// 定义表单
const form = ref<any>({
  // 组id
  groupId: null,
  // 提成比例
  userInfo: [],
  // 树回显
  menuId: [],
});
const defaultProps: any = {
  children: "children",
  label: "name",
};
const data: any = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
];
// 个人信息校验
const formRules = ref<FormRules>({
  invoiceCode: [{ required: true, trigger: "blur", message: "请输入姓名" }],
  tenantCustomerId: [
    { required: true, trigger: "change", message: "请选择客户" },
  ],
});
// 获取数据
async function showEdit(row: any) {
  title.value = row?.id ? "编辑" : "新增";
  const listData = JSON.parse(row);
  form.value.groupId = listData.id;
  const params = {
    page: 1,
    limit: 10,
    groupId: listData.id,
  };
  const res = await api.list(params);
  console.log("res", res);
  department.value = res.data.departmentId;
  console.log("department.value", department.value);
  res.data.data.forEach((item: any) => {
    if (item.isLeader) {
      groupLeaderList.value.push(item);
    } else {
      form.value.menuId.push(item.memberId);
      dataList.value.push(item);
    }
  });
  dialogTableVisible.value = true;
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => showEdit(1));
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => showEdit(1));
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => showEdit(1));
}
onMounted(async () => {
  departmentList.value = await departmentStore.getDepartment();
  staffList.value = await tenantStaffStore.getStaff();
  // 左侧树状数据
  const ress = await apiDep.createEvery();
  departmentList.value = ress.data.result;
  defaultTime.value = new Date();
});
// 选择树
const checkChange = (val: any) => {
  // 删除重复项
  dataList.value = dataList.value.filter((item: any) => item.id !== val.id);
  const isChecked = treeRef.value.getNode(val.id).checked;
  // 如果项被选中，添加到列表中
  if (isChecked) {
    if (val.children && val.children.length) {
      val.children.forEach((item: any) => {
        if (!dataList.value.some((data: any) => data.id === item.id)) {
          dataList.value.push(item);
        }
      });
    } else {
      if (!dataList.value.some((data: any) => data.id === val.id)) {
        dataList.value.push(val);
      }
    }
  }
  syncTableSelection(dataList.value);
};

// 同步表格的勾选状态
const syncTableSelection = (val: any) => {
  const table = tableRef.value;
  if (!table) return; // 确保表格实例存在
  // table.clearSelection(); // 清除所有选中状态
  nextTick(() => {
    val.forEach((selectedItem: any) => {
      const row = dataList.value.find((row: any) => row.id === selectedItem.id);
      if (row) {
        // 使用表格的 `toggleRowSelection` 方法设置选中状态
        table.toggleRowSelection(row, true);
      }
    });
  });
};
// 提交数据
function onSubmit() {
  return new Promise<void>((resolve) => {
    //  获取选中的所有子节点
    const tree = treeRef.value.getCheckedKeys();
    // 获取所有半选的主节点
    const halltree = treeRef.value.getHalfCheckedKeys();
    // 组合一下
    const menupath = tree.concat(halltree);
    delete form.value.menuId;
    groupLeaderList.value.forEach((item: any) => {
      let obj = {
        userId: item.id,
        commission: item.commission,
      };
      form.value.userInfo.push(obj);
    });
    dataList.value.forEach((item: any) => {
      let obj = {
        userId: item.id,
        commission: item.commission,
      };
      form.value.userInfo.push(obj);
    });
    console.log("form.value", form.value);
    // return
    delete form.value.id;
    api.create(form.value).then(() => {
      ElMessage.success({
        message: "新增成功",
        center: true,
      });
      emits("success");
      dialogTableVisible.value = false;
      resolve();
    });
    // if (!form.value.id) {
    // formRef.value &&
    //   formRef.value.validate((valid: any) => {
    //     if (valid) {

    //     }
    //   });
    // } else {
    // formRef.value &&
    //   formRef.value.validate((valid: any) => {
    //     if (valid) {
    //       const data = toRaw(form.value);
    //       api.edit(data).then(() => {
    //         ElMessage.success({
    //           message: "编辑成功",
    //           center: true,
    //         });
    //         emits("success");
    //         dialogTableVisible.value = false;
    //         resolve();
    //       });
    //     }
    //   });
    // }
  });
}
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-drawer v-model="dialogTableVisible" :title="title" size="60%">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>组长</span>
          </div>
        </template>
        <el-table :data="groupLeaderList" border>
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="memberId"
            label="员工ID"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="lable"
            label="用户名"
            ><template #default="{ row }">
              <template v-if="row.memberId">
                <el-text v-for="item in staffList">
                  <el-text v-if="row.memberId === item.id">
                    {{ item.name }}
                  </el-text>
                </el-text>
              </template>
              <template v-else>
                <el-text>
                  {{ row.name }}
                </el-text>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="lable"
            label="姓名"
            ><template #default="{ row }">
              <template v-if="row.memberId">
                <el-text v-for="item in staffList">
                  <el-text v-if="row.memberId === item.id">
                    {{ item.name }}
                  </el-text>
                </el-text>
              </template>
              <template v-else>
                <el-text>
                  {{ row.name }}
                </el-text>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="lable"
            label="部门"
            ><template #default="{ row }">
              <el-text v-for="item in departmentList">
                <el-text v-if="department === item.id">
                  {{ item.name }}
                </el-text>
              </el-text>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            fixed="right"
            show-overflow-tooltip
            label="组内提成比例"
          >
            <template #default="{ row }">
              <el-input
                v-model.number="row.commission"
                placeholder="请输入提成比例"
                clearable
              >
                <template #append>%</template></el-input
              >
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="暂无数据" />
          </template>
        </el-table>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>组员</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col class="leftData" :span="8">
            {{ dataList }}
            <el-input
              v-model="form.invoiceAmount"
              placeholder="可输入关键字查找"
              clearable
            />
            <el-tree
              style="max-width: 600px; margin-top: 20px; height: 90%"
              :data="departmentList"
              ref="treeRef"
              show-checkbox
              node-key="id"
              :default-checked-keys="form.menuId"
              :default-expanded-keys="[]"
              :props="defaultProps"
              @check-change="checkChange"
            />
          </el-col>
          <el-col :span="16">
            <el-table ref="tableRef" :data="dataList" border>
              <el-table-column align="center" type="selection" />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="memberId"
                label="员工ID"
                ><template #default="{ row }">
                  <el-text v-if="row.memberId">
                    {{ row.memberId }}
                  </el-text>
                  <el-text v-else>
                    {{ row.id }}
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="name"
                label="用户名"
                ><template #default="{ row }">
                  <template v-if="row.memberId">
                    <el-text v-for="item in staffList">
                      <el-text v-if="row.memberId === item.id">
                        {{ item.name }}
                      </el-text>
                    </el-text>
                  </template>
                  <template v-else>
                    <el-text>
                      {{ row.name }}
                    </el-text>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="name"
                label="姓名"
                ><template #default="{ row }">
                  <template v-if="row.memberId">
                    <el-text v-for="item in staffList">
                      <el-text v-if="row.memberId === item.id">
                        {{ item.name }}
                      </el-text>
                    </el-text>
                  </template>
                  <template v-else>
                    <el-text>
                      {{ row.name }}
                    </el-text>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="lable"
                label="部门"
                ><template #default="{ row }">
                  <el-text v-for="item in departmentList">
                    <el-text v-if="department === item.id">
                      {{ item.name }}
                    </el-text>
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="190"
                fixed="right"
                show-overflow-tooltip
                label="提成比例"
              >
                <template #default="{ row }">
                  <el-input
                    v-model.number="row.commission"
                    placeholder="提成比例"
                    clearable
                  >
                    <template #append>%</template></el-input
                  >
                </template>
              </el-table-column>
              <template #empty>
                <el-empty description="暂无数据" />
              </template>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
      <template #footer>
        <div style="flex: auto">
          <el-button type="" @click="dialogTableVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.leftData) {
  width: 100%;
  height: 100%;
}
</style>
