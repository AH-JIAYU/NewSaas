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
import empty from "@/assets/images/empty.png";
import DictionaryItemDia from "./components/dictionaryItemDialog/index.vue";
import Detail from "./components/Detail/index.vue";
import { columns, formSearchList } from "./components/configuration/index.ts";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "user",
});

// 国际化
const { t } = useI18n();
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 区域
const useStoreCountry = useBasicDictionaryStore();
// 区域数据
const filterCountry = ref<any>([]);
// 表单排序name
const formSearchName = ref<string>("formSearch-user");
// 分页
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
interface Dict {
  id: string | number;
  label: string;
  code: string;
  children?: Dict[];
}
// 状态
const activeList: any = [
  {
    label: computed(() => t("common.enable")),
    value: true,
  },
  {
    label: computed(() => t("common.disable")),
    value: false,
  },
];
// 树配置项
const defaultProps: any = {
  children: "children",
  label: "name",
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
    active: true,
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
const treeRef = ref<any>();
// 获取用户
async function getUserList() {
  const params = {
    ...userForm.value.search,
  };
  const res = await api.list(params);
  if (res.data && res.status === 1) {
    userForm.value.dataList = res.data.data;
    pagination.value.total = +res.data.total;
  }
}

const formOption = {
  activeList: () => activeList,
};
onMounted(async () => {
  try {
    // loading加载开始
    dataForm.value.loading = true;
    // 区域
    filterCountry.value = await useStoreCountry.getCountry();
    // 职位
    positionManageList.value =
      (await usePositionManage?.getPositionManage()) || [];
    // 获取列表数据
    getUserList();
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
      `${t("configuration.user.confirmDisable")} ${!row.active ? t("common.enable") : t("common.disable")}「${row.userName}」${t("configuration.user.question")}`,
      t("configuration.user.confirmationInformation"),
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
                message: `${!row.active ? t("common.enable") : t("common.disable")}${t("common.success")}`,
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
    userForm.value.search.id = "";
    userForm.value.search.departmentId = data.id;
    getUserList();
  } else {
    userForm.value.search.id = data.id;
    userForm.value.search.departmentId = "";
    getUserList();
  }
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    userForm.value.search.limit = size;
    getUserList();
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    userForm.value.search.page = page;
    getUserList();
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

   resetList.value = val;
  // console.log(resetList.value,'resetList.value')
  // 只允许选中一个项
  // if (val.length > 1) {
  //   userItemRef.value.clearSelection();
  //   userItemRef.value.toggleRowSelection(val[val.length - 1]);
  // }
  // resetList.value = val[val.length - 1];
};
// 重置密码
function onResetPassword() {

if(resetList.value.length >1){
  ElMessage.warning({
            message: '重置密码仅支持单个选择',
            center: true,
          });
  return
}



  if (resetList.value) {
    const { userName, id } = resetList.value [0];
    ElMessageBox.confirm(
      `${t("configuration.user.confirm")}${userName}${t("configuration.user.reset")}`,
      t("configuration.user.confirmationInformation"),
    )
      .then(() => {
        api.reset({ id: id }).then(() => {
          ElMessage.success({
            message: t("configuration.user.resetSuccess"),
            center: true,
          });
          getUserList();
        });
      })
      .catch(() => {});
  } else {
    ElMessage.warning({
      message: t("configuration.user.userSelect"),
      center: true,
    });
  }
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
    active: true,
  });
  getUserList();
}
//表格当前选中
const current = ref<any>();
// 选中显示
function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
</script>

<template>
  <div class="absolute-container">
    <div class="page-main">
      <div class="leftTree">
        <div v-if="dataForm.tree.length" class="leftData" :span="3">
          <el-tree
            style="max-width: 37.5rem; min-height: 45.4375rem; padding: 10px"
            :data="dataForm.tree"
            ref="treeRef"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="dictionaryClick"
          />
        </div>
        <PageMain>
          <FormSearch
            :formSearchList="formSearchList"
            @currentChange="currentChange"
            @onReset="onReset"
            :model="userForm.search"
            :formOption="formOption"
            :formSearchName="formSearchName"
          />
          <ElDivider border-style="dashed" />

          <div v-loading="dataForm.loading">
            <!-- <ElSpace>
              <ElInput
                v-model="userForm.search.id"
                placeholder="员工ID"

                clearable
                @keydown.enter="getUserList"
              />
              <ElInput
                v-model="userForm.search.userName"
                placeholder="用户名"
                clearable

                @keydown.enter="getUserList"
              />
              <el-select
                v-model="userForm.search.active"
                value-key=""
                placeholder="状态"
                clearable

                @change="getUserList"
              >
                <el-option
                  v-for="item in activeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <ElButton type="primary" @click="getUserList">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <SvgIcon name="i-ep:refresh" />
                </template>
                重置
              </ElButton>
            </ElSpace> -->
            <el-row style="margin-bottom: 0.3125rem" :gutter="24">
              <el-col style="margin-bottom: 1.5625rem" :span="10">
                <el-button
                  type="primary"
                  size="default"
                  @click="onCreate"
                  v-auth="'user-insert-insertStaff'"
                >
                  {{ t("common.new") }}
                </el-button>
                <el-button
                  type="primary"
                  size="default"
                  @click="onResetPassword"
                  v-auth="'user-get-resetPasswordStaff'"
                >
                  {{ t("common.resetPassword") }}
                </el-button>
              </el-col>
              <!-- 公共组件CR-表格控制 -->
              <el-col
                style="display: flex; justify-content: flex-end"
                :span="14"
              >
                <el-button size="default" @click="">
                  {{ t("common.export") }}
                </el-button>
                <TabelControl
                  v-model:border="userForm.border"
                  v-model:tableAutoHeight="userForm.tableAutoHeight"
                  v-model:checkList="userForm.checkList"
                  v-model:columns="columns"
                  v-model:line-height="userForm.lineHeight"
                  v-model:stripe="userForm.stripe"
                  style="margin-left: 0.75rem"
                  @query-data="getUserList"
                />
              </el-col>
            </el-row>
            <ElTable
              ref="userItemRef"
              :data="userForm.dataList"
              :border="userForm.border"
              :size="userForm.lineHeight"
              :stripe="userForm.stripe"
              highlight-current-row
              height="100%"
              @sort-change="sortChange"
              @current-change="handleCurrentChange"
              @selection-change="userForm.selectionDataList = $event"
              row-key="id"
              default-expand-all
              @select="selectChange"
            >
              <ElTableColumn type="selection" align="left" fixed />
              <ElTableColumn
                v-if="userForm.checkList.includes('active')"
                align="left"
                prop="active"
                :label="t('configuration.user.status')"
                width="84"
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
                width="280"
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
                      class="littleButton"
                    />
                  </div>
                </template>
              </ElTableColumn>
              <ElTableColumn
                v-if="userForm.checkList.includes('userName')"
                align="left"
                prop="userName"
                :label="t('configuration.user.username')"
              >
                <template #default="{ row }">
                  <el-text class="tableBig">
                    {{ row.userName ? row.userName : "-" }}
                  </el-text>
                </template>
              </ElTableColumn>
              <!-- <ElTableColumn v-if="dictionaryItem.checkList.includes('name')" align="left" width="130" prop="name"
                :label="t('configuration.user.name')">
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
                    <el-text class="fontC-System">
                      {{
                        row.organizationalStructureName
                          ? row.organizationalStructureName
                          : "-"
                      }}
                    </el-text>
                  </div>
                </template>
              </ElTableColumn>
              <ElTableColumn
                v-if="userForm.checkList.includes('role')"
                align="left"
                prop="role"
                :label="t('configuration.user.role')"
              >
                <template #default="{ row }">
                  <el-text class="fontC-System">
                    {{ row.role ? row.role : "-" }}
                  </el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn
                v-if="userForm.checkList.includes('positionId')"
                align="left"
                prop="positionId"
                :label="t('configuration.user.position')"
              >
                <template #default="{ row }">
                  <el-text>
                    {{ row.positionName ? row.positionName : "-" }}
                  </el-text>
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
                    @click="onEdit(scope.row)"
                    v-auth="'user-update-updateStaff'"
                  >
                    {{ t("common.edit") }}
                  </ElButton>
                  <ElButton
                    type="warning"
                    size="small"
                    plain
                    @click="onDetail(scope.row)"
                    v-auth="'user-get-getStaffList'"
                  >
                    {{ t("common.detail") }}
                  </ElButton>
                </template>
              </ElTableColumn>
              <template #empty>
                <el-empty :image="empty" :image-size="300" />
              </template>
            </ElTable>
            <ElPagination
              :current-page="pagination.page"
              :total="pagination.total"
              :page-size="pagination.size"
              :page-sizes="pagination.sizes"
              :layout="pagination.layout"
              :hide-on-single-page="false"
              class="pagination"
              background
              @size-change="sizeChange"
              @current-change="currentChange"
            />
          </div>
        </PageMain>
      </div>
      <DictionaryItemDia
        v-if="userForm.dialog.visible"
        :id="userForm.dialog.id"
        v-model="userForm.dialog.visible"
        :catalogue-id="userForm.search.catalogueId"
        :parent-id="userForm.dialog.parentId"
        :level="userForm.dialog.level"
        :tree="dataForm.tree"
        :dataList="userForm.dataList"
        :row="userForm.row"
        @success="getUserList"
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
      margin: 0.9375rem 0;
    }

    .tree {
      flex: 1;
      overflow-y: auto;

      .el-tree {
        .el-tree-node__content {
          height: 3.75rem;
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
            width: calc(100% - 0.625rem);
            color: var(--el-text-color-primary);

            @include text-overflow;
          }

          .code {
            width: calc(100% - 0.625rem);
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
            right: 0.625rem;
            display: none;
            transform: translateY(-50%);

            .el-button {
              padding: 0.3125rem 0.5rem;
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
      margin: 0.9375rem 0;
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
    padding: 0.625rem;
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

  > div:nth-of-type(1) {
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

.littleButton {
  position: absolute;
  right: 15px;
}
</style>
