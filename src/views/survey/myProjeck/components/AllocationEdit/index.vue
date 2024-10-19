<script setup lang="ts">
import { ElMessage } from "element-plus";
import { submitLoading, obtainLoading } from "@/utils/apiLoading";
import api from "@/api/modules/projectManagement";
import apiDep from "@/api/modules/survey_vip_department";
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组

defineOptions({
  name: "AllocationEdit",
});
// 部门数据
const departmentList = ref<any>([]);
// 获取树
const treeRef = ref<any>()
// 树绑定的id
const departmentId = ref<any>([])
// 部门配置
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
const emits = defineEmits(["fetch-data"]);
// 弹框
const dialogTableVisible = ref(false);
const formRef = ref<any>(); // ref
const data = ref<any>({
  list: [], // 表格
  vipGroupList: [], // 供应商
  form: {
    projectId: "", // 项目id
    allocationType: 3, // 会员组固定
    groupSupplierIdList: [], //	分配类型为:供应商传供应商id,分配类型为会员组传会员组Id,支持多选
  },
});
const rules = ref<any>({
  groupSupplierIdList: [
    {
      type: "array",
      required: true,
      trigger: "change",
      message: "请选择至少一项",
    },
  ],
});
// 显隐
async function showEdit(row: any) {
  data.value.list = [{ ...row }]; // 表格
  // 分配
  data.value.form.projectId = row.projectId; // 项目id
  // 会员组列表
  data.value.vipGroupList = await obtainLoading(
    surveyVipGroupStore.getGroupNameList()
  );
  dialogTableVisible.value = true;
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // // 重置表单
  Object.assign(data.value.form, {
    projectId: "",
    groupSupplierIdList: [],
  });
  dialogTableVisible.value = false;
}
// 树的事件
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
  // 同步选中的路由id
  departmentId.value = treeRef.value!.getCheckedKeys(false);
  //  获取选中的所有子节点
  const tree = treeRef.value.getCheckedKeys();
  // 获取所有半选的主节点
  const halltree = treeRef.value.getHalfCheckedKeys();
  // 组合一下
  const organizationalStructureId = tree.concat(halltree);
  data.value.form.groupSupplierIdList = organizationalStructureId[0];
};
// 提交数据
function onSubmit() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const { status } = await submitLoading(api.allocation(data.value.form));
      status === 1 &&
        ElMessage.success({
          message: "分配成功",
          center: true,
        });
      closeHandler();
      emits("fetch-data");
    }
  });
}

onMounted(async () => {
  // 部门
  const res = await apiDep.list({ name: '' });
  if (res.data) {
    departmentList.value = res.data;
  }
});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" title="分配" width="700" :before-close="closeHandler">
      <el-table :data="data.list" v-loading="false" row-key="id">
        <el-table-column align="left" show-overflow-tooltip label="项目编码" prop="projectId" />
        <el-table-column align="left" show-overflow-tooltip label="项目名称" prop="projectName" />
        <el-table-column align="left" show-overflow-tooltip label="配额/限量" prop="name">
          <template #default="{ row }">
            {{ row.limitedQuantity || 0 }}/
            {{ row.num || 0 }}
          </template>
        </el-table-column>
      </el-table>
      <el-form ref="formRef" label-width="6rem" :rules="rules" :model="data.form" :inline="false"
        style="margin-top: 1.25rem;">
        <el-form-item label="部门" prop="">
          <el-tree v-if="departmentList.length > 0" style="max-width: 600px" ref="treeRef" :data="departmentList"
            show-checkbox check-strictly node-key="id" :default-expanded-keys="[]" :default-checked-keys="departmentId"
            default-expand-all :props="defaultProps" @check-change="handleNodeClick" />
          <el-text v-else>暂无数据</el-text>
          <!-- <el-select v-model="data.form.groupSupplierIdList" placeholder="请选择部门" clearable filterable multiple
            collapse-tags>
            <el-option v-for="item in data.vipGroupList" :label="item.memberGroupName" :value="item.memberGroupId" />
          </el-select> -->
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeHandler"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-form-item.asterisk-left {
    align-items: center;
  }
}
</style>
