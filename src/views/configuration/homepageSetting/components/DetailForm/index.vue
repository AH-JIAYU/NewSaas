<script setup lang="ts">
import type { FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import api from "@/api/modules/configuration_homepageSetting";

const props = withDefaults(defineProps<DetailFormProps>(), {
  id: "",
  row: "",
});

const loading = ref(false);
const formRef = ref<any>();
const form = ref({
  id: props.id,
  title: "",
  css: "",
  html: "",
  rawData: "",
});
const formRules = ref<FormRules>({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
});

onMounted(() => {
  try {
    loading.value = true;
    if (form.value.id !== "") {
      form.value = JSON.parse(props.row);
      loading.value = false;
    }
  } catch (error) {

  } finally {
    loading.value = false;
  }
});

defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      formRef.value.validate((valid: any) => {
        if (valid) {
          if (form.value.id === "") {
            try {
              loading.value = true;
              const { id, ...params } = form.value;
              api.create(params).then((res: any) => {
                loading.value = false;
                res.status === 1 &&
                  ElMessage.success({
                    message: "新增成功",
                    center: true,
                  });
                resolve();
              });
            } catch (error) {

            } finally {
              loading.value = false;
            }
          } else {
            try {
              loading.value = true;
              api.edit(form.value).then((res: any) => {
                loading.value = false;
                res.status === 1 &&
                  ElMessage.success({
                    message: "编辑成功",
                    center: true,
                  });
                resolve();
              });
            } catch (error) {

            } finally {
              loading.value = false;
            }

          }
        }
      });
    });
  },
});
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="120px" label-suffix="：">
      <ElFormItem label="标题" prop="title">
        <ElInput v-model="form.title" placeholder="请输入标题" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss</style>
@/api/modules/configuration_homepageSetting
