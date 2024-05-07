<script setup lang="ts">
defineOptions({
  name: "ProjectManagementSettlementIndex",
});
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import invoicingEdit from "./components/InvoicingEdit/index.vue";
import moreOperations from "./components/MoreOperations/index.vue";
import projectReview from "./components/ProjectReview/index.vue";
import settlementEdit from "./components/SettlementEdit/index.vue";
import refundDetail from "./components/RefundDetails/index.vue";
import Settlement from "./components/AddSettlement/index.vue";
const { pagination, onSizeChange, onCurrentChange } = usePagination(); //分页
// 分页
const value1 = ref("");
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const invoicingRef = ref();
const addSettlementRef = ref();
const settlementRef = ref();
const auditingRef = ref();
const editRef = ref();
const refundRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const border = ref(true);
const checkList = ref([]);
const isFullscreen = ref(false);
const lineHeight = ref("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const columns = ref([
  {
    label: "项目ID",
    prop: "ID",
    sortable: true,
    // 不可改变的
    disableCheck: true,
    checked: true,
  },
]);
// 查询参数
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 10,
  title: "",
  order: {
    id: "ASC",
  },
  select: {},
});
const list = ref<any>([]);
// 获取列表选中数据
const setSelectRows = (value: any) => {
  selectRows.value = value;
};
// 开票
function invoicing(row: any) {
  if (!selectRows.value.length)
    return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  if (selectRows.value.length === 1) {
    invoicingRef.value.replyData(row);
    invoicingRef.value.isShow = true;
  } else {
    settlementRef.value.replyData(row, selectRows.value);
    settlementRef.value.isShow = true;
  }
}
// 新增结算
function addSettlement() {
  addSettlementRef.value.isShow = true;
}
// 结算
function settlement(row: any) {
  if (!selectRows.value.length)
    return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  if (selectRows.value.length === 1) {
    invoicingRef.value.replyData(row);
    invoicingRef.value.isShow = true;
  } else if (selectRows.value.length > 1) {
    settlementRef.value.replyData(row, selectRows.value);
    settlementRef.value.isShow = true;
  }
}
// 审核
const auditing = () => {
  auditingRef.value.isShow = true;
};
// 编辑
const edit = () => {
  editRef.value.isShow = true;
};
// 详情
const refundDetails = () => {
  refundRef.value.isShow = true;
};
// 右侧工具
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    pageNo: 1,
    pageSize: 10,
    title: "",
    order: {
      id: "ASC",
    },
    select: {},
  });
}
async function fetchData() {
  listLoading.value = true;
  // const { data } = await getList(queryForm)
  // list.value = data[0]
  // total.value = data[0].length
  list.value = [
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  ];
  pagination.value.total = 3;
  listLoading.value = false;
}
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div
    :class="{
      'vab-table-fullscreen': isFullscreen,
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            inline
            label-position="right"
            label-width="80px"
            :model="queryForm"
            @submit.prevent
          >
            <el-form-item label="">
              <el-input clearable placeholder="项目ID" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input clearable placeholder="项目名称" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input clearable placeholder="项目标识" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="国家地区">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="客户简称">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="分配目标">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="项目状态">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-input clearable placeholder="创建人" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="时间类型">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 192px" v-show="!fold">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="Pick a day"
                size="default"
              />
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
                  <div class="i-grommet-icons:power-reset w-1em h-1em"></div>
                </template>
                重置
              </ElButton>
              <ElButton link @click="toggle">
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
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="addSettlement">
            添加结算
          </el-button>
          <el-button type="primary" size="default" @click="invoicing(1)">
            开票
          </el-button>
          <el-button type="primary" size="default" @click="settlement(2)">
            结算
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button style="margin-right: 0.625rem" size="default" @click="">
            导出
          </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:is-fullscreen="isFullscreen"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @click-full-screen="clickFullScreen"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        style="margin-top: 0.625rem"
        ref="tableSortRef"
        v-loading="false"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column type="selection" />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column prop="a" align="center" label="项目ID" />
        <el-table-column prop="b" align="center" label="项目名称" />
        <el-table-column prop="c" align="center" label="客户简称/标识" />
        <el-table-column prop="d" align="center" label="原价" />
        <el-table-column prop="e" align="center" label="所属国家" />
        <el-table-column prop="f" align="center" label="系统完成数" />
        <el-table-column prop="g" align="center" label="结算完成数" />
        <el-table-column prop="h" align="center" label="结算状态" />
        <el-table-column prop="j" align="center" label="创建人" />
        <el-table-column prop="k" align="center" label="创建时间" />
        <el-table-column align="center" label="操作" width="190">
          <template #default="{ row }">
            <el-button
              text
              type="primary"
              size="default"
              @click="auditing(setSelectRows)"
            >
              审核
            </el-button>
            <ElDropdown>
              <ElButton size="small">
                更多操作
                <SvgIcon name="i-ep:arrow-down" class="el-icon--right" />
              </ElButton>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem command="auditing">
                    <el-button
                      text
                      size="default"
                      @click="auditing"
                    >
                      重审
                    </el-button>
                  </ElDropdownItem>
                  <ElDropdownItem command="edit" divided>
                    <el-button text  size="default" @click="edit">
                      编辑
                    </el-button>
                  </ElDropdownItem>
                  <ElDropdownItem command="refundDetails">
                    <el-button
                      text
                      size="default"
                      @click="refundDetails"
                    >
                      详情
                    </el-button>
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </template>
        </el-table-column>
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
      <invoicingEdit ref="invoicingRef" />
      <moreOperations ref="settlementRef" />
      <projectReview ref="auditingRef" />
      <settlementEdit ref="editRef" />
      <refundDetail ref="refundRef" />
      <Settlement ref="addSettlementRef" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.el-select {
  width: 192px;
}

:deep {
  table {
    width: 100% !important;
  }
}

.el-pagination {
  margin-top: 0.9375rem;
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
