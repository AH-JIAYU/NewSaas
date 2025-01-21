<script setup lang="ts">
import api from "@/api/modules/projectManagement_scheduling";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "Edit",
});

// 国际化
const { t } = useI18n();

const emits = defineEmits(["fetch-data"]);

const formRef = ref<any>();
const rules = reactive<any>({
  projectId: [
    {
      required: true,
      message: computed(() => t("schedulingEdit.projectSelect")),
      trigger: "change",
    },
  ],
  dispatchType: [
    { required: true, message: "请选择调度类型", trigger: "change" },
  ],
  dataType: [{ required: true, message: "请选择调度目标", trigger: "change" }],
  groupSupplierId: [
    { required: true, message: "请选择至少一个", trigger: "change" },
  ],
  doMoneyPrice: [
    {
      required: true,
      message: computed(() => t("schedulingEdit.enterPrice")),
      trigger: "blur",
    },
    {
      pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,
      message: "请输入一个有效的数字，不能小于0，最多保留两位小数",
      trigger: "blur",
    },
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
  // 全选
  selectAll: {
    supplier: false, // 供应商
    member: false, // 会员
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
      data.form.groupSupplierId = row.getGroupSupplierIdNameInfoList.map(
        (item: any) => item.groupSupplierId,
      );
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
      api.getAllocationGroupOrSupplier({ projectId: val }),
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
          message: t("schedulingEdit.warning"),
          center: true,
        });
        return;
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
// 指定关闭
const sendProjectType = ref<any>(1);
//列表切换发送项目状态
const changeSendProjectType = (name: any, row: any) => {
  if (row) {
    if (name === "指定关闭") {
      sendProjectType.value = row;
      data.form.dispatchType = row;
    } else {
      sendProjectType.value = row;
      data.form.dispatchType = row;
    }
  }
};

// 供应商全选
function selectAllSupplier() {
  data.form.groupSupplierId = [];
  if (data.selectAll.supplier) {
    data.supplierNameInfoList.map((item: any) => {
      data.form.groupSupplierId.push(item.supplierId);
    });
  }
  filteredSupplier.value = data.supplierNameInfoList.filter((item: any) => {
    return data.form.groupSupplierId.includes(item.supplierId);
  });
}
// 内部站全选
function selectAllMember() {
  data.form.groupMemberId = [];
  if (data.selectAll.member) {
    data.memberGroupNameInfoList.map((item: any) => {
      data.form.groupMemberId.push(item.memberGroupId);
    });
  }
}

//供应商，调查站，合作商，没有数据时，跳转-暂时没做
const goRouter = (name: any) => {
  if (name == "供应商") {
    //供应商列表，新增供应商
  } else if (name == "内部站") {
    //调查系统-部门管理-新增部门
  }
};
// 选中的供应商list
const filteredSupplier = ref<any>([]);
//供应商勾选
const handleSupplierChange = (val: any) => {
  filteredSupplier.value = data.supplierNameInfoList.filter((item: any) => {
    return val.includes(item.supplierId);
  });
};

// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      :title="data.title"
      width="600"
      :before-close="closeHandler"
    >
      <!-- <el-form
        ref="formRef"
        label-width="104px"
        style="position: relative"
        :model="data.form"
        :rules="rules"
        :inline="false"
      >
        <el-form-item
          label="调度类型"
          prop="dispatchType"
          style="align-items: center"
        >
          <div style="margin-bottom: 0px">
            <el-button
              style="margin-right: 4px"
              :type="sendProjectType === 1 ? 'primary' : ''"
              size="small"
              @click="changeSendProjectType('指定关闭', 1)"
              >指定关闭
            </el-button>
            <el-tooltip
              class="tooltips"
              content="选中供应商或部门，该供应商或部门无法参与该项目"
              placement="top"
            >
              <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
            </el-tooltip>
            <el-button
              style="margin-left: 1.5rem; margin-right: 4px"
              :type="sendProjectType === 2 ? 'primary' : ''"
              size="small"
              @click="changeSendProjectType('指定价格', 2)"
              >指定价格</el-button
            >
            <el-tooltip
              class="tooltips"
              content="举例:(选中供应商为：A供应商；指定价格为：100美元)则，A供应商下参与该项目的会员价格为100美元，无需通过会员等级进行计算"
              placement="top"
            >
              <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item
          label="项目ID/名称"
          prop="projectId"
          v-if="data.title === '新增'"
        >
          <el-select
            placeholder=""
            v-model="data.form.projectId"
            clearable
            filterable
            @change="changeProject"
          >
            <el-option
              v-for="item in data.projectList"
              :key="item.projectId"
              :label="item.projectName"
              :value="item.projectId"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
              "
            >
              <span style="flex-shrink: 0">
                {{ item.projectName }}
              </span>
              <span
                style="
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                {{ item.projectType === 1 ? "内部新增" : "租户分配" }}
              </span>
              <span
                style="
                  flex-shrink: 0;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
              >
                {{ item.projectId }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <div v-show="data.form.projectId">
          <el-form-item label="供应商">
            <template #label>
              <span class="icon-class">
                <img
                  src="@/assets/images/gong.png"
                  style="margin-right: 0.25rem"
                />
                供应商</span
              >
            </template>
            <el-select
              v-model="data.form.groupSupplierId"
              clearable
              filterable
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="8"
              placeholder=""
              @change="handleSupplierChange"
            >
              <template #header>
                <el-checkbox
                  v-model="data.selectAll.supplier"
                  @change="selectAllSupplier"
                  style="display: flex; height: unset"
                  >全选</el-checkbox
                >
              </template>
              <template #prefix>
                <span
                  class="prefix-class"
                  v-if="data.supplierNameInfoList.length == 0"
                  @click="goRouter('供应商')"
                >
                  请先维护供应商数据
                  <img
                    src="@/assets/images/jiantou.png"
                    alt=""
                    style="margin-left: 0.25rem"
                  />
                </span>
                <span v-if="data.form.groupSupplierId.length == 0"
                  >请先选择供应商数据</span
                >
              </template>
              <el-option
                v-for="item in data.supplierNameInfoList"
                :key="item.projectId"
                :label="item.supplierName"
                :value="item.supplierId"
            /></el-select>
          </el-form-item>
          <div
            v-if="
              data.form.dispatchType === 2 &&
              data.form.groupSupplierId.length != 0
            "
          >
            <div v-for="item in filteredSupplier" :key="item.id" class="user">
              <el-form-item :label="item.supplierName" prop="doMoneyPrice1">
                <el-input
                  placeholder="请输入调度价格"
                  v-model="data.form.doMoneyPrice1"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <el-form-item>
            <template #label>
              <span class="icon-class">
                <img
                  src="@/assets/images/nei.png"
                  style="margin-right: 0.25rem"
                />
                内部站
              </span>
            </template>
            <el-select
              placeholder=""
              v-model="data.form.groupMemberId"
              filterable
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="8"
            >
              <template #header>
                <el-checkbox
                  v-model="data.selectAll.member"
                  @change="selectAllMember"
                  style="display: flex; height: unset"
                  >全选</el-checkbox
                >
              </template>
              <template #prefix>
                <span
                  class="prefix-class"
                  v-if="data.memberGroupNameInfoList.length == 0"
                  @click="goRouter('内部站')"
                >
                  请先维护内部站数据
                  <img
                    src="@/assets/images/jiantou.png"
                    alt=""
                    style="margin-left: 0.25rem"
                  />
                </span>
                <span v-if="data.form.groupMemberId.length == 0"
                  >请先选择内部站数据</span
                >
              </template>
              <el-option
                v-for="item in data.memberGroupNameInfoList"
                :key="item.projectId"
                :label="item.memberGroupName"
                :value="item.memberGroupId"
            /></el-select>
          </el-form-item>
          <el-form-item
            v-if="
              data.form.dispatchType === 2 &&
              data.form.groupMemberId.length != 0
            "
            label="调度价格"
            prop="doMoneyPrice2"
          >
            <el-input
              placeholder="请输入调度价格"
              v-model="data.form.doMoneyPrice2"
              clearable
            />
          </el-form-item>
        </div>
      </el-form> -->
      <el-form
        ref="formRef"
        label-width="104px"
        style="position: relative"
        :model="data.form"
        :rules="rules"
        :inline="false"
      >
        <el-form-item
          :label="t('schedulingEdit.types')"
          prop="dispatchType"
          style="align-items: center"
        >
          <el-radio-group v-model="data.form.dispatchType" class="ml-4">
            <el-radio :value="1" size="large">
              {{ t("schedulingEdit.assignmentOff") }}
              <el-tooltip
                class="tooltips"
                :content="t('schedulingEdit.tip1')"
                placement="top"
              >
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip>
            </el-radio>
            <el-radio :value="2" size="large">
              {{ t("schedulingEdit.specifiedPrice") }}
              <el-tooltip
                class="tooltips"
                :content="t('schedulingEdit.tip2')"
                placement="top"
              >
                <SvgIcon
                  class="SvgIcon1"
                  name="i-ri:question-line"
                /> </el-tooltip
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="t('schedulingEdit.projectIDName')"
          prop="projectId"
          v-if="data.title === '新增'"
        >
          <el-select
            placeholder=""
            v-model="data.form.projectId"
            clearable
            filterable
            @change="changeProject"
          >
            <el-option
              v-for="item in data.projectList"
              :key="item.projectId"
              :label="item.projectName"
              :value="item.projectId"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
              "
            >
              <span style="flex-shrink: 0">
                {{ item.projectName }}
              </span>
              <span
                style="
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                {{
                  item.projectType === 1
                    ? t("schedulingEdit.internalAddition")
                    : t("schedulingEdit.tenantAllocation")
                }}
              </span>
              <span
                style="
                  flex-shrink: 0;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
              >
                {{ item.projectId }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <div v-show="data.form.projectId">
          <el-form-item
            prop="dataType"
            label="调度目标"
            style="align-items: center"
            v-show="
              data.supplierNameInfoList.length &&
              data.memberGroupNameInfoList.length
            "
          >
            <el-radio-group
              v-model="data.form.dataType"
              class="ml-4"
              @change="chagneDataType"
            >
              <el-radio :value="1" size="large"> 供应商 </el-radio>
              <el-radio :value="2" size="large"> 内部站 </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="供应商"
            prop="groupSupplierId"
            v-if="
              data.supplierNameInfoList.length &&
              data.form.dataType &&
              data.form.dataType === 1
            "
          >
            <el-select
              placeholder=""
              v-model="data.form.groupSupplierId"
              clearable
              filterable
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in data.supplierNameInfoList"
                :key="item.projectId"
                :label="item.supplierName"
                :value="item.supplierId"
            /></el-select>
          </el-form-item>

          <el-form-item
            label="部门"
            prop="groupSupplierId"
            v-if="
              data.memberGroupNameInfoList.length &&
              data.form.dataType &&
              data.form.dataType === 2
            "
          >
            <el-select
              placeholder=""
              v-model="data.form.groupSupplierId"
              clearable
              filterable
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in data.memberGroupNameInfoList"
                :key="item.projectId"
                :label="item.memberGroupName"
                :value="item.memberGroupId"
            /></el-select>
          </el-form-item>
        </div>
        <el-form-item
          v-if="data.form.dispatchType === 2"
          :label="t('schedulingEdit.specifiedPrice')"
          prop="doMoneyPrice"
        >
          <el-input placeholder="" v-model="data.form.doMoneyPrice" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeHandler">
            {{ t("schedulingEdit.cancel") }}
          </el-button>
          <el-button type="primary" @click="onSubmit">
            {{ t("schedulingEdit.confirm") }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
/* 修改选中后的标签样式 */
:deep(.el-tag.el-tag--info) {
  background: #e7f3ff;
  border-radius: 4px 4px 4px 4px;
  font-size: 14px;
  font-weight: 400;
  font-size: 12px;
  color: #409eff;
  line-height: 14px;
}
/* 更改省略号的样式 */
:deep(.el-tag.el-tag--info .el-tag__close) {
  color: #409eff;
}
.prefix-class {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409eff;
  cursor: pointer;
}
.icon-class {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltips {
  margin: 0 5px;
}
</style>
