<route lang="yaml">
meta:
  title: 列表页
</route>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/survey_data";
import useSettingsStore from "@/store/modules/settings";
import { onBeforeUnmount, onMounted, ref } from "vue";
// import useTabbar from '@/utils/composables/useTabbar'
import { useRouter } from "vue-router";

defineOptions({
  name: "SurveyDataList",
});

const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();

const tableData = [
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
];

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
  formMode: "router" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    id: "",
  },
  // 搜索
  search: {
    title: "",
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
    ...(data.value.search.title && { title: data.value.search.title }),
  };
  api.list(params).then((res: any) => {
    data.value.loading = false;
    data.value.dataList = res.data.list;
    pagination.value.total = res.data.total;
  });
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <el-row>
        <SearchTab />
      </el-row>
      <ElRow :gutter="24">
        <ElCol :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-card>
            <div class="fx-b">
              <PageHeader title="978" content="今日点击" />
              <PageHeader title="978" content="昨日点击" />
            </div>
          </el-card>
        </ElCol>
        <ElCol :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-card>
            <div class="fx-b">
              <PageHeader title="978" content="今日点击" />
              <PageHeader title="978" content="昨日点击" />
            </div>
          </el-card>
        </ElCol>
        <ElCol :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-card>
            <div class="fx-b">
              <PageHeader title="978" content="今日点击" />
              <PageHeader title="978" content="昨日点击" />
            </div>
          </el-card>
        </ElCol>
        <ElCol :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-card>
            <div class="fx-b">
              <PageHeader title="978" content="今日点击" />
              <PageHeader title="978" content="昨日点击" />
            </div>
          </el-card>
        </ElCol>
      </ElRow>
      <ElRow :gutter="24">
        <ElCol :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-card>
            <PageHeader title="11978.2" content="待审金额" />
          </el-card>
        </ElCol>
        <ElCol :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-card>
            <PageHeader title="11978.2" content="可用金额" />
          </el-card>
        </ElCol>
        <ElCol :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <el-card>
            <PageHeader title="10.7%" content="作废率" />
          </el-card>
        </ElCol>
      </ElRow>
      <!-- 今日完成排名 & 供应商佣金排行 -->
      <el-row :gutter="24">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-card>
            <template #header> 业绩排行榜 </template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="name" label="供应商" />
              <el-table-column prop="money" label="完成金额" />
              <el-table-column prop="num" label="完成数量" />
              <el-table-column prop="B2B/B2C" label="B2B/B2C" />
              <el-table-column prop="currency" label="货币类型" />
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-card>
            <template #header> 完成排行榜 </template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="name" label="供应商" />
              <el-table-column prop="money" label="完成金额" />
              <el-table-column prop="num" label="完成数量" />
              <el-table-column prop="B2B/B2C" label="B2B/B2C" />
              <el-table-column prop="currency" label="货币类型" />
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-card>
            <template #header> 退款排行榜 </template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="name" label="供应商" />
              <el-table-column prop="money" label="完成金额" />
              <el-table-column prop="num" label="完成数量" />
              <el-table-column prop="B2B/B2C" label="B2B/B2C" />
              <el-table-column prop="currency" label="货币类型" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-row {
    // display: flex;
    // justify-content: space-between;
    // width: 100%;
    // margin: 20px 0;

    .el-col {
      // margin: 20px 0;
      // flex: 1;
      // text-align: center;

      .title {
        text-align: left;
      }
    }

    .red {
      color: red;
    }
  }

  // 表格
  .el-table__body {
    tr:nth-of-type(1) {
      td:nth-of-type(1) {
        color: red !important;
      }
    }

    tr:nth-of-type(2) {
      td:nth-of-type(1) {
        color: #bfbdbc !important;
      }
    }

    tr:nth-of-type(3) {
      td:nth-of-type(1) {
        color: #a25316 !important;
      }
    }
  }
}

.page-header {
  text-align: center;
}

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-header {
    flex: 1;
    :deep {
      .text-2xl {
        //pageheader 的title
        font-weight: bold !important;
        font-size: 30px !important;
      }
    }
  }

  div:nth-of-type(2) {
    opacity: 0.5;
  }
}
</style>
