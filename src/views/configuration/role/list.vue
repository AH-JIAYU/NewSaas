<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/configuration_role";
import QuickEdit from "./components/QuickEdit/index.vue"; //快速编辑
import useSettingsStore from "@/store/modules/settings";
import empty from "@/assets/images/empty.png";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "role",
});
// 国际化
const { t } = useI18n();
// 路由
const router = useRouter();
// 分页
const { pagination, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
//快速编辑
const QuickEditRef = ref();
//表格当前选中
const current = ref<any>();
const settingsStore = useSettingsStore();
//表单排序配置
const formSearchList = ref<any>();
// 表单排序name
const formSearchName = ref<string>("formSearch-role");
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
  formMode: "drawer" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    id: "",
    row: {},
  },
  // 搜索
  search: {
    // 角色id
    id: null,
    // 角色名称
    name: "",
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}

// 快速编辑
function quickEdit(row: any, type: any) {
  /**
    备注 remark
  */
  QuickEditRef.value.showEdit(row, type);
}

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
// 获取数据
async function getDataList() {
  try {
    data.value.loading = true;
    const params = {
      ...data.value.search,
    };
    const res = await api.list(params);
    if (res.data && res.status === 1) {
      data.value.dataList = res.data;
      pagination.value.total = +res.data.length;
    }
    data.value.loading = false;
  } catch (error) {
  } finally {
    data.value.loading = false;
  }
}
// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    data.value.search.limit = size;
    getDataList();
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    getDataList();
  });
}

// 重置数据
function onReset() {
  Object.assign(data.value.search, {
    // 角色id
    id: null,
    // 	角色名称
    name: "",
  });
  getDataList();
}
// 新增
function onCreate() {
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "multilevel_menu_exampleRoleCreate",
      });
    } else {
      router.push({
        name: "multilevel_menu_exampleRoleCreate",
      });
    }
  } else {
    data.value.formModeProps.id = "";
    data.value.formModeProps.visible = true;
  }
}

// 修改
function onEdit(row: any) {
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "multilevel_menu_exampleRoleEdit",
        params: {
          id: row.id,
        },
      });
    } else {
      router.push({
        name: "multilevel_menu_exampleRoleEdit",
        params: {
          id: row.id,
        },
      });
    }
  } else {
    data.value.formModeProps.id = row.id;
    data.value.formModeProps.row = JSON.stringify(row);
    data.value.formModeProps.visible = true;
  }
}
// 删除
function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.roleName}」吗？`, "确认信息")
    .then(() => {
      api.delete({ id: row.id }).then(() => {
        getDataList();
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      });
    })
    .catch(() => {});
}

onMounted(() => {
  getDataList();
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "id",
      placeholder: computed(() => t("configuration.role.roleID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "name",
      placeholder: computed(() => t("configuration.role.roleName")),
    },
  ];
});
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch
        :formSearchList="formSearchList"
        :formSearchName="formSearchName"
        @currentChange="currentChange"
        @onReset="onReset"
        :model="data.search"
      />
      <ElDivider border-style="dashed" />
      <ElSpace wrap>
        <ElButton
          type="primary"
          size="default"
          @click="onCreate"
          v-auth="'role-insert-insertRole'"
        >
          {{ t("configuration.role.newRole") }}
        </ElButton>
      </ElSpace>
      <ElTable
        v-loading="data.loading"
        class="my-4"
        :data="data.dataList"
        stripe
        highlight-current-row
        height="100%"
        @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event"
        @current-change="handleCurrentChange"
      >
        <ElTableColumn
          v-if="data.batch.enable"
          type="selection"
          align="left"
          fixed
        />
        <ElTableColumn prop="id" align="left" label="角色ID">
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine idFont">
                {{ row.id }}
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
        <ElTableColumn prop="roleName" align="left" label="角色名称">
          <template #default="{ row }">
            <div class="tableBig">{{ row.roleName }}</div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="count" align="left" label="账户数">
          <template #default="{ row }">
            <div class="fontC-System">{{ row.count }}</div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="remark" align="left" label="备注">
          <template #default="{ row }">
            <div class="flex-s">
              <div
                class="oneLine fontC-System"
                style="width: calc(100% - 20px)"
              >
                {{ row.remark ? row.remark : "-" }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'remark')"
                v-auth="'role-update-updateRole'"
                :class="{ edit: 'edit', current: row.id === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="250" align="left" fixed="right">
          <template #default="scope">
            <ElButton
              type="primary"
              size="small"
              plain
              @click="onEdit(scope.row)"
              v-auth="'role-update-updateRole'"
            >
              编辑
            </ElButton>
            <ElButton
              type="danger"
              size="small"
              plain
              @click="onDel(scope.row)"
              v-auth="'role-delete-deleteRole'"
            >
              删除
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
    </PageMain>
    <FormMode
      v-if="data.formMode === 'dialog' || data.formMode === 'drawer'"
      :id="data.formModeProps.id"
      v-model="data.formModeProps.visible"
      :row="data.formModeProps.row"
      :mode="data.formMode"
      @success="getDataList"
    />
    <QuickEdit ref="QuickEditRef" @fetchData="getDataList" />
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

.el-table__row:hover .edit {
  display: block;
}
</style>
