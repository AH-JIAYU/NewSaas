<script setup lang="ts">
import type { DetailFormProps } from "../../types";
import { ElMessage } from "element-plus";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/otherFunctions_screenLibrary";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典

const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const props = defineProps(["id", "countryId", "row"]);
const countryList = ref<any>([]); //国家
const emits = defineEmits<{
  success: [];
}>();

const visible = defineModel<boolean>({
  default: false,
});
const title = ref<string>("新增");
const formRef = ref<any>();
const form = ref<any>({
  countryId: props.countryId,
  status: 2,
  isDefault: 2,
});
// 表单校验
const formRules = ref<any>({
  categoryName: [{ required: true, message: "请输入名称", trigger: "blur" }],
  countryId: [{ required: true, message: "请选择国家", trigger: "blur" }],
});
// 确定
async function onSubmit() {
  if (!props.id) {
    // 新增
    const { data, status } = await submitLoading(api.create(form.value));
    status === 1 &&
      ElMessage.success({
        message: "新增成功",
        center: true,
      });
  } else {
    // 编辑
    const { data, status } = await submitLoading(api.edit(form.value));
    status === 1 &&
      ElMessage.success({
        message: "编辑成功",
        center: true,
      });
  }
  onCancel();
  emits("success");
}
// 关闭
function onCancel() {
  visible.value = false;
  form.value = {};
}
onMounted(async () => {
  countryList.value = await basicDictionaryStore.getCountry();
  title.value = "新增";
  if (props.id) {
    title.value = "编辑";
    form.value = JSON.parse(props.row);
  }
});
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
      @close="onCancel"
    >
      <ElForm
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="120px"
        label-suffix="："
      >
        <ElFormItem label="名称" prop="categoryName">
          <ElInput v-model="form.categoryName" placeholder="请输入名称" />
        </ElFormItem>
        <ElFormItem label="国家" prop="countryId">
          <el-select filterable v-model="form.countryId" placeholder="Select">
            <ElOption
              v-for="item in countryList"
              :label="item.chineseName"
              :value="item.id"
            ></ElOption>
          </el-select>
        </ElFormItem>
        <ElFormItem label="状态">
          <ElSwitch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
            placeholder="请输入状态"
          />
        </ElFormItem>
        <ElFormItem label="默认" v-if="!form.projectProblemCategoryId">
          <ElSwitch
            v-model="form.isDefault"
            :active-value="1"
            :inactive-value="2"
            placeholder="请输入默认"
          />
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
