<script setup lang="ts">
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import useSurveyVipLevelStore from "@/store/modules/survey_vipLevel"; //会员等级
import api from "@/api/modules/survey_vip";
const surveyVipLevelStore = useSurveyVipLevelStore(); //会员等级
const emits = defineEmits(["queryData"]);
const dialogTableVisible = ref(false);
const title = ref("");
const form = ref(); // 表单
const formRef = ref(); // 表单ref
const rules = reactive({
  memberLevelId: [
      { required: true, message: "请选择会员等级", trigger: "change" },
    ],
});
const data = reactive<any>({
  vipLevelList: [], // 会员等级

});
// 获取会员等级
const getLevelNameList = async () => {
  data.vipLevelList = await surveyVipLevelStore.getLevelNameList();
}
// 显示弹框
async function showEdit(row: any) {
  if (!row) {
    title.value = "新增";
    form.value = {};
  } else {
    await getLevelNameList()
    title.value = "编辑";
    const { data } = await api.detail({ memberId: row.memberId })
    ;
    form.value = data;
    form.value.countryType = form.value.subordinateCountryId === "343" ? 1 : 2;
  }
  dialogTableVisible.value = true;
}
// 关闭
function close() {
  formRef.value.resetFields();
  dialogTableVisible.value = false;
}
// 提交
function onSubmit() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const { status } = await submitLoading(api.edit(form.value));
        status === 1 &&
          ElMessage.success({
            message: "修改成功",
            center: true,
          });


      emits("queryData");
      close();
    }
  });
}

defineExpose({ showEdit });
</script>

<template>
  <el-dialog v-model="dialogTableVisible" :title="title" width="600">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="7rem"
      :inline="false"
    >
    <el-form-item label="会员等级" prop="memberLevelId">
            <el-select clearable filterable v-model="form.memberLevelId">
              <el-option v-for="item in data.vipLevelList" :key="item.memberLevelId" :value="item.memberLevelId"
              :label="item.levelNameOrAdditionRatio"></el-option>
            </el-select>
          </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close"> 取消 </el-button>
      <el-button type="primary" @click="onSubmit"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
// 样式
</style>
