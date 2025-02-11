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
    name: string;
  }>(),
  {
    parentId: "",
    id: "",
  },
);
// 计提时间
const commissionTypeList = [
  { label: t("configuration.department.new.completeProvision"), value: 1 },
  { label: t("configuration.department.new.auditAccrual"), value: 2 },
  { label: t("configuration.department.new.settlementProvision"), value: 3 },
];
// 计提方式
const provisionMethod = [
  { label: t("configuration.department.new.atProjectPrice"), value: 1 },
  { label: t("configuration.department.new.atcostPrice"), value: 2 },
  { label: t("configuration.department.new.grossProfit"), value: 3 },
];
// loading
const loading = ref<any>(false);
// 更新数据
const emits = defineEmits<{
  getList: any;
}>();
// 弹框开关
const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() =>
  props.id === ""
    ? t("configuration.department.new.addSubdepartment")
    : t("configuration.department.new.editSubdepartment"),
);
// PM列表
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
  // 上级部门
  superior: "",
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
      formRef.value.validate(async (valid: any) => {
        if (valid) {
          loading.value = true;
          // 将数据制空
          form.value.organizationalStructurePersonList = [];
          // 筛选出需要的格式
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
          filteredUsers.value.forEach((item: any) => {
            if (item.userId) {
              const obj = {
                id: item.id,
                userId: item.userId,
              };
              form.value.organizationalStructurePersonList.push(obj);
            } else {
              const obj = {
                userId: item.id,
              };
              form.value.organizationalStructurePersonList.push(obj);
            }
          });
          form.value.commission = form.value.commission
            ? form.value.commission
            : 0;
          form.value.commissionTime = form.value.commissionTime
            ? form.value.commissionTime
            : 1;
          form.value.commissionType = form.value.commissionType
            ? form.value.commissionType
            : 1;
          // 去重
          const uniqueList =
            form.value.organizationalStructurePersonList.reduce(
              (accumulator: any, current: any) => {
                const exists = accumulator.some(
                  (item: any) => item.userId === current.userId,
                );
                if (!exists) {
                  accumulator.push(current);
                }
                return accumulator;
              },
              [],
            );
          // 赋值
          form.value.organizationalStructurePersonList = uniqueList;
          const params = {
            ...form.value,
          };
          // 删除多余的数据
          delete params.userIdList;
          delete params.superior;
          if (!form.value.id) {
            const { status } = await api.create(params);
            status === 1 &&
              ElMessage.success({
                message: t("common.addSuccess"),
                center: true,
              });
            loading.value = false;
          } else {
            const { status } = await api.edit(params);
            status === 1 &&
              ElMessage.success({
                message: t("common.editSuccess"),
                center: true,
              });
            loading.value = false;
          }
          // 更新列表
          await emits("getList");
          // 关闭弹框
          onCancel();
        }
      });
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

// 切换增加或减少用户
const handleChange = (val: any) => {
  form.value.userIdList = val;
  filteredUsers.value = staffList.value.filter((item: any) =>
    form.value?.userIdList.includes(item.id),
  );
  if (form.value?.userIdList.length) {
    // 合并数据
    const result: any = [];
    // 将 organizationalStructurePersonList 中的每个对象添加到结果中
    form.value.organizationalStructurePersonList.forEach((item: any) => {
      result.push(item);
    });
    // 将 userList 中的对象添加到结果中，但不重复 userId
    filteredUsers.value.forEach((user: any) => {
      const exists = form.value.organizationalStructurePersonList.some(
        (orgItem: any) => orgItem.userId === user.id,
      );
      if (!exists) {
        result.push(user);
      }
    });
    // 数组去重
    const uniqueData = Array.from(
      new Map(result.map((item: any) => [item.id, item])).values(),
    );
    // 过滤 uniqueData，只保留在 val 中的 id
    const filteredUniqueData = uniqueData.filter((item: any) =>
      val.includes(item.id),
    );
    // 赋值给循环数据
    filteredUsers.value = filteredUniqueData;
    form.value.organizationalStructurePersonList = filteredUsers.value;
  } else {
    // 没有选择将数据制空
    filteredUsers.value = [];
    form.value.organizationalStructurePersonList = filteredUsers.value;
  }
};
// 关闭弹框
function onCancel() {
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
    // 上级部门
    superior: "",
    //提成比例
    commission: null,
    //提成时间 1.完成计提 2.审核计提 3.收款计提
    commissionTime: null,
    //提成状态 1.开启计提规则 2.关闭计提规则
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
// 上级部门名称
if (props.parentId) {
  form.value.superior = props.name;
}

onMounted(async () => {
  try {
    loading.value = true;
    // 获取回显数据
    if (props.id !== "") {
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
      form.value.commission = commission;
      form.value.commissionTime = commissionTime;
      form.value.commissionStatus = commissionStatus;
      form.value.commissionType = commissionType;
      form.value.organizationalStructurePersonList =
        organizationalStructurePersonList;
      organizationalStructurePersonList.forEach((item: any) => {
        form.value.userIdList.push(item.userId);
      });
    } else {
      // 获取用户数据
      const { data } = await apiUse.queryAllNotEnableStaffList();
      if (data) {
        staffList.value = data;
      }
    }
    // 调用方法并打印过滤后的用户
    filteredUsers.value = getFilteredUsers();
    if (form.value.id) {
      filteredUsers.value = form.value.organizationalStructurePersonList;
    }
    loading.value = false;
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <ElDialog
    v-loading="loading"
    v-model="visible"
    :title="title"
    style="width: 48rem"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
    @closed="onCancel"
  >
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="7rem">
      <ElFormItem
        :label="t('configuration.department.new.superiorDepartment')"
        prop=""
      >
        <ElInput
          v-model="form.superior"
          :disabled="!!props.parentId"
          :placeholder="t('configuration.department.new.enterDepartmentName')"
          clearable
        />
      </ElFormItem>
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
          @change="handleChange"
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

  .el-tag {
    width: 5rem;
  }

  .el-tag.el-tag--info {
    background-color: #ecf5ff;
    color: #409eff;
    --el-tag-hover-color: var(--el-color-primary);
  }
}
</style>
