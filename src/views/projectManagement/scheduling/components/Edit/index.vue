<script setup lang="ts">
import api from "@/api/modules/projectManagement_scheduling";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";

defineOptions({
  name: "Edit",
});

const emits = defineEmits(["fetch-data"]);

const formRef = ref<any>();
const rules = reactive<any>({
  projectId: [{ required: true, message: "请选择项目", trigger: "change" }],
  dispatchType: [
    { required: true, message: "请选择调度类型", trigger: "change" },
  ],
  dataType: [{ required: true, message: "请选择调度目标", trigger: "change" }],
  groupSupplierId: [
    { required: true, message: "请选择至少一个", trigger: "change" },
  ],
  doMoneyPrice: [
    { required: true, message: "请输入金额", trigger: "blur" },
    { pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/, message: '请输入一个有效的数字，不能小于0，最多保留两位小数', trigger: 'blur' }
  ],
});
// 弹框开关变量
const dialogTableVisible = ref(false);
const data = reactive<any>({
  title: "", // 标题
  projectList: [], // 项目列表
  memberGroupNameInfoList: [], // 部门
  supplierNameInfoList: [], // 供应商
  form: {
    projectId: "", //	项目id
    groupSupplierId: [], // 供应商或者部门id
    dataType: "", // 数据类型:1:供应商 2:部门
    dispatchType: 1, // 	调度类型:1:指定关闭 2:指定价格
    doMoneyPrice: "", // 	价格(状态为指定价格时候才有),指定关闭不传
  },
});

// 显隐
async function showEdit(row: any, view?: any) {
  const res = await obtainLoading(api.getProjectList({}));
  // 获取未调度的项目列表
  data.projectList = res.data.getNotDispatchProjectInfoList;
  if (!view) {
    if (row) {
      data.title = "编辑";
      data.form = cloneDeep(row);
      data.form.groupSupplierId = row.getGroupSupplierIdNameInfoList.map((item: any) => item.groupSupplierId)
      await changeProject(row.projectId);
    } else {
      data.title = "新增";
    }
    dialogTableVisible.value = true;
  } else {
    if (row.isDispatch === 1) {
      ElMessage.warning({
        message: "该项目已经调度，请前往「项目调度」进行编辑",
        center: true,
      });
    } else {
      data.title = "新增";
      data.form.projectId = row.projectId;
      await changeProject(row.projectId);
      dialogTableVisible.value = true;
    }
  }
}
// 切换项目
const changeProject = async (val: any) => {
  if (val) {
    const res = await obtainLoading(
      api.getAllocationGroupOrSupplier({ projectId: val })
    );
    data.memberGroupNameInfoList =
      res.data.getAllocationMemberGroupNameInfoList;
    data.supplierNameInfoList = res.data.getAllocationSupplierNameInfoList;
    if (
      data.supplierNameInfoList.length &&
      !data.memberGroupNameInfoList.length
    )
      data.form.dataType = 1;
    if (
      !data.supplierNameInfoList.length &&
      data.memberGroupNameInfoList.length
    )
      data.form.dataType = 2;
  }
};
// 切换调度目标
const chagneDataType = () => {
  data.form.groupSupplierId = [];
  formRef.value.clearValidate(["groupSupplierId"]);
};
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  data.form = {
    projectId: "", //	项目id
    groupSupplierId: [], // 供应商或者部门id
    dataType: "", // 数据类型:1:供应商 2:部门
    dispatchType: 1, // 	调度类型:1:指定关闭 2:指定价格
    doMoneyPrice: "", // 	价格(状态为指定价格时候才有),指定关闭不传
  };
  dialogTableVisible.value = false;
}
// 提交数据
function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      if (!data.form.dataType) {
        ElMessage.warning({
          message: "请先维护基础数据，供应商数据和内部站部门数据",
          center: true,
        });
        return
      }
      if (valid) {
        if (data.title === "新增") {
          const { status } = await submitLoading(api.create(data.form));
          status === 1 &&
            ElMessage.success({
              message: "新增成功",
            });
        } else {
          const { status } = await submitLoading(api.edit(data.form));
          status === 1 &&
            ElMessage.success({
              message: "修改成功",
            });
        }
        closeHandler();
        emits("fetch-data");
      }
    });
}
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" :title="data.title" width="600" :before-close="closeHandler">
      <el-form ref="formRef" label-width="104px" style="position: relative" :model="data.form" :rules="rules"
        :inline="false">
        <el-form-item label="调度类型" prop="dispatchType" style="align-items: center">
          <el-radio-group v-model="data.form.dispatchType" class="ml-4">
            <el-radio :value="1" size="large"> 指定关闭 <el-tooltip class="tooltips" content="选中供应商或部门，该供应商或部门无法参与该项目"
                placement="top">
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip> </el-radio>
            <el-radio :value="2" size="large"> 指定价格 <el-tooltip class="tooltips"
                content="举例:(选中供应商为：A供应商；指定价格为：100美元)则，A供应商下参与该项目的会员价格为100美元，无需通过会员等级进行计算" placement="top">
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目ID/名称" prop="projectId" v-if="data.title === '新增'">
          <el-select placeholder="" v-model="data.form.projectId" clearable filterable @change="changeProject">
            <el-option v-for="item in data.projectList" :key="item.projectId" :label="item.projectName"
              :value="item.projectId"
              style="display: flex; justify-content: space-between; align-items: center; position: relative;">
              <span style="flex-shrink: 0;">
                {{ item.projectName }}
              </span>
              <span style="position: absolute; left: 50%; transform: translateX(-50%);">
                {{ item.projectType === 1 ? '内部新增' : '租户分配' }}
              </span>
              <span style="flex-shrink: 0; color: var(--el-text-color-secondary); font-size: 13px;">
                {{ item.projectId }}
              </span>

            </el-option>
          </el-select>
        </el-form-item>
        <div v-show="data.form.projectId">
          <el-form-item prop="dataType" label="调度目标" style="align-items: center" v-show="data.supplierNameInfoList.length &&
      data.memberGroupNameInfoList.length
      ">
            <el-radio-group v-model="data.form.dataType" class="ml-4" @change="chagneDataType">
              <el-radio :value="1" size="large"> 供应商 </el-radio>
              <el-radio :value="2" size="large"> 内部站 </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="供应商" prop="groupSupplierId" v-if="data.supplierNameInfoList.length &&
      data.form.dataType &&
      data.form.dataType === 1
      ">
            <el-select placeholder="" v-model="data.form.groupSupplierId" clearable filterable multiple collapse-tags>
              <el-option v-for="item in data.supplierNameInfoList" :key="item.projectId" :label="item.supplierName"
                :value="item.supplierId" /></el-select>
          </el-form-item>

          <el-form-item label="部门" prop="groupSupplierId" v-if="data.memberGroupNameInfoList.length &&
      data.form.dataType &&
      data.form.dataType === 2
      ">
            <el-select placeholder="" v-model="data.form.groupSupplierId" clearable filterable multiple collapse-tags>
              <el-option v-for="item in data.memberGroupNameInfoList" :key="item.projectId"
                :label="item.memberGroupName" :value="item.memberGroupId" /></el-select>
          </el-form-item>
        </div>
        <el-form-item v-if="data.form.dispatchType === 2" label="指定价格" prop="doMoneyPrice">
          <el-input placeholder="" v-model="data.form.doMoneyPrice" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeHandler"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
