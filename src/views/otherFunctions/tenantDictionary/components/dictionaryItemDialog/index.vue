<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/tenantDictionary";
// 父级传递的数据
const props = withDefaults(
  defineProps<{
    catalogueId: string | number;
    parentId: string | number;
    id?: string | number;
    tree: any[];
    dataList: any[];
    row: string;
    level: any;
  }>(),
  {
    catalogueId: "",
    parentId: "",
    id: "",
    level: 1,
  }
);
// 更新数据
const emits = defineEmits<{
  success: [];
}>();

const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() => (props.id === "" ? "新增字典项" : "编辑字典项"));

const formRef = ref<FormInstance>();
const flat = ref([]); // 扁平化
// 表单
const form = ref<any>({
  id: props.id,
  parentId: props.parentId, // 父id
  catalogueId: props.catalogueId, // 目录id
  englishName: "", // 英文名称
  chineseName: "", // 中文名称
  code: "", // 编码
  remark: "", // 备注
  level: props.level,
});
// 校验
const formRules = ref<FormRules>({
  catalogueId: [{ required: true, message: "请选择所属字典" }],
  chineseName: [{ required: true, message: "请输入字典项名称" }],
  englishName: [{ required: true, message: "请输入字典项英文名称" }],
  code: [{ required: true, message: "请输入字典项键值" }],
});

// 设置level
const setLevel = (id: any) => {
  if (id) {
    const row: any = flat.value.find((item: any) => item.id === id);
    form.value.level = Number(row.level) + 1;
  } else {
    form.value.level = 1;
  }
};
// 提交数据
function onSubmit() {
  if (form.value.id === "") {
    formRef.value &&
      formRef.value.validate((valid) => {
        if (valid) {
          api.itemcreate(form.value).then(() => {
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
            emits("success");
            onCancel();
          });
        }
      });
  } else {
    formRef.value &&
      formRef.value.validate((valid) => {
        if (valid) {
          api.itemedit(form.value).then(() => {
            ElMessage.success({
              message: "编辑成功",
              center: true,
            });
            emits("success");
            onCancel();
          });
        }
      });
  }
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
  if (props.id !== "" && props.row) {
    form.value = JSON.parse(props.row);
  }
  flat.value = flattenDeep(props.dataList);
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
    <ElForm
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="8.25rem"
    >
      <ElFormItem label="所属字典">
        <ElCascader
          v-model="form.catalogueId"
          :options="props.tree"
          clearable
          :props="{
            value: 'id',
            label: 'chineseName',
            emitPath: false,
            checkStrictly: true,
          }"
          :show-all-levels="false"
          placeholder="请选择所属字典"
        />
      </ElFormItem>
      <ElFormItem label="选择父级">
        <ElCascader
          v-model="form.parentId"
          :options="props.dataList"
          clearable
          :props="{
            value: 'id',
            label: 'chineseName',
            emitPath: false,
            checkStrictly: true,
          }"
          :show-all-levels="false"
          placeholder="请选择所属父级"
          @change="setLevel"
        />
      </ElFormItem>
      <ElFormItem label="中文名称" prop="chineseName">
        <ElInput
          v-model="form.chineseName"
          placeholder="请输入中文名称"
          clearable
        />
      </ElFormItem>
      <ElFormItem label="英文名称" prop="englishName">
        <ElInput
          v-model="form.englishName"
          placeholder="请输入英文名称"
          clearable
        />
      </ElFormItem>
      <ElFormItem label="字典项键值" prop="code">
        <template #default="scope">
          <el-button size="small" plain>
            {{ scope.row.code }}
          </el-button>
        </template>
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
