<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/configuration_manager";
import apiDep from "@/api/modules/department";
import useDepartmentStore from "@/store/modules/department";
import useTenantRoleStore from "@/store/modules/tenant_role";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import usePositionManageStore from "@/store/modules/position_manage";

// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 小组
const groupManageList = ref<any>([]);
// 职位
const usePositionManage = usePositionManageStore();
const positionManageList = ref<any>();
// 国家
const useStoreCountry = useBasicDictionaryStore();
const country = ref();
// 角色码
const roleStore = useTenantRoleStore();
// 角色
const munulevs = ref();
// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
// 禁用修改密码
const disabled = ref(false);
// 判断手机号或邮箱是否变动
const isTrue = ref(false);
// 组长
const getGroup = ref<any>()
// 父级传递的数据
const props = withDefaults(
  defineProps<{
    catalogueId: string | number;
    parentId: string | number;
    id?: string | number;
    tree: any[];
    dataList: any[];
    row: string;
    level: any;
  }>(),
  {
    catalogueId: "",
    parentId: "",
    id: "",
    level: 1,
  }
);
// 更新数据
const emits = defineEmits(["success"]);

const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() => (props.id === "" ? "新增用户" : "编辑用户"));

const formRef = ref<FormInstance>();
const flat = ref([]); // 扁平化
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
  // 国家
  country: "",
  // 类型 phone/email
  type: "",
  // 密码
  password: "",
  // 角色
  role: "",
  // 是否启用
  active: true,
  // 职位id
  positionId: "",
  // 部门id
  departmentId: "",
  // 组id
  groupId: "",
});
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(form.value.phone)) {
    //
    callback(new Error("请输入合法手机号"));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(form.value.email)) {
    callback(new Error("请输入合法邮箱"));
  } else {
    callback();
  }
};
// 动态表单校验
const chengAccount = () => {
  // 手机号
  if (!form.value.phone.includes("@")) {
    formRules.value.phone = [
      { required: true, trigger: "blur", message: "请输入手机号/邮箱" },
      { validator: validatePhone, trigger: "blur" },
    ];
  } else {
    //邮箱
    formRules.value.email = [
      { required: true, trigger: "blur", message: "请输入手机号/邮箱" },
      { validator: validateEmail, trigger: "blur" },
    ];
  }
};
// 校验
const formRules = ref<FormRules>({
  userName: [{ required: true, message: "请输入用户名" }],
  positionId: [{ required: true, message: "请选择职位", trigger: "change" }],
  password: [
    { required: true, trigger: "blur", message: "请输入密码" },
    { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
  ],
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
});

const handleChange = (val: any) => {
  if (val !== form.value.phone || val !== form.value.email) {
    isTrue.value = true;
  }
};
// 切换部门
const departmentChange = async (val: any) => {
  const { data } = await apiDep.departmentGroup({ id: val });
  groupManageList.value = data;
  getGroup.value = data[0].director
};
// 提交数据
function onSubmit() {
  form.value.type = form.value.country === "CN" ? "phone" : "email";
  if (form.value.id === "") {
    formRef.value &&
      formRef.value.validate((valid) => {
        if (valid) {
          delete form.value.id;
          if (form.value.type === "phone") {
            delete form.value.email;
          } else {
            delete form.value.phone;
          }
          api.create(form.value).then(() => {
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
            emits("success");
            onCancel();
          });
        }
      });
  } else {
    formRef.value &&
      formRef.value.validate((valid) => {
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
            groupId,
            positionId,
            departmentId,
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
            groupId,
            positionId,
            departmentId,
            userName,
          };
          if (type === "phone") {
            params.email = "";
            delete params.email;
          } else {
            params.phone = "";
            delete params.phone;
          }
          if (!params.password) {
            delete params.password;
          }
          if (!isTrue.value) {
            delete params.phone;
            delete params.email;
          }
          api.edit(params).then(() => {
            ElMessage.success({
              message: "编辑成功",
              center: true,
            });
            emits("success");
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
  return arr.reduce(
    (acc: any, val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
};
onMounted(async () => {
  positionManageList.value = await usePositionManage.PositionManage;
  staffList.value = await tenantStaffStore.getStaff();
  munulevs.value = await roleStore.getRole();
  departmentList.value = await departmentStore.department;
  country.value = await useStoreCountry.getCountry();
  if (props.id !== "" && props.row) {
    formRules.value.password = [];
    form.value = JSON.parse(props.row);
    departmentChange(form.value.departmentId)
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
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="100px">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国家" prop="country">
              <ElSelect
                v-model="form.country"
                placeholder="请选择国家"
                clearable
                filterable
                tabindex="2"
              >
                <ElOption
                  v-for="item in country"
                  :label="item.chineseName"
                  :value="item.code"
                ></ElOption>
              </ElSelect>
            </el-form-item>
          </el-col>
          <el-col v-if="form.country === 'CN'" :span="8">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入手机号"
                clearable
                @change="handleChange"
                @blur="chengAccount"
              />
            </el-form-item>
          </el-col>
          <el-col v-else :span="8">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                clearable
                @change="handleChange"
                @blur="chengAccount"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门">
              <el-select
                v-model="form.departmentId"
                placeholder="请选择部门"
                :disabled="form.id !== ''"
                clearable
                filterable
                @change="departmentChange"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位" prop="positionId">
              <el-select
                v-model="form.positionId"
                placeholder="请选择职位"
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
            <el-form-item label="密码" prop="password">
              <ElInput
                :disabled="disabled"
                v-model="form.password"
                placeholder="如要修改密码请前往个人中心"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否启用" prop="active">
              <el-switch
                v-model="form.active"
                inline-prompt
                active-text="开启"
                inactive-text="关闭"
                :active-value="true"
                :inactive-value="false"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">角色信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-form-item label="分配角色:">
            <el-radio-group v-model="form.role">
              <el-radio
                v-for="item in munulevs"
                :key="item.id"
                :value="item.id"
                :label="item.roleName"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">
              小组信息<span style="margin-left: 20px; font-size: 14px"
                >负责人:<el-text v-for="item in staffList" :key="item.id">
              <el-text v-if="item.id === form.director">
                {{ item.name }}
              </el-text>
            </el-text></span
              >
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-form-item label="分配小组:">
            <el-radio-group
              v-if="groupManageList.length"
              v-model="form.groupId"
              :disabled="form.id !== ''"
            >
              <el-radio
                v-for="item in groupManageList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-radio>
            </el-radio-group>
            <el-text v-else>-</el-text>
          </el-form-item>
        </el-row>
      </el-card>
    </ElForm>
    <template #footer>
      <ElButton size="large" @click="onCancel"> 取消 </ElButton>
      <ElButton type="primary" size="large" @click="onSubmit"> 确定 </ElButton>
    </template>
  </ElDrawer>
</template>

<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 100%;
}
</style>
