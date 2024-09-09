<script setup lang="ts">
import { ElMessage } from "element-plus";
import { submitLoading, obtainLoading } from "@/utils/apiLoading";
import api from "@/api/modules/projectManagement";
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组

defineOptions({
  name: "AllocationEdit",
});
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

onMounted(async () => {});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="分配"
      width="700"
      :before-close="closeHandler"
    >
      <el-table :data="data.list" v-loading="false" row-key="id">
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="项目编码"
          prop="projectId"
        />
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="项目名称"
          prop="projectName"
        />
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="配额/限量"
          prop="name"
        >
          <template #default="{ row }">
            {{ row.limitedQuantity || 0 }}/
            {{ row.num || 0 }}
          </template>
        </el-table-column>
      </el-table>
      <el-form
        ref="formRef"
        label-width="6rem"
        :rules="rules"
        :model="data.form"
        :inline="false"
        style="margin-top: 1.25rem;"
      >
        <el-form-item label="会员组" prop="groupSupplierIdList">
          <el-select
            v-model="data.form.groupSupplierIdList"
            placeholder="请选择会员组"
            clearable
            filterable
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in data.vipGroupList"
              :label="item.memberGroupName"
              :value="item.memberGroupId"
            />
          </el-select>
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
