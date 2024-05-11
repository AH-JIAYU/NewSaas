<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DetailFormProps } from '../../types'
import apiRole from '@/api/modules/role'
import apiMenu from '@/api/modules/menu'
import useRouteStore from '@/store/modules/route'

const props = withDefaults(
  defineProps<DetailFormProps>(),
  {
    id: '',
  },
)

const routeStore = useRouteStore()

const loading = ref(false)
const formRef = ref<FormInstance>()
const form = ref({
  id: props.id,
  name: '',
  remark: '',
  auths: [] as string[],
})
const formRules = ref<FormRules>({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
  ],
})

const routesFrom = ref<'frontend' | 'backend'>('frontend')
const routes = ref<any[]>([])
const authsFlat = ref<any>([])

onMounted(() => {
  getAuths()
  if (form.value.id !== '') {
    getInfo()
  }
})

watch(routesFrom, () => {
  getAuths()
})

function getAuths() {
  if (routesFrom.value === 'frontend') {
    routes.value = routeStore.routesRaw
    let id = 1
    const flat = (arr: any[]) => {
      arr.forEach((item: any, index) => {
        arr[index].id = id
        id++
        authsFlat.value.push({
          id: item.id,
          auths: item.meta.auths || [],
        })
        if (item?.children?.length > 0) {
          flat(item.children)
        }
      })
    }
    flat(routes.value)
  }
  else {
    apiMenu.list().then((res: any) => {
      routes.value = res.data
      const flat = (arr: any[]) => {
        arr.forEach((item: any) => {
          authsFlat.value.push({
            id: item.id,
            auths: item.meta.auths,
          })
          if (item?.children?.length > 0) {
            flat(item.children)
          }
        })
      }
      flat(routes.value)
    })
  }
}

function getInfo() {
  loading.value = true
  apiRole.detail(form.value.id).then((res: any) => {
    loading.value = false
    form.value.name = res.data.name
    form.value.remark = res.data.remark
    form.value.auths = res.data.auths
  })
}

const checkAll = computed(() => {
  const isCheckAll: {
    [key: number]: {
      checkAll: boolean
      indeterminate: boolean
    }
  } = {}
  authsFlat.value.forEach((item: any) => {
    let checkCount = 0
    item.auths.forEach((auth: any) => {
      if (form.value.auths.includes(auth.value)) {
        checkCount++
      }
    })
    isCheckAll[item.id] = {
      checkAll: checkCount === item.auths.length,
      indeterminate: checkCount > 0 && checkCount < item.auths.length,
    }
  })
  return isCheckAll
})
function handleCheckAll(flag: any, id: number) {
  if (flag) {
    authsFlat.value.forEach((item: any) => {
      if (item.id === id) {
        item.auths.forEach((auth: any) => {
          if (!form.value.auths.includes(auth.value)) {
            form.value.auths.push(auth.value)
          }
        })
      }
    })
  }
  else {
    authsFlat.value.forEach((item: any) => {
      if (item.id === id) {
        item.auths.forEach((auth: any) => {
          form.value.auths = form.value.auths.filter(item => item !== auth.value)
        })
      }
    })
  }
}

defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      if (form.value.id === '') {
        formRef.value && formRef.value.validate((valid) => {
          if (valid) {
            apiRole.create(form.value).then(() => {
              ElMessage.success({
                message: '模拟新增成功',
                center: true,
              })
              resolve()
            })
          }
        })
      }
      else {
        formRef.value && formRef.value.validate((valid) => {
          if (valid) {
            apiRole.edit(form.value).then(() => {
              ElMessage.success({
                message: '模拟编辑成功',
                center: true,
              })
              resolve()
            })
          }
        })
      }
    })
  },
})
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="120px" label-suffix="：">
      <ElFormItem label="名称" prop="name">
        <ElInput v-model="form.name" placeholder="请输入角色名称" />
      </ElFormItem>
      <ElFormItem label="备注" prop="remark">
        <ElInput v-model="form.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="请输入备注" />
      </ElFormItem>
      <ElFormItem label="权限">
        <div class="mb-2">
          <ElSwitch v-model="routesFrom" inactive-text="前端路由数据" inactive-value="frontend" active-text="后端路由数据" active-value="backend" />
          <el-tooltip content="为方便演示，提供了路由数据分别从前端获取和后端获取的切换" placement="top">
            <SvgIcon name="i-ri:question-line" class="ms-4" />
          </el-tooltip>
        </div>
        <ElTable :key="routesFrom" :data="routes" row-key="id" stripe highlight-current-row default-expand-all border :style="{ lineHeight: 'normal' }">
          <ElTableColumn prop="meta.title" width="300" label="模块" />
          <ElTableColumn label="权限">
            <template #default="{ row }">
              <ElCheckbox v-if="row.meta.auths?.length" v-model="checkAll[row.id].checkAll" :indeterminate="checkAll[row.id].indeterminate" @change="handleCheckAll($event, row.id)">
                全选
              </ElCheckbox>
              <ElCheckboxGroup v-model="form.auths">
                <ElCheckbox v-for="auth in row.meta.auths" :key="auth.value" :label="auth.value">
                  {{ auth.name }}
                </ElCheckbox>
              </ElCheckboxGroup>
            </template>
          </ElTableColumn>
        </ElTable>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-table__header {
    th {
      background: var(--el-fill-color-lighter) !important;
    }
  }
}
</style>
