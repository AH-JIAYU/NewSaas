<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import FormMode from "./components/FormMode/index.vue";
import GroupForm from "./components/GroupForm/index.vue";
import Detail from "./components/Detail/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/group_manage";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import useSettingsStore from "@/store/modules/settings";
import useDepartmentStore from "@/store/modules/department";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "group_manage",
});
// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([]);
// 时间
const { format } = useTimeago();
// 国际化
const router = useRouter();
// 分页
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-group_manage')// 表单排序name
// 表格控件-展示列
const columns = ref([
  {
    label: "组ID",
    prop: "id",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
  {
    label: "组名称",
    prop: "name",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
  {
    label: "员工数",
    prop: "count",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
  {
    label: "所属部门",
    prop: "departmentId",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
]);
// detailRef
const detailRef = ref<any>();
// groupFormRef
const groupFormRef = ref<any>();
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
    // 组id
    id: null,
    // 	组名称
    name: "",
    // 	部门id
    departmentId: null,
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
  try {
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
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}

// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 组id
    id: null,
    // 	组名称
    name: "",
    // 	部门id
    departmentId: null,
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
// 新增组员
function onGroup(row: any) {
  groupFormRef.value.showEdit(JSON.stringify(row));
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
  detailRef.value.showEdit(JSON.stringify(row));
}

onMounted(async () => {
  departmentList.value = await departmentStore?.getDepartment();
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
  formSearchList.value =   [
    {index: 1, show: true, type: 'input', modelName: 'id', placeholder: '请输入组ID'},
    {index: 2, show: true, type: 'input', modelName: 'name', placeholder: '请输入组名称'},
    {index: 3, show: true, type: 'select', modelName: 'departmentId', placeholder: '所属部门', option: departmentList.value, optionLabel: 'name', optionValue: 'id'}
]
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

 <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="data.search" />
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
        <el-table-column align="left" type="selection" />
        <ElTableColumn v-if="data.checkList.includes('id')" align="left" show-overflow-tooltip prop="id"
          label="组ID" >
          <template #default="{row}">
            <div class="copyId tableSmall">
              <div class="id oneLine  ">ID: {{ row.id }}</div>
              <copy class="copy" :content="row.id" />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('name')" align="left" show-overflow-tooltip prop="name"
          label="组名称">
          <template #default="{ row }">
            <div class="tableBig">{{ row.name }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn v-if="data.checkList.includes('count')" align="left" show-overflow-tooltip prop="count"
          label="员工数">
          <template #default="{ row }">
            <div class="tableBig">{{ row.count ? row.count : "-" }}</div>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('departmentId')" align="left" show-overflow-tooltip
          prop="departmentId" label="所属部门">
          <template #default="{ row }">
            <el-text v-for="item in departmentList" :key="item.id">
              <el-text  class="tableBig" v-if="item.id === row.departmentId">
                {{ item.name }}
              </el-text>
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="300" align="left" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" plain @click="onGroup(scope.row)">
              新增组员
            </ElButton>
            <ElButton type="warning" size="small" plain @click="onEdit(scope.row)">
              编辑
            </ElButton>
            <ElButton type="danger" size="small" plain @click="onDetail(scope.row)">
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
    </PageMain>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :row="data.formModeProps.row" :mode="data.formMode" @success="getDataList" />
    <Detail ref="detailRef" />
    <GroupForm @success="getDataList" ref="groupFormRef" />
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


}

:deep {
  .el-table__header {
    th {
      background: var(--el-fill-color-lighter) !important;
    }
  }
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

// id
.copyId {
  @extend .flex-s;
  justify-content: center;

  .copy {
    width: 20px;
  }

  .id {
    max-width:calc(100% - 25px)  !important;
  }
}
:deep(.el-table__empty-block){
  height:auto !important;
}
</style>
