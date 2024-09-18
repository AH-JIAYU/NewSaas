<script setup lang="ts">
import type Node from "element-plus/es/components/tree/src/model/node";
import { ref } from "vue";
import api from "@/api/modules/basicDictionary";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "basicDictionary",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
pagination.value.size = 20;
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
const dictionaryItemRef = ref();
// 字典下的数据
const dictionaryItem = ref<any>({
  loading: false,
  // 搜索
  search: {
    id: "" as Dict["id"],
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
    dictionaryItem.value.search.id = "";
    // const params = {
    //   ...dictionary.value.search,
    // };
    const res = await api.list();
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
// 获取答案
function dictionaryClick(data: Dict) {
  pagination.value.page = 1;
  dictionaryItem.value.search.id = data.id;
}
// 监听id变化
watch(
  () => dictionaryItem.value.search.id,
  () => {
    getDictionaryItemList();
  }
);
// 获取字典项
async function getDictionaryItemList() {
  try {
    dictionaryItem.value.loading = true;
    const params: any = {
      ...getParams(),
      id: dictionaryItem.value.search.id,
    };
    const res = await api.itemlist(params);
    dictionaryItem.value.loading = false;
    dictionaryItem.value.dataList = res.data.records;
    dictionaryItem.value.dataList.forEach((item: any) => {
      item.enableLoading = false;
    });
    pagination.value.total = Number(res.data.total);
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
</script>

<template>
  <div class="absolute-container">
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle>
        <template #leftSide>
          <!-- <ElInput
            v-model="dictionary.search.chineseName"
            placeholder="请输入关键词筛选字典"
            clearable
            class="search"
            @keydown.enter="getDictionaryList"
          >
            <template #append>
              <ElButton @click="getDictionaryList">
                <SvgIcon name="i-ep:search" />
              </ElButton>
            </template>
</ElInput> -->
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
                </div>
              </template>
            </ElTree>
          </ElScrollbar>
        </template>
        <div v-show="dictionaryItem.search.id" class="dictionary-container">
          <!--   <ElSpace wrap>
            <ElInput
              v-model="dictionaryItem.search.chineseName"
              placeholder="请输入关键词筛选字典项"
              clearable
              style="width: 200px"
              @keydown.enter="getDictionaryItemList"
            />
            <ElButton @click="getDictionaryItemList">
              <template #icon>
                <SvgIcon name="i-ep:search" />
              </template>
            </ElButton>
          </ElSpace> -->
          <ElTable ref="dictionaryItemRef" v-loading="dictionaryItem.loading" :data="dictionaryItem.dataList" stripe
            highlight-current-row border height="100%" @sort-change="sortChange"
            @selection-change="dictionaryItem.selectionDataList = $event" row-key="id" default-expand-all>
            <ElTableColumn prop="chineseName" label="中文名称" />
            <ElTableColumn prop="englishName" label="英文名称" />
            <ElTableColumn prop="remark" label="备注" />
            <ElTableColumn label="键值" align="center" width="150">
              <template #default="scope">
                <ElTag type="info">
                  {{ scope.row.code }}
                </ElTag>
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
        <div v-show="!dictionaryItem.search.id" class="dictionary-container">
          <div class="empty">请在左侧新增或选择一个字典</div>
        </div>
      </LayoutContainer>
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
