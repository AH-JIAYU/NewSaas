<script setup lang="ts">
defineOptions({
  name: 'projectSettlement',
})
import { ElMessage } from "element-plus";
import tableQuery from "@/components/tableQuery/index.vue";
import invoicingEdit from "./components/InvoicingEdit/index.vue";
import moreOperations from "./components/MoreOperations/index.vue";
import projectReview from "./components/ProjectReview/index.vue";
import settlementEdit from "./components/SettlementEdit/index.vue";
import refundDetail from "./components/RefundDetails/index.vue";
import Settlement from "./components/AddSettlement/index.vue";
// 查询组件变量
const fold = ref<boolean>(false);
// 分页
const layout = ref<string>("total, sizes, prev, pager, next, jumper");
const total = ref<any>(0);
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
const dataList = {
  data: [
    {
      a: "111",
      b: "222222",
      c: "3333",
      d: "444",
      e: "5555555",
      f: "66666666",
      g: "777777777",
      h: "8888888888",
      i: "999999999",
      j: "10101010",
      k: "1212121212",
    },
    {
      a: "111",
      b: "222222",
      c: "3333",
      d: "444",
      e: "5555555",
      f: "66666666",
      g: "777777777",
      h: "8888888888",
      i: "999999999",
      j: "10101010",
      k: "1212121212",
    },
  ],
  total: 3,
};
list.value = dataList.data;
total.value = dataList.total;
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
// 折叠查询表单
function handleFold() {
  fold.value = !fold.value;
}
// 右侧工具
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 查询数据
function queryData() {
  queryForm.pageNo = 1;
}
// 选择每页多少条数据
function handleSizeChange(value: number) {
  queryForm.pageNo = 1;
  queryForm.pageSize = value;
}
// 选择页数
function handleCurrentChange(value: number) {
  queryForm.pageNo = value;
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
</script>

<template>
  <div :class="{ 'vab-table-fullscreen': isFullscreen }">
    <PageMain>
      <el-form
        inline
        label-position="right"
        label-width="5rem"
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
            <el-option :key="11" :label="11" :value="111"> 11111 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="!fold" label="">
          <el-select placeholder="客户简称">
            <el-option :key="11" :label="11" :value="111"> 11111 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="!fold" label="">
          <el-select placeholder="分配目标">
            <el-option :key="11" :label="11" :value="111"> 11111 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="!fold" label="">
          <el-select placeholder="项目状态">
            <el-option :key="11" :label="11" :value="111"> 11111 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="!fold">
          <el-input clearable placeholder="创建人" />
        </el-form-item>
        <el-form-item v-show="!fold" label="">
          <el-select placeholder="时间类型">
            <el-option :key="11" :label="11" :value="111"> 11111 </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="!fold">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="Pick a day"
            size="default"
          />
        </el-form-item>
        <tableQuery
          :fold="fold"
          :list-loading="listLoading"
          @handle-fold="handleFold"
          @on-reset="onReset"
          @query-data="queryData"
        />
      </el-form>
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
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:is-fullscreen="isFullscreen"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 0.75rem"
            @click-full-screen="clickFullScreen"
            @query-data="queryData"
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
        <el-table-column type="index" label="序号" width="55" />
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
        <el-table-column align="center" label="操作" width="170">
          <el-button text type="primary" size="default" @click="auditing">
            审核
          </el-button>
          <el-button text type="primary" size="default" @click="auditing">
            重审
          </el-button>
          <el-button text type="primary" size="default" @click="edit">
            编辑
          </el-button>
          <el-button text type="primary" size="default" @click="refundDetails">
            详情
          </el-button>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <el-pagination
        background
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
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
</style>
