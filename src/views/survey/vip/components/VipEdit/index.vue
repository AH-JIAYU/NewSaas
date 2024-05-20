<script lang="ts" setup>
import { provide, reactive, ref } from 'vue'
// import { addSurvey, doEdit } from '~/src/api/surveyManagement'
// import { useAclStore } from '~/src/store/modules/acl'
import LeftTabs from '../VipLeftTabs/index.vue'

const emit = defineEmits(['fetch-data'])
const drawerisible = ref<boolean>(false)
const title = ref<string>('')
// const { surveyconfig } = useAclStore()
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
        name: '主项目',
        // currency: surveyconfig.currency,
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
        // const { message }: any = await addSurvey(leftTabsData)
        // $baseMessage(message, 'success', 'hey')
      }
      else {
        // 更新接口
        // const { message }: any = await doEdit(leftTabsData)
        // $baseMessage(message, 'success', 'hey')
      }
      emit('fetch-data')
      close()
    }
  }
  catch (error) {
    // $baseMessage('请完善信息', 'error', 'hey')
    console.error('Form validation failed:', error)
  }
}

// ... 这里可能还有其他逻辑 ...
defineExpose({
  showEdit,
})
</script>

<template>
  <div>
    <el-drawer
      v-model="drawerisible" :class="title === '添加' ? 'hide-drawer-header' : 'edit-drawer'" append-to-body :close-on-click-modal="false" destroy-on-close draggable size="60%"
      @close="close"
    >
      <LeftTabs :left-tabs-data="leftTabsData" :validate-top-tabs="validateTopTabs" />
      <template #footer>
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="warning" @click="">
          暂存
        </el-button>
        <el-button type="primary" @click="save">
          确定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>
