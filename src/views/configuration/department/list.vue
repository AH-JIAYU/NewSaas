<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import FormMode from "./components/FormMode/index.vue";
import GroupForm from "./components/GroupForm/index.vue";
import Detail from "./components/Detail/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/department";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import useSettingsStore from "@/store/modules/settings";

defineOptions({
  name: "department",
});
// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([])
// 时间
const { format } = useTimeago();
// 国际化
const router = useRouter();
// 分页
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
// 表格控件-展示列
const columns = ref([
  {
    label: "部门ID",
    prop: "id",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
  {
    label: "部门名称",
    prop: "name",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
  // {
  //   label: "部门主管",
  //   prop: "director",
  //   sortable: true,
  //   // 不可更改
  //   disableCheck: false,
  //   // 默认展示
  //   checked: true,
  // },
  {
    label: "员工数",
    prop: "memberCount",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
  {
    label: "备注",
    prop: "remark",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
]);
// detailRef
const detailRef = ref<any>()
// groupFormRef
const groupFormRef = ref<any>()
// 定义数据
const data = ref<any>({
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
    row: "",
  },
  // 搜索
  search: {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 部门id
    id: null,
    // 	部门名称
    name: '',
    // 是否开启部门提成 ,可用值:1启用,2停用
    commissionStatus: null,
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});
// 获取数据
function getDataList() {
  data.value.loading = true;
  const params = {
    ...getParams(),
    ...data.value.search,
  };
  api.list(params).then((res: any) => {
    data.value.loading = false;
    data.value.dataList = res.data.data;
    pagination.value.total = +res.data.total;
  });
}

// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 部门id
    id: null,
    // 	部门名称
    name: '',
    // 是否开启部门提成 ,可用值:1启用,2停用
    // commissionStatus: null,
  });
  getDataList();
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    data.value.search.limit = size;
    getDataList()
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    data.value.search.page = page;
    getDataList()
  });
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}
// 新增
function onCreate() {
  if (data.value.formMode === "router") {
    tabbar.open({
      name: "pagesExampleGeneralManagerCreate",
    });
  } else {
    data.value.formModeProps.id = "";
    data.value.formModeProps.row = "";
    data.value.formModeProps.visible = true;
  }
}
// 新增小组
function onGroup(row:any) {
  groupFormRef.value.showEdit(JSON.stringify(row))
}
// 修改
function onEdit(row: any) {
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "surveyEdit",
        params: {
          id: row.id,
        },
      });
    } else {
      router.push({
        name: "surveyEdit",
        params: {
          id: row.id,
        },
      });
    }
  } else {
    data.value.formModeProps.id = row.id;
    data.value.formModeProps.row = JSON.stringify(row)
    data.value.formModeProps.visible = true;
  }
}
// 详情
function onDetail(row: any) {
  detailRef.value.showEdit(row)
}

onMounted(async () => {
  staffList.value = await tenantStaffStore.getStaff();
  getDataList();
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
  columns.value.forEach((item: any) => {
    if (item.checked) {
      data.value.checkList.push(item.prop);
    }
  });
});

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="data.search" size="default" label-width="100px" inline-message inline class="search-form">
            <ElFormItem label="">
              <ElInput v-model="data.search.id" placeholder="请输入部门ID" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem label="">
              <ElInput v-model="data.search.name" placeholder="请输入部门名称" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                {{ "筛选" }}
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <div class="i-grommet-icons:power-reset h-1em w-1em" />
                </template>
                重置
              </ElButton>
              <ElButton disabled link @click="toggle">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <ElButton type="primary" size="default" @click="onCreate">
            新增
          </ElButton>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
            v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
            v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="currentChange" />
        </FormRightPanel>
      </el-row>
      <ElTable v-model:stripe="data.stripe" v-model:border="data.border" v-loading="data.loading"
        :size="data.lineHeight" class="my-4" :data="data.dataList" highlight-current-row height="100%"
        @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
        <el-table-column align="center" type="selection" />
        <!-- <el-table-column
          align="center"
          show-overflow-tooltip
          type="index"
          label="序号"
          width="80"
        /> -->
        <ElTableColumn v-if="data.checkList.includes('id')" align="center" show-overflow-tooltip prop="id"
          label="部门ID" />
        <ElTableColumn v-if="data.checkList.includes('name')" align="center" show-overflow-tooltip prop="name"
          label="部门名称">
          <template #default="{ row }">
            {{ row.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('director')" align="center" show-overflow-tooltip prop="director"
          label="部门主管">
          <template #default="{ row }">
            <el-text v-for="item in staffList" :key="item.id">
              <el-text v-if="item.id === row.director">
                {{ item.name }}
              </el-text>
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('memberCount')" align="center" show-overflow-tooltip
          prop="memberCount" label="员工数">
          <template #default="{ row }">
            {{ row.memberCount ? row.memberCount : '-' }}
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('remark')" align="center" show-overflow-tooltip prop="remark"
          label="备注">
          <template #default="{ row }">
            {{ row.remark }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="300" align="center" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" plain @click="onGroup(scope.row)">
              新增小组
            </ElButton>
            <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
              编辑
            </ElButton>
            <ElButton type="primary" size="small" plain @click="onDetail(scope.row)">
              详情
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :row="data.formModeProps.row" :mode="data.formMode" @success="getDataList" />
    <Detail ref="detailRef" />
    <GroupForm ref="groupFormRef" />
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

:deep {
  .el-table__header {
    th {
      background: var(--el-fill-color-lighter) !important;
    }
  }
}
</style>
