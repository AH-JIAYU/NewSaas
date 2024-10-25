<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/tenantDictionary";
// 父级传递的数据
const props = withDefaults(
  defineProps<{
    parentId?: string | number;
    id?: string | number;
    tree: any[];
    row: string;
  }>(),
  {
    parentId: "",
    id: "",
  }
);
// 更新数据
const emits = defineEmits<{
  getList: any;
}>();

const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() => (props.id === "" ? "新增字典" : "编辑字典"));

const formRef = ref<FormInstance>();
const flat = ref([]);
// 表单
const form = ref<any>({
  tenantCatalogueId: props.parentId,
  id: props.id,
  englishName: "",
  chineseName: "",
  code: "",
  remark: "",
  level: 1,
});
// 校验
const formRules = ref<FormRules>({
  chineseName: [{ required: true, message: "请输入中文名称" }],
  englishName: [{ required: true, message: "请输入英文名称" }],
  code: [{ required: true, message: "请输入编码" }],
});
// 设置level
const setLevel = (id: any) => {
  const row: any = flat.value.find((item: any) => item.id === id);
  form.value.level = Number(row.level) + 1;
};

// 提交数据
async function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid) => {
      if (valid) {
        if (form.value.id === "") {
          const { status } = await api.create(form.value);
          status === 1 &&
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
        } else {
          const { status } = await api.edit(form.value);
          status === 1 &&
            ElMessage.success({
              message: "编辑成功",
              center: true,
            });
        }
        await emits("getList");
        onCancel();
      }
    });
}
// 关闭弹框
function onCancel() {
  visible.value = false;
}
// 处理数据扁平化
const flattenDeep = (arr: any) => {
  return arr.reduce(
    (acc: any, val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
};
onMounted(() => {
  if (props.id !== "") {
    const { id, englishName, chineseName,code,remark } = JSON.parse(props.row);
    form.value.id = id;
    form.value.chineseName = chineseName;
    form.value.englishName = englishName;
    form.value.code = code;
    form.value.remark = remark;
  }
  flat.value = flattenDeep(props.tree);
});
</script>

<template>
  <ElDialog
    v-model="visible"
    :title="title"
    width="25rem"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
    @closed="onCancel"
  >
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="7rem">
      <ElFormItem label="所属字典" prop="parentId">
        <ElCascader
          v-model="form.tenantCatalogueId"
          :options="props.tree"
          :props="{
            value: 'id',
            label: 'name',
            emitPath: false,
            checkStrictly: true,
          }"
          :show-all-levels="false"
          placeholder="请选择父级字典，默认为根字典"
          clearable
          @change="setLevel"
        />
      </ElFormItem>
      <ElFormItem label="中文" prop="chineseName">
        <ElInput
          v-model="form.chineseName"
          placeholder="请输入中文名称"
          clearable
        />
      </ElFormItem>
      <ElFormItem label="英文" prop="englishName">
        <ElInput
          v-model="form.englishName"
          placeholder="请输入英文名称"
          clearable
        />
      </ElFormItem>
      <ElFormItem label="字典编码" prop="code">
        <ElInput v-model="form.code" placeholder="请输入字典编码" clearable />
      </ElFormItem>
      <ElFormItem label="备注">
        <ElInput v-model="form.remark" placeholder="请输入备注" clearable />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton size="large" @click="onCancel"> 取消 </ElButton>
      <ElButton type="primary" size="large" @click="onSubmit"> 确定 </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 100%;
}
</style>
