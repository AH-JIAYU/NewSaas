<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/projectManagement_materials";


defineOptions({
  name: "ProjeckEdit",
});

const emits = defineEmits(['fetch-data'])

const data = ref<any>({
  dialogTableVisible: false,
  title: '',
  formDataChange: false,
  loading: false,
  formData: {},//表单

});
let stopWatch: any
// 显隐
async function showEdit(row: any) {
  data.value.dialogTableVisible = true;
  data.value.loading = false;
  data.value.formDataChange = false;
  const { id, instructions } = row
  data.value.formData = { id, instructions }

  stopWatch = watch(
    () => data.value.formData.instructions,
    (newVal) => { 
      data.value.formDataChange = true;
    }
  );
};


// 提交数据
async function onSubmit() {
  data.value.loading = true;
  //  如果改变了再走接口
  if (data.value.formDataChange) {
    const { status } = await api.changeRemark(data.value.formData);
    status === 1 &&
      ElMessage.success({
        message: "编辑成功",
        center: true,
      });
    emits("fetch-data");
  }
  closeHandler();
  data.value.loading = false;
};
// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.formDataChange = false
  data.value.formData = {}
  stopWatch()
};





// 暴露方法
defineExpose({
  showEdit,
});

</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible" v-if="data.dialogTableVisible" :title="data.title + '编辑'" draggable>
      <el-form ref="formRef" :model="data.formData" label-width="100" label-position="right">
        <el-form-item label="备注">
          <el-input maxlength="200" show-word-limit style="width: 100%" type="textarea" :rows="5"
            v-model="data.formData.instructions" />
        </el-form-item>
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
