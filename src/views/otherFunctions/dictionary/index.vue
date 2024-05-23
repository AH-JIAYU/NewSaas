<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import DictionaryDialog from './components/dictionaryDialog/index.vue'
import DictionaryItemDialog from './components/dictionaryItemDialog/index.vue'
import UsageDialog from './components/usageDialog/index.vue'
import apiDictionary from '@/api/modules/dictionary'

defineOptions({
  name: 'PagesExampleDictionary',
})

interface Dict {
  id: string | number
  label: string
  code: string
  children?: Dict[]
}
const dictionaryRef = ref()
const dictionary = ref({
  search: '',
  tree: [] as Dict[],
  currentNode: undefined as Node | undefined,
  currentData: undefined as Dict | undefined,
  dialog: {
    visible: false,
    parentId: '' as Dict['id'],
    id: '' as Dict['id'],
  },
})

const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination()
pagination.value.size = 20
pagination.value.sizes = [20, 50, 100]
const dictionaryItemRef = ref()
const dictionaryItem = ref({
  loading: false,
  // 搜索
  search: {
    dictionaryId: '' as Dict['id'],
    title: '',
  },
  // 列表数据
  dataList: [],
  selectionDataList: [],
  dialog: {
    visible: false,
    id: '' as string | number,
  },
})

function getDictionaryList() {
  dictionaryItem.value.search.dictionaryId = ''
  apiDictionary.list().then((res) => {
    dictionary.value.tree = res.data
  })
}
onMounted(() => {
  getDictionaryList()
})
watch(() => dictionary.value.search, (val) => {
  dictionaryRef.value!.filter(val)
})
function dictionaryFilter(value: string, data: Dict) {
  if (!value) {
    return true
  }
  return data.label.includes(value)
}
function dictionaryAdd(data?: Dict) {
  dictionary.value.currentData = data
  dictionary.value.dialog.parentId = data?.id ?? ''
  dictionary.value.dialog.id = ''
  dictionary.value.dialog.visible = true
}
function dictionaryEdit(node: Node, data: Dict) {
  dictionary.value.currentNode = node
  dictionary.value.currentData = data
  dictionary.value.dialog.parentId = node.parent.data.id ?? ''
  dictionary.value.dialog.id = data.id
  dictionary.value.dialog.visible = true
}
function dictionaryDelete(node: Node, data: Dict) {
  ElMessageBox.confirm(`确认删除「${data.label}」吗？`, '确认信息').then(() => {
    apiDictionary.delete(data.id).then(() => {
      ElMessage.success({
        message: '模拟删除成功',
        center: true,
      })
      const parent = node.parent
      const children: Dict[] = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      dictionary.value.tree = [...dictionary.value.tree]
    })
  })
}
// 新增成功后更新树
function dictionaryAddNode(data: Dict) {
  if (dictionary.value.currentData) {
    if (!dictionary.value.currentData.children) {
      dictionary.value.currentData.children = []
    }
    dictionary.value.currentData.children.push({
      id: data.id,
      label: data.label,
      code: data.code,
    })
  }
  else {
    dictionary.value.tree.push({
      id: data.id,
      label: data.label,
      code: data.code,
    })
  }
}
// 编辑成功后更新树
function dictionaryEditNode(data: Dict, parentId: string | number) {
  if (dictionary.value.currentNode && dictionary.value.currentData) {
    if ((dictionary.value.currentNode.parent.data.id ?? '') === parentId) {
      // 如果 parentId 一致说明节点位置没有变化，直接更新
      dictionary.value.currentData.label = data.label
      dictionary.value.currentData.code = data.code
    }
    else {
      // 先更新原有节点信息
      const parent = dictionary.value.currentNode.parent
      const children: Dict[] = parent.data.children || parent.data
      const index = children.findIndex(item => item.id === data.id)
      children[index].label = data.label
      children[index].code = data.code
      // 然后找到需要移动到的父节点位置，并将原有节点移动过去
      if (parentId) {
        const findDictionary: any = (list: Dict[], parentId: number) => {
          for (const i in list) {
            if (list[i].id === parentId) {
              return list[i]
            }
            else if (list[i].children) {
              const temp = findDictionary(list[i].children, parentId)
              if (temp) {
                return temp
              }
            }
          }
        }
        const targetNode = findDictionary(dictionary.value.tree, parentId)
        if (!targetNode.children) {
          targetNode.children = []
        }
        targetNode.children.push(children[index])
      }
      else {
        dictionary.value.tree.push(children[index])
      }
      // 最后删除原节点
      children.splice(index, 1)
    }
  }
}
function dictionaryClick(data: Dict) {
  pagination.value.page = 1
  dictionaryItem.value.search.dictionaryId = data.id
}

watch(() => dictionaryItem.value.search.dictionaryId, () => {
  getDictionaryItemList()
})

function getDictionaryItemList() {
  dictionaryItem.value.loading = true
  const params = {
    ...getParams(),
    dictionary_id: dictionaryItem.value.search.dictionaryId,
    ...(dictionaryItem.value.search.title && { title: dictionaryItem.value.search.title }),
  }
  apiDictionary.itemList(params).then((res: any) => {
    dictionaryItem.value.loading = false
    dictionaryItem.value.dataList = res.data.list
    dictionaryItem.value.dataList.forEach((item: any) => {
      item.enableLoading = false
    })
    pagination.value.total = res.data.total
  })
}

function onChangeEnable(row: any) {
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(`确认${!row.enable ? '启用' : '禁用'}「${row.name}」吗？`, '确认信息').then(() => {
      row.enableLoading = true
      apiDictionary.itemChangeEnable({
        id: row.id,
        enable: !row.enable,
      }).then(() => {
        row.enableLoading = false
        ElMessage.success({
          message: `模拟${!row.enable ? '启用' : '禁用'}成功`,
          center: true,
        })
        return resolve(true)
      }).catch(() => {
        row.enableLoading = false
        return resolve(false)
      })
    }).catch(() => {
      return resolve(false)
    })
  })
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDictionaryItemList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDictionaryItemList())
}

// 字段排序
function sortChange({ prop, order }: { prop: string, order: string }) {
  onSortChange(prop, order).then(() => getDictionaryItemList())
}

function onCreate() {
  dictionaryItem.value.dialog.id = ''
  dictionaryItem.value.dialog.visible = true
}

function onEdit(row: any) {
  dictionaryItem.value.dialog.id = row.id
  dictionaryItem.value.dialog.visible = true
}

function onDelete(row: any) {
  ElMessageBox.confirm(`确认删除「${row.name}」吗？`, '确认信息').then(() => {
    apiDictionary.itemDelete(row.id).then(() => {
      getDictionaryItemList()
      ElMessage.success({
        message: '模拟删除成功',
        center: true,
      })
    })
  }).catch(() => { })
}

function onDeleteMulti(rows: any[]) {
  ElMessageBox.confirm(`确认删除选中的 ${rows.length} 条数据吗？`, '确认信息').then(() => {
    apiDictionary.itemDelete(rows.map(item => item.id)).then(() => {
      getDictionaryItemList()
      ElMessage.success({
        message: '模拟删除成功',
        center: true,
      })
    })
  }).catch(() => { })
}

// 使用示例
const usageExampleVisible = ref(false)
</script>

<template>
  <div class="absolute-container">
    <PageHeader title="字典管理" content="页面数据为 Mock 示例数据，非真实数据。">
      <ElButton @click="usageExampleVisible = true">
        使用示例
      </ElButton>
    </PageHeader>
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle>
        <template #leftSide>
          <ElButtonGroup class="btns">
            <ElButton type="primary" class="add" @click="dictionaryAdd()">
              新增字典
            </ElButton>
            <ElButton @click="getDictionaryList">
              <template #icon>
                <SvgIcon name="i-ep:refresh" />
              </template>
            </ElButton>
          </ElButtonGroup>
          <ElInput v-model="dictionary.search" placeholder="请输入关键词筛选字典" clearable class="search" />
          <ElScrollbar class="tree">
            <ElTree ref="dictionaryRef" :data="dictionary.tree" :filter-node-method="dictionaryFilter as any"
              default-expand-all @node-click="dictionaryClick">
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <div class="label" :title="node.label">
                    {{ node.label }}
                  </div>
                  <div class="code">
                    {{ data.code }}
                  </div>
                  <div class="actions">
                    <ElButtonGroup>
                      <ElButton type="primary" plain size="default" @click.stop="dictionaryAdd(data)">
                        <template #icon>
                          <SvgIcon name="i-ep:plus" />
                        </template>
                      </ElButton>
                      <ElButton type="info" plain size="default" @click.stop="dictionaryEdit(node, data)">
                        <template #icon>
                          <SvgIcon name="i-ep:edit" />
                        </template>
                      </ElButton>
                      <ElButton type="danger" plain size="default" @click.stop="dictionaryDelete(node, data)">
                        <template #icon>
                          <SvgIcon name="i-ep:delete" />
                        </template>
                      </ElButton>
                    </ElButtonGroup>
                  </div>
                </div>
              </template>
            </ElTree>
          </ElScrollbar>
        </template>
        <div v-show="dictionaryItem.search.dictionaryId" class="dictionary-container">
          <ElSpace wrap>
            <ElButton type="primary" @click="onCreate">
              <template #icon>
                <SvgIcon name="i-ep:plus" />
              </template>
            </ElButton>
            <ElButton type="danger" :disabled="!dictionaryItem.selectionDataList.length"
              @click="onDeleteMulti(dictionaryItem.selectionDataList)">
              <template #icon>
                <SvgIcon name="i-ep:delete" />
              </template>
            </ElButton>
            <ElInput v-model="dictionaryItem.search.title" placeholder="请输入关键词筛选字典项" clearable style="width: 200px;" />
            <ElButton @click="getDictionaryItemList">
              <template #icon>
                <SvgIcon name="i-ep:search" />
              </template>
            </ElButton>
          </ElSpace>
          <ElTable ref="dictionaryItemRef" v-loading="dictionaryItem.loading" :data="dictionaryItem.dataList" stripe
            highlight-current-row border height="100%" @sort-change="sortChange"
            @selection-change="dictionaryItem.selectionDataList = $event">
            <ElTableColumn type="selection" align="center" fixed />
            <ElTableColumn prop="name" label="名称" />
            <ElTableColumn label="键值" align="center" width="150">
              <template #default="scope">
                <ElTag type="info">
                  {{ scope.row.value }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="状态" width="100" align="center">
              <template #default="scope">
                <ElSwitch v-model="scope.row.enable" :loading="scope.row.enableLoading" inline-prompt active-text="启用"
                  inactive-text="禁用" :before-change="() => onChangeEnable(scope.row)" />
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="200" align="center">
              <template #default="scope">
                <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
                  编辑
                </ElButton>
                <ElButton type="danger" size="small" plain @click="onDelete(scope.row)">
                  删除
                </ElButton>
              </template>
            </ElTableColumn>
          </ElTable>
          <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
            :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
            background @size-change="sizeChange" @current-change="currentChange" />
        </div>
        <div v-show="!dictionaryItem.search.dictionaryId" class="dictionary-container">
          <div class="empty">
            请在左侧新增或选择一个字典
          </div>
        </div>
      </LayoutContainer>
      <DictionaryDialog v-if="dictionary.dialog.visible" :id="dictionary.dialog.id" v-model="dictionary.dialog.visible"
        :parent-id="dictionary.dialog.parentId" :tree="dictionary.tree" @add-node="dictionaryAddNode"
        @edit-node="dictionaryEditNode" />
      <DictionaryItemDialog v-if="dictionaryItem.dialog.visible" :id="dictionaryItem.dialog.id"
        v-model="dictionaryItem.dialog.visible" :dictionary-id="dictionaryItem.search.dictionaryId"
        :tree="dictionary.tree" @success="getDictionaryItemList" />
      <UsageDialog v-if="usageExampleVisible" v-model="usageExampleVisible" />
    </div>
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
    // 让 page-main 的高度自适应
    flex: 1;
    overflow: auto;

    .flex-container {
      position: static;
    }
  }
}

.flex-container {
  :deep(.left-side) {
    display: flex;
    flex-direction: column;
    height: 100%;

    .btns {
      display: inline-flex;
      width: 100%;

      .add {
        width: 100%;
      }
    }

    .search {
      margin: 15px 0;
    }

    .tree {
      flex: 1;
      overflow-y: auto;

      .el-tree {
        .el-tree-node__content {
          height: 60px;
        }

        .is-current>.el-tree-node__content {
          background-color: var(--el-color-primary-light-9);
        }

        .custom-tree-node {
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          width: 0;
          height: 100%;

          .label {
            width: calc(100% - 10px);
            color: var(--el-text-color-primary);

            @include text-overflow;
          }

          .code {
            width: calc(100% - 10px);
            color: var(--el-text-color-placeholder);

            @include text-overflow;
          }

          &:hover {
            .actions {
              display: block;
            }
          }

          .actions {
            position: absolute;
            top: 50%;
            right: 10px;
            display: none;
            transform: translateY(-50%);

            .el-button {
              padding: 5px 8px;
            }
          }
        }
      }
    }
  }

  :deep(.main) {
    display: flex;
    justify-content: center;
  }

  .dictionary-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;

    .empty {
      font-size: 32px;
      color: var(--el-text-color-placeholder);
      text-align: center;
    }

    .el-table {
      margin: 15px 0;
    }
  }
}
</style>
