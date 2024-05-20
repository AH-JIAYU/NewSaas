<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Edit',
})
// 弹框开关变量
const dialogTableVisible = ref(false)
const total = ref()
// 提交数据
function onSubmit() {}
// 获取数据
async function showEdit(row: any) {
  dialogTableVisible.value = true
}
// 暴露方法
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="配额详情"
      direction="rtl"
      :close-on-click-modal="false"
      size="50%"
    >
      <el-divider content-position="center">
        <div class="eldivider">
          Quotas of PO2303171004W101050 NZ：
        </div>
      </el-divider>
      <el-form label-width="100px" :inline="false">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="UpdateTimeL:">
              <el-text class="mx-1">
                2024-05-09 10:24:14
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8" />
          <el-col :span="8" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="NZ：">
              <el-text class="mx-1">
                Whisky
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="BA：">
              <el-text class="mx-1">
                22
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Males：">
              <el-text class="mx-1">
                227
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Female：">
              <el-text class="mx-1">
                179
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="18-29：">
              <el-text class="mx-1">
                166
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="30-44：">
              <el-text class="mx-1">
                121
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="45-69：">
              <el-text class="mx-1">
                169
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="center" />
        <el-row :gutter="20">
          <el-col :span="7" />
          <el-col :span="10">
            <el-form-item label="">
              <el-text class="mx-1">
                male and female aged 18-69 years
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="7" />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="">
              <el-text class="mx-1">
                New Zealand
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="">
              <el-text class="mx-1">
                IR:25%
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="">
              <el-text class="mx-1">
                LOI:15
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="">
              <el-text class="mx-1">
                N=50
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="eldividers">
          P2303171004-1-W1
        </div>
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div style="text-align: center; font-weight: 700;">
            <span>Quota Infomation</span>
          </div>
          <div class="" style="border-top: 1px solid #dcdfe6; margin: 10px;" />
          <div class="rightspan">
            <span>Updated Time  :  2024-05-08 01:18:25</span>
          </div>
          <div class="" style="border-top: 1px solid #dcdfe6;margin: 10px;" />
          <el-row :gutter="20">
            <el-col :span="10">
              <el-text class="mx-1">
                male and female aged 18-69 years
              </el-text>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-text class="mx-1">
                New Zealand
              </el-text>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-text class="mx-1">
                IR:14
              </el-text>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-text class="mx-1">
                LOI:15
              </el-text>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="dialogTableVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.eldivider {
  font-size: 20px;
  font-weight: 700;
}
.eldividers {
  font-size: 30px;
  text-align: center;
  color: #52b0cb;
}

:deep {
  .rightspan {
    text-align: right;
    font-size: 12px;
    margin-right: 20px;
  }
}
</style>
