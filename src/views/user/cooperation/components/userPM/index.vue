<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import apiDep from "@/api/modules/department";
import apiUser from "@/api/modules/configuration_manager";
import apiPos from "@/api/modules/position_manage";
import DictionaryItemDia from "@/views/configuration/user/components/dictionaryItemDialog/index.vue";
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
  form: {
    chargeUserId: null,
    chargeUserName: "",
  },
});



const defaultProps: any = {
  children: "children",
  label: "name",
};
const rules = reactive<any>({
  chargeUserId: [
    { required: true, message: "请选择负责人", trigger: "change" },
  ],
});
const dictionaryItemVisible = ref<any>(false); // PM组件显隐
// 显隐 ,row,回显的勾选数据，name为弹出框名称，project为选中的项目名称数据
async function showEdit(row: any, name: any, project: any) {
  // 部门
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    departmentList.value = res.data;
  }
  drawerisible.value = true;
  data.value.title = name;
  data.value.form.invitationType = 2; //部门
  //项目外包-接收项目-接收选中的项目
  if (project) {
    data.value.project = project;
    data.value.form.chargeUserName =project.chargeUserName;
    data.value.form.chargeUserId = project.chargeUserId;
  }
}



// 关闭
function close() {
  drawerisible.value = false;
  formRef.value.resetFields();
  // 同步选中的路由id
  // departmentId.value = treeRef.value.getCheckedKeys(false);
}

const emit = defineEmits(["userData"]);
const formRef = ref<any>(); // Ref
//点击确定，把值传给父元素
function submit() {
  formRef.value.validate((valid: any) => {
    if (valid) {

      let obj = {
        chargeUserId: data.value.form.chargeUserId, //负责人UserId
        chargeUserName:  data.value.form.chargeUserName, //负责人用户姓名
        invitationType: data.value.form.invitationType, //类型，1员工，2部门
      };
      drawerisible.value = false;
      emit("userData", obj);
    }
  });
}

onMounted(async () => {

});
defineExpose({
  showEdit,
});
const selectTreeRef = ref()
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
    data.value.form.chargeUserId = nodeData.id; // 只保留当前选中节点 ID
    // const checkedNodes = treeRef.value.getCheckedNodes();
    data.value.form.chargeUserName = nodeData.name;
    // 关闭下拉框
    // setTimeout(() => {
    //   selectTreeRef.value.blur(); // 失去焦点，关闭下拉框
    // }, 100);
  } else {
    // 如果取消选中节点，更新 chargeUserId
    data.value.form.chargeUserId = [data.value.form.chargeUserId].filter(
      (id: any) => id !== nodeData.id
    );
    if(data.value.form.chargeUserId.length ==0){
      data.value.form.chargeUserId = ''
    }
  }
  if(!data.value.form.chargeUserId){
    data.value.form.chargeUserName =''
  }
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
      title="请选择项目负责人"
      class="userClass"
    >
      <ElForm
        ref="formRef"
        :rules="rules"
        :model="data.form"
      >
        <el-form-item label="部门" prop="chargeUserId">
          <el-tree-select
              placeholder="请选择部门"
              ref="treeRef"
              v-model="data.form.chargeUserId"
              :data="departmentList"
              check-strictly
              show-checkbox
              default-expand-all
              node-key="id"
              :props="defaultProps"
              @check-change="handleNodeClick"
              :check-on-click-node="true"
              :expand-on-click-node="false"
            />
          <!-- <el-select
            v-model="data.form.chargeUserName"
            placeholder="请选择负责人"
            ref="selectTreeRef"
          >
            <el-option :value="data.form.chargeUserId" style="height: auto">
              <el-tree
                v-if="departmentList.length > 0"
                ref="treeRef"
                :disabled="true"
                :data="departmentList"
                show-checkbox
                check-strictly
                node-key="id"
                :default-expanded-keys="[]"
                :default-checked-keys="[data.form.chargeUserId]"
                default-expand-all
                :props="defaultProps"
                @check-change="handleNodeClick"
                :check-on-click-node="true"
                :expand-on-click-node="false"
              />
              <el-text v-else>暂无数据</el-text>
            </el-option>
          </el-select> -->
        </el-form-item>
      </ElForm>

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
.buttonClass {
  text-align: center;
  margin: 0.75rem;
  width: 100%;
  height: 2rem;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 0.875rem;
  color: #409eff;
  line-height: 16px;
  background: #f4f8ff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #e9eef3;
}

/* 使按钮在下拉框展开时自适应宽度 */
.el-select-dropdown .buttonClass {
  width: calc(100% - 24px);
  /* 减去两边的 padding */
}

.checkBox {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 1.25rem;
}

:deep(.userClass .el-tabs__content) {
  height: 12.5rem;
  overflow: auto;
}

:deep(.userClass .el-collapse) {
  border-top: none !important;
}

.project-name {
  font-weight: 500;
  font-size: 16px;
  color: #333333;
}

.tabs-user {
  margin-top: 0.9375rem;
}

.project-content {
  // margin-top: .625rem;
  height: 150px;
  overflow: auto;
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
      padding: 0.3125rem 0.9375rem;
      /* 内边距 */
    }
  }
}

.userClass .el-tabs__item.is-top:nth-child(2) {
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

:deep(.el-popper) {
  width: 25.375rem;
}

:deep(.el-radio-button__inner) {
  border: none !important;
}

:deep(.el-select-dropdown__header) {
  width: 416px !important;
  border-bottom: none !important;
}

:deep(.el-radio-button__inner) {
  height: 1.875rem;
  width: 4.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none !important;
  border-radius: 20px !important;
}
</style>
