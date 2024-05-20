<script setup>
import { Back } from '@element-plus/icons-vue'
import { h, ref, shallowRef } from 'vue'

const radio2 = ref('day')
const value2 = ref('')
function back() {
  radio2.value = 'day'
}
const customPrefix = shallowRef({ // 去除icon
  render() {
    return h('p', '')
  },
})
</script>

<template>
  <div style="width: 200px;height: 33px;">
    <el-radio-group v-if="radio2 !== 'search'" v-model="radio2">
      <el-radio-button label="日" value="day" />
      <el-radio-button label="月" value="month" />
      <el-radio-button label="年" value="year" />
      <el-radio-button label="搜索" value="search" />
    </el-radio-group>
    <div v-else class="fx-b">
      <el-button size="default" style="width: 32px !important;" :icon="Back" @click="back" />
      <el-date-picker
        v-model="value2" type="daterange" unlink-panels range-separator="-" start-placeholder="开始"
        end-placeholder="结束" size="default" style="flex: 1;" :prefix-icon="customPrefix"
      />
      <el-button type="primary" style="width: 59px;" size="default">
        搜索
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;

  :deep {
    .el-date-editor {
      border-radius: 0 !important;
    }

    .el-button:nth-of-type(1) {
      border-radius: 4px 0 0 4px !important;
      border-right: 0px;
    }

    .el-button:nth-of-type(2) {
      border-radius: 0 4px 4px 0 !important;
    }
    .el-icon.el-input__icon.el-range__icon{
      display:none !important;
    }
  }

}
</style>
