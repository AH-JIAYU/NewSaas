<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ref } from "vue";
import api from "@/api/modules/department";
import empty from '@/assets/images/empty.png'
import apiUser from "@/api/modules/configuration_manager";
import useDepartmentStore from "@/store/modules/department";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import usePositionManageStore from "@/store/modules/position_manage";
import DictionaryDialog from "./components/dictionaryDialog/index.vue";
import subsidiaryDepartment from "./components/subsidiary_department/index.vue";
import DictionaryItemDia from "./components/dictionaryItemDialog/index.vue";
import userDialog from "./components/userDialog/index.vue";
import Detail from "@/views/configuration/department/components/Detail/index.vue";
defineOptions({
  name: "department",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
interface Dict {
  id: string | number;
  label: string;
  code: string;
  children?: Dict[];
}
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
  // { label: "姓名", prop: "name", sortable: true, checked: true },
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
// userRef
const userRef = ref();
// 详情ref
const detailRef = ref<any>();
// 数据
const dataForm = ref<any>({
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
const resetList = ref<any>()
// tableRef
const userItemRef = ref();
// 字典下的数据
const userForm = ref<any>({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  // 表格控件-是否展示边框
  border: false,
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
const dictionaryRef = ref();
// 部门
const dictionary = ref({
  search: {
    name: "",
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
// 子部门
const subsidiaryDictionary = ref({
  search: {
    name: "",
  },
  tree: [] as Dict[],
  currentNode: undefined as Node | undefined,
  currentData: undefined as Dict | undefined,
  dialog: {
    visible: false,
    parentId: "" as Dict["id"],
    id: "" as Dict["id"],
    name: '',
  },
  row: "",
  loading: false,
});
// pagination.value.size = 20;
// pagination.value.sizes = [20, 50, 100];
const dictionaryItemRef = ref();
// 部门下的数据
const dictionaryItem = ref<any>({
  loading: false,
  // 搜索
  search: {
    organizationalStructureId: "" as Dict["id"],
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
// 获取部门
async function getDictionaryList() {
  try {
    dictionary.value.loading = true;
    dictionaryItem.value.search.organizationalStructureId = "";
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
// 新增部门
function dictionaryAdd(data?: Dict) {
  dictionary.value.currentData = data;
  dictionary.value.dialog.parentId = data?.id ?? "";
  dictionary.value.dialog.id = "";
  dictionary.value.dialog.visible = true;
}
// 新增子部门
function subsidiaryDictionaryAdd(data?: any) {
  subsidiaryDictionary.value.currentData = data;
  subsidiaryDictionary.value.dialog.parentId = data?.id ?? "";
  subsidiaryDictionary.value.dialog.name = data?.name ?? "";
  subsidiaryDictionary.value.dialog.id = "";
  subsidiaryDictionary.value.dialog.visible = true;
}
// 修改部门
function dictionaryEdit(node: Node, data: Dict) {
  dictionary.value.currentNode = node;
  dictionary.value.currentData = data;
  dictionary.value.row = JSON.stringify(data);
  dictionary.value.dialog.parentId = node.parent.data.id ?? "";
  dictionary.value.dialog.id = data.id;
  dictionary.value.dialog.visible = true;
}
// 删除部门
function dictionaryDelete(node: Node, data: any) {
  ElMessageBox.confirm(`确认删除「${data.name}」吗？`, "确认信息").then(
    () => {
      api.delete({ id: data.id }).then(() => {
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

// 部门项详情
function dictionaryClick(data: any) {
  console.log('data', data);
  pagination.value.page = 1;
  if(data.id) {
    userForm.value.dialog.parentId = data.id
  }
  dictionaryItem.value.search.organizationalStructureId = data.id;
}
// 监听id变化
watch(
  () => dictionaryItem.value.search.organizationalStructureId,
  () => {
    getDictionaryItemList();
  }
);
// 获取部门项
async function getDictionaryItemList() {
  try {
    dictionaryItem.value.loading = true;
    const params = {
      // ...getParams(),
      ...dictionaryItem.value.search,
    };
    const res = await api.itemlist(params);
    dictionaryItem.value.loading = false;
    userForm.value.dataList = res.data;
    dictionaryItem.value.dataList.forEach((item: any) => {
      item.enableLoading = false;
    });
    pagination.value.total = res.data.length;
  } catch (error) {

  } finally {
    dictionaryItem.value.loading = false;
  }
}

// 删除
function onDelete(row: any) {
  console.log('row', row);
  ElMessageBox.confirm(`确认删除「${row.name}」吗？`, "确认信息")
    .then(() => {
      api.delete([row.id]).then(() => {
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
      api.delete(ids).then(() => {
        getDictionaryItemList();
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      });
    })
    .catch(() => { });
}
// 获取用户
async function getUserList() {
  const params = {
    ...userForm.value.search,
  };
  const res = await apiUser.list(params);
  if (res.data) {
    userForm.value.dataList = res.data.data;
    pagination.value.total = +res.data.total;
  }
}
onMounted(async () => {
  try {
    // loading加载开始
    dataForm.value.loading = true;
    // 国家
    filterCountry.value = await useStoreCountry.getCountry();
    // 部门
    departmentList.value = await departmentStore?.getDepartment() || [];
    // 职位
    positionManageList.value = await usePositionManage?.getPositionManage() || [];
    // 获取列表数据
    getUserList();
    columns.value.forEach((item: any) => {
      if (item.checked) {
        userForm.value.checkList.push(item.prop);
      }
    });
    // loading加载结束
    dataForm.value.loading = false;
  } catch (error) {

  } finally {
    dataForm.value.loading = false;
  }
});

watch(
  () => dataForm.value.search,
  (val) => {
    userRef.value!.filter(val);
  }
);
// 开关事件
function onChangeStatus(row: any) {
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(
      `确认${!row.active ? "启用" : "禁用"}「${row.name}」吗？`,
      "确认信息"
    )
      .then(() => {
        try {
          dataForm.value.loading = true;
          apiUser
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
              getUserList();
              dataForm.value.loading = false;
              return resolve(true);
            })
            .catch(() => {
              dataForm.value.loading = false;
              return resolve(false);
            });
        } catch (error) {

        } finally {
          dataForm.value.loading = false;
        }
      })
      .catch(() => {
        return resolve(false);
      });
  });
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    userForm.value.search.limit = size
    getUserList()
  });
}

// 当前页码切换（翻页）
function currentChangeUser(page = 1) {
  onCurrentChange(page).then(() => {
    userForm.value.search.page = page
    getUserList()
  });
}

// 字段排序
function sortChangeUser({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getUserList());
}
// 新增
function create(row?: any) {
  console.log('row',row);
  console.log('userForm.value.dialog.parentId',userForm.value.dialog.parentId);
  userForm.value.dialog.id = "";
  userForm.value.dialog.visible = true;
  userForm.value.dialog.level = 1;
  if (row) {
    userForm.value.dialog.parentId = row.id;
    userForm.value.dialog.level = Number(row.level) + 1;
  }
}
// 选中列表
const selectChange = (val: any) => {
  resetList.value = val[0]
}
// 重置密码
function onResetPassword() {
  const { name, id } = resetList.value
  ElMessageBox.confirm(
    `确认将「${name}」的密码重置为 “123456” 吗？`,
    "确认信息"
  )
    .then(() => {
      apiUser.reset({ id: id }).then(() => {
        ElMessage.success({
          message: "重置成功",
          center: true,
        });
        getUserList();
      });
    })
    .catch(() => { });
}
// 修改
function edit(row: any) {
  console.log('row',row);

  userForm.value.row = JSON.stringify(row);
  userForm.value.dialog.id = row.id;
  // userForm.value.dialog.parentId = row.parentId;
  userForm.value.dialog.visible = true;
}
// 详情
function onDetail(row: any) {
  detailRef.value.showEdit(row);
}
// 重置数据
function onReset() {
  Object.assign(userForm.value.search, {
    id: "" as Dict["id"],
    userName: "",
    departmentId: null,
    active: null,
  });
  getUserList();
}
</script>

<template>
  <div class="absolute-container">
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle>
        <template #leftSide>
          <ElButtonGroup class="btns">
            <ElButton type="primary" class="add" @click="dictionaryAdd()">
              新增部门
            </ElButton>
          </ElButtonGroup>
          <ElInput v-model="dictionary.search.name" placeholder="请输入关键词筛选" clearable class="search"
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
                    {{ data.name }}
                  </div>
                  <div class="code">
                    {{ data?.organizationalStructurePersonList?.map((item:any) => item.userName).join('，') }}
                  </div>
                  <div class="actions">
                    <ElButtonGroup>
                      <ElButton type="primary" plain size="default" @click.stop="subsidiaryDictionaryAdd(data)">
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
        <div v-show="dictionaryItem.search.organizationalStructureId" class="dictionary-container">
          <ElSpace wrap>
            <ElButton type="primary" @click="create()">
              新增员工
            </ElButton>
            <ElButton @click="onResetPassword">
              重置密码
            </ElButton>
            <ElSelect v-model="userForm.search.active" value-key="" placeholder="用户状态" style="width: 200px"
              clearable filterable>
              <el-option v-for="item in activeList" :key="item.label" :label="item.label" :value="item.value" />
            </ElSelect>
            <ElInput v-model="userForm.search.id" placeholder="员工ID" clearable style="width: 200px"
              @keydown.enter="getUserList" />
            <ElInput v-model="userForm.search.userName" placeholder="用户名" clearable style="width: 200px"
              @keydown.enter="getUserList" />
            <ElButton type="primary" @click="getUserList">
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
          <ElTable ref="userItemRef" :data="userForm.dataList" :border="userForm.border" :size="userForm.lineHeight"
            :stripe="userForm.stripe" highlight-current-row height="100%" @sort-change="sortChangeUser"
            @selection-change="userForm.selectionDataList = $event" row-key="id" default-expand-all
            @select="selectChange">
            <ElTableColumn type="selection" align="left" fixed />
            <ElTableColumn v-if="userForm.checkList.includes('active')" align="left" prop="active" label="状态">
              <template #default="scope">
                <ElSwitch v-model="scope.row.active" inline-prompt active-text="启用" inactive-text="禁用"
                  :before-change="() => onChangeStatus(scope.row)" />
              </template>
            </ElTableColumn>
            <ElTableColumn v-if="userForm.checkList.includes('id')" align="left" width="180" prop="id" label="员工ID">
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine ">ID: {{ row.id }}</div>
                  <copy class="copy" :content="row.id" />
                </div>
              </template>
            </ElTableColumn>
            <ElTableColumn v-if="userForm.checkList.includes('userName')" align="left" width="130" prop="userName"
              label="用户名">
              <template #default="{ row }">
                <el-text class="tableBig">
                  {{ row.userName ? row.userName : "-" }}
                </el-text>
              </template>
            </ElTableColumn>
            <!-- <ElTableColumn v-if="dictionaryItem.checkList.includes('name')" align="left" width="130" prop="name"
                label="姓名">
                <template #default="{ row }">
                  <el-text class="tableBig">
                    {{ row.name ? row.name : "-" }}
                  </el-text>
                </template>
              </ElTableColumn> -->
            <ElTableColumn v-if="userForm.checkList.includes('phoneNumber')" align="left" width="170" prop="phone"
              label="电话号码">
              <template #default="{ row }">
                <el-text class="tableBig">
                  {{ row.phoneNumber ? row.phoneNumber : "-" }}
                </el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn v-if="userForm.checkList.includes('email')" align="left" width="180" prop="email" label="邮箱">
              <template #default="{ row }">
                <el-text class="tableBig">
                  {{ row.email ? row.email : "-" }}
                </el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn v-if="userForm.checkList.includes('departmentId')" align="left" prop="departmentId"
              label="部门">
              <template #default="{ row }">
                <el-text v-if="row.departmentId" class="tableBig">
                  <el-text v-for="item in departmentList">
                    <el-text v-if="row.departmentId === item.id">
                      {{ item.name ? item.name : "-" }}
                    </el-text>
                  </el-text>
                </el-text>
                <el-text v-else class="tableBig">-</el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn v-if="userForm.checkList.includes('positionId')" align="left" prop="positionId" label="职位">
              <template #default="{ row }">
                <el-text v-if="row.positionId" class="tableBig">
                  <el-text v-for="item in positionManageList">
                    <el-text v-if="row.positionId === item.id">
                      {{ item.name ? item.name : "-" }}
                    </el-text>
                  </el-text>
                </el-text>
                <el-text v-else class="tableBig">-</el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" fixed="right" width="200" align="left">
              <template #default="scope">
                <ElButton type="primary" size="small" plain @click="edit(scope.row)">
                  编辑
                </ElButton>
                <ElButton type="warning" size="small" plain @click="onDetail(scope.row)">
                  详情
                </ElButton>
              </template>
            </ElTableColumn>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
            </template>
          </ElTable>
          <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
            :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
            background @size-change="sizeChange" @current-change="currentChangeUser" />
        </div>
        <div v-show="!dictionaryItem.search.organizationalStructureId" class="dictionary-container">
          <div class="empty">请在左侧新增或选择一个部门</div>
        </div>
      </LayoutContainer>
      <DictionaryDialog v-if="dictionary.dialog.visible" :id="dictionary.dialog.id" v-model="dictionary.dialog.visible"
        :row="dictionary.row" :parent-id="dictionary.dialog.parentId" :tree="dictionary.tree"
        @get-list="getDictionaryList" />
      <subsidiaryDepartment v-if="subsidiaryDictionary.dialog.visible" :id="subsidiaryDictionary.dialog.id"
        v-model="subsidiaryDictionary.dialog.visible" :row="subsidiaryDictionary.row"
        :parent-id="subsidiaryDictionary.dialog.parentId" :name="subsidiaryDictionary.dialog.name"
        :tree="subsidiaryDictionary.tree" @get-list="getDictionaryList" />
      <DictionaryItemDia v-if="dictionaryItem.dialog.visible" :id="dictionaryItem.dialog.id"
        v-model="dictionaryItem.dialog.visible" :catalogue-id="dictionaryItem.search.organizationalStructureId"
        :parent-id="dictionaryItem.dialog.parentId" :level="dictionaryItem.dialog.level" :tree="dictionary.tree"
        :dataList="dictionaryItem.dataList" :row="dictionaryItem.row" @success="getDictionaryItemList" />
      <userDialog v-if="userForm.dialog.visible" :id="userForm.dialog.id" v-model="userForm.dialog.visible"
        :catalogue-id="userForm.search.catalogueId" :parent-id="userForm.dialog.parentId" :level="userForm.dialog.level"
        :tree="dataForm.tree" :dataList="userForm.dataList" :row="userForm.row" @success="getUserList" />
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
            //color: var(--el-text-color-placeholder);
            color: #ffb05b;
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
