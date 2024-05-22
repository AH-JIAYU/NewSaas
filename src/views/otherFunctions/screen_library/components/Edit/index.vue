<script setup lang="ts">
import type { DetailFormProps } from "../../types";

const props = defineProps(["id", "row"]);

const emits = defineEmits<{
  success: [];
}>();

const visible = defineModel<boolean>({
  default: false,
});

const formRef = ref();
const form = ref<any>({
  id: props.id,
});
const formRules = ref<any>({
  title: [{ required: true, message: "请输入名称", trigger: "blur" }],
  country: [{ required: true, message: "请选择国家", trigger: "blur" }],
});

const title = computed(() => {
  form.value = {}; // 默认form为空
  if (props.id) {
    // 有id form为row
    form.value = JSON.parse(props.row);
  }
  return props.id === "" ? "新增" : "编辑";
});

function onSubmit() {
  // submit() 为组件内部方法
  formRef.value.submit().then(() => {
    emits("success");
    onCancel();
  });
}

function onCancel() {
  visible.value = false;
}
</script>

<template>
  <div>
    <ElDialog
      v-model="visible"
      :title="title"
      width="50%"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <ElForm
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="120px"
        label-suffix="："
      >
        <ElFormItem label="名称" prop="title">
          <ElInput v-model="form.title" placeholder="请输入名称" />
        </ElFormItem>
        <ElFormItem label="国家" prop="country">
          <ElSelect v-model="form.country" placeholder="请输入国家" />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElSwitch v-model="form.state" placeholder="请输入状态" />
        </ElFormItem>
        <ElFormItem label="默认">
          <ElSwitch v-model="form.default" placeholder="请输入默认" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton size="large" @click="onCancel"> 取消 </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确定
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>
