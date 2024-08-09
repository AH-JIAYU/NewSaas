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
const title = computed(() => (props.id === "" ? "新增用户" : "编辑用户"));

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
  userName: [{ required: true, message: "请输入用户名" }],
  name: [{ required: true, message: "请输入姓名" }],
  englishName: [{ required: true, message: "请输入字典项英文名称" }],
  code: [{ required: true, message: "请选择职位" }],
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
  <ElDrawer
    v-model="visible"
    :title="title"
    size="60%"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
    @closed="onCancel"
  >
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="100px">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="用户名:" prop="userName">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位:"prop="code">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">角色信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="用户名:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">小组信息<span style="margin-left: 20px;font-size: 14px;">负责人:迪迦</span></div>
          </div>

        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="用户名:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位:">
              <el-input v-model="form.code" placeholder=""  clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </ElForm>
    <template #footer>
      <ElButton size="large" @click="onCancel"> 取消 </ElButton>
      <ElButton type="primary" size="large" @click="onSubmit"> 确定 </ElButton>
    </template>
  </ElDrawer>
</template>

<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 100%;
}
</style>
