<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import FormMode from './components/FormMode/index.vue'
import eventBus from '@/utils/eventBus'
import apiUser from '@/api/modules/configuration_manager'
import useBasicDictionaryStore from '@/store/modules/otherFunctions_basicDictionary'
import useTenantRoleStore from '@/store/modules/tenant_role'

defineOptions({
  name: 'SettingUserList',
})
// 国家
const useStoreCountry = useBasicDictionaryStore()
const filterCountry = ref<any>([])
// 角色码
const roleStore = useTenantRoleStore()
// 角色
const munulevs = ref()
// 分页
const { pagination, onSizeChange, onCurrentChange, onSortChange } = usePagination()
const tabbar = useTabbar()
// 定义表单
const data = ref<any>({
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
    row: '',
  },
  editProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search: {
    name: '',
    role: '',
  },
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
})
// 筛选国家
const list = ref<any>()
onMounted(async () => {
  getDataList()
  filterCountry.value = await useStoreCountry.getCountry()
  munulevs.value = await roleStore.getRole
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
  apiUser.list(data.value.search).then((res: any) => {
    data.value.loading = false
    data.value.dataList = res.data
    pagination.value.total = res.data?.length
    data.value.dataList.forEach((item: any) => {
      item.statusLoading = false
    })
  })
}

// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    name: '',
    role: '',
  })
  getDataList()
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}
// 字段排序
function sortChange({ prop, order }: { prop: string, order: string }) {
  onSortChange(prop, order).then(() => getDataList())
}
// 新增
function onCreate() {
  if (data.value.formMode === 'router') {
    tabbar.open({
      name: 'pagesExampleGeneralManagerCreate',
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.row = ''
    data.value.formModeProps.visible = true
  }
}
// 修改
function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    tabbar.open({
      name: 'pagesExampleGeneralManagerEdit',
      params: {
        id: row.id,
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.row = JSON.stringify(row)
    data.value.formModeProps.visible = true
  }
}
// 开关事件
function onChangeStatus(row: any) {
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(`确认${!row.active ? '启用' : '禁用'}「${row.name}」吗？`, '确认信息').then(() => {
      data.value.loading = true
      apiUser.edit({
        id: row.id,
        account: null,
        name: null,
        sex: null,
        phoneNumber: null,
        active: !row.active,
      }).then(() => {
        ElMessage.success({
          message: `${!row.active ? '启用' : '禁用'}成功`,
          center: true,
        })
        getDataList()
        data.value.loading = false
        return resolve(true)
      }).catch(() => {
        data.value.loading = false
        return resolve(false)
      })
    }).catch(() => {
      return resolve(false)
    })
  })
}
// 删除
function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.name}」用户吗？`, '确认信息').then(() => {
    apiUser.delete({ id: row.id }).then(() => {
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
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="data.search" size="default" label-width="100px" inline-message inline class="search-form">
            <ElFormItem v-show="!fold">
              <ElInput v-model="data.search.name" placeholder="请输入姓名" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem prop="role">
              <el-select v-model="data.search.role" placeholder="请选择角色">
                <el-option v-for="item in munulevs" :key="item.id" :label="item.roleName" :value="item.roleName" />
              </el-select>
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <div class="i-grommet-icons:power-reset h-1em w-1em" />
                </template>
                重置
              </ElButton>
              <ElButton link @click="toggle">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? '展开' : '收起' }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <ElSpace wrap>
        <ElButton type="primary" size="default" @click="onCreate">
          <template #icon>
            <SvgIcon name="i-ep:plus" />
          </template>
          新增用户
        </ElButton>
      </ElSpace>
      <ElTable v-loading="data.loading" class="my-4" :data="data.dataList" stripe highlight-current-row border
        height="100%" @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
        <ElTableColumn v-if="data.batch.enable" type="selection" align="center" fixed />
        <ElTableColumn prop="account" sortable label="帐号">
          <template #default="{ row }">
            <el-text v-if="row.country === 'CN'" class="mx-1">
              {{ row.phone }}
            </el-text>
            <el-text v-else class="mx-1">
              {{ row.email }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" label="姓名" width="100" align="center">
          <template #default="{ row }">
            <el-text class="mx-1">
              {{ row.name ? row.name : '暂无数据' }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="role" align="center" width="150" label="角色">
          <template #default="{ row }">
            <el-text class="mx-1">
              {{ row.role ? row.role : '暂无数据' }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="mobile" label="国家" width="150" align="center">
          <template #default="{ row }">
            <div v-for="item in filterCountry" :key="item.id" class="mx-1">
              <el-text v-if="item.code === row.country" class="mx-1">
                {{item.chineseName}}
            </el-text>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="状态" width="100" align="center">
          <template #default="scope">
            <ElSwitch v-model="scope.row.active" inline-prompt active-text="启用" inactive-text="禁用"
              :before-change="() => onChangeStatus(scope.row)" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="200" align="center" fixed="right">
          <template #default="scope">
            <ElSpace>
              <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" plain @click="onDel(scope.row)">
                删除
              </ElButton>
            </ElSpace>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @current-change="currentChange" @size-change="sizeChange" />
    </PageMain>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :row="data.formModeProps.row" :mode="data.formMode" @success="getDataList" />
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
