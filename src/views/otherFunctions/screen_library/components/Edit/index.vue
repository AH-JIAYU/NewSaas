<script setup lang="ts">
import type { DetailFormProps } from "../../types";
import DetailForm from "../DetailForm/index.vue";

const props = defineProps<
  {
    mode: "dialog" | "drawer";
  } & DetailFormProps
>();

const emits = defineEmits<{
  success: [];
}>();

const visible = defineModel<boolean>({
  default: false,
});

const formRef = ref();
const form = ref({
  id: props.id,
  title: '',
  detail:'',
})
const formRules = ref<any>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
})

const title = computed(() => (props.id === "" ? "新增筛选库" : "编辑筛选库"));

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
      width="80%"
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
        <ElFormItem label="标题" prop="title">
          <ElInput v-model="form.title" placeholder="请输入标题" />
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
