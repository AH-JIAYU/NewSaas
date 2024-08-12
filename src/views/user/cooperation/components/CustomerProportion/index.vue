<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const formRef = ref<any>(); // Ref
const data = ref<any>({
  form: {},
  rules: {
    priceRatio: [
      { required: true, message: "请输入价格比例", trigger: "blur" },
    ],
  },
});
// 显隐
async function showEdit(row: any) {
  data.value.form.id = row.id;
  data.value.form.priceRatio = row.priceRatio;
  drawerisible.value = true;
}

// 关闭
function close() {
  drawerisible.value = false;
  data.value.form = {};
  formRef.value.resetFields();
}

// // 确定
async function save() {
  formRef.value.validate((valid: any) => {
    if (valid) {
      api.updateInvitationBind(data.value.form).then(() => {
        ElMessage.success({
          message: "修改成功",
          center: true,
        });
        emit("fetch-data");
        close();
      });
    }
  });
}
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog
      v-model="drawerisible"
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      width="40%"
      title="价格比例"
    >
      <ElForm
        ref="formRef"
        :rules="data.rules"
        :model="data.form"
        label-width="100px"
      >
        <el-form-item label="价格比例" prop="priceRatio">
          <el-input v-model="data.form.priceRatio" clearable
            ><template #append>%</template></el-input
          >
        </el-form-item>
      </ElForm>

      <template #footer>
        <el-button @click="close"> 关闭 </el-button>
        <el-button type="primary" @click="save"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep {
  .el-dialog__body {
    min-height: 10rem !important;
  }
}
</style>
