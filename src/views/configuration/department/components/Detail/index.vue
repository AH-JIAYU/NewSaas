<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/department";
import useDepartmentStore from "@/store/modules/department";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import usePositionManageStore from "@/store/modules/position_manage";
import useGroupManageStore from "@/store/modules/group_manage";

// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 小组
const useGroupManage = useGroupManageStore();
// 小组数据
const groupManageList = ref<any>();
// 类型
const commissionList = [
  { label: "完成计提", value: 1 },
  { label: "审核计提", value: 2 },
  { label: "收款计提", value: 3 },
];
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
// 详情数据
const detailData = ref<any>();
// 请求数据
async function showEdit(row: any) {
  const params = {
    id: row.id,
  };
  const { data, status } = await api.detail(params)
  detailData.value = data;
  status === 1 &&
    ElMessage.success({
      message: "查询成功",
      center: true,
    });
  drawerisible.value = true;
}

// 关闭
function close() {
  emit("fetch-data");
  detailData.value = {}
  drawerisible.value = false;
}

onMounted(async () => {
  // 部门
  departmentList.value = await departmentStore?.getDepartment();
  // 用户
  staffList.value = await tenantStaffStore.getStaff();
  // 职位
  positionManageList.value = await usePositionManage?.getPositionManage() || [];
  // 小组
  groupManageList.value = await useGroupManage?.getGroupManage() || [];
})
// 暴露
defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-drawer
    v-model="drawerisible"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    size="60%"
    title="详情"
    @close="close"
  >
    <el-form label-width="100px" label-position="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
          </div>
        </template>
<el-row :gutter="24">
  <el-col :span="6">
    <el-form-item label="部门ID:">
      <el-text class="mx-1">
        {{
        detailData?.id
        ? detailData.id
        : "-"
        }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="部门名称:">
      <el-text class="mx-1">
        {{
        detailData?.name ? detailData.name : "-"
        }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="部门主管:">
      <el-text v-for="item in staffList" :key="item.id">
        <el-text v-if="item.id === detailData?.director">
          {{ item.name }}
        </el-text>
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="员工数:">
      <el-text class="mx-1">
        {{ detailData?.count ? detailData.count : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="状态:">
      <el-text class="mx-1">
        {{ detailData?.commissionStatus === 1 ? "启用" : "禁用" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="创建时间:">
      <el-text class="mx-1">
        {{ detailData?.createTime ? detailData.createTime : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="部门提成:">
      <el-text class="mx-1">
        {{ detailData?.commission ? detailData.commission : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="提成发放规则:">
      <el-text class="mx-1">
        {{ commissionList[detailData?.commissionType-1] ? commissionList[detailData?.commissionType-1].label  : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="备注:">
      <el-text class="mx-1">
        {{ detailData?.remark ? detailData.remark : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
</el-row>
</el-card>

<!-- <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>权限信息</span>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户状态:">
              <el-text class="mx-1">
                {{ detailData.customerStatus === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资料:">
              <el-text class="mx-1">
                {{ detailData.antecedentQuestionnaire === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险控制:">
              <el-text class="mx-1">
                {{ detailData.riskControl === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业限额/月:">
              <el-text class="mx-1">
                <CurrencyType />{{ detailData.turnover || 0 }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核率Min值:">
              <el-text class="mx-1">
                {{ detailData.turnover ? detailData.turnover + "%" : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card> -->
<el-card class="box-card">
  <template #header>
          <div class="card-header">
            <span>员工</span>
          </div>
        </template>
  <el-table :data="detailData?.result" border>
    <el-table-column align="center" type="index" label="序号" width="80" />
    <el-table-column align="center" show-overflow-tooltip prop="id" label="员工ID" />
    <el-table-column align="center" show-overflow-tooltip prop="userName" label="用户名"><template #default="{ row }">
                {{ row.userName ? row.userName : "-" }}
              </template>
    </el-table-column>
    <el-table-column align="center" show-overflow-tooltip prop="name" label="姓名"><template #default="{ row }">
                {{ row.name ? row.name : "-" }}
              </template>
    </el-table-column>
    <el-table-column align="center" show-overflow-tooltip prop="phoneNumber" label="电话号码"><template #default="{ row }">
                {{ row.phoneNumber ? row.phoneNumber : "-" }}
              </template>
    </el-table-column>
    <el-table-column align="center" show-overflow-tooltip prop="email" label="电子邮箱"><template #default="{ row }">
                {{ row.email ? row.email : "-" }}
              </template>
    </el-table-column>
    <el-table-column align="center" show-overflow-tooltip prop="departmentId" label="部门"><template #default="{ row }">
            <el-text v-for="item in departmentList" :key="item.id">
              <el-text v-if="item.id === row.departmentId">
                {{ item.name }}
              </el-text>
            </el-text>
          </template>
    </el-table-column>
    <el-table-column align="center" show-overflow-tooltip prop="personId" label="职位"><template #default="{ row }">
                <el-text v-for="item in positionManageList">
                  <el-text v-if="row.personId === item.id">
                    {{ item.name ? item.name : "-" }}
                  </el-text>
                </el-text>
              </template>
    </el-table-column>
    <el-table-column align="center" show-overflow-tooltip prop="groupId" label="小组"><template #default="{ row }">
                <el-text v-for="item in groupManageList">
                  <el-text v-if="row.groupId === item.id">
                    {{ item.name ? item.name : "-" }}
                  </el-text>
                </el-text>
              </template>
    </el-table-column>
    <template #empty>
            <el-empty description="暂无数据" />
          </template>
  </el-table>
</el-card>
</el-form>
</el-drawer>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rightStatus {
    position: relative;
    width: 128px;

    >div {
      width: 120px;
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      border-radius: 0.3rem;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 20.8px;

      &::before {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }

      &::after {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }
    }

    >div.isOnlineTrue {
      background-color: #70b51a;

      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    >div.isOnlineFalse {
      background-color: #d8261a;

      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }
  }
}
</style>
