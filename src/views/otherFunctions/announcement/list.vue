<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/announcement";
import useSettingsStore from "@/store/modules/settings";

defineOptions({
  name: "announcement",
});
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
    label: "等级名称",
    prop: "a",
    sortable: true,
    // 不可更改
    disableCheck: false,
    // 默认展示
    checked: true,
  },
]);
// 筛选类型
const typeI = ref();
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
    title: "",
    type: null,
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});
// 类型
const type = [
  { label: "公告", value: 1 },
  { label: "常见问题", value: 2 },
  { label: "帮助", value: 3 },
];
// 获取数据
function getDataList() {
  data.value.loading = true;
  const params = {
    ...getParams(),
    ...data.value.search,
  };
  api.list(params).then((res: any) => {
    data.value.loading = false;
    data.value.dataList = res.data;
    pagination.value.total = res.data.length;
  });
}

// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    title: "",
    type: null,
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
    data.value.formModeProps.row = row;
    data.value.formModeProps.visible = true;
  }
}
// 开关事件
function onChangeStatus(row: any) {
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(
      `确认${row.top ? "开启置顶" : "关闭置顶"}「${row.title}」吗？`,
      "确认信息"
    )
      .then(() => {
        data.value.loading = true;
        api
          .edit({
            id: row.id,
            top: row.top,
          })
          .then(() => {
            ElMessage.success({
              message: `${row.top ? "开启置顶" : "关闭置顶"}成功`,
              center: true,
            });
            getDataList();
            data.value.loading = false;
            return resolve(true);
          })
          .catch(() => {
            getDataList();
            data.value.loading = false;
            return resolve(false);
          });
      })
      .catch(() => {
        getDataList();
        return resolve(false);
      });
  });
}
// 删除
function onDel(row: any) {
  ElMessageBox.confirm(`确认删除「${row.title}」吗？`, "确认信息")
    .then(() => {
      data.value.loading = true;
      api.delete({ id: row.id }).then(() => {
        data.value.loading = false;
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
          <ElForm
            :model="data.search"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <ElFormItem label="">
              <ElInput
                v-model="data.search.title"
                placeholder="请输入标题"
                clearable
                @keydown.enter="currentChange()"
                @clear="currentChange()"
              />
            </ElFormItem>
            <el-form-item label="">
              <el-select
                v-model="data.search.type"
                value-key=""
                placeholder="请选择类型"
                clearable
                filterable
              >
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
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
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
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
          <TabelControl
            v-model:border="data.border"
            v-model:tableAutoHeight="data.tableAutoHeight"
            v-model:checkList="data.checkList"
            v-model:columns="columns"
            v-model:line-height="data.lineHeight"
            v-model:stripe="data.stripe"
            style="margin-left: 12px"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <ElTable
        v-model:stripe="data.stripe"
        v-model:border="data.border"
        v-loading="data.loading"
        :size="data.lineHeight"
        class="my-4"
        :data="data.dataList"
        highlight-current-row
        height="100%"
        @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event"
      >
      <el-table-column align="center" type="selection" />
        <!-- <el-table-column
          align="center"
          show-overflow-tooltip
          type="index"
          label="序号"
          width="80"
        /> -->
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop="title"
          label="标题"
        />
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop="type"
          label="类型"
        >
          <template #default="{ row }">
            {{ type[row.type - 1].label }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop="top"
          label="置顶"
        >
          <template #default="{ row }">
            <el-switch
              v-model="row.top"
              :active-value="true"
              :inactive-value="false"
              inline-prompt
              active-text="开启"
              inactive-text="关闭"
              @change="onChangeStatus(row)"
            >
            </el-switch>
          </template>
        </ElTableColumn>
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop="createTime"
          label="创建日期"
        />
        <ElTableColumn label="操作" width="150" align="center" fixed="right">
          <template #default="scope">
            <ElButton
              type="primary"
              size="small"
              plain
              @click="onEdit(scope.row)"
            >
              编辑
            </ElButton>
            <ElButton
              type="danger"
              size="small"
              plain
              @click="onDel(scope.row)"
            >
              删除
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty description="暂无数据" />
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
