<script setup lang="ts">
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/configuration_supplierLevel";
import useConfigurationSupplierLevelStore from "@/store/modules/configuration_supplierLevel";

//供应商等级
const configurationSupplierLevelStore = useConfigurationSupplierLevelStore();
// 更新列表
const emits = defineEmits(["queryData"]);
// 弹窗开关
const dialogTableVisible = ref(false);
// 标题
const title = ref("");
// 表单
const form = ref();
// 表单ref
const formRef = ref();
// 校验
const rules = reactive({
  levelName: [{ required: true, message: "请输入名称", trigger: "blur" }],
  additionRatio: [
    { required: true, message: "请输入比例", trigger: "blur" },
    { pattern: /^[0-9]+$/, message: '请输入0以上的正整数', trigger: 'blur' }
  ],
});

// 显示弹框
async function showEdit(row: any) {
  if (!row) {
    title.value = "新增";
    form.value = {};
  } else {
    title.value = "编辑";
    form.value = cloneDeep(row);
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
      if (!form.value.tenantSupplierLevelId) {
        const { status } = await submitLoading(api.create(form.value));
        status === 1 &&
          ElMessage.success({
            message: "新增成功",
            center: true,
          });
      } else {
        const { status } = await submitLoading(api.edit(form.value));
        status === 1 &&
          ElMessage.success({
            message: "编辑成功",
            center: true,
          });
      }
      // 数据改变 在会员中需要重新请求
      configurationSupplierLevelStore.LevelNameList = null;
      emits("queryData");
      close();
    }
  });
}
// 暴露事件
defineExpose({ showEdit });
</script>

<template>
  <el-dialog v-model="dialogTableVisible" :title="title" width="600">
  <el-form ref="formRef" :model="form" :rules="rules" label-width="7rem" :inline="false">
      <el-form-item label="等级名称" prop="levelName">
        <el-input v-model="form.levelName" maxlength="100" />
      </el-form-item>
      <el-form-item label="价格比例" prop="additionRatio">
        <!-- oninput="if(value>100)value=100;if(value.length>4)value=value.slice(0,4);if(value<0)value=0;" -->
        <el-input v-model.number="form.additionRatio" :min="1" :max="100"
           type="number">
          <template #append> % </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close"> 取消 </el-button>
      <el-button type="primary" @click="onSubmit"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
// 样式</style>
