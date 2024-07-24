<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import FormMode from './components/FormMode/index.vue'
import eventBus from '@/utils/eventBus'
import api from '@/api/modules/configuration_role'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'SettingRoleList',
})
// 路由
const router = useRouter()
// 分页
const { pagination, onSortChange } = usePagination()
const tabbar = useTabbar()
const settingsStore = useSettingsStore()
// 定义表单
const data = ref({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: 'drawer' as 'router' | 'dialog' | 'drawer',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
    row: {},
  },
  // 搜索
  search: {
    title: '',
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
})

onMounted(() => {
  getDataList()
  if (data.value.formMode === 'router') {
    eventBus.on('get-data-list', () => {
      getDataList()
    })
  }
})

onBeforeUnmount(() => {
  if (data.value.formMode === 'router') {
    eventBus.off('get-data-list')
  }
})
// 获取数据
function getDataList() {
  data.value.loading = true
  api.list().then((res: any) => {
    data.value.loading = false
    data.value.dataList = res.data
    pagination.value.total = res.data.length
  })
}
// 字段排序
function sortChange({ prop, order }: { prop: string, order: string }) {
  onSortChange(prop, order).then(() => getDataList())
}
// 新增
function onCreate() {
  if (data.value.formMode === 'router') {
    if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
      tabbar.open({
        name: 'multilevel_menu_exampleRoleCreate',
      })
    }
    else {
      router.push({
        name: 'multilevel_menu_exampleRoleCreate',
      })
    }
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
  }
}
// 修改
function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
      tabbar.open({
        name: 'multilevel_menu_exampleRoleEdit',
        params: {
          id: row.id,
        },
      })
    }
    else {
      router.push({
        name: 'multilevel_menu_exampleRoleEdit',
        params: {
          id: row.id,
        },
      })
    }
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.row = JSON.stringify(row)
    data.value.formModeProps.visible = true
  }
}
// 删除
function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.roleName}」吗？`, '确认信息').then(() => {
    api.delete({id:row.id}).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => { })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <ElSpace wrap>
        <ElButton type="primary" size="default" @click="onCreate">
          新增角色管理
        </ElButton>
      </ElSpace>
      <ElTable
        v-loading="data.loading" class="my-4" :data="data.dataList" stripe highlight-current-row border
        height="100%" @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <ElTableColumn v-if="data.batch.enable" type="selection" align="center" fixed />
        <ElTableColumn prop="id" width="200" align="center" label="ID" />
        <ElTableColumn prop="roleName" align="center" label="角色码" />
        <ElTableColumn label="操作" width="250" align="center" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
              编辑
            </ElButton>
            <ElButton type="danger" size="small" plain @click="onDel(scope.row)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </ElTable>
    </PageMain>
    <FormMode
      v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id" v-model="data.formModeProps.visible"
      :row="data.formModeProps.row" :mode="data.formMode" @success="getDataList"
    />
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: auto;
    }
  }
}

.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }

  .el-divider {
    width: calc(100% + 40px);
    margin-inline: -20px;
  }
}
</style>
