<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/alter";

defineOptions({
  name: "ProjectReview",
});
// 变更数据
const alterList = ref([])
// 更新数据
const emits = defineEmits(["success"]);
// loading
const loading = ref(false);
// 接收传递数据
const form = ref<any>();
// 初始表单数据
const formData = ref<any>({
  // 审核类型 1:按成功id 2:按失败id 3:全部通过 4:全部失败 5:数据冻结
  surveyType: null,
  // 副状态
  viceType: null,
  type: "",
  // 备注
  remark: "",
  // 	需要修改的数据
  projectClickIdList: [],
  // 成功id/失败id
  arr: [],
});
// 查询参数
const queryForm = reactive<any>({
  // 页数
  page: 1,
  // 条数
  limit: 10,
  // 类型 1成功/待审核 2审核通过 3审核失败 4数据冻结 5被甄别 6配额满
  type: null,
  // 操作人id
  createUserId: "",
});
// 校验
const formRules = ref<FormRules>({
  type: [{ required: true, message: "请选择审核方式", trigger: "change" }],
  arr: [
    { required: true, message: "请输入至少一个ID", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (/^\d+$/m.test(value)) {
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
// 弹框开关变量
const dialogTableVisible = ref(false);
// 获取数据
async function showEdit(row: any) {
  dialogTableVisible.value = true;
}
// 提交数据
async function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      try {
        if (valid) {
          loading.value = true;
          const type = formData.value.type.split(",");
          formData.value.surveyType = +type[0];
          if (type[1] === "null") {
            formData.value.viceType = null;
          } else {
            formData.value.viceType = +type[1];
          }
          formData.value.projectClickIdList =
            formData.value.arr.split("\n") || [];
          delete formData.value.arr;
          delete formData.value.type;
          const { status } = await api.edit(formData.value);
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
  // // 重置表单
  Object.assign(formData.value, {
    // 审核类型 1:按成功id 2:按失败id 3:全部通过 4:全部失败 5:数据冻结
    surveyType: null,
    // 副状态
    viceType: null,
    // 备注
    remark: "",
    // 	需要修改的数据
    projectClickIdList: [],
  });
  formData.value.arr = [];
  dialogTableVisible.value = false;
}
onMounted(async () => {
  const { data } = await api.list(queryForm);
  alterList.value = data.tenantUpdateRecordVOBuilders
});
// 暴露
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="记录变更"
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
        <div class="shenhe">
          <el-form-item
            prop="type"
            style="display: flex; align-items: center"
            label="变更状态"
          >
            <el-radio-group v-model="formData.type">
              <el-radio value="1,0" size="large"> 完成/待审核 </el-radio>
              <el-radio value="1,7" size="large"> 审核通过 </el-radio>
              <el-radio value="1,8" size="large"> 审核失败 </el-radio>
              <el-radio value="1,9" size="large"> 数据冻结 </el-radio>
              <el-radio value="2,null" size="large"> 被甄别 </el-radio>
              <el-radio value="3,null" size="large"> 配额满 </el-radio>
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
        <div style="margin-top: 10px">
          <el-form-item prop="arr">
            <el-input
              v-model="formData.arr"
              placeholder="请粘贴ID，每行一个,多个请回车换行"
              type="textarea"
              rows="15"
            />
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
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
  width: 50%;
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
    margin: 0 !important;
    width: 50px;
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
