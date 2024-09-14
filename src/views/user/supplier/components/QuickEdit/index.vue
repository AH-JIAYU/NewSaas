<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import useConfigurationSupplierLevelStore from "@/store/modules/configuration_supplierLevel";
import api from "@/api/modules/user_supplier";

defineOptions({
  name: "ProjeckEdit",
});

const configurationSupplierLevelStore = useConfigurationSupplierLevelStore();
const emits = defineEmits(["fetch-data"]);
const formRef = ref<any>()
const data = ref<any>({
  dialogTableVisible: false,
  title: '',
  type: '',
  loading: '',
  formData: {},//表单
  supplierLevelList: [],//供应商等级
  rules: {
    supplierAccord: [
      { required: true, message: "请输入供应商名称", trigger: "blur" },
      { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
    ],
    memberLevelId: [
      { required: true, message: "请选择会员等级", trigger: "change" },
    ],
    subordinateCountryId: [
      { required: true, message: "请选择国家", trigger: "change" },
    ],
    supplierLevelId: [
      { required: true, message: "请选择供应商等级", trigger: "change" },
    ],
    type: [
      { required: true, message: "请选择供应商类型", trigger: "change" },
    ],
  }
});

const TypeList: any = {
  supplierAccord: '供应商名称',
  supplierLevelId: '供应商等级',
  settlementCycle: '结算周期',
  remark: '备注',
};

// 显隐
async function showEdit(row: any, FormType: any) {
  data.value.title = TypeList[FormType]
  data.value.type = FormType
  data.value.dialogTableVisible = true;
  data.value.loading = true;
  const res = await api.detail({
    tenantSupplierId: row.tenantSupplierId,
  });
  data.value.formData = res.data
  data.value.formData.countryType = data.value.formData.subordinateCountryId === "343" ? 1 : 2;

  data.value.loading = false;
};


// 提交数据
async function onSubmit() {
  data.value.loading = true;
  formRef.value.validate(async (valid: any) => {
    if (valid) { 
      const { status } = await api.edit(data.value.formData);
      status === 1 &&
        ElMessage.success({
          message: "编辑成功",
          center: true,
        });
      emits("fetch-data");
      closeHandler();
    }
    data.value.loading = false;
  })
};
// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.formData = {}
};


onMounted(async () => {
  data.value.supplierLevelList =
    await configurationSupplierLevelStore.getLevelNameList();
})
// 暴露方法
defineExpose({
  showEdit,
});

</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible" v-if="data.dialogTableVisible" :title="data.title + '编辑'" draggable>
      <el-form ref="formRef" :model="data.formData" :rules="data.rules" label-width="100" label-position="right">
        <template v-if="data.type === 'supplierAccord'">
          <el-form-item label="供应商名称" prop="supplierAccord">
            <el-input v-model="data.formData.supplierAccord" clearable />
          </el-form-item>
        </template>
        <template v-if="data.type === 'supplierLevelId'">
          <el-form-item label="供应商等级" prop="supplierLevelId">
            <el-select clearable filterable v-model="data.formData.supplierLevelId">
              <el-option v-for="item in data.supplierLevelList" :key="item.tenantSupplierLevelId"
                :value="item.tenantSupplierLevelId" :label="item.levelNameOrAdditionRatio"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <template v-if="data.type === 'settlementCycle'">
          <el-form-item label="结算周期">
            <el-select v-model="data.formData.settlementCycle">
              <el-option label="net 30" :value="30"></el-option>
              <el-option label="net 60" :value="60"></el-option>
            </el-select>
          </el-form-item>
        </template>

        <template v-if="data.type === 'remark'">
          <el-form-item label="备注">
            <el-input maxlength="200" show-word-limit style="width: 100%" type="textarea" :rows="5"
              v-model="data.formData.remark" />
          </el-form-item>
        </template>

      </el-form>
      <template #footer>
        <el-button @click="closeHandler" :disabled="data.loading"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit" :disabled="data.loading"> 确定 </el-button>
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
</style>
