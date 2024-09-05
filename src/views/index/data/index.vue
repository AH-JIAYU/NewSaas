<script setup lang="ts">
import api from "@/api/modules/customer_report";
import { Back } from "@element-plus/icons-vue";
import { h, ref, shallowRef } from "vue";

defineOptions({
  name: "dataCenter",
});

// 分页
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// 右侧工具栏配置变量
const border = ref(true);
const checkList = ref<any>([]);
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
// 表格控件-控制全屏
const lineHeight = ref<any>("default");
const stripe = ref(false);
const columns = ref<any>([
  { label: "客户名称", prop: "customerName", sortable: true, checked: true },
  {
    label: "客户简称",
    prop: "customerShortName",
    sortable: true,
    checked: true,
  },
  { label: "负责人", prop: "chargeName", sortable: true, checked: true },
  {
    label: "关联项目数量",
    prop: "relationProjectTotal",
    sortable: true,
    checked: true,
  },
  {
    label: "参与项目数量",
    prop: "participateProjectTotal",
    sortable: true,
    checked: true,
  },
  {
    label: "结算项目数量",
    prop: "settlementProjectTotal",
    sortable: true,
    checked: true,
  },
  {
    label: "结算项目金额",
    prop: "settlementAmount",
    sortable: true,
    checked: true,
  },
  { label: "项目营业额", prop: "turnover", sortable: true, checked: true },
]);
// 时间
const timeArr = ref<any>([]);
const typeNumber = ref();
const data = ref<any>({
  // loading
  loading: false,
  // tabs选中值
  activeName: "report",
  list: [], // 表格
  queryForm: {
    type: 3, // 1年 2月 3日 4自定义搜索范围
    overviewStart: "", // 开始时间
    overviewEnd: "", // 结束时间
    overviewTime: [], //时间
  },
});

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    data.value.queryForm.limit = size;
    getDataList();
  });
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    data.value.queryForm.page = page;
    getDataList();
  });
}
function back() {
  data.value.queryForm.type = 3;
  data.value.queryForm.overviewStart = "";
  data.value.queryForm.overviewEnd = "";
  timeArr.value = [];
  getDataList();
}
// 去除icon
const customPrefix = shallowRef({
  render() {
    return h("p", "");
  },
});

// 处理时间
const timeChange = () => {
  data.value.queryForm.overviewStart = timeArr.value[0];
  data.value.queryForm.overviewEnd = timeArr.value[1];
};
// 获取列表
async function getDataList() {
  data.value.loading = true;
  const params = {
    ...getParams(),
    ...data.value.queryForm,
  };
  if (params.overviewTime.length) {
    params.overviewStart = params.overviewTime[0];
    params.overviewEnd = params.overviewTime[1];
  }
  if (data.value.activeName === "report") {
    api.reportList(params).then((res: any) => {
      data.value.loading = false;
      data.value.list = res.data.data;
      pagination.value.total = +res.data.total;
    });
  } else {
    api.auditingList(params).then((res: any) => {
      data.value.loading = false;
      data.value.list = res.data.data;
      pagination.value.total = +res.data.total;
    });
  }
}
const getDataChange = () => {
  data.value.queryForm.type = 3
  if (data.value.activeName === "report") {
    checkList.value = []
    columns.value = [
      {
        label: "客户名称",
        prop: "customerName",
        sortable: true,
        checked: true,
      },
      {
        label: "客户简称",
        prop: "customerShortName",
        sortable: true,
        checked: true,
      },
      { label: "负责人", prop: "chargeName", sortable: true, checked: true },
      {
        label: "关联项目数量",
        prop: "relationProjectTotal",
        sortable: true,
        checked: true,
      },
      {
        label: "参与项目数量",
        prop: "participateProjectTotal",
        sortable: true,
        checked: true,
      },
      {
        label: "结算项目数量",
        prop: "settlementProjectTotal",
        sortable: true,
        checked: true,
      },
      {
        label: "结算项目金额",
        prop: "settlementAmount",
        sortable: true,
        checked: true,
      },
      { label: "项目营业额", prop: "turnover", sortable: true, checked: true },
    ];
    columns.value.forEach((item: any) => {
      if (item.checked) {
        checkList.value.push(item.prop);
      }
    });
    getDataList()
  } else {
    checkList.value = []
    columns.value = [
      {
        label: "客户名称",
        prop: "customerName",
        sortable: true,
        checked: true,
      },
      {
        label: "客户简称",
        prop: "customerShortName",
        sortable: true,
        checked: true,
      },
      { label: "负责人", prop: "chargeName", sortable: true, checked: true },
      {
        label: "系统完成数",
        prop: "systemDone",
        sortable: true,
        checked: true,
      },
      {
        label: "结算完成单数",
        prop: "settlementDone",
        sortable: true,
        checked: true,
      },
      {
        label: "审核率",
        prop: "settlementRatioPercent",
        sortable: true,
        checked: true,
      },
    ];
    columns.value.forEach((item: any) => {
      if (item.checked) {
        checkList.value.push(item.prop);
      }
    });
    getDataList()
  }
};
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  getDataList();
});
</script>

<template>
  <div :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <el-tabs v-model="data.activeName" @tab-change="getDataChange">
        <el-tab-pane label="客户报告" name="report">
          <el-row class="fx-b">
            <div style="width: 200px; height: 33px">
              <el-radio-group v-if="data.queryForm.type !== 4" v-model="data.queryForm.type" @change="getDataList">
                <el-radio-button label="日" :value="3" />
                <el-radio-button label="月" :value="2" />
                <el-radio-button label="年" :value="1" />
                <el-radio-button label="搜索" :value="4" />
              </el-radio-group>
              <div v-else class="fx-b">
                <el-button size="default" class="btn" style="width: 32px !important" :icon="Back" @click="back" />
                <el-date-picker v-model="data.queryForm.overviewTime" type="datetimerange"
                  value-format="YYYY-MM-DD hh:mm:ss" unlink-panels range-separator="-" start-placeholder="开始"
                  end-placeholder="结束" size="default" :prefix-icon="customPrefix" @change="timeChange" />
                <el-button type="primary" class="btn" style="width: 59px" size="default" @click="currentChange()">
                  搜索
                </el-button>
              </div>
            </div>
            <FormRightPanel>
              <el-button style="" size="default" @click=""> 导出 </el-button>
              <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight"
                v-model:checkList="checkList" v-model:columns="columns" v-model:line-height="lineHeight"
                v-model:stripe="stripe" style="margin-left: 12px" @query-data="currentChange" />
            </FormRightPanel>
          </el-row>
          <el-table :data="data.list" :border="border" :size="lineHeight" :stripe="stripe" style="width: 100%">
            <el-table-column align="center" type="selection" />
            <el-table-column v-if="checkList.includes('customerName')" show-overflow-tooltip align="center"
              prop="customerName" label="客户名称" width="180">
              <template #default="{ row }">
                {{ row.customerAccord ? row.customerAccord : "-" }}
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('customerShortName')" show-overflow-tooltip align="center"
              prop="customerShortName" label="客户简称" width="100" />
            <el-table-column v-if="checkList.includes('chargeName')" show-overflow-tooltip align="center"
              prop="chargeName" label="负责人"><template #default="{ row }">
                {{ row.chargeName ? row.chargeName : "-" }}
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('relationProjectTotal')" show-overflow-tooltip align="center"
              prop="relationProjectTotal" label="关联项目数量" />
            <el-table-column v-if="checkList.includes('participateProjectTotal')" show-overflow-tooltip align="center"
              prop="participateProjectTotal" label="参与项目数量" />
            <el-table-column v-if="checkList.includes('settlementProjectTotal')" show-overflow-tooltip align="center"
              prop="settlementProjectTotal" label="结算项目数量" />
            <el-table-column v-if="checkList.includes('settlementAmount')" show-overflow-tooltip align="center"
              prop="settlementAmount" label="结算项目金额"><template #default="{ row }">
                {{ row.settlementAmount ? row.settlementAmount : "-" }}
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('turnover')" show-overflow-tooltip align="center" prop="turnover"
              label="项目营业额" />
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户审核" name="auditing">
          <el-row class="fx-b">
            <div style="width: 200px; height: 33px">
              <el-radio-group v-if="data.queryForm.type !== 4" v-model="data.queryForm.type" @change="getDataList">
                <el-radio-button label="日" :value="3" />
                <el-radio-button label="月" :value="2" />
                <el-radio-button label="年" :value="1" />
                <el-radio-button label="搜索" :value="4" />
              </el-radio-group>
              <div v-else class="fx-b">
                <el-button size="default" class="btn" style="width: 32px !important" :icon="Back" @click="back" />
                <el-date-picker v-model="data.queryForm.overviewTime" type="datetimerange"
                  value-format="YYYY-MM-DD hh:mm:ss" unlink-panels range-separator="-" start-placeholder="开始"
                  end-placeholder="结束" size="default" :prefix-icon="customPrefix" @change="timeChange" />
                <el-button type="primary" class="btn" style="width: 59px" size="default" @click="currentChange()">
                  搜索
                </el-button>
              </div>
            </div>
            <FormRightPanel>
              <el-button style="" size="default" @click=""> 导出 </el-button>
              <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight"
                v-model:checkList="checkList" v-model:columns="columns" v-model:line-height="lineHeight"
                v-model:stripe="stripe" style="margin-left: 12px" @query-data="currentChange" />
            </FormRightPanel>
          </el-row>
          <el-table class="el-table__row--striped" :data="data.list" :border="border" :size="lineHeight"
            :stripe="stripe" style="width: 100%">
            <el-table-column align="center" type="selection" />
            <el-table-column v-if="checkList.includes('customerName')" show-overflow-tooltip align="center"
              prop="customerName" label="客户名称" width="180"><template #default="{ row }">
                {{ row.customerAccord ? row.customerAccord : "-" }}
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('customerShortName')" show-overflow-tooltip align="center"
              prop="customerShortName" label="客户简称" width="100"><template #default="{ row }">
                {{ row.customerShortName ? row.customerShortName : "-" }}
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('chargeName')" show-overflow-tooltip align="center"
              prop="chargeName" label="负责人"><template #default="{ row }">
                {{ row.chargeName ? row.chargeName : "-" }}
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('systemDone')" show-overflow-tooltip align="center"
              prop="systemDone" label="系统完成数" />
            <el-table-column v-if="checkList.includes('settlementDone')" show-overflow-tooltip align="center"
              prop="settlementDone" label="结算完成单数" />
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              prop="num3"
              label="审核成功"
            /> -->
            <el-table-column v-if="checkList.includes('settlementRatioPercent')" show-overflow-tooltip align="center"
              prop="settlementRatioPercent" label="审核率" />
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-row {
    margin: 20px 0;
    color: #b6b5b562;
  }
}

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;

  :deep {
    .el-date-editor {
      border-radius: 0 !important;
    }

    .btn:nth-of-type(1) {
      border-radius: 4px 0 0 4px !important;
      border-right: 0px;
    }

    .btn:nth-of-type(2) {
      border-radius: 0 4px 4px 0 !important;
    }

    .el-icon.el-input__icon.el-range__icon {
      display: none !important;
    }
  }
}
</style>
