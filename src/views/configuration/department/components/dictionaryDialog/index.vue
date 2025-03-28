<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/department";
import apiUse from "@/api/modules/configuration_manager";
import { useI18n } from "vue-i18n";

// 国际化
const { t } = useI18n();
// 用户数据
const staffList = ref<any>([]);
// 父级传递的数据
const props = withDefaults(
  defineProps<{
    parentId?: string | number;
    id?: string | number;
    tree: any[];
    row: string;
    isClick: boolean;
  }>(),
  {
    parentId: "",
    id: "",
  },
);
// 判断用户是否点击部门更新接口
const isClick = ref(false);
// 计提时间
const commissionTypeList = [
  {
    label: t("configuration.department.new.completeProvision"),
    value: 1,
  },
  {
    label: t("configuration.department.new.auditAccrual"),
    value: 2,
  },
  {
    label: t("configuration.department.new.settlementProvision"),
    value: 3,
  },
];
// 计提方式
const provisionMethod = [
  {
    label: t("configuration.department.new.atProjectPrice"),
    value: 1,
  },
  {
    label: t("configuration.department.new.atcostPrice"),
    value: 2,
  },
  {
    label: t("configuration.department.new.grossProfit"),
    value: 3,
  },
];
// loading
const loading = ref<any>(false);
// 更新数据
const emits = defineEmits(["getList", "getItmelist"]);
// 弹窗开关
const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() =>
  props.id === ""
    ? t("configuration.department.new.add")
    : t("configuration.department.new.edit"),
);
// 部门PMlist
const filteredUsers = ref<any>([]);
// formRef
const formRef = ref<FormInstance>();
// 表单
const form = ref<any>({
  // 父级id
  parentId: props.parentId,
  // 名称
  name: "",
  // 备注
  remark: "",
  // 部门人员
  userIdList: [],
  // 组织架构人员
  organizationalStructurePersonList: [],
  //提成比例
  commission: null,
  //提成时间 1.完成计提 2.审核计提 3.收款计提
  commissionTime: null,
  //	提成状态 1.开启计提规则 2.关闭计提规则
  commissionStatus: 2,
  //提成类型 1.项目价 2.成本价 3.毛利润
  commissionType: null,
});

// 校验
const formRules = ref<FormRules>({
  name: [
    {
      required: true,
      message: t("configuration.department.new.enterDepartmentName"),
    },
  ],
  commissionType: [
    {
      required: true,
      message: t("configuration.department.new.selectAccrualMethod"),
      trigger: "change",
    },
  ],
});

// 提交数据
async function onSubmit() {
  try {
    formRef.value &&
      (await formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          // 将数据制空
          form.value.organizationalStructurePersonList = [];
          if (
            form.value.commissionStatus === 1 &&
            !/^[1-9]\d*$/.test(form.value.commission)
          ) {
            ElMessage.warning({
              message: t("configuration.department.new.rate"),
              center: true,
            });
            loading.value = false;
            return;
          }
          form.value.commission = form.value.commission
            ? form.value.commission
            : 0;
          form.value.commissionTime = form.value.commissionTime
            ? form.value.commissionTime
            : 1;
          form.value.commissionType = form.value.commissionType
            ? form.value.commissionType
            : 1;
          // 处理数据
          form.value.userIdList.map((item: any) => {
            const obj = {
              userId: item,
            };
            form.value.organizationalStructurePersonList.push(obj);
          });
          const params = {
            ...form.value,
          };
          // 删除多余的数据
          delete params.userIdList;
          let response;
          if (!form.value.id) {
            response = await api.create(params);
          } else {
            response = await api.edit(params);
          }
          const { status } = response;
          if (status === 1) {
            ElMessage.success({
              message: form.value.id
                ? t("common.editSuccess")
                : t("common.addSuccess"),
              center: true,
            });
          } else {
            ElMessage.error(t("configuration.department.new.failure"));
          }
          if (isClick.value) {
            // 更新列表
            await emits("getItmelist");
            await emits("getList");
          } else {
            await emits("getList");
          }
          // 关闭弹框
          onCancel();
        }
      }));
  } catch (error) {
  } finally {
    loading.value = false;
  }
}
// 关闭弹框
function onCancel() {
  // 将数据制空
  Object.assign(form, {
    // 父级id
    parentId: "",
    // 名称
    name: "",
    // 备注
    remark: "",
    // 部门人员
    userIdList: [],
    // 组织架构人员
    organizationalStructurePersonList: [],
    //提成比例
    commission: null,
    //提成时间 1.完成计提 2.审核计提 3.收款计提
    commissionTime: null,
    //	提成状态 1.开启计提规则 2.关闭计提规则
    commissionStatus: 2,
    //提成类型 1.项目价 2.成本价 3.毛利润
    commissionType: null,
  });
  visible.value = false;
}
// 获取选择的用户用于循环列表
const getFilteredUsers = () => {
  return staffList.value.filter((item: any) =>
    form.value?.userIdList.includes(item.id),
  );
};
onMounted(async () => {
  try {
    loading.value = true;
    // 回显表单数据
    if (props.id) {
      const {
        id,
        name,
        remark,
        organizationalStructurePersonList,
        commission,
        commissionTime,
        commissionStatus,
        commissionType,
      } = JSON.parse(props.row);
      form.value.id = id;
      form.value.name = name;
      form.value.remark = remark;
      isClick.value = props.isClick;
      form.value.commission = commission;
      form.value.commissionTime = commissionTime;
      form.value.commissionStatus = commissionStatus;
      form.value.commissionType = commissionType;
      // 获取用户数据
      const { data } = await apiUse.queryNotEnableStaffList({
        organizationalStructureId: form.value.id,
      });
      if (data) {
        staffList.value = data;
      }
      form.value.organizationalStructurePersonList = [];
      if (organizationalStructurePersonList) {
        organizationalStructurePersonList.forEach((item: any) => {
          if (item.enableChargePerson == 1) {
            form.value.organizationalStructurePersonList.push(item);
          }
        });
        form.value.organizationalStructurePersonList.forEach((item: any) => {
          form.value.userIdList.push(item.userId);
        });
      } else {
        form.value.organizationalStructurePersonList = [];
      }
    } else {
      // 获取用户数据
      const { data } = await apiUse.queryAllNotEnableStaffList();
      if (data) {
        staffList.value = data;
      }
    }
    // 调用方法并打印过滤后的用户
    filteredUsers.value = getFilteredUsers();
    // 将编辑数据赋值
    if (form.value.id) {
      filteredUsers.value = form.value.organizationalStructurePersonList;
    }
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <ElDialog
    v-model="visible"
    :title="title"
    style="width: 48rem"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
    @closed="onCancel"
  >
    <ElForm
      v-loading="loading"
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="7rem"
    >
      <ElFormItem
        :label="t('configuration.department.new.departmentName')"
        prop="name"
      >
        <ElInput
          v-model="form.name"
          :placeholder="t('configuration.department.new.enterDepartmentName')"
          clearable
        />
      </ElFormItem>
      <ElFormItem
        :label="t('configuration.department.new.departmentSupervisor')"
        prop=""
      >
        <el-select
          v-model="form.userIdList"
          value-key=""
          :placeholder="
            t('configuration.department.new.selectDepartmentSupervisor')
          "
          multiple
          collapse-tags
          collapse-tags-tooltip
          clearable
          filterable
        >
          <el-option
            v-for="item in staffList"
            :key="item.value"
            :label="item.userName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </ElFormItem>
      <ElFormItem :label="t('common.remark')">
        <ElInput
          v-model="form.remark"
          :placeholder="t('configuration.department.new.enterRemark')"
          clearable
        />
      </ElFormItem>
      <div class="user">
        <div class="mr checkbox-container">
          <el-text style="width: 4.375rem">{{
            t("configuration.department.new.openCommission")
          }}</el-text>
          <el-switch
            v-model="form.commissionStatus"
            :active-value="1"
            :inactive-value="2"
            inline-prompt
            :active-text="t('common.on')"
            :inactive-text="t('common.off')"
          />
        </div>
        <div v-show="form.commissionStatus === 1" class="centers mr">
          <el-select
            v-model="form.commissionType"
            value-key=""
            :placeholder="t('configuration.department.new.accrualMethod')"
            clearable
            filterable
          >
            <el-option
              v-for="item in provisionMethod"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div v-show="form.commissionStatus === 1" class="center mr">
          <el-select
            class="select"
            v-model="form.commissionTime"
            value-key=""
            :placeholder="t('configuration.department.new.accrualTime')"
            clearable
            filterable
          >
            <el-option
              v-for="item in commissionTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div v-show="form.commissionStatus === 1" class="center mr">
          <ElInput
            v-model="form.commission"
            :placeholder="
              t('configuration.department.new.percentageOfCommissions')
            "
            style="max-width: 25rem"
            clearable
          >
            <template #append>%</template>
          </ElInput>
        </div>
      </div>
    </ElForm>
    <template #footer>
      <ElButton size="large" @click="onCancel">
        {{ t("common.cancel") }}
      </ElButton>
      <ElButton type="primary" size="large" @click="onSubmit">
        {{ t("common.confirm") }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 100%;
}

.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  margin-left: 4.0625rem;

  .center {
    display: flex;
    width: 13rem;

    span {
      width: 5.3125rem;
    }
  }

  .centers {
    display: flex;
    width: 13rem;

    span {
      width: 5.3125rem;
    }
  }

  .mr {
    display: flex;
    margin-right: 20px;
  }

  .mr:nth-child(5) {
    margin-right: 0px;
  }
}

.select {
  box-shadow: none;
}

:deep {
  .el-checkbox {
    order: 1;
    /* 将选择框的顺序设置为2 */
    display: flex;
    flex-direction: row-reverse;
  }

  .el-checkbox .el-checkbox__label {
    order: 0;
    /* 将文本的顺序设置为1 */
    margin-left: 0px;
    /* 在文本和选择框之间添加一些间隔 */
    margin-right: 10px;
    /* 重置默认的margin-right */
  }

  .el-input-group__append {
    width: 5rem;
    padding: 0;
    background-color: #fff;
  }

  .el-select {
    min-width: 6.5625rem;
  }

  .el-tag {
    min-width: 3rem;
  }

  .el-tag.el-tag--info {
    background-color: #ecf5ff;
    color: #409eff;
    --el-tag-hover-color: var(--el-color-primary);
  }
}
</style>
