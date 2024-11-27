<script setup lang="ts">
import { ElMessage } from "element-plus";
import apiSite from "@/api/modules/configuration_site_setting";
import useUserStore from "@/store/modules/user";


const userStore: any = useUserStore();
// 快速编辑汇率弹框开关
const dialogVisibleExchangeRate = ref<any>(false)
// 绑定表单
const exchangeRateRef = ref<any>('')
// 表单
const exchangeRateForm = ref<any>({
  // 汇率
  exchangeRate: null,
})

// 校验
const exchangeRateRules = reactive<any>({
  exchangeRate: [
    { required: true, message: "请输入汇率", trigger: "blur" },
    { pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/, message: '请输入一个有效的数字，不能小于0，最多保留两位小数', trigger: 'blur' }
  ],
});

// 快速设置汇率
const showEdit = () => {
  dialogVisibleExchangeRate.value = true;
}

// 提交汇率
const exchangeRateSubmit = async () => {
  await exchangeRateRef.value.validate()
  const res = await apiSite.updateWebConfig(exchangeRateForm.value)
  if (res.data.flag) {
    await userStore.getCurrencyType()
    ElMessage.success({
      message: "修改成功",
      center: true,
    });
    dialogVisibleExchangeRate.value = false;
  }
}

defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisibleExchangeRate" title="设置汇率" width="500">
      <el-form :model="exchangeRateForm" ref="exchangeRateRef" :rules="exchangeRateRules" label-width="90px"
        :inline="false">
        <el-form-item label="美元汇率" prop="exchangeRate">
          <div class="right">
            <el-input v-model="exchangeRateForm.exchangeRate" placeholder="请输入数值" clearable>
              <template #prefix>
                <!-- 自定义 SVG 图标作为前缀图标 -->
                <el-text style="color: #333;">
                  1 美元 (USD)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=
                </el-text>
              </template>

              <template #suffix>
                <!-- 自定义 SVG 图标作为后缀图标 -->
                <el-text style="color: #333;">
                  人民币 (CNY)
                </el-text>
              </template>
            </el-input>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="exchangeRateSubmit">
            确认
          </el-button>
          <el-button @click="dialogVisibleExchangeRate = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.right .el-input__inner) {
  text-align: center;
}
</style>
