<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import api from "@/api/modules/projectManagement";

defineOptions({
  name: "ProjeckEdit",
});
const projectManagementListStore = useProjectManagementListStore(); //项目
const stagedDataStore = useStagedDataStore(); // 暂存
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const emits = defineEmits(["fetch-data"]);
const formRef = ref<any>()
const data = ref<any>({
  dialogTableVisible: false,
  title: '',
  type: '',
  loading: '',
  formData: {},//表单
  customerList: [],//客户
  rules: {
    name: [
      { required: true, message: "请输入项目名称", trigger: "blur" },
      { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
    ],
    projectIdentification: [
      { max: 100, required: true, message: "请输入项目标识", trigger: "blur" },
      { min: 2, max: 100, message: "内容在2-100个字之间", trigger: "blur" },
    ],
    countryIdList: [
      {
        required: true,
        message: "请选择所属国家",
        trigger: "change",
      },
    ],
    clientId: [{ required: true, message: "请选择所属客户", trigger: "change" }],
    doMoneyPrice: [{ required: true, message: "请输入原价", trigger: "blur" }],
    num: [{ required: true, message: "请输入配额", trigger: "blur" }],
    minimumDuration: [
      { required: true, message: "请输入最小分长", trigger: "blur" },
    ],
    ir: [{ required: true, message: "请输入配额", trigger: "blur" }],
  }
});

const TypeList: any = {
  PCNL: '参数',
  customer: '客户',
  name: '名称/标识',
  doMoneyPrice: '原价',
  ir: "IR",
  remark: '备注',
};

// 显隐
async function showEdit(row: any, FormType: any) {
  data.value.title = TypeList[FormType]
  data.value.type = FormType
  try {
    data.value.loading = true;
    // 编辑返回的字段也一样，周二让刘改字段 	项目配额字段updateProjectQuotaInfoList getProjectQuotaInfoList
    const res = await api.detail({ projectId: row.projectId });
    // initializeLeftTabsData(res.data);
    data.value.formData = res.data
    data.value.dialogTableVisible = true;
    data.value.loading = false;
    // 存储变更前的数据
    projectManagementListStore.dataBeforeEditing = [cloneDeep(data.value.formData)]
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
  data.value.customerList = await customerStore.getCustomerList();
};
// 输入框限制 只能输入数字
const handleInput = (value: any) => {
  // 允许数字键、删除键、退格键、方向键等
  if (value.key === ".") {
    value.preventDefault(); // 阻止非数字键输入
  }
};
// 提交 处理数据
const processingData = async () => {
  const newLeftTabsData = cloneDeep(data.value.formData);
  await projectManagementListStore.compareProjectData(projectManagementListStore.dataBeforeEditing, [newLeftTabsData])
  return newLeftTabsData;
};
// 提交数据
async function onSubmit() {
  data.value.loading = true;
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const params = await processingData();
      const { status } = await api.edit(params);
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

// // 获取 客户 国家
const getList = async () => {
  await customerStore.getCustomerList();
  await basicDictionaryStore.getCountry();
};

onMounted(async () => {
  await getList();
});

// 暴露方法
defineExpose({
  showEdit,
});

</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible" v-if="data.dialogTableVisible" :title="data.title + '编辑'" draggable>
      <el-form ref="formRef" :model="data.formData" :rules="data.rules" label-width="100" label-position="right">
        <template v-if="data.type === 'PCNL'">
          <el-form-item label="配额" prop="num">
            <el-input-number style="width: 100%;" v-model="data.formData.num" :step="1" step-strictly :min="1"
              :max="100" controls-position="right" @keydown="handleInput" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <div>小时<span class="blue">完成</span>量</div>
            </template>
            <el-input-number style="width: 100%;" v-model="data.formData.limitedQuantity" :min="1" :step="1"
              step-strictly controls-position="right"   @keydown="handleInput" />
          </el-form-item>
        </template>

        <template v-if="data.type === 'customer'">
          <el-form-item label="所属客户" prop="clientId">
            <el-select placeholder="Select" v-model="data.formData.clientId" clearable>
              <el-option v-for=" (item) in data.customerList" :key="item.tenantCustomerId"
                :value="item.tenantCustomerId" :label="item.customerAccord" :disabled="item.isReveal === 1">
                <span style="float: left">{{ item.customerAccord }}</span>
                <span style="float: right; color: red; font-size: 13px" v-show="item.isReveal === 1">
                  <span v-show="item.turnover < item.practiceTurover">
                    营业额超限
                  </span>
                  <span v-show="item.rateAudit > item.practiceRateAudit">
                    审核率不合格
                  </span>
                </span>
              </el-option>
            </el-select>
          </el-form-item>
        </template>

        <template v-if="data.type === 'name'">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="data.formData.name" clearable :maxlength="50" />
          </el-form-item>
          <el-form-item label="项目标识" prop="projectIdentification">
            <el-input clearable v-model="data.formData.projectIdentification" :maxlength="100" />
          </el-form-item>
        </template>

        <template v-if="data.type === 'doMoneyPrice'">
          <el-form-item label="原价" prop="doMoneyPrice">
            <el-input-number style="width: 100%;" v-model="data.formData.doMoneyPrice" :min="1" :precision="1"
              :step="0.1" controls-position="right" />
          </el-form-item>
        </template>

        <template v-if="data.type === 'ir'">
          <el-form-item label="IR" prop="ir">
            <el-input v-model.number="data.formData.ir" :min="1" :max="100" step="0.01"
              oninput="if(value>100)value=100;if(value.length>4)value=value.slice(0,4);if(value<0)value=0;value=Number(value).toFixed(1)">
              <template #append> % </template>
            </el-input>
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
