<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import apiUser from "@/api/modules/configuration_manager";
import apiDep from "@/api/modules/department";
defineOptions({
  name: "componentsQuickEdit",
});

const emits = defineEmits(["fetch-data"]);
const formRef = ref<any>();
const data = ref<any>({
  dialogTableVisible: false,
  title: "",
  type: "",
  loading: "",
  formData: {}, //表单
  staffList: [], //用户
  rules: {
    chargeId: [{ required: true, message: "请选择PM", trigger: "change" }],
  },
});
// 部门数据
const departmentList = ref<any>([]);
const departflatten= ref<any>([]);
// 部门配置
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
// 获取树
const treeRef = ref<any>()
const TypeList: any = {
  chargeUserId: "PM",
};

// 显隐
async function showEdit(row: any, FormType: any) {

  // 部门
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    departmentList.value = res.data;
  }

  data.value.title = TypeList[FormType];
  data.value.type = FormType;
  data.value.loading = true;
  data.value.formData = cloneDeep(row);
  data.value.formData.chargeUserName = row.userName;
  data.value.formData.chargeUserId = row.userId;
  data.value.dialogTableVisible = true;
  data.value.loading = false;
}
// 扁平化会员部门
const flattenWithoutChildren = (arr: any) => {
  return arr.reduce((acc: any, val: any) => {
    // 创建一个新对象，移除 children 字段
    const { children, ...rest } = val;
    // 将当前项添加到扁平化的数组中
    acc.push(rest);
    // 如果当前项有 children，则递归扁平化其 children 数组
    if (val.children && val.children.length > 0) {
      acc = acc.concat(flattenWithoutChildren(val.children));
    }
    return acc;
  }, []);
};
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
    data.value.formData.chargeUserId = nodeData.id; // 只保留当前选中节点 ID
    // const checkedNodes = treeRef.value.getCheckedNodes();
    data.value.formData.chargeUserName = nodeData.name;
    // 关闭下拉框
    // setTimeout(() => {
    //   selectTreeRef.value.blur(); // 失去焦点，关闭下拉框
    // }, 100);
  } else {
    // 如果取消选中节点，更新 chargeUserId
    data.value.formData.chargeUserId = [data.value.formData.chargeUserId].filter(
      (id: any) => id !== nodeData.id
    );
    if (data.value.formData.chargeUserId.length == 0) {
      data.value.formData.chargeUserId = "";
    }
  }

  if (!data.value.formData.chargeUserId) {
    data.value.formData.chargeUserName = "";
  }
};
// const changeChargeUserId = (val: any) => {
//   if (val) {
//     const findData = data.value.staffList.find((item: any) => item.id === val);
//     data.value.formData.chargeUserName = findData.userName;
//   } else {
//     data.value.formData.chargeUserId = "";
//     data.value.formData.chargeUserName = "";
//   }
// };
// 提交数据
async function onSubmit() {
  data.value.loading = true;
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(data.value.formData)); //深拷贝，不改变原数据
            //判断如果为数组改为字符串，data.value.form.chargeUserId
            if (Array.isArray(obj.chargeUserId)) {
        obj.chargeUserId = obj.chargeUserId[0];
      }
      const { status } = await api.updateInvitationBindUser(
        obj,
      );
      status === 1 &&
        ElMessage.success({
          message: "编辑成功",
          center: true,
        });
      emits("fetch-data");
      closeHandler();
    }
    data.value.loading = false;
  });
}
// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.formData = {};
}
// 暴露方法
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog
      v-model="data.dialogTableVisible"
      v-if="data.dialogTableVisible"
      :title="data.title + '编辑'"
      draggable
    >
      <el-form
        ref="formRef"
        :model="data.formData"
        :rules="data.rules"
        label-width="100"
        label-position="right"
      >
        <template v-if="data.type === 'chargeUserId'">
          <el-form-item label="PM" prop="chargeUserId">
          <el-tree-select placeholder="请选择部门"  ref="treeRef"
            v-model="data.formData.chargeUserId" :data="departmentList" check-strictly show-checkbox default-expand-all
            node-key="id" :props="defaultProps" @check-change="handleNodeClick" :check-on-click-node="true"
            style="width: 37.625rem" :expand-on-click-node="false" clearable/>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <el-button @click="closeHandler" :disabled="data.loading">
          取消
        </el-button>
        <el-button type="primary" @click="onSubmit" :disabled="data.loading">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-drawer,
  .el-drawer__body,
  .el-tabs.el-tabs--left {
    overflow: visible !important;
  }
}
</style>
