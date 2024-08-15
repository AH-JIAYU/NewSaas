<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import api from "@/api/modules/department";
import managerApi from "@/api/modules/configuration_manager";

// 传递数据
const props = defineProps(["id", "row"]);
// 类型
const commissionList = [
  { label: "完成计提", value: 1 },
  { label: "审核计提", value: 2 },
  { label: "收款计提", value: 3 },
];
// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 用户数据
const undistributedDepartmentList = ref<any>([]);
// loading加载
const loading = ref(false);
// formRef
const formRef = ref<FormInstance>();
// 定义表单
const form = ref<any>({
  id: props.id,
  // 部门名称
  name: "",
  // 负责人id userId
  director: null,
  //备注
  remark: "",
  // 是否开启部门提成 ,可用值:1启用,2停用
  commissionStatus: null,
  // 提成比例
  commission: null,
  // 提成发放 1 完成计提 2 审核计提 3 收款计提
  commissionType: null,
});
const isDelete = ref<any>(false);
let str = "";
// 自定义校验
const validateNumber = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请输入数字"));
  } else if (!/^\d+(\.\d+)?$/.test(value)) {
    callback(new Error("请输入有效的数字"));
  } else {
    callback();
  }
};
// 校验
const formRules = ref<FormRules>({
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  director: [{ required: true, message: "请选择部门主管", trigger: "change" }],
  commission: [
    { required: false, message: "请输入提成比例", trigger: "blur" },
    {
      validator: validateNumber,
      trigger: "blur",
    },
  ],
});
onMounted(async () => {
  nextTick(async () => {
    // 用户列表
    const { data } = await managerApi.list({
      id: "",
      userName: "",
      active: "",
      departmentId: "",
    });
    staffList.value = data.data;
    // 用户列表
    // const res = await managerApi.undistributedDepartment();
    // undistributedDepartmentList.value = res.data;
  });
  if (form.value.commissionStatus !== 1) {
    formRules.value.commission = [];
  }
  if (form.value.id !== "") {
    getInfo();
  }
});
// 修改回显数
function getInfo() {
  loading.value = true;
  form.value = JSON.parse(props.row);
  str = form.value.userInfo.id;
  // undistributedDepartmentList.value.push(form.value.userInfo);
  // undistributedDepartmentList.value = undistributedDepartmentList.value.reduce(
  //   (item: any, val: any) => {
  //     if (!item.find((ite: any) => ite.id === val.id)) {
  //       item.push(val);
  //     }
  //     return item;
  //   },
  //   []
  // );
  loading.value = false;
}
const directorChange = (val: any) => {
  if (val === str) {
    str = val;
    isDelete.value = true;
  } else {
    isDelete.value = false;
  }
};
// 暴露提交
defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      try {
        if (form.value.id === "") {
          formRef.value &&
            formRef.value.validate((valid) => {
              if (valid) {
                delete form.value.id;
                delete form.value.memberCount;
                if (form.value.commissionStatus !== 1) {
                  formRules.value.commission = [];
                  form.value.commission = 0;
                  form.value.commissionType = 0;
                }
                loading.value = true;
                api.create(form.value).then(() => {
                  loading.value = false;
                  ElMessage.success({
                    message: "新增成功",
                    center: true,
                  });
                  resolve();
                });
              }
            });
        } else {
          formRef.value &&
            formRef.value.validate((valid) => {
              if (valid) {
                loading.value = true;
                delete form.value.memberCount;
                if (form.value.commissionStatus !== 1) {
                  form.value.commission = 0;
                  form.value.commissionType = 0;
                }
                if (form.value.director === str) {
                  delete form.value.director;
                }
                if (isDelete.value) {
                  delete form.value.director;
                }
                api.edit(form.value).then(() => {
                  loading.value = false;
                  ElMessage.success({
                    message: "编辑成功",
                    center: true,
                  });
                  resolve();
                });
              }
            });
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          loading.value = false;
        }, 1000);
      }
    });
  },
});
</script>

<template>
  <div v-loading="loading">
    <ElForm
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="130px"
      label-suffix="："
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入部门名称"
          clearable
          @change=""
        />
      </el-form-item>
      <el-form-item label="部门主管" prop="director">
        <el-select
          v-model="form.director"
          value-key=""
          placeholder="请选择部门主管"
          clearable
          filterable
          @change="directorChange"
        >
          <el-option
            v-for="item in staffList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.distribution !== 2"
          />
          <!-- <el-option
            v-for="item in undistributedDepartmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          /> -->
        </el-select>
      </el-form-item>
      <el-row style="margin-bottom: 0px" :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门提成" prop="commissionStatus">
            <el-switch
              v-model="form.commissionStatus"
              active-text="启用"
              inactive-text="禁用"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            v-show="form.commissionStatus === 1"
            label="提成发放规则"
            prop="commissionType"
          >
            <el-select
              v-model="form.commissionType"
              value-key=""
              placeholder="请选择发放提成方式"
              clearable
              filterable
            >
              <el-option
                v-for="item in commissionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        v-show="form.commissionStatus === 1"
        label="提成比例"
        prop="commission"
      >
        <el-input
          v-model.number="form.commission"
          placeholder="请输入提成比例"
          clearable
          ><template #append>%</template></el-input
        >
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="10"
          placeholder="请输入备注"
          clearable
        />
      </el-form-item>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep {
  .bytemd-body {
    height: calc(100% - 41px);
  }
}

:deep(.editor) {
  width: 100%;
}
</style>
