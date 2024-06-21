<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import DetailForm from './components/DetailForm/index.vue'
import eventBus from '@/utils/eventBus'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'SettingUserDetail',
})

const route = useRoute()
// 路由
const router = useRouter()
const tabbar = useTabbar()
const settingsStore = useSettingsStore()

const formRef = ref()
// 提交
function onSubmit() {
  formRef.value.submit().then(() => {
    eventBus.emit('get-data-list')
    goBack()
  })
}
// 取消
function onCancel() {
  goBack()
}

// 返回列表页
function goBack() {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.close({ name: 'pagesExampleGeneralManagerList' })
  }
  else {
    router.push({ name: 'pagesExampleGeneralManagerList' })
  }
}
</script>

<template>
  <div>
    <PageHeader :title="route.name === 'routerName' ? '新增用户' : '编辑用户'">
      <ElButton size="default" round @click="goBack">
        <template #icon>
          <SvgIcon name="i-ep:arrow-left" />
        </template>
        返回
      </ElButton>
    </PageHeader>
    <PageMain>
      <ElRow>
        <ElCol :md="24" :lg="16">
          <DetailForm :id="route.params.id as string" ref="formRef" />
        </ElCol>
      </ElRow>
    </PageMain>
    <FixedActionBar>
      <ElButton type="primary" size="large" @click="onSubmit">
        提交
      </ElButton>
      <ElButton size="large" @click="onCancel">
        取消
      </ElButton>
    </FixedActionBar>
  </div>
</template>
