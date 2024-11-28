<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ref } from "vue";
import DictionaryDialog from "./components/dictionaryDialog/index.vue";
import DictionaryItemDia from "./components/dictionaryItemDialog/index.vue";
import api from "@/api/modules/tenantDictionary";
import empty from '@/assets/images/empty.png'
defineOptions({
  name: "tenantDictionary",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
interface Dict {
  id: string | number;
  label: string;
  code: string;
  children?: Dict[];
}
const dictionaryRef = ref();
// 字典
const dictionary = ref({
  search: {
    chineseName: "",
  },
  tree: [] as Dict[],
  currentNode: undefined as Node | undefined,
  currentData: undefined as Dict | undefined,
  dialog: {
    visible: false,
    parentId: "" as Dict["id"],
    id: "" as Dict["id"],
  },
  row: "",
  loading: false,
});
// pagination.value.size = 20;
// pagination.value.sizes = [20, 50, 100];
const dictionaryItemRef = ref();
// 字典下的数据
const dictionaryItem = ref<any>({
  loading: false,
  // 搜索
  search: {
    catalogueId: "" as Dict["id"],
    chineseName: "",
  },
  // 列表数据
  dataList: [],
  selectionDataList: [],
  row: "",
  dialog: {
    visible: false,
    id: "" as string | number,
    parentId: "",
    level: 1,
  },
});
// 获取字典
async function getDictionaryList() {
  try {
    dictionary.value.loading = true;
    dictionaryItem.value.search.catalogueId = "";
    const params = {
      ...dictionary.value.search,
    };
    const res = await api.list(params);
    dictionary.value.tree = res.data;
    dictionary.value.loading = false;
  } catch (error) {

  } finally {
    dictionary.value.loading = false;
  }
}
onMounted(() => {
  getDictionaryList();
});
watch(
  () => dictionary.value.search,
  (val) => {
    dictionaryRef.value!.filter(val);
  }
);
function dictionaryFilter(value: string, data: Dict) {
  if (!value) {
    return true;
  }
  return data.label.includes(value);
}
// 新增字典
function dictionaryAdd(data?: Dict) {
  dictionary.value.currentData = data;
  dictionary.value.dialog.parentId = data?.id ?? "";
  dictionary.value.dialog.id = "";
  dictionary.value.dialog.visible = true;
}
// 修改字典
function dictionaryEdit(node: Node, data: Dict) {
  dictionary.value.currentNode = node;
  dictionary.value.currentData = data;
  dictionary.value.row = JSON.stringify(data);
  dictionary.value.dialog.parentId = node.parent.data.id ?? "";
  dictionary.value.dialog.id = data.id;
  dictionary.value.dialog.visible = true;
}
// 删除字典
function dictionaryDelete(node: Node, data: any) {
  ElMessageBox.confirm(`确认删除「${data.chineseName}」吗？`, "确认信息").then(
    () => {
      api.delete(data.id).then(() => {
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
        const parent = node.parent;
        const children: Dict[] = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
        dictionary.value.tree = [...dictionary.value.tree];
      });
    }
  );
}

// 字典项详情
function dictionaryClick(data: Dict) {
  pagination.value.page = 1;
  dictionaryItem.value.search.catalogueId = data.id;
}
// 监听id变化
watch(
  () => dictionaryItem.value.search.catalogueId,
  () => {
    getDictionaryItemList();
  }
);
// 获取字典项
async function getDictionaryItemList() {
  try {
    dictionaryItem.value.loading = true;
    const params = {
      ...getParams(),
      ...dictionaryItem.value.search,
    };
    const res = await api.itemlist(params);
    dictionaryItem.value.loading = false;
    dictionaryItem.value.dataList = res.data;
    dictionaryItem.value.dataList.forEach((item: any) => {
      item.enableLoading = false;
    });
    pagination.value.total = res.data.length;
  } catch (error) {

  } finally {
    dictionaryItem.value.loading = false;
  }
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDictionaryItemList());
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDictionaryItemList());
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDictionaryItemList());
}
// 新增
function onCreate(row?: any) {
  dictionaryItem.value.dialog.id = "";
  dictionaryItem.value.dialog.visible = true;
  dictionaryItem.value.dialog.level = 1;
  if (row) {
    dictionaryItem.value.dialog.parentId = row.id;
    dictionaryItem.value.dialog.level = Number(row.level) + 1;
  }
}
// 修改
function onEdit(row: any) {
  dictionaryItem.value.row = JSON.stringify(row);
  dictionaryItem.value.dialog.id = row.id;
  dictionaryItem.value.dialog.parentId = row.parentId;
  dictionaryItem.value.dialog.visible = true;
}
// 删除
function onDelete(row: any) {
  ElMessageBox.confirm(`确认删除「${row.chineseName}」吗？`, "确认信息")
    .then(() => {
      api.itemdelete([row.id]).then(() => {
        getDictionaryItemList();
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      });
    })
    .catch(() => { });
}
// 批量删除
function onDeleteMulti(rows: any[]) {
  const ids = rows.map((item) => item.id);
  ElMessageBox.confirm(`确认删除选中的 ${rows.length} 条数据吗？`, "确认信息")
    .then(() => {
      api.itemdelete(ids).then(() => {
        getDictionaryItemList();
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      });
    })
    .catch(() => { });
}
</script>

<template>
  <div class="absolute-container">
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle>
        <template #leftSide>
          <ElButtonGroup class="btns">
            <ElButton type="primary" class="add" @click="dictionaryAdd()">
              新增字典
            </ElButton>
          </ElButtonGroup>
          <ElInput v-model="dictionary.search.chineseName" placeholder="请输入关键词筛选字典" clearable class="search"
            @keydown.enter="getDictionaryList">
            <template #append>
              <ElButton @click="getDictionaryList">
                <SvgIcon name="i-ep:search" />
              </ElButton>
            </template>
          </ElInput>
          <ElScrollbar class="tree">
            <ElTree ref="dictionaryRef" v-loading="dictionary.loading" :data="dictionary.tree"
              :filter-node-method="dictionaryFilter as any" default-expand-all @node-click="dictionaryClick">
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <div class="label" :title="node.label">
                    {{ data.chineseName }}
                  </div>
                  <div class="code">
                    {{ data.englishName }}
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
        <div v-show="dictionaryItem.search.catalogueId" class="dictionary-container">
          <ElSpace wrap>

              <div  class="button-bule" @click="onCreate()">

                <div class="i-ic:round-plus w-1.3em h-1.3em" style="color: white;"></div>
                </div>


            <ElButton type="danger" :disabled="!dictionaryItem.selectionDataList.length" style="background-color: #FB6868;"
              @click="onDeleteMulti(dictionaryItem.selectionDataList)">
              <template #icon>
                <SvgIcon name="i-ep:delete" />
              </template>
            </ElButton>
            <ElInput v-model="dictionaryItem.search.chineseName" placeholder="请输入关键词筛选字典项" clearable
              style="width: 200px" @keydown.enter="getDictionaryItemList" />
            <ElButton @click="getDictionaryItemList">
              <template #icon>
                <SvgIcon name="i-ep:search" />
              </template>
            </ElButton>
          </ElSpace>
          <ElTable ref="dictionaryItemRef" v-loading="dictionaryItem.loading" :data="dictionaryItem.dataList" stripe
            highlight-current-row  height="100%" @sort-change="sortChange"
            @selection-change="dictionaryItem.selectionDataList = $event" row-key="id" default-expand-all>
            <ElTableColumn type="selection" align="left" fixed />
            <ElTableColumn prop="chineseName" label="中文名称" >
              <template #default="{ row }">
            <span style="color:#333333">{{ row.chineseName }}</span>
          </template>


            </ElTableColumn>
            <ElTableColumn prop="englishName" label="英文名称" >
             <template #default="{ row }">
            <span style="color:#333333">{{ row.englishName }}</span>
          </template>


            </ElTableColumn>
            <ElTableColumn prop="remark" label="备注" >
              <template #default="{ row }">
            <span style="color:#333333">{{ row.remark }}</span>
          </template>


            </ElTableColumn>
            <ElTableColumn label="键值" align="left" width="150">
              <template #default="scope">
                <ElTag type="info">
                  {{ scope.row.code }}
                </ElTag>
              </template>
            </ElTableColumn>

            <ElTableColumn label="操作" width="250" align="left">
              <template #default="scope">
                <ElButton type="primary" size="small" plain @click="onCreate(scope.row)">
                  新增子项
                </ElButton>
                <ElButton type="warning" size="small" plain @click="onEdit(scope.row)">
                  编辑
                </ElButton>
                <ElButton type="danger" size="small" plain @click="onDelete(scope.row)">
                  删除
                </ElButton>
              </template>
            </ElTableColumn>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
            </template>
          </ElTable>
          <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
            :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
            background @size-change="sizeChange" @current-change="currentChange" />
        </div>
        <div v-show="!dictionaryItem.search.catalogueId" class="dictionary-container">
          <div class="empty">请在左侧新增或选择一个字典</div>
        </div>
      </LayoutContainer>
      <DictionaryDialog v-if="dictionary.dialog.visible" :id="dictionary.dialog.id" v-model="dictionary.dialog.visible"
        :row="dictionary.row" :parent-id="dictionary.dialog.parentId" :tree="dictionary.tree"
        @get-list="getDictionaryList" />
      <DictionaryItemDia v-if="dictionaryItem.dialog.visible" :id="dictionaryItem.dialog.id"
        v-model="dictionaryItem.dialog.visible" :catalogue-id="dictionaryItem.search.catalogueId"
        :parent-id="dictionaryItem.dialog.parentId" :level="dictionaryItem.dialog.level" :tree="dictionary.tree"
        :dataList="dictionaryItem.dataList" :row="dictionaryItem.row" @success="getDictionaryItemList" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-bule {
    background-color: #409EFF;
    border: 1px solid #409EFF;
    width: 46px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;

}
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
