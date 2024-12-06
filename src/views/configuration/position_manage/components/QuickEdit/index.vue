<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/position_manage";

defineOptions({
  name: "RoleQuicEdit",
});

// 更新列表
const emits = defineEmits(["fetch-data"]);
// formRef
const formRef = ref<any>()
// 数据
const data = ref<any>({
  dialogTableVisible: false,
  title: '',
  type: '',
  loading: '',
  //表单
  formData: {},
});

const TypeList: any = {
  remark: '备注',
};

// 显隐
async function showEdit(row: any, FormType: any) {
  data.value.title = TypeList[FormType]
  data.value.type = FormType
  try {
    data.value.loading = true;
    data.value.formData = cloneDeep(row)
    data.value.dialogTableVisible = true;
    data.value.loading = false;
  } catch (error) {
  } finally {
    data.value.loading = false;
  }
};

// 提交数据
async function onSubmit() {
  data.value.loading = true;
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const { status } = await api.edit(data.value.formData);
      status === 1 &&
        ElMessage.success({
          message: "编辑成功",
          center: true,
        });
      emits("fetch-data");
      closeHandler();
    }
    data.value.loading = false;
  })
};

// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.formData = {}
};

// 暴露方法
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible" v-if="data.dialogTableVisible" :title="data.title + '编辑'" draggable>
      <el-form ref="formRef" :model="data.formData" :rules="data.rules" label-width="100" label-position="right">
        <template v-if="data.type === 'remark'">
          <el-form-item label="备注">
            <el-input maxlength="200" show-word-limit style="width: 100%" type="textarea" :rows="5"
              v-model="data.formData.remark" />
          </el-form-item>
        </template>

      </el-form>
      <template #footer>
        <el-button @click="closeHandler" :disabled="data.loading"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit" :disabled="data.loading"> 确定 </el-button>
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
