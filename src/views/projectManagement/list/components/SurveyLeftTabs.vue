<!-- <script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import topTabs from './SurveyTopTabs.vue'
import { translate } from '@/i18n'
import { useAclStore } from '@/store/modules/acl'

const props = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
})
const client = ref()
const localLeftTab = ref<any>(props.leftTabsData)
const validateTopTabs = ref<any>(props.validateTopTabs)

// 为每个 tab 创建并提供一个唯一的 ref
localLeftTab.value.forEach((tab: any, index: any) => {
  const formRef = ref(null)
  provide(`formRef${index}`, formRef)
})

const acl = useAclStore()
const { surveyconfig } = storeToRefs<any>(acl)
let tabIndex = 0
const activeLeftTab = ref(0)

const initialTopTabsData = {
  name: translate('新建项目'),
  currency: surveyconfig.currency,
  platform: {},
  screen: {},
  security: {},
}

// 同步主项目
function syncProject() {
  const syncdata = cloneDeep(localLeftTab.value[0])
  localLeftTab.value[activeLeftTab.value] = syncdata
}

function addLeftTab() {
  const syncdata = cloneDeep(localLeftTab.value[0])
  activeLeftTab.value = ++tabIndex
  localLeftTab.value.push({
    ...initialTopTabsData,
    client: client.value,
    await: syncdata.await,
    multi: syncdata.multi,
  })
}

function tabremove(tabIndex: any) {
  localLeftTab.value.splice(tabIndex, 1)
  validateTopTabs.value.splice(tabIndex, 1)
  if (activeLeftTab.value >= localLeftTab.value.length) {
    activeLeftTab.value = Math.max(0, localLeftTab.value.length - 1)
  }
}
function setclient(data: number) {
  localLeftTab.value.forEach((item: any) => {
    item.client = data
  })
  client.value = data
}
</script> -->
<script setup>
import surveyTopTabs from './SurveyTopTabs.vue'
import syncSettings from './syncSettings.vue'

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
