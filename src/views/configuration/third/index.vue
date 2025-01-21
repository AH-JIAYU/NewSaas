<route lang="yaml">
  meta:
    enabled: false
  </route>

<script setup lang="ts">
import Shortmsg from './components/Shortmsg/index.vue'
import Email from './components/Email/index.vue'
import Qiniu from './components/Qiniu/index.vue'
defineOptions({
  name: "thirdconfig",
});
const activeName = ref('first')
function handleClick(tab:any, event:any) {

    }
</script>

<template>
  <div>
    <PageMain>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="短信配置" name="first">
      <Shortmsg />
    </el-tab-pane>
    <!-- <el-tab-pane label="邮箱配置" name="second">
      <Email />
    </el-tab-pane> -->
    <el-tab-pane label="云存储配置" name="second">
      <Qiniu />
    </el-tab-pane>
  </el-tabs>
</PageMain>
  </div>

</template>
