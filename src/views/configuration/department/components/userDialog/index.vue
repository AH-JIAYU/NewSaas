<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/configuration_manager";
import apiDep from "@/api/modules/department";
import apiPos from "@/api/modules/position_manage";
import apiRole from "@/api/modules/configuration_role";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import { useI18n } from "vue-i18n";

// 国际化
const { t } = useI18n();
// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 职位
const positionManageList = ref<any>();
// 区域
const useStoreCountry = useBasicDictionaryStore();
const country = ref();
// 角色
const munulevs = ref();
// 部门数据
const departmentList = ref<any>();
// 禁用修改密码
const disabled = ref(false);
// 判断手机号或邮箱是否变动
const isEmail = ref<any>();
const isPhone = ref<any>();
// 父级传递数据
const props: any = defineProps([
  "catalogueId",
  "parentId",
  "id",
  "tree",
  "dataList",
  "row",
  "level",
]);
// 更新数据
const emits = defineEmits(["success", "getList"]);
// tree ref
const treeRef = ref<any>();
// 弹框开关
const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() =>
  props.id === ""
    ? t("configuration.user.new.addUser")
    : t("configuration.user.new.editUser"),
);
// 树的配置项
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
// formRef
const formRef = ref<any>();
// 扁平化
const flat = ref([]);
// 表单
const form = ref<any>({
  id: props.id,
  // 用户名
  userName: "",
  // 姓名
  name: "",
  // 手机号
  phone: "",
  // 邮箱
  email: "",
  // 区域
  country: "",
  // 类型 phone/email
  type: "",
  // 密码
  password: "123456",
  roleList: [],
  // 角色
  role: "",
  // 是否启用
  active: true,
  // 职位id
  positionId: "",
  // 部门id
  organizationalStructureId: "",
});
// 部门id
const departmentId = ref<any>([]);

// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (form.value.phone) {
    if (!regExpPhone.test(form.value.phone)) {
      //
      callback(new Error(t("configuration.user.new.enterPhoneNumber")));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (form.value.email) {
    if (!regExpEmail.test(form.value.email)) {
      callback(new Error(t("configuration.user.new.enterEmail")));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

// 校验
const formRules = ref<FormRules>({
  userName: [
    { required: true, message: t("configuration.user.new.enterName") },
  ],
  positionId: [
    {
      required: true,
      message: t("configuration.user.new.positionSelect"),
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      message: t("configuration.user.new.enterPassword"),
    },
    {
      min: 6,
      max: 18,
      trigger: "blur",
      message: t("configuration.user.new.6to18"),
    },
  ],
  name: [
    {
      required: true,
      message: t("configuration.user.new.enterUsername"),
      trigger: "blur",
    },
  ],
  phone: [{ validator: validatePhone, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
});

// 处理选中项变化的逻辑，确保最多只能选择一个
const handleCheckboxChange = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    form.value.roleList = [newValue[newValue.length - 1]];
  }
};
// 提交数据
function onSubmit() {
  if (!form.value.email) {
    formRules.value.email = [];
    formRef.value.clearValidate("email");
  }
  if (!form.value.phone) {
    formRules.value.phone = [];
    formRef.value.clearValidate("phone");
  }
  // 同步选中的路由id
  departmentId.value = treeRef.value!.getCheckedKeys(false);
  //  获取选中的所有子节点
  const tree = treeRef.value.getCheckedKeys();
  // 获取所有半选的主节点
  const halltree = treeRef.value.getHalfCheckedKeys();
  // 组合一下
  const organizationalStructureId = tree.concat(halltree);
  form.value.organizationalStructureId = organizationalStructureId[0];
  if (form.value.roleList.length > 0) {
    form.value.role = form.value.roleList[0];
  } else {
    form.value.role = "";
    form.value.roleList = [];
  }
  if (!form.value.id) {
    formRef.value &&
      formRef.value.validate((valid: any) => {
        if (valid) {
          api.create(form.value).then(() => {
            ElMessage.success({
              message: t("common.addSuccess"),
              center: true,
            });
            emits("success");
            emits("getList");
            onCancel();
          });
        }
      });
  } else {
    formRef.value &&
      formRef.value.validate((valid: any) => {
        if (valid) {
          const {
            id,
            phone,
            email,
            password,
            name,
            country,
            active,
            type,
            role,
            positionId,
            organizationalStructureId,
            userName,
          } = form.value;
          const params = {
            id,
            phone,
            email,
            password,
            name,
            country,
            active,
            type,
            role,
            positionId,
            organizationalStructureId,
            userName,
          };
          if (isPhone.value === params.phone) {
            delete params.phone;
          }
          if (isEmail.value === params.email) {
            delete params.email;
          }
          if (!params.password) {
            delete params.password;
          }
          api.edit(params).then(() => {
            ElMessage.success({
              message: t("common.editSuccess"),
              center: true,
            });
            emits("success");
            emits("getList");
            onCancel();
          });
        }
      });
  }
}
// 关闭弹框
function onCancel() {
  visible.value = false;
}
// 处理数据扁平化
const flattenDeep = (arr: any) => {
  return arr?.reduce(
    (acc: any, val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
};
// 树选中事件
const handleNodeClick = (nodeData: any, checked: any) => {
  if (checked) {
    // 选中新的节点时，取消其他选中的节点
    // 获取当前所有选中的节点
    const checkedKeys = treeRef.value.getCheckedKeys();
    checkedKeys.forEach((key: any) => {
      if (key !== nodeData.id) {
        // 取消选中其他节点
        treeRef.value.setChecked(key, false);
      }
    });
    // 更新当前选中的节点 ID
    // 只保留当前选中节点 ID
    departmentId.value = [nodeData.id];
  } else {
    // 如果取消选中节点，更新 departmentId
    departmentId.value = departmentId.value.filter(
      (id: any) => id !== nodeData.id,
    );
  }
};

onMounted(async () => {
  departmentId.value = [];
  departmentId.value.push(props.parentId);
  const { data } = await apiPos.list({
    page: 1,
    limit: 10,
    id: null,
    name: "",
    active: null,
  });
  if (data) {
    // 职位
    positionManageList.value = data.data;
  }
  // 用户
  staffList.value = await tenantStaffStore.getStaff();
  // 角色
  const ress = await apiRole.list({ id: null, name: "" });
  if (ress.data) {
    // 角色
    munulevs.value = ress.data;
  }
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    // 部门
    departmentList.value = res.data;
  }
  // 区域
  country.value = await useStoreCountry.getCountry();
  // 编辑
  if (props.id !== "" && props.row) {
    formRules.value.password = [];
    form.value = JSON.parse(props.row);
    form.value.roleList = [form.value.role];
    // 确保 organizationalStructureId 是一个数组，如果是 null 则初始化为空数组
    if (!departmentId.value) {
      departmentId.value = [];
    }
    departmentId.value.push(props.parentId);
    isEmail.value = form.value.email;
    isPhone.value = form.value.phone;
    disabled.value = true;
  }
  flat.value = flattenDeep(props.dataList);
});
</script>

<template>
  <ElDrawer
    v-model="visible"
    :title="title"
    size="60%"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
    @closed="onCancel"
  >
    <ElForm
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="100px"
      :validate-on-rule-change="false"
    >
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">
              {{ t("configuration.user.detail.basicInformation") }}
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item
              :label="t('configuration.user.username')"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                :maxlength="20"
                :placeholder="t('configuration.user.new.enterUsername')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('configuration.user.name')" prop="">
              <el-input
                v-model="form.name"
                :placeholder="t('configuration.user.new.name')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="t('configuration.user.detail.phoneNumber')"
              prop="phone"
            >
              <el-input
                v-model="form.phone"
                :placeholder="t('configuration.user.new.phoneNumber')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('configuration.user.email')" prop="email">
              <el-input
                v-model="form.email"
                :placeholder="t('configuration.user.new.email')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('configuration.user.position')" prop="">
              <el-select
                v-model="form.positionId"
                :placeholder="t('configuration.user.new.positionSelect')"
                clearable
                filterable
                @change=""
              >
                <el-option
                  v-for="item in positionManageList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="t('configuration.user.new.initialPassword')"
              prop=""
            >
              <el-text>123456</el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">
              {{ t("configuration.user.detail.departtmentInformation") }}
              <!-- <span v-if="form.enableChargePerson" style="margin-left: 20px; font-size: .875rem">PM:<el-text
                  v-for="item in staffList" :key="item.id">
                  <el-text v-if="item.id === form.id">
                    {{ item.userName }}
                  </el-text>
                </el-text></span> -->
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-form-item
            :label="t('configuration.user.detail.assignDepartments')"
          >
            <el-tree
              style="max-width: 600px"
              ref="treeRef"
              :data="departmentList"
              show-checkbox
              check-strictly
              node-key="id"
              :default-expanded-keys="[]"
              :default-checked-keys="departmentId"
              default-expand-all
              :props="defaultProps"
              @check-change="handleNodeClick"
            />
          </el-form-item>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">
              {{ t("configuration.user.detail.roleInformation") }}
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-form-item :label="t('configuration.user.detail.assignRoles')">
            <el-checkbox-group
              style="margin-left: 1.5rem"
              v-if="munulevs?.length"
              v-model="form.roleList"
              @change="handleCheckboxChange"
            >
              <el-checkbox
                v-for="item in munulevs"
                :key="item.id"
                :label="item.roleName"
                :value="item.roleName"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
            <el-text v-else>{{ t("common.nodata") }}</el-text>
          </el-form-item>
        </el-row>
      </el-card>
    </ElForm>
    <template #footer>
      <div class="flex-c">
        <ElButton size="large" @click="onCancel">
          {{ t("common.cancel") }}
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          {{ t("common.confirm") }}
        </ElButton>
      </div>
    </template>
  </ElDrawer>
</template>

<style lang="scss" scoped>
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-cascader) {
  width: 100%;
}

:deep(.el-tree-node) {
  margin-bottom: 0.5rem;
}
</style>
