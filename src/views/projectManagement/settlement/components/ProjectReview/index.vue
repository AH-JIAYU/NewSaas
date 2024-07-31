<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/project_settlement";

defineOptions({
  name: "ProjectReview",
});
// 更新数据
const emits = defineEmits(["success"]);
// loading
const loading = ref(false);
// 接收传递数据
const form = ref<any>();
// 初始表单数据
const formData = ref<any>({
  // 项目Id
  projectId: "",
  projectName: "",
  // 审核类型 1:按成功id 2:按失败id 3:全部通过 4:全部失败 5:数据冻结
  settlementType: "",
  // 备注
  remark: "",
  // 	需要修改的数据
  projectSettlementBuilderList: [],
  // 结算po号
  po: "",
  // 成功id/失败id
  arr: "",
});
// 校验
const formRules = ref<FormRules>({
  settlementType: [
    { required: true, message: "请选择审核方式", trigger: "change" },
  ],
  arr: [
    { required: true, message: "请输入至少一个ID", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (/^\d+$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      },
      trigger: "blur",
    },
  ],
});
// formRef
const formRef = ref<any>();
// 判断po变量
const checked = ref(false);
// 弹框开关变量
const dialogTableVisible = ref(false);
// 获取数据
async function showEdit(row: any) {
  if (row) {
    form.value = JSON.parse(row);
    formData.value.projectId = form.value.projectId;
    formData.value.projectName = form.value.projectName;
  }
  dialogTableVisible.value = true;
}
// 提交数据
async function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      try {
        if (valid) {
          loading.value = true;
          delete formData.value.projectName;
          if (
            formData.value.settlementType === 1 ||
            formData.value.settlementType === 2
          ) {
            formData.value.projectSettlementBuilderList =
              formData.value.arr.split("\n") || [];
            delete formData.value.arr;
          } else {
            formData.value.projectSettlementBuilderList = [];
          }
          const { status } = await api.review(formData.value);
          if (status === 1) {
            // 更新列表
            emits("success");
            // 关闭加载
            loading.value = false;
            // 提示成功
            ElMessage.success({
              message: "操作成功",
              center: true,
            });
            // 执行关闭弹框事件
            closeHandler();
          } else {
            ElMessage.error({
              message: "操作失败，请联系工作人员",
              center: true,
            });
          }
        } else {
          ElMessage({
            message: "请检查必填项,或数据格式不正确",
            type: "warning",
          });
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    });
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // delete formData.id
  // // 重置表单
  Object.assign(formData.value, {
    // 项目Id
    projectId: "",
    projectName: "",
    // 审核类型 1:按成功id 2:按失败id 3:全部通过 4:全部失败 5:数据冻结
    settlementType: "",
    // 备注
    remark: "",
    // 	需要修改的数据
    projectSettlementBuilderList: [],
    // 结算po号
    po: "",
    // 成功id/失败id
    arr: "",
  });
  formData.value.arr = [];
  dialogTableVisible.value = false;
}
// 暴露
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="项目审核"
      size="50%"
      :before-close="closeHandler"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="174px"
        :inline="false"
        v-loading="loading"
      >
        <el-row style="margin: 0" :gutter="20">
          <div class="border">
            <p class="pp">项目ID</p>
            <p class="neip">
              <el-input
                v-model="form.projectId"
                placeholder="请输入项目ID"
                disabled
                clearable
              ></el-input>
            </p>
          </div>
          <div class="border">
            <p class="pp">项目名称</p>
            <p class="neip">
              <el-input
                v-model="form.projectName"
                disabled
                placeholder="请输入项目名称"
                clearable
              ></el-input>
            </p>
          </div>
        </el-row>
        <div class="shenhe">
          <el-form-item
            prop="settlementType"
            style="display: flex; align-items: center"
            label="审核方式"
          >
            <el-radio-group v-model="formData.settlementType">
              <el-radio :value="1" size="large"> 按成功ID </el-radio>
              <el-radio :value="2" size="large"> 按失败ID </el-radio>
              <el-radio :value="3" size="large"> 全部通过 </el-radio>
              <el-radio :value="4" size="large"> 全部失败 </el-radio>
              <el-radio :value="5" size="large"> 数据冻结 </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="beizhu">
          <el-form-item label="备注">
            <el-input
              class="custom-input"
              v-model="formData.remark"
              placeholder=""
              clearable
            />
          </el-form-item>
        </div>
        <div class="po">
          <el-form-item v-if="checked" label="结算PO号">
            <el-input
              v-model="formData.po"
              class="custom-input"
              placeholder=""
              clearable
              @change=""
            />
          </el-form-item>
        </div>
        <el-row style="margin: 0" :gutter="20">
          <el-col :span="20"> </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checked" label="填写结算PO号" size="large"
          /></el-col>
        </el-row>
        <el-row
          v-if="formData.settlementType === 1 || formData.settlementType === 2"
          style="margin: 0; width: 100%"
          :gutter="20"
        >
          <el-form-item style="width: 100%" prop="arr">
            <el-input
              v-model="formData.arr"
              placeholder="请粘贴ID，每行一个,多个请回车换行"
              type="textarea"
              rows="15"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.shenhe {
  width: 100%;
  border: 1px solid #ebeef5;
}
.beizhu {
  width: 100%;
  border: 1px solid #ebeef5;
  border-top: none;
}

.asterisk-left {
  margin: 0;
}

.el-input--suffix {
  width: 100%;
  height: 100%;
}

.el-radio-group {
  margin-left: 0.9375rem;
}

.border {
  display: flex;
  align-items: center;
  width: 50%;
  height: 2.5625rem;
  margin: 0;
  border: 1px solid #ebeef5;
  border-bottom: none;
}

.pp {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 38%;
  height: 100%;
  font-size: 14px;
  color: #606266;
  background-color: #fafafa;
}

.neip {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 62%;
  height: 100%;
  color: #606266;
}

:deep {
  .el-form-item__label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 2.5625rem;
    background-color: #fafafa;
  }

  .el-form-item__content {
    width: 100%;
    margin: 0 !important;
    border: none !important;
  }

  .el-input__inner {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .el-input__wrapper {
    border: none !important;
    box-shadow: none !important;
  }
  .po {
    width: 100%;
    border: 1px solid #ebeef5;
    border-top: none;
  }
}
::v-deep .el-input__inner {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
::v-deep .el-input__wrapper {
  border: none !important;
}
:deep(.el-textarea__inner) {
  width: 100%;
}
</style>
