<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ref } from "vue";
import api from "@/api/modules/configuration_manager";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import usePositionManageStore from "@/store/modules/position_manage";
import empty from '@/assets/images/empty.png'
import DictionaryItemDia from "./components/dictionaryItemDialog/index.vue";
import Detail from "./components/Detail/index.vue";

defineOptions({
  name: "user",
});
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 区域
const useStoreCountry = useBasicDictionaryStore();
// 区域数据
const filterCountry = ref<any>([]);
// 分页
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
  // { label: "姓名", prop: "name", sortable: true, checked: true },
  // { label: "区域", prop: "country", sortable: true, checked: true },
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
// 获取树
const treeRef = ref<any>()
// 获取用户
async function getUserList() {
  const params = {
    ...userForm.value.search,
  };
  const res = await api.list(params);
  if (res.data) {
    userForm.value.dataList = res.data.data;
    pagination.value.total = +res.data.total;
  }
}
onMounted(async () => {
  try {
    // loading加载开始
    dataForm.value.loading = true;
    // 区域
    filterCountry.value = await useStoreCountry.getCountry();
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
      `确认${!row.active ? "启用" : "禁用"}「${row.userName}」吗？`,
      "确认信息"
    )
      .then(() => {
        try {
          dataForm.value.loading = true;
          api
            .edit({
              id: row.id,
              email: row.email,
              phoneNumber: row.phoneNumber,
              userName: row.userName,
              country: row.country,
              role: row.role,
              positionId: row.positionId,
              organizationalStructureId: row.organizationalStructureId,
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
// 用户详情
function dictionaryClick(data: Dict) {
  pagination.value.page = 1;
  if (data?.children?.length) {
    userForm.value.search.id = ''
    userForm.value.search.departmentId = data.id
    getUserList()
  } else {
    userForm.value.search.id = data.id
    userForm.value.search.departmentId = ''
    getUserList()
  }
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    userForm.value.search.limit = size
    getUserList()
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    userForm.value.search.page = page
    getUserList()
  });
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getUserList());
}
// 新增
function onCreate(row?: any) {
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
      api.reset({ id: id }).then(() => {
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
function onEdit(row: any) {
  userForm.value.row = JSON.stringify(row);
  userForm.value.dialog.id = row.id;
  userForm.value.dialog.parentId = row.parentId;
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
      <div class="leftTree">
        <div v-if="dataForm.tree.length" class="leftData" :span="3">
          <el-tree style="max-width: 37.5rem; min-height: 45.4375rem; padding: 10px;" :data="dataForm.tree"
            ref="treeRef" node-key="id" default-expand-all :expand-on-click-node="false" :props="defaultProps"
            @node-click="dictionaryClick" />
        </div>
        <PageMain>
          <div v-loading="dataForm.loading" class="dataForm-container">
            <ElSpace>
              <ElInput v-model="userForm.search.id" placeholder="员工ID" clearable style="width: 12.5rem"
                @keydown.enter="getUserList" />
              <ElInput v-model="userForm.search.userName" placeholder="用户名" clearable style="width: 12.5rem"
                @keydown.enter="getUserList" />
              <el-select v-model="userForm.search.active" value-key="" placeholder="状态" style="width: 12.5rem" clearable
                filterable @change="getUserList">
                <el-option v-for="item in activeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
            <el-row style="margin-bottom: .3125rem" :gutter="24">
              <el-col style="margin-bottom: 1.5625rem;" :span="10">
                <el-button type="primary" size="default" @click="onCreate">
                  新增
                </el-button>
                <el-button type="primary" size="default" @click="onResetPassword">
                  重置密码
                </el-button>
              </el-col>
              <el-col style="display: flex; justify-content: flex-end" :span="14">
                <el-button size="default" @click=""> 导出 </el-button>
                <TabelControl v-model:border="userForm.border" v-model:tableAutoHeight="userForm.tableAutoHeight"
                  v-model:checkList="userForm.checkList" v-model:columns="columns"
                  v-model:line-height="userForm.lineHeight" v-model:stripe="userForm.stripe" style="margin-left: .75rem"
                  @query-data="getUserList" />
              </el-col>
            </el-row>
            <ElTable ref="userItemRef" :data="userForm.dataList" :border="userForm.border" :size="userForm.lineHeight"
              :stripe="userForm.stripe" highlight-current-row height="100%" @sort-change="sortChange"
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
              <ElTableColumn v-if="userForm.checkList.includes('email')" align="left" width="180" prop="email"
                label="邮箱">
                <template #default="{ row }">
                  <el-text class="tableBig">
                    {{ row.email ? row.email : "-" }}
                  </el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn v-if="userForm.checkList.includes('departmentId')" align="left" prop="departmentId"
                label="部门">
                <template #default="{ row }">
                  <el-text class="tableBig">
                    {{ row.organizationalStructureName ? row.organizationalStructureName : '-' }}
                  </el-text>
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
                  <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
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
              background @size-change="sizeChange" @current-change="currentChange" />
          </div>
        </PageMain>

      </div>
      <DictionaryItemDia v-if="userForm.dialog.visible" :id="userForm.dialog.id" v-model="userForm.dialog.visible"
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

  .dataForm-container {
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



:deep(.page-main) {
  height: 100% !important;
}

.flex-s {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  >div:nth-of-type(1) {
    width: calc(100% - 25px);
    flex-shrink: 0;
  }

  .edit {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    flex-shrink: 0;
    display: none;
    cursor: pointer;
  }

  .current {
    display: block !important;
  }
}
</style>
