<script setup lang="ts">
import { ElMessage } from "element-plus";
import { submitLoading, obtainLoading } from "@/utils/apiLoading";
import api from "@/api/modules/projectManagement";
import useUserSupplierStore from "@/store/modules/user_supplier"; // 供应商
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
const supplierStore = useUserSupplierStore(); // 供应商
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组

defineOptions({
  name: "AllocationEdit",
});
const emits = defineEmits(["fetch-data"]);
// 弹框
const dialogTableVisible = ref(false);
const formRef = ref<any>(); // ref
const data = ref<any>({
  title: "分配",
  list: [], // 表格
  tenantSupplierList: [], // 供应商
  vipGroupList: [], // 会员组
  form: {
    projectId: "", // 项目id
    allocationType: 1, //	分配类型:1:自动分配 2:供应商 3:会员组
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
async function showEdit(row: any, type: string) {
  data.value.list = [{ ...row }]; // 表格
  // 重新分配
  if (type === "reassign") {
    data.value.title = "重新分配";
    const res = await obtainLoading(
      api.getProjectAllocation({ projectId: row.projectId })
    );
    const { groupSupplierIdSet, ...form } = res.data;
    data.value.form = form;
    data.value.form.groupSupplierIdList = groupSupplierIdSet;
  } else {
    data.value.title = "分配";
    // 分配
    data.value.form.projectId = row.projectId; // 项目id
  }
  // 供应商列表
  data.value.tenantSupplierList = await obtainLoading(
    supplierStore.getTenantSupplierList(row.projectId)
  );
  // 会员组列表
  data.value.vipGroupList = await obtainLoading(
    surveyVipGroupStore.getGroupNameList()
  );
  dialogTableVisible.value = true;
}
// 切换分配
function changeRadio() {
  data.value.form.groupSupplierIdList = [];
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // // 重置表单
  Object.assign(data.value.form, {
    projectId: "",
    allocationType: 1,
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
      :title="data.title"
      width="500"
      :before-close="closeHandler"
    >
      <el-table :data="data.list" v-loading="false" row-key="id">
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="客户简称"
          prop="clientName"
        />
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
          prop="name"
        />
      </el-table>
      <el-form
        ref="formRef"
        label-width="80px"
        :rules="rules"
        :model="data.form"
        :inline="false"
      >
        <el-form-item label="分配目标">
          <el-radio-group
            v-model="data.form.allocationType"
            class="ml-4"
            @change="changeRadio"
          >
            <el-radio :value="2" size="large"> 供应商 </el-radio>
            <el-radio :value="3" size="large"> 会员组 </el-radio>
            <el-radio :value="4" size="large" v-if="data.title === '重新分配'">
              取消分配
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="
            data.form.allocationType === 2 && data.form.allocationType !== 4
          "
          label="供应商"
          prop="groupSupplierIdList"
        >
          <el-select
            v-model="data.form.groupSupplierIdList"
            placeholder="请选择供应商"
            clearable
            filterable
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in data.tenantSupplierList"
              :label="item.supplierAccord"
              :value="item.tenantSupplierId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            data.form.allocationType === 3 && data.form.allocationType !== 4
          "
          label="会员组"
          prop="groupSupplierIdList"
        >
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
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
          <el-button @click="closeHandler"> 取消 </el-button>
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
