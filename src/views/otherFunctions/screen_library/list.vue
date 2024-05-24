<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/otherFunctions_screenLibrary";
import useSettingsStore from "@/store/modules/settings";
import Edit from "./components/Edit/index.vue";

defineOptions({
  name: "OtherFunctionsScreenLibraryList",
});

const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();

const data = ref({
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
  // 设计问卷
  formModeProps: {
    visible: false,
    id: "",
    details: "",
  },
  // 新增
  editProps: {
    id: "",
    visible: false,
    row: "",
  },
  // 搜索
  search: {
    countryId: "",
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

function getDataList() {
  data.value.loading = true;
  const params = {
    ...getParams(),
    ...(data.value.search.countryId && {
      countryId: data.value.search.countryId,
    }),
  };
  api.list(params).then((res: any) => {
    data.value.loading = false;
    data.value.dataList = res.data.getCountryListInfoList;
    pagination.value.total = res.data.getCountryListInfoList.length;
  });
}
// 分页 后端(刘)这块不好做分页，所有返回全部数据，前端做分页
const DataList = computed(() => {
  return data.value.dataList.slice(
    (pagination.value.page - 1) * pagination.value.size,
    pagination.value.page * pagination.value.size
  );
});

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size);
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page);
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order);
}

// 添加国家标题
function onCreate() {
  data.value.editProps.id = "";
  data.value.editProps.row = "";
  data.value.editProps.visible = true;
}
// 编辑国家标题
function onEdit(row: any) {
  data.value.editProps.id = row.projectProblemCategoryId;
  data.value.editProps.row = JSON.stringify(row);
  data.value.editProps.visible = true;
}
// 修改默认
async function changeIsDefault(item: any) {
  const { status } = await api.update(item);
  status === 1 &&
    ElMessage.success({
      message: "修改「默认国家」成功",
      center: true,
    });
  getDataList();
}
// 修改状态
async function changeStatus(item: any) {
  const { status } = await api.edit(item);
  status === 1 &&
    ElMessage.success({
      message: "修改「状态」成功",
      center: true,
    });
  getDataList();
}
// 设计模板
function EditSurvey(row: any) {
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "screenLibraryEdit",
        params: {
          id: row.projectProblemCategoryId,
        },
      });
    } else {
      router.push({
        name: "screenLibraryEdit",
        params: {
          id: row.projectProblemCategoryId,
        },
      });
    }
  } else {
    data.value.formModeProps.id = row.projectProblemCategoryId;
    data.value.formModeProps.details = row.details;
    data.value.formModeProps.visible = true;
  }
}
// 删除国家
function onDelCountry(row: any) {
  ElMessageBox.confirm(`确认删除「${row.countryId}」吗？`, "确认信息")
    .then(() => {
      api.delete({ countryId: row.countryId }).then(() => {
        getDataList();
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      });
    })
    .catch(() => {});
}
// 删除标题
function onDelProject(row: any) {
  ElMessageBox.confirm(`确认删除「${row.categoryName}」吗？`, "确认信息")
    .then(() => {
      api
        .delete({ projectProblemCategoryId: row.projectProblemCategoryId })
        .then(() => {
          getDataList();
          ElMessage.success({
            message: "删除成功",
            center: true,
          });
        });
    })
    .catch(() => {});
}
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
            <ElFormItem label="国家">
              <ElInput
                v-model="data.search.countryId"
                placeholder="请输入国家，支持模糊查询"
                clearable
                @keydown.enter="currentChange()"
                @clear="currentChange()"
              />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton link disabled @click="toggle">
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
      <ElSpace wrap>
        <ElButton type="primary" size="default" @click="onCreate">
          <template #icon>
            <SvgIcon name="i-ep:plus" />
          </template>
          新增前置问卷库
        </ElButton>
        <ElButton
          v-if="data.batch.enable"
          size="default"
          :disabled="!data.batch.selectionDataList.length"
        >
          单个批量操作按钮
        </ElButton>
        <ElButtonGroup v-if="data.batch.enable">
          <ElButton
            size="default"
            :disabled="!data.batch.selectionDataList.length"
          >
            批量操作按钮组1
          </ElButton>
          <ElButton
            size="default"
            :disabled="!data.batch.selectionDataList.length"
          >
            批量操作按钮组2
          </ElButton>
        </ElButtonGroup>
      </ElSpace>
      <ElTable
        v-loading="data.loading"
        class="my-4"
        border
        stripe
        :data="DataList"
        highlight-current-row
        height="100%"
        @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column type="expand" width="55">
          <template #default="{ row }">
            <div m="4">
              <div m="4"><h2>该国家下所有问卷</h2></div>
              <el-table
                :data="row.getProjectProblemCategoryInfoList"
                highlight-current-row
                class="hide-table-header"
              >
                <!-- <el-table-column width="55" /> -->
                <el-table-column prop="categoryName" label="标题" />
                <!-- <ElTableColumn label="默认"> </ElTableColumn> -->
                <ElTableColumn prop="status" label="状态">
                  <template #default="scope">
                    <ElSwitch
                      @change="changeStatus(scope.row)"
                      v-model="scope.row.status"
                      :active-value="1"
                      :inactive-value="2"
                    />
                  </template>
                </ElTableColumn>
                <el-table-column prop="createTime" label="创建时间" />
                <ElTableColumn
                  width="250"
                  align="center"
                  label="操作"
                  fixed="right"
                >
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
                      type="primary"
                      size="small"
                      plain
                      @click="EditSurvey(scope.row)"
                    >
                      设计问卷
                    </ElButton>
                    <ElButton
                      type="danger"
                      size="small"
                      plain
                      @click="onDelProject(scope.row)"
                    >
                      删除
                    </ElButton>
                  </template>
                </ElTableColumn>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <!-- <ElTableColumn prop="categoryName" label="标题" /> -->
        <ElTableColumn prop="countryId" label="国家" />
        <ElTableColumn prop="isDefault" label="默认">
          <template #default="scope">
            <ElSwitch
              @change="changeIsDefault(scope.row)"
              v-model="scope.row.isDefault"
              :active-value="1"
              :inactive-value="2"
            />
          </template>
        </ElTableColumn>
        <!-- <ElTableColumn prop="status" label="状态">
          <template #default="scope">
            <ElSwitch
              v-if="scope.row.status"
              @change="changeIsDefault(scope.row)"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="2"
            />
          </template>
        </ElTableColumn> -->
        <ElTableColumn label="操作" width="250" align="center" fixed="right">
          <template #default="scope">
            <ElButton
              type="danger"
              size="small"
              plain
              @click="onDelCountry(scope.row)"
            >
              删除
            </ElButton>
          </template>
        </ElTableColumn>
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
    <Edit
      :id="data.editProps.id"
      v-model="data.editProps.visible"
      :row="data.editProps.row"
      @success="getDataList"
    ></Edit>
    <FormMode
      v-if="data.formMode === 'dialog' || data.formMode === 'drawer'"
      :id="data.formModeProps.id"
      v-model="data.formModeProps.visible"
      :mode="data.formMode"
      :details="data.formModeProps.details"
      @success="getDataList"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep {
  // .hide-table-header {
  //   .el-table__header-wrapper {
  //     display: none !important;
  //   }
  // }
  // .el-table__cell.el-table__expanded-cell {
  //     padding: 0;
  //   }
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

  .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>
