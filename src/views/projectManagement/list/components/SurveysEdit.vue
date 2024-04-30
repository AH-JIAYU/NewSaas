<!-- <script lang="ts" setup>
import LeftTabs from './SurveyLeftTabs.vue'
import { addSurvey, doEdit } from '@/api/modules/surveyManagement'
import { useAclStore } from '@/store/modules/acl'
import { translate } from '@/i18n'

const emit = defineEmits(['fetch-data'])
const drawerisible = ref<boolean>(false)
const $baseMessage = inject<any>('$baseMessage')
const title = ref<string>('')
const acl = useAclStore()
const { surveyconfig } = storeToRefs<any>(acl)
const validateTopTabs = ref<any>([])
function pushData(data: any) {
  validateTopTabs.value.push(data)
}
// 提供一个方法，孙组件可以使用这个方法来触发验证
provide('validateTopTabs', pushData)

let leftTabsData = reactive<any>([]) // 明确指定类型为 LeftTab[]

async function showEdit(row: any) {
  if (!row) {
    title.value = '添加'
    leftTabsData = reactive([
      {
        name: translate('主项目'),
        currency: surveyconfig.currency,
        platform: {},
        screen: {},
        security: {},
      },
    ])
  }
  else {
    title.value = '编辑'
    initializeLeftTabsData(row)
  }
  drawerisible.value = true
}

function initializeLeftTabsData(data: any) {
  // 清空现有数据
  leftTabsData.length = 0
  // 添加主数据作为第一个 Tab
  leftTabsData.push({
    ...data,
  })

  // 如果存在 children，为每个 child 创建一个 Tab
  if (data.children && data.children.length) {
    data.children.forEach((child: any) => {
      leftTabsData.push({
        ...child,
      })
    })
  }
}
function close() {
  leftTabsData = reactive<any>([])
  emit('fetch-data')
  drawerisible.value = false
  validateTopTabs.value = []
}

async function save() {
  const arr: any = []
  validateTopTabs.value.forEach((element: any) => {
    arr.push(element.validate())
  })
  try {
    // 实现全部校验  validateTopTabs为数组，每个元素为子组件的ref
    const ispass = (await Promise.all(arr)).every((item: any) => item)
    if (ispass) {
      if (title.value === '添加') {
        const { message }: any = await addSurvey(leftTabsData)
        $baseMessage(message, 'success', 'hey')
      }
      else {
        // 更新接口
        const { message }: any = await doEdit(leftTabsData)
        $baseMessage(message, 'success', 'hey')
      }
      emit('fetch-data')
      close()
    }
  }
  catch (error) {
    $baseMessage('请完善信息', 'error', 'hey')
    console.error('Form validation failed:', error)
  }
}

// ... 这里可能还有其他逻辑 ...
defineExpose({
  showEdit,
})
</script> -->
<script setup>
import { ref, watch } from 'vue'
import surveyLeftTabs from './SurveyLeftTabs.vue'

const radio1 = ref(1)
// 弹框开关变量
const isShow = ref(false)
// 提交数据
function onSubmit() {

}
watch(() => radio1, (newVal) => {
  console.log('val', newVal)
})
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()

  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
}
defineExpose({ isShow })
</script>

<template>
  <div>
    <el-drawer
      v-model="isShow"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
      title=""
    >
      <surveyLeftTabs left-tabs-data="" validate-top-tabs="" />
      <template #footer>
        <el-button @close="closeHandler">
          取消
        </el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>
