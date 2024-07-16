<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
// import api from "@/api/modules/project_settlement";

defineOptions({
  name: "ProjectReview",
});
// 列表数据
const list = ref<any>([])
list.value = [
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  ]
// 更新数据
const emits = defineEmits(["success"]);
// loading
const loading = ref(false);
// 成功id/失败id
const arr = ref<any>([]);
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
      if (valid) {
        loading.value = true;
        delete formData.value.projectName;
        if (
          formData.value.settlementType === 1 ||
          formData.value.settlementType === 2
        ) {
          formData.value.projectSettlementBuilderList =
            arr.value.split("\n") || [];
        } else {
          formData.value.projectSettlementBuilderList = [];
        }
        // const { status } = await api.review(formData.value);
        // if (status === 1) {
        //   // 更新列表
        //   emits("success");
        //   // 关闭加载
        //   loading.value = false;
        //   // 提示成功
        //   ElMessage.success({
        //     message: "操作成功",
        //     center: true,
        //   });
        //   // 执行关闭弹框事件
        //   closeHandler();
        // }else {
        //   ElMessage.error({
        //     message: "操作失败，请联系工作人员",
        //     center: true,
        //   });
        // }
      } else {
        ElMessage({
          message: "请选择审核方式",
          type: "warning",
        });
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
  });
  arr.value = [];
  dialogTableVisible.value = false;
}
// 暴露
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="详情"
      size="50%"
      :before-close="closeHandler"
    >
      <el-form
        ref="formRef"
        :model="formData"
        label-width="174px"
        :inline="false"
        v-loading="loading"
      >
        <div class="shenhe">
          <el-form-item
            prop="settlementType"
            style="display: flex; align-items: center"
            label="变更状态"
          >
            <!-- <el-radio-group v-model="formData.settlementType">
              <el-radio :value="1" size="large"> 完成 </el-radio>
              <el-radio :value="2" size="large"> 审核通过 </el-radio>
              <el-radio :value="3" size="large"> 审核失败 </el-radio>
              <el-radio :value="4" size="large"> 数据冻结 </el-radio>
              <el-radio :value="5" size="large"> 被甄别 </el-radio>
              <el-radio :value="6" size="large"> 配额满 </el-radio>
            </el-radio-group> -->
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
          <el-form-item label="结算PO号">
            <el-input
              v-model="formData.po"
              class="custom-input"
              placeholder=""
              clearable
              @change=""
            />
          </el-form-item>
        </div>
      </el-form>
      <el-table style="margin-top: 30px;" :data="list" border>
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column align="center" prop="a" label="ID" />
          <el-table-column align="center" prop="b" label="初始状态" />
          <el-table-column align="center" prop="b" label="变更状态" />
        </el-table>
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
