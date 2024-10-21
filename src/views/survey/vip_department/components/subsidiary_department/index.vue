<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/survey_vip_department";

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
  }
);
// 计提时间
const commissionTypeList = [
  { label: '完成计提', value: 1, },
  { label: '审核计提', value: 2, },
  // { label: '结算计提', value: 3, },
]
// 计提方式
const provisionMethod = [
  { label: '按项目价', value: 1 },
  { label: '按成本价', value: 2 },
  { label: '按毛利润', value: 3 },
]
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
const title = computed(() => (props.id === "" ? "新增子部门" : "编辑子部门"));
// 负责人列表
const filteredUsers = ref<any>([])
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
  superior: '',
});

// 校验
const formRules = ref<FormRules>({
  name: [{ required: true, message: "请输入部门名称" }],
  commissionType: [{ required: true, message: "请选择计提方式", trigger: "change" }],
});
// 判断提成比例不为正整数
function validateCommissions(users: any) {
  for (const user of users) {
    const commission = user.commission;
    const commissionStatus = user.commissionStatus;

    // 如果 commissionStatus 等于 2，则跳过此用户的校验
    if (commissionStatus === 2) {
      continue; // 不进行校验，直接进入下一个用户
    }

    // 如果 commissionStatus 等于 1，检查 commission 是否为正整数
    if (commissionStatus === 1 && !/^[1-9]\d*$/.test(commission)) {
      return false; // 如果 commission 不是正整数，返回 false
    }
  }
  return true; // 所有需要校验的提成比例均为正整数时返回 true
}
// 提交数据
async function onSubmit() {
  try {
    formRef.value &&
      formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          // 将数据制空
          form.value.organizationalStructurePersonList = []
          // 筛选出需要的格式
          const result = validateCommissions(filteredUsers.value)
          if (!result) {
            ElMessage.warning({
              message: "提成比例必须是正整数",
              center: true,
            });
            loading.value = false;
            return
          }
          // 筛选出需要的格式
          filteredUsers.value.forEach((item: any) => {
            if (item.userId) {
              const obj = {
                id: item.id,
                userId: item.userId,
                commission: item.commission || 0,
                commissionTime: item.commissionTime || 1,
                commissionStatus: item.commissionStatus,
                commissionType: item.commissionType || 1,
              }
              form.value.organizationalStructurePersonList.push(obj)
            } else {
              const obj = {
                userId: item.id,
                commission: item.commission || 0,
                commissionTime: item.commissionTime || 1,
                commissionStatus: item.commissionStatus,
                commissionType: item.commissionType || 1,
              }
              form.value.organizationalStructurePersonList.push(obj)
            }
          });
          // 去重
          const uniqueList = form.value.organizationalStructurePersonList.reduce((accumulator: any, current: any) => {
            const exists = accumulator.some((item: any) => item.userId === current.userId);
            if (!exists) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);
          // 赋值
          form.value.organizationalStructurePersonList = uniqueList
          const params = {
            ...form.value
          }
          // 删除多余的数据
          delete params.userIdList
          delete params.superior
          if (!form.value.id) {
            const { status } = await api.create(params);
            status === 1 &&
              ElMessage.success({
                message: "新增成功",
                center: true,
              });
            loading.value = false;
          } else {
            const { status } = await api.edit(params);
            status === 1 &&
              ElMessage.success({
                message: "编辑成功",
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

// 移除
const handleClose = (tag: any) => {
  // 从 userIdList 中移除被关闭的用户 ID
  if (tag.userId) {
    const userIdIndex = form.value.userIdList.indexOf(tag.userId);
    if (userIdIndex !== -1) {
      // 移除用户 ID
      form.value.userIdList.splice(userIdIndex, 1);
    }
  } else {
    const userIdIndex = form.value.userIdList.indexOf(tag.id);
    if (userIdIndex !== -1) {
      // 移除用户 ID
      form.value.userIdList.splice(userIdIndex, 1);
    }
  }
  // 从 organizationalStructurePersonList 中移除对应的对象
  const personIndex = form.value.organizationalStructurePersonList.findIndex((item: any) => item.id === tag.id || item.userId === tag.id);
  if (personIndex !== -1) {
    // 移除整条数据
    form.value.organizationalStructurePersonList.splice(personIndex, 1);
  }
  // 删除循环数据
  const personIndexs = filteredUsers.value.findIndex((item: any) => item.id === tag.id || item.userId === tag.id);
  if (personIndexs !== -1) {
    // 移除整条数据
    filteredUsers.value.splice(personIndexs, 1);
  }

}

// 切换增加或减少用户
const handleChange = (val: any) => {
  form.value.userIdList = val
  filteredUsers.value = staffList.value.filter((item: any) =>
    form.value?.userIdList.includes(item.id)
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
      const exists = form.value.organizationalStructurePersonList.some((orgItem: any) => orgItem.userId === user.id);
      if (!exists) {
        result.push(user);
      }
    });
    // 数组去重
    const uniqueData = Array.from(new Map(result.map((item: any) => [item.id, item])).values());
    // 过滤 uniqueData，只保留在 val 中的 id
    const filteredUniqueData = uniqueData.filter((item: any) => val.includes(item.id));
    // 赋值给循环数据
    filteredUsers.value = filteredUniqueData
    form.value.organizationalStructurePersonList = filteredUsers.value
  } else {
    // 没有选择将数据制空
    filteredUsers.value = []
    form.value.organizationalStructurePersonList = filteredUsers.value
  }
}
// 关闭弹框
function onCancel() {
  Object.assign(form, {
    // 父级id
    parentId: '',
    // 名称
    name: "",
    // 备注
    remark: "",
    // 部门人员
    userIdList: [],
    // 组织架构人员
    organizationalStructurePersonList: [],
    // 上级部门
    superior: '',
  })
  visible.value = false;
}
// 获取选择的用户用于循环列表
const getFilteredUsers = () => {
  return staffList.value.filter((item: any) =>
    form.value?.userIdList.includes(item.id)
  );
};
// 上级部门名称
if (props.parentId) {
  form.value.superior = props.name
}

onMounted(async () => {
  try {
    loading.value = true;
    // 获取回显数据
    if (props.id !== "") {
      const { id, name, remark, organizationalStructurePersonList } = JSON.parse(props.row);
      form.value.id = id;
      form.value.name = name;
      form.value.remark = remark;
      form.value.organizationalStructurePersonList = organizationalStructurePersonList;
      organizationalStructurePersonList.forEach((item: any) => {
        form.value.userIdList.push(item.userId)
      })
    } else {
      // 新增获取用户数据
      const { data } = await api.queryMemberList()
      if (data) {
        staffList.value = data
      }
    }
    // 调用方法并打印过滤后的用户
    filteredUsers.value = getFilteredUsers();
    if (form.value.id) {
      filteredUsers.value = form.value.organizationalStructurePersonList
    }
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }

});
</script>

<template>
  <ElDialog v-loading="loading" v-model="visible" :title="title" style="width: 48rem;" :close-on-click-modal="false"
    append-to-body destroy-on-close @closed="onCancel">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="7rem">
      <ElFormItem label="上级部门" prop="">
        <ElInput v-model="form.superior" :disabled="!!props.parentId" placeholder="请输入部门名称" clearable />
      </ElFormItem>
      <ElFormItem label="部门名称" prop="name">
        <ElInput v-model="form.name" placeholder="请输入部门名称" clearable />
      </ElFormItem>
      <ElFormItem label="部门主管" prop="">
        <el-select v-model="form.userIdList" value-key="" placeholder="请选择部门主管" multiple collapse-tags
          collapse-tags-tooltip clearable filterable @change="handleChange">
          <el-option v-for="item in staffList" :key="item.value" :label="item.userName" :value="item.id">
          </el-option>
        </el-select>
      </ElFormItem>
      <ElFormItem label="备注">
        <ElInput v-model="form.remark" placeholder="请输入备注" clearable />
      </ElFormItem>
      <div v-for="item in filteredUsers" :key="item.id" class="user">
        <div class="mr">
          <el-tag type="primary" closable @close="handleClose(item)">{{ item.userName }}</el-tag>
        </div>
        <div class="mr checkbox-container">
          <el-text style="width:4.375rem;">开启提成</el-text>
          <!-- <el-checkbox v-model="item.commissionStatus" label="开启提成" size="large" /> -->
          <el-switch v-model="item.commissionStatus" :active-value="1" :inactive-value="2" inline-prompt
            active-text="开启" inactive-text="关闭" />
        </div>
        <div v-show="item.commissionStatus === 1" class="centers mr">
          <el-select v-model="item.commissionType" value-key="" placeholder="计提方式" clearable filterable>
            <el-option v-for="item in provisionMethod" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div v-show="item.commissionStatus === 1" class="center mr">
          <el-select class="select" v-model="item.commissionTime" value-key="" placeholder="计提时间" clearable filterable>
            <el-option v-for="item in commissionTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div v-show="item.commissionStatus === 1" class="center mr">
          <ElInput v-model="item.commission" placeholder="提成比例" style="max-width: 25rem;" clearable />
        </div>
      </div>
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

.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  margin-left: 7.0625rem;

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
    width: 12rem;
    padding: 0;
    background-color: #fff;
  }

  .el-tag.el-tag--info {
    background-color: #ecf5ff;
    color: #409eff;
    --el-tag-hover-color: var(--el-color-primary);
  }
}
</style>
