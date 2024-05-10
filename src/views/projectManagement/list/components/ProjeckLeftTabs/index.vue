<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { defineProps, provide, ref } from 'vue'
import TopTabs from '../ProjeckTopTabs/index.vue'
import SyncSettings from '../SyncSettings/index.vue'

const props = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
})
const client = ref()
const settingsRef = ref(null)
const localLeftTab = ref<any>(props.leftTabsData)
const validateTopTabs = ref<any>(props.validateTopTabs)

// 为每个 tab 创建并提供一个唯一的 ref
localLeftTab.value.forEach((tab: any, index: any) => {
  const formRef = ref(null)
  provide(`formRef${index}`, formRef)
})

let tabIndex = 0
const activeLeftTab = ref(0)

const initialTopTabsData = {
  name: '新建项目',
  platform: {},
  screen: {},
  security: {},
}
// 同步配置项
function setHandler() {
  settingsRef.value.showEdit()
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
</script>

<template>
  <el-button @click="addLeftTab()">
    添加子项目
  </el-button>
  <el-tabs v-model="activeLeftTab" tab-position="left" @tab-remove="tabremove">
    <el-tab-pane v-for="(leftTab, index) in localLeftTab" :key="index" :closable="localLeftTab.length !== 1" :label="leftTab.name" :name="index">
      <!-- 在每个左侧 Tab 中使用 TopTabs 组件 -->
      <el-button v-if="activeLeftTab > 0" size="small" type="success" @click="syncProject">
        同步主项目数据
      </el-button>
      <div style="margin-left: 10px;" class="i-icon-park-solid:setting h-1.5em w-1.5em" @click="setHandler" />
      <TopTabs :left-tab="leftTab" :tab-index="index" @set-client="setclient" />
    </el-tab-pane>
    <SyncSettings ref="settingsRef"/>
  </el-tabs>
</template>
