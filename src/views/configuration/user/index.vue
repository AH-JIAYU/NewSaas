<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ref } from "vue";
import DictionaryItemDia from "./components/dictionaryItemDialog/index.vue";
import Detail from "./components/Detail/index.vue";
import api from "@/api/modules/configuration_manager";
import apiDep from "@/api/modules/department";
import useDepartmentStore from "@/store/modules/department";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import usePositionManageStore from "@/store/modules/position_manage";
import useGroupManageStore from "@/store/modules/group_manage";

defineOptions({
  name: "user",
});
// 小组
const useGroupManage = useGroupManageStore();
// 小组数据
const groupManageList = ref<any>();
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 国家
const useStoreCountry = useBasicDictionaryStore();
// 国家数据
const filterCountry = ref<any>([]);
// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
interface Dict {
  id: string | number;
  label: string;
  code: string;
  children?: Dict[];
}
const columns = ref<any>([
  {
    label: "员工ID",
    prop: "id",
    sortable: true,
    checked: true,
  },
  {
    label: "用户名",
    prop: "userName",
    sortable: true,
    checked: true,
  },
  { label: "姓名", prop: "name", sortable: true, checked: true },
  // { label: "国家", prop: "country", sortable: true, checked: true },
  { label: "电话号码", prop: "phoneNumber", sortable: true, checked: true },
  { label: "邮箱", prop: "email", sortable: true, checked: true },
  { label: "部门", prop: "departmentId", sortable: true, checked: true },
  { label: "职位", prop: "positionId", sortable: true, checked: true },
  { label: "小组", prop: "groupId", sortable: true, checked: true },
  { label: "状态", prop: "active", sortable: true, checked: true },
]);
// 状态
const activeList: any = [
  {
    label: "启用",
    value: true,
  },
  {
    label: "禁用",
    value: false,
  },
];
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
// dictionaryRef
const dictionaryRef = ref();
// 详情ref
const detailRef = ref<any>();
// 数据
const dictionary = ref<any>({
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
// 重置密码数据
const dictionaryList = ref<any>()
// tableRef
const dictionaryItemRef = ref();
// 字典下的数据
const dictionaryItem = ref<any>({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  // 表格控件-是否展示边框
  border: true,
  // 表格控件-是否展示斑马条
  stripe: false,
  // 表格控件-控制表格大小
  lineHeight: "default",
  checkList: [],
  // 搜索
  search: {
    page: 1,
    limit: 10,
    id: "" as Dict["id"],
    userName: "",
    active: null,
    departmentId: null,
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
// 获取树
const treeRef = ref<any>()
// 获取字典
async function getDictionaryList() {
  const params = {
    ...dictionaryItem.value.search,
  };
  const res = await api.list(params);
  dictionaryItem.value.dataList = res.data.data;
  pagination.value.total = +res.data.total;
}
onMounted(async () => {
  try {
    // loading加载开始
    dictionary.value.loading = true;
    // 国家
    filterCountry.value = await useStoreCountry.getCountry();
    // 部门
    departmentList.value = await departmentStore?.getDepartment() || [];
    // 职位
    positionManageList.value = await usePositionManage?.getPositionManage() || [];
    // 小组
    groupManageList.value = await useGroupManage?.getGroupManage() || [];
    // 左侧树状数据
    const ress = await apiDep.createEvery();
    dictionary.value.tree = ress.data.result;
    // 获取列表数据
    getDictionaryList();
    columns.value.forEach((item: any) => {
      if (item.checked) {
        dictionaryItem.value.checkList.push(item.prop);
      }
    });
    // loading加载结束
    dictionary.value.loading = false;
  } catch (error) {

  } finally {
    dictionary.value.loading = false;
  }
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
// 开关事件
function onChangeStatus(row: any) {
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(
      `确认${!row.active ? "启用" : "禁用"}「${row.name}」吗？`,
      "确认信息"
    )
      .then(() => {
        try {
          dictionary.value.loading = true;
          api
            .edit({
              id: row.id,
              account: null,
              name: null,
              sex: null,
              phoneNumber: null,
              active: !row.active,
            })
            .then(() => {
              ElMessage.success({
                message: `${!row.active ? "启用" : "禁用"}成功`,
                center: true,
              });
              getDictionaryList();
              dictionary.value.loading = false;
              return resolve(true);
            })
            .catch(() => {
              dictionary.value.loading = false;
              return resolve(false);
            });
        } catch (error) {

        } finally {
          dictionary.value.loading = false;
        }
      })
      .catch(() => {
        return resolve(false);
      });
  });
}
// 用户详情
function dictionaryClick(data: Dict) {
  pagination.value.page = 1;
  if (data?.children?.length) {
    dictionaryItem.value.search.id = ''
    dictionaryItem.value.search.departmentId = data.id
    getDictionaryList()
  } else {
    dictionaryItem.value.search.id = data.id
    dictionaryItem.value.search.departmentId = ''
    getDictionaryList()
  }
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    dictionaryItem.value.search.limit = size
    getDictionaryList()
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    dictionaryItem.value.search.page = page
    getDictionaryList()
  });
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDictionaryList());
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
// 选中列表
const selectChange = (val: any) => {
  dictionaryList.value = val[0]
}
// 重置密码
function onResetPassword() {
  const { name, id } = dictionaryList.value
  ElMessageBox.confirm(
    `确认将「${name}」的密码重置为 “123456” 吗？`,
    "确认信息"
  )
    .then(() => {
      api.reset({ id: id }).then(() => {
        ElMessage.success({
          message: "重置成功",
          center: true,
        });
        getDictionaryList();
      });
    })
    .catch(() => { });
}
// 修改
function onEdit(row: any) {
  dictionaryItem.value.row = JSON.stringify(row);
  dictionaryItem.value.dialog.id = row.id;
  dictionaryItem.value.dialog.parentId = row.parentId;
  dictionaryItem.value.dialog.visible = true;
}
// 详情
function onDetail(row: any) {
  detailRef.value.showEdit(row);
}
// 重置数据
function onReset() {
  Object.assign(dictionaryItem.value.search, {
    id: "" as Dict["id"],
    userName: "",
    departmentId: null,
    active: null,
  });
  getDictionaryList();
}
</script>

<template>
  <div class="absolute-container">
    <div class="page-main">
      <!-- <LayoutContainer hide-left-side-toggle>
      </LayoutContainer> -->
      <div class="leftTree">
        <div v-if="dictionary.tree.length" class="leftData" :span="3">
          <!-- <el-input v-model="userName" placeholder="可输入用户名查找" clearable @blur="blurUserName" /> -->
          <el-tree style="max-width: 37.5rem; min-height: 45.4375rem; padding: 10px;" :data="dictionary.tree"
            ref="treeRef" node-key="id" default-expand-all :expand-on-click-node="false"
            :props="defaultProps" @node-click="dictionaryClick" />
        </div>
        <!-- <template #leftSide>
          <ElScrollbar class="tree">
            <ElTree ref="dictionaryRef" v-loading="dictionary.loading" :data="dictionary.tree"
              :filter-node-method="dictionaryFilter as any" default-expand-all @node-click="dictionaryClick">
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <div class="label" :title="node.label">
                    {{ data.name }}
                  </div>
                  <div class="code">
                    {{ data.name }}
                  </div>
                </div>
              </template>
</ElTree>
</ElScrollbar>
</template> -->
        <!-- v-show="dictionaryItem.search.catalogueId" -->
        <PageMain>
          <div v-loading="dictionary.loading" class="dictionary-container">
            <ElSpace>
              <ElInput v-model="dictionaryItem.search.id" placeholder="员工ID" clearable style="width: 12.5rem"
                @keydown.enter="getDictionaryList" />
              <ElInput v-model="dictionaryItem.search.userName" placeholder="用户名" clearable style="width: 12.5rem"
                @keydown.enter="getDictionaryList" />
              <el-select v-model="dictionaryItem.search.active" value-key="" placeholder="状态" style="width: 12.5rem" clearable filterable
                @change="getDictionaryList">
                <el-option v-for="item in activeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <ElButton type="primary" @click="getDictionaryList">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <SvgIcon name="i-ep:refresh" />
                </template>
              </ElButton>
            </ElSpace>
            <el-row style="margin-bottom: .3125rem" :gutter="24">
              <el-col style="margin-bottom: 1.5625rem;" :span="10">
                <el-button type="primary" size="default" @click="onCreate">
                  新增
                </el-button>
                <el-button size="default" @click="onResetPassword">
                  重置密码
                </el-button>
              </el-col>
              <el-col style="display: flex; justify-content: flex-end" :span="14">
                <el-button size="default" @click=""> 导出 </el-button>
                <TabelControl v-model:border="dictionaryItem.border"
                  v-model:tableAutoHeight="dictionaryItem.tableAutoHeight" v-model:checkList="dictionaryItem.checkList"
                  v-model:columns="columns" v-model:line-height="dictionaryItem.lineHeight"
                  v-model:stripe="dictionaryItem.stripe" style="margin-left: .75rem" @query-data="getDictionaryList" />
              </el-col>
            </el-row>
            <ElTable ref="dictionaryItemRef" :data="dictionaryItem.dataList" :border="dictionaryItem.border"
              :size="dictionaryItem.lineHeight" :stripe="dictionaryItem.stripe" highlight-current-row height="100%"
              @sort-change="sortChange" @selection-change="dictionaryItem.selectionDataList = $event" row-key="id"
              default-expand-all @select="selectChange">
              <ElTableColumn type="selection" align="center" fixed />
              <ElTableColumn v-if="dictionaryItem.checkList.includes('id')" align="center" width="180" prop="id"
                label="员工ID" />
              <ElTableColumn v-if="dictionaryItem.checkList.includes('userName')" align="center" width="130"
                prop="userName" label="用户名"><template #default="{ row }">
                  <el-text>
                    {{ row.userName ? row.userName : "-" }}
                  </el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="dictionaryItem.checkList.includes('name')" align="center" width="130" prop="name"
                label="姓名" />
              <ElTableColumn v-if="dictionaryItem.checkList.includes('country')" prop="country" label="国家" width="150"
                align="center">
                <template #default="{ row }">
                  <div v-for="item in filterCountry" :key="item.id" class="mx-1">
                    <el-tag type="primary" v-if="item.code === row.country" class="mx-1">
                      {{ item.chineseName }}
                    </el-tag>
                  </div>
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="dictionaryItem.checkList.includes('phoneNumber')" align="center" width="170"
                prop="phone" label="电话号码"><template #default="{ row }">
                  {{ row.phoneNumber ? row.phoneNumber : "-" }}
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="dictionaryItem.checkList.includes('email')" align="center" width="180" prop="email"
                label="邮箱">
                <template #default="{ row }">
                  {{ row.email ? row.email : "-" }}
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="dictionaryItem.checkList.includes('departmentId')" align="center" prop="departmentId"
                label="部门"><template #default="{ row }">
                  <el-text v-if="row.departmentId">
                    <el-text v-for="item in departmentList">
                      <el-text v-if="row.departmentId === item.id">
                        {{ item.name ? item.name : "-" }}
                      </el-text>
                    </el-text>
                  </el-text>
                  <el-text v-else>-</el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="dictionaryItem.checkList.includes('positionId')" align="center" prop="positionId"
                label="职位">
                <template #default="{ row }">
                  <el-text v-if="row.positionId">
                    <el-text v-for="item in positionManageList">
                      <el-text v-if="row.positionId === item.id">
                        {{ item.name ? item.name : "-" }}
                      </el-text>
                    </el-text>
                  </el-text>
                  <el-text v-else>-</el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="dictionaryItem.checkList.includes('groupId')" align="center" prop="groupId"
                label="小组">
                <template #default="{ row }">
                  <el-text v-if="row.groupId">
                    <el-text v-for="item in groupManageList">
                      <el-text v-if="row.groupId === item.id">
                        {{ item.name ? item.name : "-" }}
                      </el-text>
                    </el-text>
                  </el-text>
                  <el-text v-else>-</el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="dictionaryItem.checkList.includes('active')" align="center" prop="active" label="状态">
                <template #default="scope">
                  <ElSwitch v-model="scope.row.active" inline-prompt active-text="启用" inactive-text="禁用"
                    :before-change="() => onChangeStatus(scope.row)" />
                </template>
              </ElTableColumn>
              <ElTableColumn label="操作" fixed="right" width="200" align="center">
                <template #default="scope">
                  <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
                    编辑
                  </ElButton>
                  <ElButton type="primary" size="small" plain @click="onDetail(scope.row)">
                    详情
                  </ElButton>
                  <!-- <el-button type="primary" plain size="small" @click="onResetPassword(scope.row)">
                  重置密码
                </el-button> -->
                </template>
              </ElTableColumn>
              <template #empty>
                <el-empty description="暂无数据" />
              </template>
            </ElTable>
            <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
              :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
              background @size-change="sizeChange" @current-change="currentChange" />
          </div>
        </PageMain>
        <!-- <div
          v-show="!dictionaryItem.search.catalogueId"
          class="dictionary-container"
        >
          <div class="empty">请在左侧选择一个部门</div>
        </div> -->
      </div>
      <DictionaryItemDia v-if="dictionaryItem.dialog.visible" :id="dictionaryItem.dialog.id"
        v-model="dictionaryItem.dialog.visible" :catalogue-id="dictionaryItem.search.catalogueId"
        :parent-id="dictionaryItem.dialog.parentId" :level="dictionaryItem.dialog.level" :tree="dictionary.tree"
        :dataList="dictionaryItem.dataList" :row="dictionaryItem.row" @success="getDictionaryList" />
      <Detail ref="detailRef" />
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
      margin: .9375rem 0;
    }

    .tree {
      flex: 1;
      overflow-y: auto;

      .el-tree {
        .el-tree-node__content {
          height: 3.75rem;
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
            width: calc(100% - .625rem);
            color: var(--el-text-color-primary);

            @include text-overflow;
          }

          .code {
            width: calc(100% - .625rem);
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
            right: .625rem;
            display: none;
            transform: translateY(-50%);

            .el-button {
              padding: .3125rem .5rem;
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
      font-size: 2rem;
      color: var(--el-text-color-placeholder);
      text-align: center;
    }

    .el-table {
      margin: .9375rem 0;
    }
  }
}

.leftTree {
  display: flex;

  .leftData {
    width: 13%;
    margin: 1rem 0 1rem 1rem;
  }

  .rightData {
    width: 86.2%;
    padding: .625rem;
    background-color: #fff;
  }
}

:deep(.el-table__empty-block) {
  height: 100% !important;
}

:deep(.page-main) {
  height: 100% !important;
}
</style>
