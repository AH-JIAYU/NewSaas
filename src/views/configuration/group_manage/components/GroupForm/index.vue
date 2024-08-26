<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/group_team";
import apiDep from "@/api/modules/department";
import useDepartmentStore from "@/store/modules/department";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import usePositionManageStore from "@/store/modules/position_manage";

defineOptions({
  name: "Edit",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// tree ref
const treeRef = ref<any>();
// tableRef
const tableRef = ref<any>();
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
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
// 部门id
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
// 搜索
const userName = ref<any>(null)
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
  // disabled : "distribution",
};
// 个人信息校验
const formRules = ref<FormRules>({
  commission: [
    {
      validator: (rule, value, callback) => {
        const regex = /^[0-9]*[.]?[0-9]+$/;
        if (regex.test(value)) {
          callback();
        } else {
          callback(new Error('请输入有效的数字或小数'));
        }
      },
      trigger: 'blur',
    },
  ],
});
// 获取数据
async function showEdit(row: any) {
  try {
    loading.value = true;
    title.value = row?.id ? "编辑" : "新增";
    const listData = JSON.parse(row);
    form.value.groupId = listData.id;
    // 部门id
    department.value = listData.departmentId
    const params = {
      page: 1,
      limit: 10,
      groupId: listData.id,
    };
    // 获取组长信息
    const res = await api.list(params);
    if (res?.data.data) {
      res.data.data.forEach((item: any) => {
        form.value?.menuId?.push(item.id);
        dataList.value.push(item);
      });
    }
    // 左侧树状数据
    const ress = await apiDep.createEvery();
    departmentList.value = ress.data.result;
    // 筛选需要的数据
    departmentList.value = departmentList.value.filter((departments: any) => departments.id === department.value)
    loading.value = false;
    dialogTableVisible.value = true;
  } catch (error) {

  } finally {
    loading.value = false;
  }
}
const blurUserName = () => {
  if (userName) {
    dataList.value = departmentList.value[0].children.filter((item: any) => item.userName.includes(userName.value))
  }
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
  // 职位
  positionManageList.value = await usePositionManage?.getPositionManage() || [];
  // 部门
  departmentList.value = await departmentStore.getDepartment();
  // 用户
  staffList.value = await tenantStaffStore.getStaff();
  defaultTime.value = new Date();
});

// 移除具有相同 id 的项
function removeFromList(list: any[], id: any) {
  const index = list.findIndex((item: any) => item.memberId === id);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

// 添加项到列表中
function addToList(list: any[], item: any) {
  if (!list.some((data: any) => data.id === item.id)) {
    list.push(item);
  }
}

// 选择树
function checkChange(val: any) {
  // 处理当前项的选择状态
  dataList.value = dataList.value.filter((item: any) => item.id !== val.id);
  // 是否选中
  const isChecked = treeRef.value.getNode(val.id).checked;
  if (isChecked) {
    if (val.children && val.children.length) {
      val.children.forEach((item: any) => addToList(dataList.value, item));
    } else {
      addToList(dataList.value, val);
    }
  } else {
    if (val.children && val.children.length) {
      val.children.forEach((item: any) => removeFromList(dataList.value, item.id));
    } else {
      removeFromList(dataList.value, val.id);
    }
  }
  // syncTableSelection(dataList.value);
}

// 同步表格的勾选状态
// const syncTableSelection = (val: any) => {
//   const table = tableRef.value;
//   if (!table) return; // 确保表格实例存在
//   table.clearSelection(); // 清除所有选中状态
//   nextTick(() => {
//     val.forEach((selectedItem: any) => {
//       const row = dataList.value.find((row: any) => row.id === selectedItem.id);
//       if (row) {
//         // 使用表格的 `toggleRowSelection` 方法设置选中状态
//         table.toggleRowSelection(row, true);
//       }
//     });
//   });
// };
// 提交数据
function onSubmit() {
  return new Promise<void>((resolve) => {
    formRef.value &&
      formRef.value.validate((valid: any) => {
        if (valid) {
          try {
            loading.value = true;
            form.value.userInfo = []
            delete form.value.menuId;
            let number: any = 0
            groupLeaderList.value.forEach((item: any) => {
              if (item.commission) {
                number += item.commission
              }
              let obj = {
                userId: item.memberId,
                commission: item.commission,
              };
              form.value.userInfo.push(obj);
            });
            dataList.value.forEach((item: any) => {
              if (item.commission) {
                number += item.commission
              }
              let obj
              if (item.memberId) {
                obj = {
                  userId: item.memberId,
                  commission: item.commission,
                };
              } else {
                obj = {
                  userId: item.id,
                  commission: item.commission,
                };
              }
              form.value.userInfo.push(obj);
            });
            // 使用 Set 来存储已见的 userId
            const seenUserIds = new Set();
            form.value.userInfo = form.value.userInfo.filter((user: any) => {
              const { userId } = user;
              if (seenUserIds.has(userId)) {
                // 如果 userId 已存在，过滤掉该条记录
                return false;
              }
              // 如果 userId 未存在，添加到 Set 中
              seenUserIds.add(userId);
              // 保留该条记录
              return true;
            })
            if (number > 100) {
              ElMessage.warning({
                message: "提成比例不能超过100",
                center: true,
              });
              return
            }
            api.edit(form.value).then(() => {
              loading.value = false;
              ElMessage.success({
                message: "操作成功",
                center: true,
              });
              emits("success");
              dialogTableVisible.value = false;
              resolve();
            });
          } catch (error) {

          } finally {
            loading.value = false;
          }
        }
      });
  });
}
// 重置表单
const handleClose = () => {
  Object.assign(form.value, {
    // 组id
    groupId: null,
    // 提成比例
    userInfo: [],
    // 树回显
    menuId: [],
  })
  groupLeaderList.value = []
  dataList.value = []
}
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-drawer v-model="dialogTableVisible" :title="title" @close="handleClose" size="60%">
      <!-- <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>组长</span>
          </div>
        </template>
<el-table :data="groupLeaderList" border>
  <el-table-column align="center" type="index" label="序号" width="80" />
  <el-table-column align="center" show-overflow-tooltip prop="memberId" label="员工ID" />
  <el-table-column align="center" show-overflow-tooltip prop="lable" label="用户名"><template #default="{ row }">
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
  <el-table-column align="center" show-overflow-tooltip prop="lable" label="姓名"><template #default="{ row }">
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
  <el-table-column align="center" show-overflow-tooltip prop="lable" label="部门"><template #default="{ row }">
              <el-text v-for="item in departmentList">
                <el-text v-if="department === item.id">
                  {{ item.name }}
                </el-text>
              </el-text>
            </template>
  </el-table-column>
  <el-table-column align="center" width="200" fixed="right" show-overflow-tooltip label="提成比例">
    <template #default="{ row }">
              <el-form :model="row" ref="formRef" :rules="formRules">
                <el-form-item prop="commission">
                  <el-input v-model.number="row.commission" placeholder="请输入提成比例" clearable>
                    <template #append>%</template></el-input>
    </el-form-item>
    </el-form>
    </template>
  </el-table-column>
  <template #empty>
            <el-empty description="暂无数据" />
          </template>
</el-table>
</el-card> -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>组成员</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col class="leftData" :span="8">
            <el-input v-model="userName" placeholder="可输入用户名查找" clearable @blur="blurUserName" />
            <el-tree style="max-width: 37.5rem; min-height: 20.125rem; margin-top: 20px;" :data="departmentList"
              ref="treeRef" show-checkbox node-key="id" :default-checked-keys="form.menuId"
              :default-expanded-keys="form.menuId" default-expand-all :props="defaultProps" @check="checkChange" />
          </el-col>
          <el-col :span="16">
            <el-table ref="tableRef" :data="dataList" border>
              <!-- <el-table-column align="center" type="selection" /> -->
              <el-table-column align="center" show-overflow-tooltip prop="memberId" label="员工ID"><template
                  #default="{ row }">
                  <el-text v-if="row.id">
                    {{ row.id }}
                  </el-text>
                  <el-text v-else>
                    {{ row.id }}
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="userName" label="用户名"><template
                  #default="{ row }">
                  <template v-if="row.id">
                    <el-text v-for="item in staffList">
                      <el-text v-if="row.id === item.id">
                        {{ item.name }}
                      </el-text>
                    </el-text>
                  </template>
                  <template v-else>
                    <el-text>
                      {{ row.userName ? row.userName : '-' }}
                    </el-text>
                  </template>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"><template #default="{ row }">
                  <template v-if="row.id">
                    <el-text v-for="item in staffList">
                      <el-text v-if="row.id === item.id">
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
              <el-table-column align="center" show-overflow-tooltip prop="lable" label="职位"><template
                  #default="{ row }">
                  <el-text v-for="item in positionManageList">
                    <el-text v-if="row.positionId === item.id">
                      {{ item.name }}
                    </el-text>
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip prop="lable" label="部门"><template
                  #default="{ row }">
                  <el-text v-for="item in departmentList">
                    <el-text v-if="department === item.id">
                      {{ item.name }}
                    </el-text>
                  </el-text>
                </template>
              </el-table-column>
              <el-table-column align="center" width="200" fixed="right" show-overflow-tooltip label="提成比例">
                <template #default="{ row }">
                  <el-form :model="row" ref="formRef" :rules="formRules">
                    <el-form-item prop="commission">
                      <el-input v-model.number="row.commission" placeholder="请输入提成比例" clearable>
                        <template #append>%</template></el-input>
                    </el-form-item>
                  </el-form>
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

:deep(.el-form-item) {
  margin-bottom: 0px;
}
</style>
