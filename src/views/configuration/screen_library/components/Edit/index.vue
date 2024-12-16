<script setup lang="ts">
import type { DetailFormProps } from "../../types";
import { ElMessage } from "element-plus";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/otherFunctions_screenLibrary";
//基础字典
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
// 暂存
import useStagedDataStore from "@/store/modules/stagedData";

//基础字典
const basicDictionaryStore = useBasicDictionaryStore();
// 暂存
const stagedDataStore = useStagedDataStore();
// 父级传递数据
const props = defineProps(["id", "countryId", "row"]);
//区域
const countryList = ref<any>([]);
const emits = defineEmits<{
  success: [];
}>();
// 开关事件
const visible = defineModel<boolean>({
  default: false,
});
// 标题
const title = ref<string>("新增");
const formRef = ref<any>();
// 定义表单
const form = ref<any>({
  countryId: props.countryId,
  status: 2,
  isDefault: 2,
});

// 表单校验
const formRules = ref<any>({
  categoryName: [{ required: true, message: "请输入名称", trigger: "blur" }],
  countryId: [{ required: true, message: "请选择区域", trigger: "blur" }],
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
  stagedDataStore.projectManagementList = null;
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
    <ElDialog v-model="visible" :title="title" width="50%" :close-on-click-modal="false" append-to-body destroy-on-close
      @close="onCancel">
      <ElForm ref="formRef" :model="form" :rules="formRules" label-width="5.5rem">
        <ElFormItem label="区域" prop="countryId">
          <el-select filterable v-model="form.countryId" placeholder="Select">
            <ElOption v-for="item in countryList" :label="item.chineseName" :value="item.id"></ElOption>
          </el-select>
        </ElFormItem>
        <ElFormItem label="问卷标题" prop="categoryName">
          <ElInput v-model="form.categoryName" placeholder="请输入名称" />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElSwitch v-model="form.status" :active-value="1" :inactive-value="2" placeholder="请输入状态" />
        </ElFormItem>
        <ElFormItem label="默认" v-if="!form.projectProblemCategoryId">
          <ElSwitch v-model="form.isDefault" :active-value="1" :inactive-value="2" placeholder="请输入默认" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton  @click="onCancel"> 取消 </ElButton>
        <ElButton type="primary"  @click="onSubmit">
          确定
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>
