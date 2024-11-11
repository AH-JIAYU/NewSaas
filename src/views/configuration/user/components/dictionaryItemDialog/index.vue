<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/configuration_manager";
import apiDep from "@/api/modules/department";
import apiPos from "@/api/modules/position_manage";
import apiRole from '@/api/modules/configuration_role'
import useTenantRoleStore from "@/store/modules/tenant_role";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import useTenantStaffStore from "@/store/modules/configuration_manager";

// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 职位
const positionManageList = ref<any>();
// 区域
const useStoreCountry = useBasicDictionaryStore();
const country = ref();
// 角色码
const roleStore = useTenantRoleStore();
// 角色
const munulevs = ref();
// 部门数据
const departmentList = ref<any>([]);
// 禁用修改密码
const disabled = ref(false);
// 判断手机号或邮箱是否变动
const isEmail = ref<any>();
const isPhone = ref<any>();
const props: any = defineProps(['catalogueId', 'parentId', 'id', 'tree', 'dataList', 'row', 'level'])
// 更新数据
const emits = defineEmits(["success", "getList"]);
// tree ref
const treeRef = ref<any>(null);
const visible = defineModel<boolean>({
  default: false,
});
// 弹窗标题
const title = computed(() => (props.id === "" ? "新增用户" : "编辑用户"));
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
//loading
const loading = ref<any>(false)
const formRef = ref<any>();
const flat = ref([]); // 扁平化
// 表单
const form = ref<any>({
  id: props.id,
  // 用户名
  userName: "",
  // 姓名
  name: "",
  // 手机号
  phoneNumber: "",
  // 邮箱
  email: "",
  // 区域
  country: "",
  // 类型 phoneNumber/email
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
  organizationalStructureId: '',
});
const departmentId = ref<any>([])
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (form.value.phoneNumber) {
    if (!regExpPhone.test(form.value.phoneNumber)) {
      //
      callback(new Error("请输入合法手机号"));
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
      callback(new Error("请输入合法邮箱"));
    } else {
      callback();
    }
  } else {
    callback();
  }

};

// 校验
const formRules = ref<FormRules>({
  userName: [{ required: true, message: "请输入用户名(1-20位字符)" }],
  positionId: [{ required: true, message: "请选择职位", trigger: "change" }],
  password: [
    { required: true, trigger: "blur", message: "请输入密码" },
    { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
  ],
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  phoneNumber: [{ validator: validatePhone, trigger: "blur" },],
  email: [{ validator: validateEmail, trigger: "blur" },],
});

// 处理选中项变化的逻辑，确保最多只能选择一个
const handleCheckboxChange = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    form.value.roleList = [newValue[newValue.length - 1]]
  }
}

// 提交数据
function onSubmit() {
  if (!form.value.email) {
    formRules.value.email = []
    formRef.value.clearValidate('email');
  }
  if (!form.value.phoneNumber) {
    formRules.value.phoneNumber = []
    formRef.value.clearValidate('phoneNumber');
  }
  if (treeRef.value?.getCheckedKeys()) {
    // 同步选中的路由id
    departmentId.value = treeRef.value.getCheckedKeys(false);
    // 获取选中的所有子节点
    const tree = treeRef.value.getCheckedKeys();
    // 获取所有半选的主节点
    const halltree = treeRef.value.getHalfCheckedKeys();
    // 组合一下
    const organizationalStructureId = tree.concat(halltree);
    form.value.organizationalStructureId = organizationalStructureId[0];
  }
  if (form.value.roleList.length > 0) {
    form.value.role = form.value.roleList[0]
    delete form.value.roleList
  } else {
    form.value.role = ''
  }
  if (!form.value.id) {
    formRef.value &&
      formRef.value.validate((valid: any) => {
        if (valid) {
          api.create(form.value).then(() => {
            ElMessage.success({
              message: "新增成功",
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
            phoneNumber,
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
            phoneNumber,
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
          if (isPhone.value === params.phoneNumber) {
            delete params.phoneNumber;
          }
          if (isEmail.value === params.email) {
            delete params.email;
          }
          if (!params.password) {
            delete params.password;
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
  return arr?.reduce(
    (acc: any, val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
};
// 树选中事件
const handleNodeClick = (nodeData: any, checked: any) => {
  if (checked) {
    // 选中新的节点时，取消其他选中的节点
    const checkedKeys = treeRef.value.getCheckedKeys(); // 获取当前所有选中的节点
    checkedKeys.forEach((key: any) => {
      if (key !== nodeData.id) {
        treeRef.value.setChecked(key, false); // 取消选中其他节点
      }
    });
    // 更新当前选中的节点 ID
    departmentId.value = [nodeData.id]; // 只保留当前选中节点 ID
  } else {
    // 如果取消选中节点，更新 departmentId
    departmentId.value = departmentId.value.filter((id: any) => id !== nodeData.id);
  }
};
onMounted(async () => {
  try {
    loading.value = true;
    departmentId.value = [];
    const { data } = await apiPos.list({ page: 1, limit: 10, id: null, name: "", active: null });
    if (data) {
      positionManageList.value = data.data;
    }
    // 用户
    staffList.value = await tenantStaffStore.getStaff();
    const ress = await apiRole.list({ id: null, name: '' })
    if (ress.data) {
      // 角色
      munulevs.value = ress.data
    }
    // 部门
    const res = await apiDep.list({ name: '' });
    if (res.data) {
      departmentList.value = res.data;
    }
    // 区域
    country.value = await useStoreCountry.getCountry();
    // 编辑
    if (props.id !== "" && props.row) {
      formRules.value.password = [];
      form.value = JSON.parse(props.row);
      form.value.roleList = [form.value.role]
      // 确保 organizationalStructureId 是一个数组
      const orgId = form.value.organizationalStructureId;
      if (orgId) {
        departmentId.value = Array.isArray(orgId) ? orgId : [orgId];
      }
      isEmail.value = form.value.email;
      isPhone.value = form.value.phoneNumber;
      disabled.value = true;
    }
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <ElDrawer v-model="visible" :title="title" size="60%" :close-on-click-modal="false" append-to-body destroy-on-close
    @closed="onCancel">
    <ElForm v-loading="loading" ref="formRef" :model="form" :rules="formRules" label-width="100px"
      :validate-on-rule-change="false">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName" :maxlength="20" placeholder="请输入用户名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="">
              <el-input v-model="form.name" placeholder="请输入姓名" clearable />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="区域" prop="country">
              <ElSelect
                v-model="form.country"
                placeholder="请选择区域"
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
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" placeholder="请输入手机号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="部门">
              <el-select v-model="form.organizationalStructureId" placeholder="请选择部门" clearable filterable
                @change="departmentChange">
                <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="职位" prop="">
              <el-select v-model="form.positionId" placeholder="请选择职位" clearable filterable @change="">
                <el-option v-for="item in positionManageList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-text><el-button type="primary" link size="default" @click="routerPosition">职位管理</el-button></el-text> -->
          <el-col :span="8">
            <el-form-item label="初始密码" prop="">
              <el-text>123456</el-text>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
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
          </el-col> -->
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">
              部门信息
              <!-- <span v-if="form.enableChargePerson" style="margin-left: 20px; font-size: 14px">负责人:<el-text
                  v-for="item in staffList" :key="item.id">
                  <el-text v-if="item.id === form.id">
                    {{ item.name }}
                  </el-text>
                </el-text></span> -->
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-form-item label="分配部门:">
            <el-tree v-if="departmentList.length > 0" style="max-width: 600px" ref="treeRef" :data="departmentList"
              show-checkbox check-strictly node-key="id" :default-expanded-keys="[]"
              :default-checked-keys="departmentId" default-expand-all :props="defaultProps"
              @check-change="handleNodeClick" />
            <el-text v-else>暂无数据</el-text>
          </el-form-item>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">角色信息</div>
          </div>
        </template>
        <el-row :gutter="24">
          <!-- <el-form-item label="分配角色:">
            <el-radio-group v-if="munulevs?.length" v-model="form.role">
              <el-radio v-for="item in munulevs" :key="item.id" :value="item.roleName"
                :label="item.roleName"></el-radio>
            </el-radio-group>
            <el-text v-else>暂无数据</el-text>
          </el-form-item> -->
          <!-- <el-checkbox-group v-if="munulevs?.length" v-model="form.roleList" @change="handleCheckboxChange">
            <el-checkbox v-for="item in munulevs" :key="item.id" :label="item.roleName" :value="item.roleName">
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
          <el-text v-else>暂无数据</el-text> -->
          <el-form-item label="分配角色:">
            <el-checkbox-group v-if="munulevs?.length" v-model="form.roleList" @change="handleCheckboxChange">
              <el-checkbox v-for="item in munulevs" :key="item.id" :label="item.roleName" :value="item.roleName">
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
            <el-text v-else>暂无数据</el-text>
          </el-form-item>
        </el-row>
      </el-card>
    </ElForm>
    <template #footer>
      <div class="flex-c">
        <ElButton size="large" @click="onCancel"> 取消 </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit"> 确定 </ElButton>
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
  margin-bottom:.5rem;
}
</style>
