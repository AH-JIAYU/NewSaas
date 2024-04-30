<script lang="ts" setup>
import { Refresh, Search } from '@element-plus/icons-vue'

defineOptions({
  name: 'TableQuery',
})
defineProps(['listLoading', 'fold'])
const emit = defineEmits(['queryData', 'onReset', 'handleFold'])
const queryData = () => emit('queryData')
const onReset = () => emit('onReset')
const handleFold = () => emit('handleFold')
</script>

<template>
  <el-form-item>
    <el-button :icon="Search" :loading="listLoading" native-type="submit" type="primary" @click="queryData">
      查询
    </el-button>
    <el-button :icon="Refresh" :loading="listLoading" native-type="submit" @click="onReset">
      重置
    </el-button>
    <el-button class="hidden-xs-only" text type="primary" @click="handleFold">
      <span v-if="fold">展开</span>
      <span v-else>合并</span>
    </el-button>
  </el-form-item>
</template>
