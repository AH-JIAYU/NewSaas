<script setup lang="ts">
import { ref } from "vue";
import api from "@/api/modules/configuration_manager";
import apiDep from "@/api/modules/department";
import useDepartmentStore from "@/store/modules/department";
import useTenantRoleStore from "@/store/modules/tenant_role";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import usePositionManageStore from "@/store/modules/position_manage";

// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 角色码
const roleStore = useTenantRoleStore();
// 角色
const munulevs = ref();
// 部门数据
const departmentList = ref<any>();
// 树配置项
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
// 部门id
const departmentId = ref<any>([]);
// 定义表单
const form = ref<any>({})
// 更新列表
const emit = defineEmits(["fetch-data"]);
// 弹框开关
const drawerisible = ref<boolean>(false);
// 详情数据
const detailData = ref<any>();
// 修改表单
async function showEdit(row: any) {
  form.value = row;
  form.value.roleList = [form.value.role];
  const params = {
    id: row.id,
  };
  const { status, data } = await api.list(params)
  if (data && status === 1) {
    detailData.value = data.data[0];
  }
  if (departmentId.value) {
    departmentId.value.push(detailData.value.organizationalStructureId)
  }
  drawerisible.value = true;
}

// 弹框关闭事件
function close() {
  emit("fetch-data");
  departmentId.value = [];
  drawerisible.value = false;
}

onMounted(async () => {
  // 职位
  positionManageList.value = await usePositionManage.getPositionManage();
  // 用户
  staffList.value = await tenantStaffStore.getStaff();
  // 角色
  munulevs.value = await roleStore.getRole();
  // 部门
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    departmentList.value = res.data;
    departmentList.value.forEach((item: any) => {
      item.disabled = true;
    });
  }
});

// 暴露事件
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
<el-row :gutter="20">
  <el-col :span="1"> </el-col>
  <el-col style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
            " :span="1.5">
    <el-avatar v-if="detailData.avatar" :size="50" :src="detailData.avatar" />
    <div v-else class="avatar">{{detailData.name}}</div>
  </el-col>
  <el-col style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
            " :span="6">
    <p>{{detailData.userName}}</p>
    <p style="font-size: 14px">账号:<span>{{detailData.userName}}</span></p>
  </el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="6">
    <el-form-item label="员工ID:">
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
    <el-form-item label="姓名:">
      <el-text class="mx-1">
        {{
        detailData?.name ? detailData.name : "-"
        }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="手机号:">
      <el-text class="mx-1">
        {{
        detailData?.phoneNumber
        ? detailData.phoneNumber
        : "-"
        }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="邮箱:">
      <el-text class="mx-1">
        {{ detailData?.email ? detailData.email : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="部门:">
      {{ detailData.organizationalStructureName ? detailData.organizationalStructureName : "-" }}
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="职位:">
      <el-text v-for="item in positionManageList">
        <el-text v-if="detailData.positionId === item.id">
          {{ item.name ? item.name : "-" }}
        </el-text>
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="6">
    <el-form-item label="帐号状态:">
      <el-text class="mx-1">
        {{ detailData?.active ? "启用" : "禁用" }}
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
</el-row>
</el-card>
<el-card class="box-card">
  <template #header>
  <div class="card-header">
    <div class="leftTitle">角色信息</div>
  </div>
</template>
  <el-row :gutter="24">
    <el-form-item label="分配角色:">
      <el-checkbox-group style="margin-left: 1.5rem;" v-if="munulevs?.length" v-model="form.roleList" >
              <el-checkbox v-for="item in munulevs" :key="item.id" :label="item.roleName" :value="item.roleName" disabled>
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
            <el-text v-else>暂无数据</el-text>
    </el-form-item>
  </el-row>
</el-card>
<el-card class="box-card">
  <template #header>
  <div class="card-header">
    <div class="leftTitle">
      部门信息<span
        v-if="form.enableChargePerson"
        style="margin-left: 20px; font-size: 14px"
        >负责人:<el-text v-for="item in staffList" :key="item.id">
          <el-text v-if="item.id === form.id">
            {{ item.name }}
          </el-text>
        </el-text></span
      >
    </div>
  </div>
</template>
  <el-row :gutter="24">
    <el-form-item label="分配部门:">
      <el-tree v-if="departmentList.length > 0" style="max-width: 600px" ref="treeRef" :disabled="true"
        :data="departmentList" show-checkbox check-strictly node-key="id" :default-expanded-keys="[]"
        :default-checked-keys="departmentId" default-expand-all :props="defaultProps" @check-change="handleNodeClick" />
      <el-text v-else>暂无数据</el-text>
    </el-form-item>
  </el-row>
</el-card>
</el-form>
<template #footer>
        <div class="flex-c">
          <el-button type="primary" @click="close"> 关闭 </el-button>
        </div>
      </template>
</el-drawer>
</template>

<style scoped lang="scss">
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rightStatus {
    position: relative;
    width: 128px;

    > div {
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

    > div.isOnlineTrue {
      background-color: #70b51a;

      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    > div.isOnlineFalse {
      background-color: #d8261a;

      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }
  }
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #638282;
  color: #fff;
  font-weight: 700;
  border-radius: 50%;
}
</style>
