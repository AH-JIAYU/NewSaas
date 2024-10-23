<route lang="yaml">
meta:
  title: 列表页
</route>

<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/survey_irQuery";
import useSettingsStore from "@/store/modules/settings";
import empty from '@/assets/images/empty.png'
defineOptions({
  name: "irQuery",
});

const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();

// 表格控件-展示列
const columns = ref([
  // 表格控件-展示列
  {
    label: "项目ID",
    prop: "projectOrMemberGroupId",
    sortable: true,
    checked: true,
  },
  {
    label: "项目名称",
    prop: "projectOrMemberGroupName",
    sortable: true,
    checked: true,
  },
  { label: "项目IR", prop: "ir", sortable: true, checked: true },
  { label: "项目实际IR", prop: "projectIr", sortable: true, checked: true },
]);
const data = ref<any>({
  loading: false,

  tableAutoHeight: false, // 表格是否自适应高度
  border: false, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
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
  },
  // 搜索
  search: {
    type: 1, // tab切换
    projectOrMemberGroupId: "", //项目Id/会员id/会员组id
    projectOrMemberGroupName: "", //	项目名称/会员名称/会员组名称
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});
onMounted(() => {
  getDataList();
  columns.value.forEach((item: any) => {
    if (item.checked) {
      data.value.checkList.push(item.prop);
    }
  });
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
});

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});

// 切换tab
function changeTab() {
  if (data.value.search.type === 1) {
    // 项目IR
    data.value.checkList = [];
    columns.value = [
      {
        label: "项目ID",
        prop: "projectOrMemberGroupId",
        sortable: true,
        checked: true,
      },
      {
        label: "项目名称",
        prop: "projectOrMemberGroupName",
        sortable: true,
        checked: true,
      },
      { label: "项目IR", prop: "ir", sortable: true, checked: true },
      {
        label: "项目实际IR",
        prop: "projectIr",
        sortable: true,
        checked: true,
      },
    ];
    columns.value.forEach((item: any) => {
      if (item.checked) {
        data.value.checkList.push(item.prop);
      }
    });
    getDataList();
  } else if (data.value.search.type === 2) {
    // 会员IR
    data.value.checkList = [];
    columns.value = [
      {
        label: "会员姓名",
        prop: "projectOrMemberGroupName",
        sortable: true,
        checked: true,
      },
      {
        label: "会员ID",
        prop: "projectOrMemberGroupId",
        sortable: true,
        checked: true,
      },
      { label: "IR", prop: "ir", sortable: true, checked: true },
    ];
    columns.value.forEach((item: any) => {
      if (item.checked) {
        data.value.checkList.push(item.prop);
      }
    });
    getDataList();
  } else if (data.value.search.type === 3) {
    // 小组IR
    data.value.checkList = [];
    columns.value = [
      {
        label: "会员组名称",
        prop: "projectOrMemberGroupName",
        sortable: true,
        checked: true,
      },
      {
        label: "会员组ID",
        prop: "projectOrMemberGroupId",
        sortable: true,
        checked: true,
      },
      { label: "会员组IR", prop: "ir", sortable: true, checked: true },
    ];
    columns.value.forEach((item: any) => {
      if (item.checked) {
        data.value.checkList.push(item.prop);
      }
    });
    getDataList();
  }
}
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
      data.value.dataList = res.data.projectOrMemberGroupIrList;
      pagination.value.total = res.data.total;
    });
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    title: "",
  });
  getDataList();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList());
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList());
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.projectOrMemberGroupId;
  else current.value = "";
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <el-row style="margin: 0px 0" :gutter="24">
        <el-col style="padding: 0" :span="24">
          <el-tabs v-model="data.search.type" @tab-change="changeTab">
            <el-tab-pane label="项目IR" :name="1">
              <SearchBar :show-toggle="false">
                <template #default="{ fold, toggle }">
                  <ElForm :model="data.search" size="default" label-width="100px" inline-message inline
                    class="search-form">
                    <ElFormItem>
                      <ElInput v-model="data.search.projectOrMemberGroupId" placeholder="项目ID" clearable
                        @keydown.enter="currentChange()" @clear="currentChange()" />
                    </ElFormItem>
                    <ElFormItem>
                      <ElInput v-model="data.search.projectOrMemberGroupName" placeholder="项目名称" clearable
                        @keydown.enter="currentChange()" @clear="currentChange()" />
                    </ElFormItem>
                    <ElFormItem>
                      <ElButton type="primary" @click="currentChange()">
                        <template #icon>
                          <SvgIcon name="i-ep:search" />
                        </template>
                        筛选
                      </ElButton>
                      <ElButton @click="onReset">
                        <template #icon>
                          <div class="i-grommet-icons:power-reset h-1em w-1em" />
                        </template>
                        重置
                      </ElButton>
                      <ElButton disabled link @click="toggle">
                        <template #icon>
                          <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'
    " />
                        </template>
                        {{ fold ? "展开" : "收起" }}
                      </ElButton>
                    </ElFormItem>
                  </ElForm>
                </template>
              </SearchBar>
              <ElDivider border-style="dashed" />
              <el-row>
                <FormLeftPanel />
                <FormRightPanel>
                  <el-button size="default"> 导出 </el-button>
                  <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
                    v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
                    v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="getDataList" />
                </FormRightPanel>
              </el-row>
              <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe"
                class="my-4" :data="data.dataList" highlight-current-row height="100%" @sort-change="sortChange"
                @selection-change="data.batch.selectionDataList = $event"   @current-change="handleCurrentChange">
                <el-table-column align="left" type="selection" />
                <ElTableColumn v-if="data.checkList.includes('projectOrMemberGroupName')" show-overflow-tooltip
                  align="left" prop="projectOrMemberGroupName" label="项目名称">
                  <template #default="{ row }">
                    <p class="weightColor">{{ row.projectOrMemberGroupName ? row.projectOrMemberGroupName : "-" }}</p>
                  </template>
                </ElTableColumn>
                <ElTableColumn v-if="data.checkList.includes('projectOrMemberGroupId')"
                  align="left" prop="projectOrMemberGroupId" label="项目ID">
                  <template #default="{ row }">
                    <div v-if="row.projectOrMemberGroupId" class="hoverSvg">
                      <p class="fineBom">{{ row.projectOrMemberGroupId }}</p>
                      <span class="c-fx">
                        <copy
                :content="row.projectOrMemberGroupId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.projectOrMemberGroupId === current,
                }"
              />

                      </span>
                    </div>
                    <el-text v-else>-</el-text>
                  </template>
                </ElTableColumn>
                <ElTableColumn v-if="data.checkList.includes('ir')" show-overflow-tooltip align="left" prop="ir"
                  label="项目IR">
                  <template #default="{ row }">
                    <p class="weightColor">{{ row.ir ? row.ir : "-" }}%</p>
                  </template>
                </ElTableColumn>
                <ElTableColumn v-if="data.checkList.includes('projectIr')" show-overflow-tooltip align="left"
                  prop="projectIr" label="项目实际IR">
                  <template #default="{ row }">
                    <p class="weightColor">{{ row.projectIr ? row.projectIr : "-" }}%</p>
                  </template>
                </ElTableColumn>
                <template #empty>
                  <el-empty :image="empty" :image-size="300" />
                </template>
              </ElTable>
              <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
                :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false"
                class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
            </el-tab-pane>
            <el-tab-pane label="会员IR" :name="2">
              <SearchBar :show-toggle="false">
                <template #default="{ fold, toggle }">
                  <ElForm :model="data.search" size="default" label-width="100px" inline-message inline
                    class="search-form">
                    <ElFormItem>
                      <ElInput v-model="data.search.projectOrMemberGroupId" placeholder="会员ID" clearable
                        @keydown.enter="currentChange()" @clear="currentChange()" />
                    </ElFormItem>
                    <ElFormItem>
                      <ElInput v-model="data.search.projectOrMemberGroupName" placeholder="会员姓名" clearable
                        @keydown.enter="currentChange()" @clear="currentChange()" />
                    </ElFormItem>
                    <ElFormItem>
                      <ElButton type="primary" @click="currentChange()">
                        <template #icon>
                          <SvgIcon name="i-ep:search" />
                        </template>
                        筛选
                      </ElButton>
                      <ElButton @click="onReset">
                        <template #icon>
                          <div class="i-grommet-icons:power-reset h-1em w-1em" />
                        </template>
                        重置
                      </ElButton>
                      <ElButton disabled link @click="toggle">
                        <template #icon>
                          <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'
    " />
                        </template>
                        {{ fold ? "展开" : "收起" }}
                      </ElButton>
                    </ElFormItem>
                  </ElForm>
                </template>
              </SearchBar>
              <ElDivider border-style="dashed" />
              <el-row>
                <FormLeftPanel />
                <FormRightPanel>
                  <el-button size="default"> 导出 </el-button>
                  <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
                    v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
                    v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="getDataList" />
                </FormRightPanel>
              </el-row>
              <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe"
                class="my-4" :data="data.dataList" highlight-current-row height="100%" @sort-change="sortChange"
                @selection-change="data.batch.selectionDataList = $event">
                <el-table-column align="left" type="selection" />
                <ElTableColumn v-if="data.checkList.includes('projectOrMemberGroupName')" show-overflow-tooltip
                  align="left" prop="projectOrMemberGroupName" label="会员姓名">
                  <template #default="{ row }">
                    <p class="weightColor">{{ row.projectOrMemberGroupName ? row.projectOrMemberGroupName : "-" }}</p>
                  </template>
                </ElTableColumn>
                <ElTableColumn v-if="data.checkList.includes('projectOrMemberGroupId')" show-overflow-tooltip
                  align="left" prop="projectOrMemberGroupId" label="会员ID">
                  <template #default="{ row }">
                    <div v-if="row.projectOrMemberGroupId" class="hoverSvg">
                      <p class="fineBom">{{ row.projectOrMemberGroupId }}</p>
                      <span class="c-fx">
                        <copy class="copy" :content="row.projectOrMemberGroupId" />
                      </span>
                    </div>
                    <el-text v-else>-</el-text>
                  </template>
                </ElTableColumn>
                <ElTableColumn v-if="data.checkList.includes('ir')" show-overflow-tooltip align="left" prop="ir"
                  label="会员IR">
                  <template #default="{ row }">
                    <p class="weightColor">{{ row.ir ? row.ir : "-" }}%</p>
                  </template>
                </ElTableColumn>
                <template #empty>
                  <el-empty :image="empty" :image-size="300" />
                </template>
              </ElTable>
              <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
                :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false"
                class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
            </el-tab-pane>
            <el-tab-pane label="小组IR" :name="3">
              <SearchBar :show-toggle="false">
                <template #default="{ fold, toggle }">
                  <ElForm :model="data.search" size="default" label-width="100px" inline-message inline
                    class="search-form">
                    <ElFormItem>
                      <ElInput v-model="data.search.projectOrMemberGroupId" placeholder="会员组ID" clearable
                        @keydown.enter="currentChange()" @clear="currentChange()" />
                    </ElFormItem>
                    <ElFormItem>
                      <ElInput v-model="data.search.projectOrMemberGroupName" placeholder="会员组名称" clearable
                        @keydown.enter="currentChange()" @clear="currentChange()" />
                    </ElFormItem>
                    <ElFormItem>
                      <ElButton type="primary" @click="currentChange()">
                        <template #icon>
                          <SvgIcon name="i-ep:search" />
                        </template>
                        筛选
                      </ElButton>
                      <ElButton @click="onReset">
                        <template #icon>
                          <div class="i-grommet-icons:power-reset h-1em w-1em" />
                        </template>
                        重置
                      </ElButton>
                      <ElButton disabled link @click="toggle">
                        <template #icon>
                          <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'
    " />
                        </template>
                        {{ fold ? "展开" : "收起" }}
                      </ElButton>
                    </ElFormItem>
                  </ElForm>
                </template>
              </SearchBar>
              <ElDivider border-style="dashed" />
              <el-row>
                <FormLeftPanel />
                <FormRightPanel>
                  <el-button size="default"> 导出 </el-button>
                  <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
                    v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
                    v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="getDataList" />
                </FormRightPanel>
              </el-row>
              <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe"
                class="my-4" :data="data.dataList" highlight-current-row height="100%" @sort-change="sortChange"
                @selection-change="data.batch.selectionDataList = $event">
                <el-table-column align="left" type="selection" />
                <ElTableColumn v-if="data.checkList.includes('projectOrMemberGroupName')" show-overflow-tooltip
                  align="left" prop="projectOrMemberGroupName" label="会员组名称">
                  <template #default="{ row }">
                    <p class="weightColor">{{ row.projectOrMemberGroupName ? row.projectOrMemberGroupName : "-" }}</p>
                  </template>
                </ElTableColumn>
                <ElTableColumn v-if="data.checkList.includes('projectOrMemberGroupId')" show-overflow-tooltip
                  align="left" prop="projectOrMemberGroupId" label="会员组ID">
                  <template #default="{ row }">
                    <div v-if="row.projectOrMemberGroupId" class="hoverSvg">
                      <p class="fineBom">{{ row.projectOrMemberGroupId }}</p>
                      <span class="c-fx">
                        <copy class="copy" :content="row.projectOrMemberGroupId" />
                      </span>
                    </div>
                    <el-text v-else>-</el-text>
                  </template>
                </ElTableColumn>
                <ElTableColumn v-if="data.checkList.includes('ir')" show-overflow-tooltip align="left" prop="ir"
                  label="会员组IR">
                  <template #default="{ row }">
                    <p class="weightColor">{{ row.ir ? row.ir : "-" }}%</p>
                  </template>
                </ElTableColumn>
                <template #empty>
                  <el-empty :image="empty" :image-size="300" />
                </template>
              </ElTable>
              <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
                :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false"
                class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.rowCopy {
  width: 20px;
  display: none;
}
 .current {
    display: block !important;
  }
.el-table__row:hover .rowCopy {
  display: block;
}
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
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
.weightColor {
  color: #333;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fineBom {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hoverSvg {
  display: flex;
  align-items: center;

}

.copy {
  display: flex;
  align-items: center;
  width: 25px;
}

.c-fx {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
