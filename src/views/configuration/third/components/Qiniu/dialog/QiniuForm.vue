<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import api from "@/api/modules/third";
import { ElMessage } from "element-plus";
defineOptions({
  name: "qiuniuForm",
});

const emits = defineEmits(["fetch-data"]);
const formRef = ref<any>();
const data = ref<any>({
  dialogTableVisible: false,
  title: "",
  type: "",
  loading: "",
  formData: {}, //表单
});

// 显隐
async function showEdit(FormType: any) {
  data.value.type = FormType;
  data.value.loading = false;
  data.value.dialogTableVisible = true;
}
// 输入框限制 只能输入数字
const handleInput = (value: any) => {
  // 允许数字键、删除键、退格键、方向键等
  if (value.key === ".") {
    value.preventDefault(); // 阻止非数字键输入
  }
};

// 提交数据
async function onSubmit() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      if (data.value.type == 1) {
        //七牛云
        const { status } = await api.updateQiniuConfig(data.value.formData);
        status === 1 &&
          ElMessage.success({
            message: "添加成功",
            center: true,
          });
      } else if (data.value.type == 2) {
        //阿里云
        const { status } = await api.updateAliConfig(data.value.formData);
        status === 1 &&
          ElMessage.success({
            message: "添加成功",
            center: true,
          });
      } else if (data.value.type == 3) {
        //腾讯云
        const { status } = await api.updateAliConfig(data.value.formData);
        status === 1 &&
          ElMessage.success({
            message: "添加成功",
            center: true,
          });
      }

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

onMounted(async () => {});

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
      title="添加存储空间"
      draggable
    >
      <el-form
        ref="formRef"
        :model="data.formData"
        label-width="120"
        label-position="right"
        :inline="false"
      >
        <!-- 七牛云 -->
        <template v-if="data.type == 1">
          <el-row :gutter="20">
            <el-col :span="24">
              <ElFormItem label="accessKeyId:">
                <ElInput
                  v-model="data.formData.accessKeyId"
                  placeholder="请输入accessKey"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="secretKey:">
                <ElInput
                  v-model="data.formData.secretKey"
                  placeholder="请输入secretKey"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="空间名称:">
                <ElInput
                  v-model="data.formData.domain"
                  placeholder="空间名称"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
          </el-row>
        </template>
        <!-- 阿里云 -->
        <template v-if="data.type == 2">
          <el-row :gutter="20">
            <el-col :span="24">
              <ElFormItem label="accessKeyId:">
                <ElInput
                  v-model="data.formData.accessKeyId"
                  placeholder="请输入accessKeyId"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="accessKeySecret:">
                <ElInput
                  v-model="data.formData.accessKeySecret"
                  placeholder="请输入accessKeySecret"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="空间名称:">
                <ElInput
                  v-model="data.formData.domain"
                  placeholder="空间名称"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="空间区域:">
                <ElInput
                  v-model="data.formData.region"
                  placeholder="空间区域"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
          </el-row>
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

.limitedQuantity {
  :deep(.el-form-item__label) {
    display: block !important;
    line-height: 20px !important;
    text-align: right;
  }
}

.text-left {
  text-align: left !important;

  :deep(.el-input__inner) {
    text-align: left;
  }
}
</style>
