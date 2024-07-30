<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import Detail from "./components/Detail/index.vue";
import api from "@/api/modules/alter";
import apiUser from "@/api/modules/configuration_manager";

defineOptions({
  name: "FinanceInvoiceIndex",
});
// 分页
const { pagination, onSizeChange, onCurrentChange } = usePagination();
// 分页
const tableSortRef = ref("");
// 用户数组
const userList = ref<any>([]);
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const editRef = ref();
const detailRef = ref();
// 右侧工具栏配置变量
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
const checkList = ref([]);
const border = ref(true);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const statusType = [
  { label: "完成/待审核", value: "1,0" },
  { label: "审核通过", value: "1,7" },
  { label: "审核失败", value: "1,8" },
  { label: "数据冻结", value: "1,9" },
  { label: "被甄别", value: "2,null" },
  { label: "配额满", value: "3,null" },
];
const columns = ref([
  {
    label: "选择渠道",
    prop: "ID",
    sortable: true,
    // 不可改变的
    disableCheck: true,
    checked: true,
  },
]);
// 查询参数
const queryForm = reactive<any>({
  // 页数
  page: 1,
  // 条数
  limit: 10,
  // 类型 1成功/待审核 2审核通过 3审核失败 4数据冻结 5被甄别 6配额满
  type: null,
  // 操作人id
  createUserId: "",
});
const list = ref<any>([]);
// 新增
function addData() {
  editRef.value.showEdit();
}
// 右侧工具方法
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    // 类型 1成功/待审核 2审核通过 3审核失败 4数据冻结 5被甄别 6配额满
    type: null,
    // 操作人id
    createUserId: "",
  });
  fetchData();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    queryForm.limit = size;
    fetchData();
  });
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    queryForm.page = page;
    fetchData();
  });
}
async function fetchData() {
  listLoading.value = true;
  const { data } = await api.list(queryForm);
  list.value = data.tenantUpdateRecordVOBuilders;
  pagination.value.total = +data.total;
  listLoading.value = false;
}
onMounted(async () => {
  const { data } = await apiUser.list({
    name: "",
    role: "",
  });
  userList.value = data;
  fetchData();
});
</script>

<template>
  <div
    v-loading="listLoading"
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            :model="queryForm"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.createUserId"
                clearable
                :inline="false"
                placeholder="点击ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.type"
                value-key=""
                placeholder="变更状态"
                clearable
                filterable
              >
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
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
              <ElButton link disabled @click="toggle">
                <template #icon>
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </el-form>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button
            style="margin-right: 10px"
            type="primary"
            size="default"
            @click="addData"
          >
            新增
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="false"
        style="margin-top: 10px"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column align="center" type="selection" />
        <!-- <el-table-column type="index" align="center" label="序号" width="55" /> -->
        <el-table-column
          prop="projectClickId"
          show-overflow-tooltip
          align="center"
          label="点击ID"
        />
        <el-table-column
          prop="afterType"
          show-overflow-tooltip
          align="center"
          label="变更前"
        >
          <template #default="{ row }">
            <el-text
              v-if="row.beforeSurveyType === 1 && row.beforeViceType === 0"
              class="mx-1"
              >完成/待审核</el-text
            >
            <el-text
              v-if="row.beforeSurveyType === 1 && row.beforeViceType === 7"
              class="mx-1"
              >审核通过</el-text
            >
            <el-text
              v-if="row.beforeSurveyType === 1 && row.beforeViceType === 8"
              class="mx-1"
              >审核失败</el-text
            >
            <el-text
              v-if="row.beforeSurveyType === 1 && row.beforeViceType === 9"
              class="mx-1"
              >数据冻结</el-text
            >
            <el-text v-if="row.beforeSurveyType === 2" class="mx-1"
              >被甄别</el-text
            >
            <el-text v-if="row.beforeSurveyType === 3" class="mx-1"
              >配额满</el-text
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="beforeType"
          show-overflow-tooltip
          align="center"
          label="变更后"
        >
          <template #default="{ row }">
            <el-text
              v-if="row.afterSurveyType === 1 && row.afterViceType === 0"
              class="mx-1"
              >完成/待审核</el-text
            >
            <el-text
              v-if="row.afterSurveyType === 1 && row.afterViceType === 7"
              class="mx-1"
              >审核通过</el-text
            >
            <el-text
              v-if="row.afterSurveyType === 1 && row.afterViceType === 8"
              class="mx-1"
              >审核失败</el-text
            >
            <el-text
              v-if="row.afterSurveyType === 1 && row.afterViceType === 9"
              class="mx-1"
              >数据冻结</el-text
            >
            <el-text v-if="row.afterSurveyType === 2" class="mx-1"
              >被甄别</el-text
            >
            <el-text v-if="row.afterSurveyType === 3" class="mx-1"
              >配额满</el-text
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          show-overflow-tooltip
          align="center"
          label="创建时间"
        />
        <el-table-column
          prop="remark"
          show-overflow-tooltip
          align="center"
          label="备注"
          ><template #default="{ row }">
            {{ row.remark ? row.remark : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createUserId"
          show-overflow-tooltip
          align="center"
          label="操作人"
          ><template #default="{ row }">
            <div v-for="item in userList" :key="item.id">
              <el-text v-if="item.id === row.createUserId">
                {{ item.name }}</el-text
              >
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip align="center" label="操作">
          <template #default="{ row }">
            <ElButton
              type="primary"
              size="small"
              plain
              @click="detailData(row)"
            >
              详情
            </ElButton>
          </template>
        </el-table-column> -->
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
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
      <Edit @success="fetchData" ref="editRef" />
      <Detail ref="detailRef" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.el-pagination {
  margin-top: 15px;
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
</style>
