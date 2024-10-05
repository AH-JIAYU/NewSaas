<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/department";
import useTenantStaffStore from "@/store/modules/configuration_manager";

// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 父级传递的数据
const props = withDefaults(
  defineProps<{
    parentId?: string | number;
    id?: string | number;
    tree: any[];
    row: string;
  }>(),
  {
    parentId: "",
    id: "",
  }
);

const commissionTypeList = [
  { label: '完成计提', value: 1, },
  { label: '审核计提', value: 2, },
  { label: '结算计提', value: 3, },
]
// 更新数据
const emits = defineEmits<{
  getList: any;
}>();

const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() => (props.id === "" ? "新增部门" : "编辑部门"));

const formRef = ref<FormInstance>();
const flat = ref([]);
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
});

// 校验
const formRules = ref<FormRules>({
  name: [{ required: true, message: "请输入部门名称" }],
});
// 设置level
const setLevel = (id: any) => {
  const row: any = flat.value.find((item: any) => item.id === id);
  form.value.level = Number(row.level) + 1;
};

// 提交数据
async function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid) => {
      if (valid) {
        filteredUsers.value.forEach((item: any) => {
          const obj = {
            userId: item.id,
            commission: item.commission,
            commissionType: item.commissionType,
            commissionStatus: item.commissionStatus,
          }
          form.value.organizationalStructurePersonList.push(obj)
        })
        const uniqueList = form.value.organizationalStructurePersonList.reduce((accumulator: any, current: any) => {
          const exists = accumulator.some((item: any) => item.userId === current.userId);
          if (!exists) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        form.value.organizationalStructurePersonList = uniqueList
        const params = {
            ...form.value
          }
        delete params.userIdList
        if (!form.value.id) {
          delete params.userIdList
          console.log('params',params);
          // return
          const { status } = await api.create(params);
          status === 1 &&
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
        } else {
          // console.log('form.value', form.value)
          console.log('params', params)
          console.log('filteredUsers', filteredUsers.value)
          return
          const { status } = await api.edit(params);
          status === 1 &&
            ElMessage.success({
              message: "编辑成功",
              center: true,
            });
        }
        await emits("getList");
        onCancel();
      }
    });
}
const filteredUsers = ref<any>([])
// 获取选择的用户用于循环列表
const filteredUsersList = computed(() => {
  return staffList.value.filter((item: any) =>
    form.value?.userIdList.includes(item.id)
  );
});
filteredUsers.value = filteredUsersList.value

// 移除
const handleClose = (tag: any) => {
  // 从 userIdList 中移除被关闭的用户 ID
  const userIdIndex = form.value.userIdList.indexOf(tag.id);
  if (userIdIndex !== -1) {
    form.value.userIdList.splice(userIdIndex, 1); // 移除用户 ID
  }
  // 从 organizationalStructurePersonList 中移除对应的对象
  const personIndex = form.value.organizationalStructurePersonList.findIndex((item:any) => item.userId === tag.id);
  if (personIndex !== -1) {
    form.value.organizationalStructurePersonList.splice(personIndex, 1); // 移除整条数据
  }
}
// 关闭弹框
function onCancel() {
  Object.assign(form,{
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
})
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
onMounted(async () => {
  // 获取用户数据
  staffList.value = await tenantStaffStore.getStaff();
  if (props.id !== "") {
    const { id,name,remark,organizationalStructurePersonList } = JSON.parse(props.row);
    form.value.id = id;
    form.value.name = name;
    form.value.remark = remark;
    form.value.organizationalStructurePersonList = organizationalStructurePersonList;
    organizationalStructurePersonList.forEach((item:any) => {
      form.value.userIdList.push(item.userId)
    })
    console.log('form.value',form.value);
    filteredUsers.value = organizationalStructurePersonList
  }
  flat.value = flattenDeep(props.tree);
});
</script>

<template>
  <ElDialog v-model="visible" :title="title" width="25rem" :close-on-click-modal="false" append-to-body destroy-on-close
    @closed="onCancel">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="7rem">
      <ElFormItem label="部门名称" prop="name">
        <ElInput v-model="form.name" placeholder="请输入部门名称" clearable />
      </ElFormItem>
      <ElFormItem label="部门主管" prop="">
        <el-select v-model="form.userIdList" value-key="" placeholder="请选择部门主管" multiple collapse-tags collapse-tags-tooltip
          clearable filterable>
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
        <div class="mr">
          <el-text style="margin-right: 5px;">提成</el-text>
          <el-switch v-model="item.commissionStatus" :active-value="1" :inactive-value="2" @change="" />
        </div>
        <div v-show="item.commissionStatus === 1" class="center mr">
          <el-text>发放规则</el-text>
          <el-select v-model="item.commissionType" value-key="" placeholder="" clearable filterable @change="">
            <el-option v-for="item in commissionTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div v-show="item.commissionStatus === 1" class="centers mr">
          <el-text>提成比例</el-text>
          <ElInput v-model="item.commission" placeholder="请输入提成比例" style="max-width: 12rem;" clearable>
            <template #append>%</template>
          </ElInput>
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
  margin-left: 1.875rem;

  .center {
    display: flex;
    width: 12rem;

    span {
      width: 5.3125rem;
    }
  }

  .centers {
    display: flex;
    width: 15rem;

    span {
      width: 5.3125rem;
    }
  }

  .mr {
    display: flex;
    margin-right: 1.5625rem;
  }

  .mr:nth-child(4) {
    margin-right: 0px;
  }
}
</style>
