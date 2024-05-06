<script setup lang="ts">
defineOptions({
  name: 'SurveyLeftTabs',
})
import surveyTopTabs from '../SurveyTopTabs/index.vue'
import syncSettings from '../SyncSettings/index.vue'

const settingsRef = ref('')
function setHandler() {
  settingsRef.value.isShow = true
}
</script>

<template>
  <el-button>
    添加子项目
  </el-button>
  <el-tabs tab-position="left">
    <el-tab-pane>
      <!-- 在每个左侧 Tab 中使用 TopTabs 组件 -->
      <el-button size="small" type="success">
        同步数据
      </el-button>
      <div style="margin-left: 10px;" class="i-icon-park-solid:setting h-1.5em w-1.5em" @click="setHandler" />
      <surveyTopTabs left-tab="" tab-index="" />
      <syncSettings ref="settingsRef" />
    </el-tab-pane>
  </el-tabs>
</template>
