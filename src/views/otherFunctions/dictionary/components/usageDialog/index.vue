<script setup lang="ts">
import type { DictionaryItem } from '@/store/modules/dictionary'
import useDictionaryStore from '@/store/modules/dictionary'

const visible = defineModel<boolean>({
  default: false,
})

const keyList = ref([
  { name: '证件', code: 'user_card' },
  { name: '学历', code: 'user_education' },
])
const key = ref('')

const dictionaryStore = useDictionaryStore()

const dictionary = ref<DictionaryItem[]>([])

function onChange(val: string) {
  dictionaryStore.get(val).then((res) => {
    dictionary.value = res
  })
}
</script>

<template>
  <ElDialog v-model="visible" title="使用示例" width="400px" :close-on-click-modal="false" append-to-body destroy-on-close @closed="visible = false">
    <ElAlert :closable="false">
      如果全局状态中没有该字典，则会请求接口获取并存储在全局状态中。
    </ElAlert>
    <ElSelect v-model="key" style="width: 100%;" @change="onChange">
      <ElOption v-for="item in keyList" :key="item.code" :label="item.name" :value="item.code" />
    </ElSelect>
    <p>
      {{ dictionary }}
    </p>
  </ElDialog>
</template>
