<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ref } from "vue";
import api from "@/api/modules/department";
import empty from "@/assets/images/empty.png";
import apiUser from "@/api/modules/configuration_manager";
import useDepartmentStore from "@/store/modules/department";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import usePositionManageStore from "@/store/modules/position_manage";
import DictionaryDialog from "./components/dictionaryDialog/index.vue";
import subsidiaryDepartment from "./components/subsidiary_department/index.vue";
import DictionaryItemDia from "./components/dictionaryItemDialog/index.vue";
import userDialog from "./components/userDialog/index.vue";
import Detail from "@/views/configuration/department/components/Detail/index.vue";
import { columns } from "./components/configuration/index.ts";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "department",
});

const { t } = useI18n();
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
// 区域
const useStoreCountry = useBasicDictionaryStore();
// 区域数据
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

// listLoading加载
const listLoading = ref(false);
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
const resetList = ref<any>();
// tableRef
const userItemRef = ref();
// 字典下的数据
const userForm = ref<any>({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  // 表格控件-是否展示边框
  border: true,
  // 表格控件-是否展示斑马条
  stripe: true,
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
// 部门数据
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
    isClick: false,
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
    name: "",
  },
  row: "",
  loading: false,
});
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
    const params = {
      ...dictionary.value.search,
    };
    const res = await api.list(params);
    if (res.data) {
      dictionary.value.tree = sortTreeByTime(res.data);
      dictionary.value.loading = false;
    }
  } catch (error) {
  } finally {
    dictionary.value.loading = false;
  }
}
// 递归排序函数
const sortTreeByTime = (nodes: any) => {
  // 先对当前层的节点进行排序
  nodes.sort((a: any, b: any) => {
    const timeA: any = new Date(a["createTime"]);
    const timeB: any = new Date(b["createTime"]);
    return timeB - timeA;
  });
  // 然后递归处理每个子节点
  nodes.forEach((node: any) => {
    if (node.children && node.children.length > 0) {
      sortTreeByTime(node.children);
    }
  });
  return nodes;
};

onMounted(() => {
  getDictionaryList();
});

watch(
  () => dictionary.value.search,
  (val) => {
    dictionaryRef.value!.filter(val);
  },
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
  if (dictionaryItem.value.search.organizationalStructureId) {
    dictionary.value.dialog.isClick = true;
  }
}
// 删除部门
function dictionaryDelete(node: Node, data: any) {
  ElMessageBox.confirm(`确认删除「${data.name}」吗？`, "确认信息").then(() => {
    api.delete({ id: data.id }).then(() => {
      ElMessage.success({
        message: "删除成功",
        center: true,
      });
      getDictionaryList();
    });
  });
}

// 部门项详情
function dictionaryClick(data: any) {
  pagination.value.page = 1;
  if (data.id) {
    userForm.value.dialog.parentId = data.id;
  }
  dictionaryItem.value.search.organizationalStructureId = data.id;
}

// 监听id变化
watch(
  () => dictionaryItem.value.search.organizationalStructureId,
  () => {
    getDictionaryItemList();
  },
);
// 获取部门项
async function getDictionaryItemList() {
  resetList.value = null;
  try {
    listLoading.value = true;
    const params = {
      ...dictionaryItem.value.search,
    };
    const res = await api.itemlist(params);
    if (res.data) {
      listLoading.value = false;
      userForm.value.dataList = res.data;
      dictionaryItem.value.dataList.forEach((item: any) => {
        item.enableLoading = false;
      });
      pagination.value.total = res.data.length ? res.data.length : 0;
    }
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}

onMounted(async () => {
  try {
    // loading加载开始
    dataForm.value.loading = true;
    // 区域
    filterCountry.value = await useStoreCountry.getCountry();
    // 部门
    departmentList.value = (await departmentStore?.getDepartment()) || [];
    // 职位
    positionManageList.value =
      (await usePositionManage?.getPositionManage()) || [];
    columns.forEach((item: any) => {
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
  },
);
// 开关事件
function onChangeStatus(row: any) {
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(
      `确认${!row.active ? "启用" : "禁用"}「${row.userName}」吗？`,
      "确认信息",
    )
      .then(() => {
        try {
          dataForm.value.loading = true;
          apiUser
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
              getDictionaryItemList();
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
    userForm.value.search.limit = size;
    getDictionaryItemList();
  });
}

// 当前页码切换（翻页）
function currentChangeUser(page = 1) {
  onCurrentChange(page).then(() => {
    userForm.value.search.page = page;
    getDictionaryItemList();
  });
}

// 字段排序
function sortChangeUser({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDictionaryItemList());
}

// 新增
function create(row?: any) {
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
  resetList.value = val[0];
};

// 重置密码
function onResetPassword() {
  if (resetList.value) {
    const { userName, id } = resetList.value;
    ElMessageBox.confirm(
      `确认将「${userName}」的密码重置为 “123456” 吗？`,
      "确认信息",
    )
      .then(() => {
        apiUser.reset({ id: id }).then(() => {
          ElMessage.success({
            message: "重置成功",
            center: true,
          });
          getDictionaryItemList();
        });
      })
      .catch(() => {});
  }
}
// 修改
function edit(row: any) {
  userForm.value.row = JSON.stringify(row);
  userForm.value.dialog.id = row.id;
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
  getDictionaryItemList();
}

//表格当前选中
const current = ref<any>();

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
</script>

<template>
  <div class="absolute-container">
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle>
        <template #leftSide>
          <ElButtonGroup class="btns">
            <ElButton
              type="primary"
              class="add"
              @click="dictionaryAdd()"
              v-auth="'department-insert-insertOrganizationalStructure'"
            >
              {{ t("configuration.department.newDepartment") }}
            </ElButton>
          </ElButtonGroup>
          <ElInput
            v-model="dictionary.search.name"
            :placeholder="t('configuration.department.enterKeywork')"
            clearable
            class="search"
            @keydown.enter="getDictionaryList"
          >
            <template #append>
              <ElButton @click="getDictionaryList">
                <SvgIcon name="i-ep:search" />
              </ElButton>
            </template>
          </ElInput>
          <ElScrollbar class="tree">
            <ElTree
              ref="dictionaryRef"
              v-loading="dictionary.loading"
              :data="dictionary.tree"
              :filter-node-method="dictionaryFilter as any"
              default-expand-all
              @node-click="dictionaryClick"
            >
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <div class="label" :title="node.label">
                    {{ data.name }}
                  </div>
                  <div class="code">
                    <template
                      v-for="item in data?.organizationalStructurePersonList"
                      :key="item.userId"
                    >
                      <span
                        v-if="item.enableChargePerson == 1"
                        style="margin-right: 0.3rem"
                      >
                        {{ item.userName }}
                      </span>
                    </template>
                  </div>
                  <div class="actions">
                    <ElButtonGroup>
                      <ElButton
                        type="primary"
                        plain
                        size="default"
                        @click.stop="subsidiaryDictionaryAdd(data)"
                        v-auth="
                          'department-insert-insertOrganizationalStructure'
                        "
                      >
                        <template #icon>
                          <SvgIcon name="i-ep:plus" />
                        </template>
                      </ElButton>
                      <ElButton
                        type="info"
                        plain
                        size="default"
                        @click.stop="dictionaryEdit(node, data)"
                        v-auth="
                          'department-update-updateOrganizationalStructure'
                        "
                      >
                        <template #icon>
                          <SvgIcon name="i-ep:edit" />
                        </template>
                      </ElButton>
                      <ElButton
                        type="danger"
                        plain
                        size="default"
                        @click.stop="dictionaryDelete(node, data)"
                        v-auth="
                          'department-delete-deleteOrganizationalStructure'
                        "
                      >
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
        <div
          v-show="dictionaryItem.search.organizationalStructureId"
          class="dictionary-container"
        >
          <ElSpace wrap>
            <ElButton
              type="primary"
              @click="create()"
              v-auth="'department-insert-insertStaff'"
            >
              {{ t("configuration.department.newEmployee") }}
            </ElButton>
            <ElButton
              @click="onResetPassword"
              v-auth="'department-update-resetPasswordStaff'"
            >
              {{ t("common.resetPassword") }}
            </ElButton>
          </ElSpace>
          <ElTable
            v-loading="listLoading"
            ref="userItemRef"
            :data="userForm.dataList"
            :border="userForm.border"
            :size="userForm.lineHeight"
            :stripe="userForm.stripe"
            highlight-current-row
            height="100%"
            @sort-change="sortChangeUser"
            @selection-change="userForm.selectionDataList = $event"
            row-key="id"
            default-expand-all
            @select="selectChange"
            @current-change="handleCurrentChange"
          >
            <ElTableColumn type="selection" align="left" fixed />
            <ElTableColumn
              v-if="userForm.checkList.includes('active')"
              align="left"
              prop="active"
              :label="t('common.status')"
            >
              <template #default="scope">
                <ElSwitch
                  v-model="scope.row.active"
                  inline-prompt
                  :active-text="t('common.enable')"
                  :inactive-text="t('common.disable')"
                  :before-change="() => onChangeStatus(scope.row)"
                />
              </template>
            </ElTableColumn>
            <ElTableColumn
              v-if="userForm.checkList.includes('id')"
              align="left"
              width="180"
              prop="id"
              :label="t('configuration.user.id')"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="id oneLine idFont">
                    <el-tooltip
                      effect="dark"
                      :content="row.id"
                      placement="top-start"
                    >
                      {{ row.id }}
                    </el-tooltip>
                  </div>
                  <copy
                    :content="row.id"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.id === current,
                    }"
                  />
                </div>
              </template>
            </ElTableColumn>
            <ElTableColumn
              v-if="userForm.checkList.includes('userName')"
              align="left"
              width="160"
              prop="userName"
              :label="t('configuration.user.username')"
            >
              <template #default="{ row }">
                <div style="display: flex; align-items: center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    v-if="row.enableChargePerson === 1"
                    style="margin-top: 2px; margin-right: 7px"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g id="Group 18384">
                      <circle
                        id="Ellipse 105"
                        cx="10"
                        cy="10"
                        r="10"
                        fill="#F8BB4F"
                      />
                      <path
                        id="ç®¡"
                        d="M13.9946 9.3605V12.1892H7.43481V12.9031H14.6277V16.4995H13.3481V16.0146H7.43481V16.486H6.15517V9.3605H13.9946ZM7.43481 14.8831H13.3481V13.9133H7.43481V14.8831ZM7.43481 11.1655H12.7419V10.3842H7.43481V11.1655ZM15.8534 7.67677V10.2495H14.6008V8.75436H5.52209V10.2495H4.2694V7.67677H9.48222C9.37446 7.40738 9.25323 7.16492 9.13201 6.9494L10.2635 6.76083L10.0345 6.61266C10.6541 5.80447 11.1121 4.9424 11.3815 4.01298L12.6072 4.28238C12.5264 4.51136 12.4591 4.72688 12.3782 4.9424H16.1228V6.06039H13.9273C14.1428 6.35673 14.3179 6.65307 14.4661 6.92246L13.3346 7.34003C13.1191 6.90899 12.8631 6.47796 12.5668 6.06039H11.8799C11.6509 6.5049 11.3949 6.92246 11.1121 7.29962L10.4655 6.88206C10.5733 7.12451 10.6676 7.39391 10.7753 7.67677H15.8534ZM6.08782 6.06039C5.79149 6.54531 5.46821 7.00328 5.118 7.42085L4 6.72042C4.78125 5.88529 5.33351 4.96934 5.67026 3.99951L6.89601 4.26891C6.81519 4.4979 6.72091 4.72688 6.64009 4.9424H10.0345V6.06039H8.01401C8.25647 6.39714 8.47198 6.72042 8.63362 7.03022L7.46175 7.47473C7.23276 6.98981 6.97683 6.51837 6.6805 6.06039H6.08782Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                  <el-text class="tableBig">
                    {{ row.userName ? row.userName : "-" }}
                  </el-text>
                </div>
              </template>
            </ElTableColumn>
            <!-- <ElTableColumn v-if="dictionaryItem.checkList.includes('name')" align="left" width="130" prop="name"
              :label="t('configuration.user.detail.name')">
                <template #default="{ row }">
                  <el-text class="tableBig">
                    {{ row.name ? row.name : "-" }}
                  </el-text>
                </template>
              </ElTableColumn> -->
            <ElTableColumn
              v-if="userForm.checkList.includes('phoneNumber')"
              align="left"
              width="170"
              prop="phone"
              :label="t('configuration.user.phonenumber')"
            >
              <template #default="{ row }">
                <el-text class="fontC-System">
                  {{ row.phoneNumber ? row.phoneNumber : "-" }}
                </el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn
              v-if="userForm.checkList.includes('email')"
              align="left"
              width="180"
              prop="email"
              :label="t('configuration.user.email')"
            >
              <template #default="{ row }">
                <el-text class="fontC-System">
                  {{ row.email ? row.email : "-" }}
                </el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn
              v-if="userForm.checkList.includes('departmentId')"
              align="left"
              prop="departmentId"
              :label="t('configuration.user.department')"
            >
              <template #default="{ row }">
                <el-text class="fontC-System">{{
                  row.organizationalStructureName
                    ? row.organizationalStructureName
                    : "-"
                }}</el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn
              v-if="userForm.checkList.includes('positionId')"
              align="left"
              prop="positionId"
              :label="t('configuration.user.position')"
            >
              <template #default="{ row }">
                <el-text class="fontC-System">{{
                  row.positionName ? row.positionName : "-"
                }}</el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn
              :label="t('common.control')"
              fixed="right"
              width="200"
              align="left"
            >
              <template #default="scope">
                <ElButton
                  type="primary"
                  size="small"
                  plain
                  @click="edit(scope.row)"
                  v-auth="'department-update-updateStaff'"
                >
                  {{ t("common.edit") }}
                </ElButton>
                <ElButton
                  type="warning"
                  size="small"
                  plain
                  @click="onDetail(scope.row)"
                  v-auth="'department-get-getStaffList'"
                >
                  {{ t("common.detail") }}
                </ElButton>
              </template>
            </ElTableColumn>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
            </template>
          </ElTable>
        </div>
        <div
          v-show="!dictionaryItem.search.organizationalStructureId"
          class="dictionary-container"
        >
          <div class="empty">
            {{ t("configuration.department.newOrSelect") }}
          </div>
        </div>
      </LayoutContainer>
      <DictionaryDialog
        v-if="dictionary.dialog.visible"
        :id="dictionary.dialog.id"
        v-model="dictionary.dialog.visible"
        :row="dictionary.row"
        :parent-id="dictionary.dialog.parentId"
        :tree="dictionary.tree"
        :isClick="dictionary.dialog.isClick"
        @get-list="getDictionaryList"
        @get-Itmelist="getDictionaryItemList"
      />
      <subsidiaryDepartment
        v-if="subsidiaryDictionary.dialog.visible"
        :id="subsidiaryDictionary.dialog.id"
        v-model="subsidiaryDictionary.dialog.visible"
        :row="subsidiaryDictionary.row"
        :parent-id="subsidiaryDictionary.dialog.parentId"
        :name="subsidiaryDictionary.dialog.name"
        :tree="subsidiaryDictionary.tree"
        @get-list="getDictionaryList"
      />
      <DictionaryItemDia
        v-if="dictionaryItem.dialog.visible"
        :id="dictionaryItem.dialog.id"
        v-model="dictionaryItem.dialog.visible"
        :catalogue-id="dictionaryItem.search.organizationalStructureId"
        :parent-id="dictionaryItem.dialog.parentId"
        :level="dictionaryItem.dialog.level"
        :tree="dictionary.tree"
        :dataList="dictionaryItem.dataList"
        :row="dictionaryItem.row"
        @success="getDictionaryItemList"
      />
      <userDialog
        v-if="userForm.dialog.visible"
        :id="userForm.dialog.id"
        v-model="userForm.dialog.visible"
        :catalogue-id="userForm.search.catalogueId"
        :parent-id="userForm.dialog.parentId"
        :level="userForm.dialog.level"
        :tree="dataForm.tree"
        :dataList="userForm.dataList"
        :row="userForm.row"
        @success="getDictionaryItemList"
        @get-list="getDictionaryList"
      />
      <Detail ref="detailRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.copyId .idFont {
  font-size: 0.875rem;
}

.copyId .current {
  display: block !important;
}

.rowCopy {
  width: 20px;
  display: none;
}

.copyId .current {
  display: block !important;
}

.el-table__row:hover .rowCopy {
  display: block;
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

        .is-current > .el-tree-node__content {
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
