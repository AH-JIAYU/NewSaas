<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import apiDep from "@/api/modules/department";
import apiUser from "@/api/modules/configuration_manager";
import role from "@/mock/role";
const drawerisible = ref<boolean>(false);
const departmentId = ref<any>([]);
// 部门数据
const departmentList = ref<any>([]);
const treeRef = ref();
const data = ref<any>({
  type: 1,
  tenantStaffList: [], // 员工列表
  roleList: [], //选择的员工
  title: "",
  project: [], //选中的项目
});
const defaultProps: any = {
  children: "children",
  label: "name",
};
// 显隐 ,row,回显的勾选数据，name为弹出框名称，project为选中的项目名称数据
async function showEdit(row: any, name: any, project: any) {
  await getTenantStaffList();
  data.value.type = 1;
  drawerisible.value = true;
  departmentId.value = [];
  // 部门
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    departmentList.value = res.data;
  }
  //回显员工chargeUserId	负责人UserId或者部门id  invitationType	邀请方类型 1:员工userId 2: 部门id		false	chargeUserName	负责人用户姓名或者部门名称
  if (row) {
    if (row.invitationType == 1) {
      //勾选的是负责人

        data.value.roleList = row.chargeUserId ?[row.chargeUserId]:[];
        data.value.chargeUserName = row.chargeUserName ?row.chargeUserName:'';

    } else if (row.invitationType == 2) {
      //勾选是部门
      departmentId.value = row.chargeUserId ?[row.chargeUserId]:[];
      data.value.chargeUserName = row.chargeUserName ?row.chargeUserName:'';
    }

  }

  data.value.title = name;

  //项目外包-接收项目-接收选中的项目
  if (project) {
    data.value.project = project;
  }
}
// 获取PM/用户
const getTenantStaffList = async () => {
  const res = await apiUser.getTenantStaffList();
  data.value.tenantStaffList = res.data;
};

// 关闭
function close() {
  drawerisible.value = false;
  // 同步选中的路由id
  // departmentId.value = treeRef.value.getCheckedKeys(false);
}
// 树选中事件
const handleNodeClick = (nodeData: any, checked: any) => {
  if (checked) {
    // 选中新的节点时，取消其他选中的节点
    const checkedKeys = treeRef.value.getCheckedKeys(); // 获取当前所有选中的节点
    checkedKeys.forEach((key: any) => {
      if (key !== nodeData.id) {
        treeRef.value.setChecked(key, false); // 取消选中其他节点
      }
    });
    // 更新当前选中的节点 ID
    departmentId.value = [nodeData.id]; // 只保留当前选中节点 ID
  } else {
    // 如果取消选中节点，更新 departmentId
    departmentId.value = departmentId.value.filter(
      (id: any) => id !== nodeData.id
    );
  }
  if (departmentId.value.length) {
    //如果勾选了部门，要把员工置空
    data.value.roleList = [];
    const checkedNodes = treeRef.value.getCheckedNodes();
    data.value.chargeUserName = checkedNodes.map((node: any) => node.name)[0];
    // console.log(data.value.chargeUserName,'data.value.chargeUserName')
  } else {
    // data.value.chargeUserName = ''
  }
  if(departmentId.value.length ==0 && data.value.roleList.length ==0){
    data.value.chargeUserName = ''
  }
};
const fetchData = () => {
  //切换数据
};
// 处理选中项变化的逻辑，确保最多只能选择一个
const handleCheckboxChange = (newValue: any) => {
  // console.log(newValue,'newValue')
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.roleList = [newValue[newValue.length - 1]];
    //只能勾选部门或员工，如果勾选员工将部门置空
  }
  if (data.value.roleList.length != 0) {
    departmentId.value = [];
    treeRef.value.setCheckedKeys([]);
    let findData = data.value.tenantStaffList.find(
      (item: any) => item.id === data.value.roleList[0]
    );
   data.value.chargeUserName = findData.userName;
  } else {
    // data.value.chargeUserName = ''
  }
  if(departmentId.value.length ==0 && data.value.roleList.length ==0){
    data.value.chargeUserName = ''
  }

};
defineExpose({
  showEdit,
});
const emit = defineEmits(["userData"]);
//点击确定，把值传给父元素
function submit() {
  let chargeUserName = "";
  let chargeUserId = null;
  let invitationType = null;
  if (data.value.roleList[0]) {
    //获取员工名称
    let findData = data.value.tenantStaffList.find(
      (item: any) => item.id === data.value.roleList[0]
    );
    chargeUserName = findData.userName;
    chargeUserId = data.value.roleList[0];
    invitationType = 1;
  }
  // console.log(departmentId.value,'departmentId.value')
  // console.log(departmentList.value,'departmentList.value')
  if (departmentId.value[0]) {
    //获取部门名称
    // 获取所有选中的节点
    const checkedNodes = treeRef.value.getCheckedNodes();
    // 提取选中节点的名称
    chargeUserName = checkedNodes.map((node: any) => node.name)[0];
    chargeUserId = departmentId.value[0];
    invitationType = 2;
    //
  }
  data.value.chargeUserName = chargeUserName;
  let obj = {
    chargeUserId: chargeUserId, //负责人UserId
    chargeUserName: chargeUserName, //负责人用户姓名
    invitationType: invitationType, //类型，1员工，2部门
    // departmentId: departmentId.value[0], //邀请方部门id
    // departmentName:departmentName,
  };
  drawerisible.value = false;
  emit("userData", obj);
}
const activeNames = ref([]);
const handleChange = (val: any) => {
  activeNames.value = val;
};
</script>

<template>
  <div>
    <el-dialog
      v-model="drawerisible"
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      width="30%"
      :title="data.title"
      class="userClass"
    >

      <div v-if="data.project.length != 0" style="margin-top:-2.1875rem">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template #title>
              <span class="project-name">项目</span>
              <el-badge :value="data.project.length" :max="99" class="item" v-if="data.project.length >1">

              </el-badge>
            </template>
            <div class="project-content">
              <div v-for="item in data.project" :key="item.id">
                <div style="display: flex">
                  <span style="font-weight: 500">{{ item.tenantName }}</span>
                  <span style="margin-left: 10px">ID:{{ item.tenantId }}</span
                  ><copy :content="item.tenantId" />
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

      </div>

      <el-tabs v-model="data.type" @tab-change="fetchData" class="tabs-user" style="margin-top:-1.5625rem;">
        <el-tab-pane label="部门" :name="1">
          <template #label>
            <span class="custom-tab-label">部门</span>
          </template>
          <div
            style="
              color: #333333;
              font-weight: 500;
              font-size: 14px;
              margin-bottom: 10px;
            "
          >
            分配部门
          </div>
          <el-tree
            v-if="departmentList.length > 0"
            style="max-width: 600px"
            ref="treeRef"
            :disabled="true"
            :data="departmentList"
            show-checkbox
            check-strictly
            node-key="id"
            :default-expanded-keys="[]"
            :default-checked-keys="departmentId"
            default-expand-all
            :props="defaultProps"
            @check-change="handleNodeClick"
            :check-on-click-node="true"
            :expand-on-click-node="false"
          />
          <el-text v-else>暂无数据</el-text>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <template #label>
            <span class="custom-tab-label" style="margin-left: 20px">员工</span>
          </template>
          <div
            style="
              color: #333333;
              font-weight: 500;
              font-size: 14px;
              margin-bottom: 10px;
            "
          >
            分配员工
          </div>
          <el-checkbox-group
            v-if="data.tenantStaffList?.length"
            @change="handleCheckboxChange"
            v-model="data.roleList"
          >
            <el-checkbox
              v-for="item in data.tenantStaffList"
              :key="item.id"
              :value="item.id"
              :label="item.userName"
              class="checkBox"
            >
              {{ item.userName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>

      <div v-if="data.chargeUserName" style="display: flex;align-items: center;">
        <div class="i-ic:sharp-info w-1.5em h-1.5em" style="color: #FFB667;"></div>
        <span style="margin-left: .5rem">{{ data.chargeUserName ||'' }}</span>
      </div>

      <template #footer>
        <div class="flex-c">
          <el-button @click="close"> 取消 </el-button>
          <el-button type="primary" @click="submit"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.checkBox{
  display: flex;
    align-items: center;
    justify-content:start;margin-left: 1.25rem
}
:deep(.userClass .el-tabs__content) {
  height: 12.5rem;
  overflow: auto;
}
:deep(.userClass  .el-collapse){
  border-top: none !important;

}
.project-name {
  font-weight: 500;
  font-size: 16px;
  color: #333333;
}
.tabs-user {
  margin-top:.9375rem;

}
.project-content {
  // margin-top: .625rem;
  height: 150px;
  overflow:auto;

}
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userClass .el-tabs__nav-wrap {
  .el-tabs__item {
    .custom-tab-label {
      /* 字体样式 */
      background: #c6c6c6;
      border-radius: 4px 4px 4px 4px;
      color: #fff;
      display: inline-block;
      padding: 0.3125rem 0.9375rem; /* 内边距 */
    }
  }
}
.userClass .el-tabs__item.is-top:nth-child(2)  {
  margin-left: 0 !important;
}
:deep(.userClass .el-tree-node.is-checked > .el-tree-node__content) {
  background: #e3f1ff;
  font-weight: 400;
  font-size: 14px;
  color: #409eff;
}
:deep(.userClass .el-tree-node) {
  margin-top: 8px;
}

:deep(.userClass .el-tabs__active-bar) {
  background-color: transparent !important;
}
:deep(.userClass .el-tabs__item) {
  padding: 0px 0rem;
}
/* 选中状态下的样式 */
.userClass .el-tabs__nav-wrap {
  .el-tabs__item.is-active {
    .custom-tab-label {
      margin-left: 2px;
      border-radius: 4px 4px 4px 4px;

      /* 蓝色背景图 */
      /* 去掉选中后的下划线 */
      background: #409eff;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 29px;
    }
  }
}
</style>
