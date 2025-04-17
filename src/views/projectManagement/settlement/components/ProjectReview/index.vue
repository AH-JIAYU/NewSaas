<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/project_settlement";
import progressDetails from "../progressDetails/index.vue";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "ProjectReview",
});
// 国际化
const { t } = useI18n();

const progressDetailsRef = ref<any>();
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
// 自定义校验
const validateNumberInput = (rule: any, value: any, callback: any) => {
  // 使用正则表达式检查输入是否为数字和换行符
  // 去除输入中的所有空格
  const sanitizedValue = value.replace(/\s+/g, '');
  const regex = /^[\d\n]*$/;
  if (!regex.test(sanitizedValue)) {
    callback(new Error(t("recordChange.numEnter")));
  } else {
    callback();
  }
};
// 校验
const formRules = ref<FormRules>({
  settlementType: [
    {
      required: true,
      message: t("recordChange.chooseType"),
      trigger: "change",
    },
  ],
  arr: [
    { required: true, message: t("recordChange.idEnter"), trigger: "blur" },
    {
      validator: validateNumberInput,
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
              formData.value.arr.split("\n").map((line:any) => line.replace(/\s+/g, '')).filter((line: any) => line.length > 0) || [];
          } else {
            formData.value.projectSettlementBuilderList = [];
          }
          delete formData.value.arr;
          // progressDetailsRef.value.showEdit(form.value.projectId)
          const { status } = await api.review(formData.value);
          if (status === 1) {
            const channelObj = new BroadcastChannel("televiseChannel");
            // 发送消息
            channelObj.postMessage("我在子页面提交了,需要刷新列表");
            // console.log(2222222222);
            // 更新列表
            emits("success");
            // 关闭加载
            loading.value = false;
            // 提示成功
            ElMessage.success({
              message: t("recordChange.success"),
              center: true,
            });
            closeHandler();
            // 执行关闭弹框事件
            // setTimeout(() => {

            // }, 3000);
          } else {
            ElMessage.error({
              message: t("recordChange.failure"),
              center: true,
            });
          }
        } else {
          ElMessage({
            message: t("recordChange.check"),
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
      :title="t('recordChange.projectAudit')"
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
            <p class="pp">{{ t("recordChange.projectID") }}</p>
            <p class="neip">
              <el-input
                v-model="form.projectId"
                :placeholder="t('recordChange.projectIDEnter')"
                disabled
                clearable
              ></el-input>
            </p>
          </div>
          <div class="border">
            <p class="pp">{{ t("recordChange.projectName") }}</p>
            <p class="neip">
              <el-input
                v-model="form.projectName"
                disabled
                :placeholder="t('recordChange.projectNameEnter')"
                clearable
              ></el-input>
            </p>
          </div>
        </el-row>
        <div class="shenhe">
          <el-form-item
            prop="settlementType"
            style="display: flex; align-items: center"
            :label="t('recordChange.auditMethod')"
          >
            <el-radio-group v-model="formData.settlementType">
              <el-radio :value="1" size="large">
                {{ t("recordChange.successID") }}
              </el-radio>
              <el-radio :value="2" size="large">
                {{ t("recordChange.failureID") }}
              </el-radio>
              <el-radio :value="3" size="large">
                {{ t("recordChange.allPass") }}
              </el-radio>
              <el-radio :value="4" size="large">
                {{ t("recordChange.allFailure") }}
              </el-radio>
              <el-radio :value="5" size="large">
                {{ t("recordChange.dataFreezing") }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="beizhu">
          <el-form-item :label="t('recordChange.remark')">
            <el-input
              class="custom-input"
              v-model="formData.remark"
              placeholder=""
              clearable
            />
          </el-form-item>
        </div>
        <!-- v-if="checked" -->
        <div class="po">
          <el-form-item  :label="t('recordChange.PONumber')">
            <el-input
              v-model="formData.po"
              class="custom-input"
              placeholder=""
              clearable
              @change=""
            />
          </el-form-item>
        </div>
        <!-- <el-row style="margin: 0" :gutter="20">
          <el-col :span="20"> </el-col>
          <el-col :span="4">
            <el-checkbox
              v-model="checked"
              :label="t('recordChange.PONumberEnter')"
              size="large"
          /></el-col>
        </el-row> -->
        <el-row
          v-if="formData.settlementType === 1 || formData.settlementType === 2"
          style="margin: 0; width: 100%"
          :gutter="20"
        >
          <el-form-item style="width: 100%" prop="arr">
            <el-input
              v-model="formData.arr"
              :placeholder="t('recordChange.onlyOne')"
              type="textarea"
              :rows="15"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <div class="flex-c">
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
      <progressDetails ref="progressDetailsRef" />
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

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
