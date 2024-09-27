<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/group_team";
import apiDep from "@/api/modules/department";
import useDepartmentStore from "@/store/modules/department";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import usePositionManageStore from "@/store/modules/position_manage";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "Edit",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
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
// 弹框开关变量
const dialogTableVisible = ref(false);
// 组成员
const dataList = ref<any>([]);
// 组长
const groupLeaderList = ref<any>([]);
const department = ref<any>();
// 定义表单
const form = ref<any>({
  // 组id
  groupId: null,
  // 提成比例
  userInfo: [],
  // 树回显
  menuId: [],
});
// 获取数据
async function showEdit(row: any) {
  try {
    loading.value = true;
    title.value = '详情'
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
  departmentList.value = await departmentStore.getDepartment();
  staffList.value = await tenantStaffStore.getStaff();
  defaultTime.value = new Date();
});


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
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>组成员</span>
          </div>
        </template>
        <el-table ref="tableRef" :data="dataList">
          <el-table-column align="left" type="index" label="序号" width="80" />
          <el-table-column align="left" show-overflow-tooltip prop="memberId" label="员工ID"><template #default="{ row }">
              <div class="copyId">

                <template v-if="row.memberId">
                  <div class="id oneLine"> ID: {{ row.memberId }}</div>
                  <copy class="copy" :content="row.memberId" />
                </template>
                <template v-else>
                  <div class="id oneLine">ID: {{ row.id }}</div>
                  <copy class="copy" :content="row.id" />
                </template>

              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" show-overflow-tooltip prop="userName" label="用户名"><template #default="{ row }">
              <template v-if="row.id">
                <el-text v-for="item in staffList" class="tableBig">
                  <el-text v-if="row.id === item.id">
                    {{ item.name }}
                  </el-text>
                </el-text>
              </template>
              <template class="tableBig" v-else>
                <el-text>
                  {{ row.userName ? row.userName : '-' }}
                </el-text>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="left" show-overflow-tooltip prop="name"  label="姓名"><template #default="{ row }">
              <template v-if="row.id">
                <el-text class="tableBig" v-for="item in staffList">
                  <el-text v-if="row.id === item.id">
                    {{ item.name }}
                  </el-text>
                </el-text>
              </template>
              <template class="tableBig" v-else>
                <el-text>
                  {{ row.name }}
                </el-text>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="left" show-overflow-tooltip prop="lable" label="部门"><template #default="{ row }">
              <el-text v-for="item in departmentList" class="tableBig">
                <el-text v-if="department === item.id">
                  {{ item.name }}
                </el-text>
              </el-text>
            </template>
          </el-table-column>
          <el-table-column align="left" show-overflow-tooltip prop="lable" label="职位"><template #default="{ row }">
              <el-text v-for="item in positionManageList" class="tableBig">
                <el-text v-if="row.positionId === item.id">
                  {{ item.name }}
                </el-text>
              </el-text>
            </template>
          </el-table-column>
          <el-table-column align="left" width="200" fixed="right" show-overflow-tooltip label="提成比例">
            <template #default="{ row }">
              <div class="tableBig">
                {{ row.commission ? row.commission + '%' : '-' }}
              </div>
            </template>
          </el-table-column>
          <template #empty>
            <el-empty :image="empty" :image-size="300" />
          </template>
        </el-table>
      </el-card>
      <template #footer>
        <div style="flex: auto">
          <el-button type="" @click="dialogTableVisible = false">
            取消
          </el-button>
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

:deep {
  .el-table__body {
    tr {
      td:nth-of-type(1) {
        color: #409EFF !important;
      }
    }
  }
}
</style>
