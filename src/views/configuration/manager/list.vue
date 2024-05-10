<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import FormMode from './components/FormMode/index.vue'
import eventBus from '@/utils/eventBus'
import apiManager from '@/api/modules/manager'
import { ref } from 'vue';

defineOptions({
  name: 'PagesExampleManagerList',
})

const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination()
const tabbar = useTabbar()

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
  },
  // 搜索
  search: {
    account: '',
    name: '',
    mobile: '',
    sex: '',
  },
  // 批量操作
  batch: {
    enable: true,
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

function getDataList() {
  data.value.loading = true
  const params = {
    ...getParams(),
    ...(data.value.search.account && { account: data.value.search.account }),
    ...(data.value.search.name && { name: data.value.search.name }),
    ...(data.value.search.mobile && { mobile: data.value.search.mobile }),
    ...(data.value.search.sex !== '' && { sex: data.value.search.sex }),
  }
  apiManager.list(params).then((res: any) => {
    data.value.loading = false
    data.value.dataList = res.data.list
    data.value.dataList.forEach((item: any) => {
      item.statusLoading = false
    })
    pagination.value.total = res.data.total
  })
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

function onCreate() {
  if (data.value.formMode === 'router') {
    tabbar.open({
      name: 'pagesExampleGeneralManagerCreate',
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
  }
}

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
    data.value.formModeProps.visible = true
  }
}

function onChangeStatus(row: any) {
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(`确认${!row.status ? '启用' : '禁用'}「${row.account}」吗？`, '确认信息').then(() => {
      row.statusLoading = true
      apiManager.changeStatus({
        id: row.id,
        status: !row.status,
      }).then(() => {
        row.statusLoading = false
        ElMessage.success({
          message: `模拟${!row.status ? '启用' : '禁用'}成功`,
          center: true,
        })
        return resolve(true)
      }).catch(() => {
        row.statusLoading = false
        return resolve(false)
      })
    }).catch(() => {
      return resolve(false)
    })
  })
}

function onResetPassword(row: any) {
  ElMessageBox.confirm(`确认将「${row.account}」的密码重置为 “123456” 吗？`, '确认信息').then(() => {
    apiManager.passwordReset(row.id).then(() => {
      ElMessage.success({
        message: '模拟重置成功',
        center: true,
      })
    })
  }).catch(() => { })
}

function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.account}」用户吗？`, '确认信息').then(() => {
    apiManager.delete(row.id).then(() => {
      getDataList()
      ElMessage.success({
        message: '模拟删除成功',
        center: true,
      })
    })
  }).catch(() => { })
}

function handleMoreOperating(command: string, row: any) {
  switch (command) {
    case 'resetPassword':
      onResetPassword(row)
      break
    case 'delete':
      onDel(row)
      break
  }
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="data.search" size="default" label-width="100px" inline-message inline class="search-form">
            <ElFormItem >
              <ElInput v-model="data.search.account" placeholder="请输入帐号，支持模糊查询" clearable
                @keydown.enter="currentChange()" @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem >
              <ElInput v-model="data.search.name" placeholder="请输入姓名，支持模糊查询" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem v-show="!fold"  >
              <ElInput v-model="data.search.mobile" placeholder="请输入手机号" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem v-show="!fold" >
              <ElRadioGroup v-model="data.search.sex" @change="currentChange()">
                <ElRadioButton label="">
                  全部
                </ElRadioButton>
                <ElRadioButton :label="1">
                  男
                </ElRadioButton>
                <ElRadioButton :label="0">
                  女
                </ElRadioButton>
                <ElRadioButton :label="2">
                  保密
                </ElRadioButton>
              </ElRadioGroup>
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
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
        <ElButton v-if="data.batch.enable" size="default" :disabled="!data.batch.selectionDataList.length">
          批量操作
        </ElButton>
      </ElSpace>
      <ElTable v-loading="data.loading" class="my-4" :data="data.dataList" stripe highlight-current-row border
        height="100%" @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
        <ElTableColumn v-if="data.batch.enable" type="selection" align="center" fixed />
        <ElTableColumn prop="account" sortable label="帐号" />
        <ElTableColumn prop="name" label="姓名" width="100" align="center" />
        <ElTableColumn prop="sex" label="性别" width="100" align="center">
          <template #default="scope">
            <ElTag v-if="scope.row.sex === 1" type="success" size="small">
              男
            </ElTag>
            <ElTag v-else-if="scope.row.sex === 0" type="warning" size="small">
              女
            </ElTag>
            <ElTag v-else type="info" size="small">
              保密
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="mobile" label="手机号" width="150" align="center" />
        <ElTableColumn label="状态" width="100" align="center">
          <template #default="scope">
            <ElSwitch v-model="scope.row.status" :loading="scope.row.statusLoading" inline-prompt active-text="启用"
              inactive-text="禁用" :before-change="() => onChangeStatus(scope.row)" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="200" align="center" fixed="right">
          <template #default="scope">
            <ElSpace>
              <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
                编辑
              </ElButton>
              <ElDropdown @command="handleMoreOperating($event, scope.row)">
                <ElButton size="small">
                  更多操作
                  <SvgIcon name="i-ep:arrow-down" class="el-icon--right" />
                </ElButton>
                <template #dropdown>
                  <ElDropdownMenu>
                    <ElDropdownItem command="resetPassword">
                      重置密码
                    </ElDropdownItem>
                    <ElDropdownItem command="delete" divided>
                      删除
                    </ElDropdownItem>
                  </ElDropdownMenu>
                </template>
              </ElDropdown>
            </ElSpace>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @current-change="currentChange" @size-change="sizeChange" />
    </PageMain>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList" />
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
