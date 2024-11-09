<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import apiDep from "@/api/modules/department";
import apiUser from "@/api/modules/configuration_manager";
import role from "@/mock/role";
const drawerisible = ref<boolean>(false);
  const departmentId = ref<any>([])
// 部门数据
const departmentList = ref<any>([]);
const treeRef =ref();
const data = ref<any>({
  type:1,
  tenantStaffList: [], // 员工列表
  roleList:[] ,//选择的员工
});
const defaultProps: any = {
  children: "children",
  label: "name",
};
// 显隐
async function showEdit(row: any) {
  await getTenantStaffList();
  data.value.type =1;
  drawerisible.value = true;
  departmentId.value = [];
      // 部门
      const res = await apiDep.list({ name: '' });
    if (res.data) {
      departmentList.value = res.data;

    }
    //回显员工chargeUserId	负责人UserId或者部门id  invitationType	邀请方类型 1:员工userId 2: 部门id		false	chargeUserName	负责人用户姓名或者部门名称
    if(row) {
      if(row.invitationType == 1){
        //勾选的是负责人
            if(row.chargeUserId){
        data.value.roleList = [row.chargeUserId]
        data.value.chargeUserName = row.chargeUserName

      }
      } else if(row.invitationType == 2){
        //勾选是部门
        departmentId.value = [row.chargeUserId];
        data.value.chargeUserName = row.chargeUserName
      }

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
    departmentId.value = departmentId.value.filter((id: any) => id !== nodeData.id);
  }
  if(departmentId.value.length) {
    //如果勾选了部门，要把员工置空
    data.value.roleList = []
  }
};
const fetchData =()=> {
  //切换数据
}
// 处理选中项变化的逻辑，确保最多只能选择一个
const handleCheckboxChange = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.roleList = [newValue[newValue.length - 1]]
    //只能勾选部门或员工，如果勾选员工将部门置空

  }
  if(data.value.roleList.length !=0){

    departmentId.value = [];
    treeRef.value.setCheckedKeys([])
  }
}
defineExpose({
  showEdit,
});
const emit = defineEmits(["userData"]);
//点击确定，把值传给父元素
function submit (){
  let chargeUserName ='';
  let chargeUserId = null;
  let invitationType = null;
  // let departmentName = '';
    if (data.value.roleList[0]){
      //获取员工名称
          const findData = data.value.tenantStaffList.find(
      (item: any) => item.id === data.value.roleList[0],
    );
    chargeUserName = findData.userName;
    chargeUserId = data.value.roleList[0];
    invitationType = 1;
    }
    if(departmentId.value[0]){
      //获取部门名称
      const findData1 = departmentList.value.find(
      (item: any) => item.id === departmentId.value[0],
    );
    chargeUserName = findData1.name;
    chargeUserId = departmentId.value[0];
    invitationType = 2;
    }
  let obj = {
    chargeUserId: chargeUserId, //负责人UserId
    chargeUserName: chargeUserName, //负责人用户姓名
    invitationType:invitationType,//类型，1员工，2部门
    // departmentId: departmentId.value[0], //邀请方部门id
    // departmentName:departmentName,
  }
  drawerisible.value = false;
  emit("userData", obj);
}
</script>

<template>
  <div>
    <el-dialog
      v-model="drawerisible"
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      width="30%"
      title="请选择负责部门/人"
    >
    <el-tabs v-model="data.type"   @tab-change="fetchData">
      <el-tab-pane label="部门" :name="1">

      <el-tree v-if="departmentList.length > 0" style="max-width: 600px" ref="treeRef" :disabled="true" :data="departmentList"
        show-checkbox check-strictly node-key="id" :default-expanded-keys="[]" :default-checked-keys="departmentId"
        default-expand-all :props="defaultProps" @check-change="handleNodeClick" />
      <el-text v-else>暂无数据</el-text>

      </el-tab-pane>
      <el-tab-pane label="员工" :name="2">
  <el-checkbox-group v-if="data.tenantStaffList?.length"  @change="handleCheckboxChange" v-model="data.roleList">
              <el-checkbox v-for="item in data.tenantStaffList" :key="item.id" :value="item.id"
              :label="item.userName">
                {{ item.userName }}
              </el-checkbox>
            </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>

      <template #footer>
        <el-button @click="close"> 关闭 </el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
</style>
